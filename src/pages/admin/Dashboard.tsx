import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import {
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  X,
  Home,
  GraduationCap,
  Image as ImageIcon,
} from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [bookingsResult, messagesResult] = await Promise.all([
      supabase.from('bookings').select('status'),
      supabase.from('contact_messages').select('status'),
    ]);

    const bookings = bookingsResult.data || [];
    const messages = messagesResult.data || [];

    setStats({
      totalBookings: bookings.length,
      pendingBookings: bookings.filter((b) => b.status === 'pending').length,
      unreadMessages: messages.filter((m) => m.status === 'unread').length,
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Courses', href: '/admin/courses', icon: GraduationCap },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(href);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex">
        {/* Mobile menu button */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg border border-border"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 left-0 z-40 w-72 h-screen bg-card border-r border-border p-6 flex flex-col transition-transform lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center">
              <span className="font-serif text-sm text-primary-foreground font-semibold">SP</span>
            </div>
            <div>
              <h2 className="font-serif text-lg text-foreground">Admin Panel</h2>
              <p className="text-sm text-muted-foreground truncate max-w-[160px]">{user?.email}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {item.name === 'Messages' && stats.unreadMessages > 0 && (
                  <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {stats.unreadMessages}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="space-y-2 pt-4 border-t border-border">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-300"
            >
              <Home className="h-5 w-5" />
              <span>Back to Site</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-8 pt-16 lg:pt-8 overflow-auto">
          {location.pathname === '/admin' ? (
            <div>
              <h1 className="font-serif text-3xl text-foreground mb-8">Dashboard Overview</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Mail className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Unread Messages</p>
                      <p className="font-serif text-2xl text-foreground">{stats.unreadMessages}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card p-6 rounded-xl border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Manage Courses</p>
                      <p className="font-serif text-lg text-foreground">View & Edit</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border">
                <h2 className="font-serif text-xl text-foreground mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                  <Button variant="gold" onClick={() => navigate('/admin/courses')}>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Manage Courses
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/admin/messages')}>
                    <Mail className="mr-2 h-4 w-4" />
                    Check Messages
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
