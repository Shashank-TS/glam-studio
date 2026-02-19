import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import { format } from 'date-fns';
import {
  CalendarDays,
  Clock,
  Home,
  LogOut,
  Menu,
  User,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Booking {
  id: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  created_at: string;
}

interface Profile {
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    const [bookingsResult, profileResult] = await Promise.all([
      supabase
        .from('bookings')
        .select('id, service, preferred_date, preferred_time, status, created_at')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('profiles')
        .select('full_name, email, avatar_url')
        .eq('user_id', user?.id)
        .single(),
    ]);

    if (bookingsResult.data) {
      setBookings(bookingsResult.data);
    }
    if (profileResult.data) {
      setProfile(profileResult.data);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-500 bg-green-500/20';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/20';
      case 'cancelled':
        return 'text-red-500 bg-red-500/20';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

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
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          className={`fixed lg:static lg:translate-x-0 top-0 left-0 z-40 w-72 h-screen bg-card border-r border-border p-6 transition-transform lg:transition-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:flex flex-col`}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center">
              <span className="font-serif text-sm text-primary-foreground font-semibold">
                {(profile?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="font-serif text-lg text-foreground">
                {profile?.full_name || 'My Account'}
              </h2>
              <p className="text-sm text-muted-foreground truncate max-w-[160px]">
                {user?.email}
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/20 text-primary">
              <User className="h-5 w-5" />
              <span>My Dashboard</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground">
              <CalendarDays className="h-5 w-5" />
              <span>My Bookings</span>
              {stats.pending > 0 && (
                <span className="ml-auto bg-yellow-500 text-yellow-950 text-xs px-2 py-0.5 rounded-full">
                  {stats.pending}
                </span>
              )}
            </div>
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
        </motion.aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-8 pt-16 lg:pt-8 overflow-auto">
          <div>
            <h1 className="font-serif text-3xl text-foreground mb-2">
              Welcome, {profile?.full_name?.split(' ')[0] || 'there'}!
            </h1>
            <p className="text-muted-foreground mb-8">
              Manage your bookings and account from here.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card p-6 rounded-xl border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <CalendarDays className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Total Bookings</p>
                    <p className="font-serif text-2xl text-foreground">{stats.total}</p>
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
                  <div className="p-3 bg-green-500/20 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Confirmed</p>
                    <p className="font-serif text-2xl text-foreground">{stats.confirmed}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card p-6 rounded-xl border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-500/20 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Pending</p>
                    <p className="font-serif text-2xl text-foreground">{stats.pending}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bookings Table */}
            <div className="bg-card rounded-xl border border-border">
              <div className="p-6 border-b border-border">
                <h2 className="font-serif text-xl text-foreground">My Bookings</h2>
              </div>
              
              {bookings.length === 0 ? (
                <div className="p-12 text-center">
                  <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">You haven't made any bookings yet.</p>
                  <Button variant="gold" onClick={() => navigate('/')}>
                    Book an Appointment
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Booked On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <p className="font-medium text-foreground">{booking.service}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-foreground">
                            {format(new Date(booking.preferred_date), 'MMM dd, yyyy')}
                          </p>
                          <p className="text-sm text-muted-foreground">{booking.preferred_time}</p>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <p className="text-muted-foreground text-sm">
                            {format(new Date(booking.created_at), 'MMM dd, yyyy')}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default UserDashboard;