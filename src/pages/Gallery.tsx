import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingBookButton from '@/components/FloatingBookButton';
import { BookingDialogProvider } from '@/components/BookingDialog';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Play } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  media_url: string;
  media_type: string;
}

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase
        .from('gallery_media')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
      setItems(data || []);
      setLoading(false);
    };
    fetchItems();
  }, []);

  return (
    <BookingDialogProvider>
      <PageTransition>
        <main className="min-h-screen">
          <Navigation />
          
          {/* Hero Section */}
          <section className="pt-32 pb-16 bg-background">
            <div className="container mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                  Our Portfolio
                </span>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
                  The <span className="italic font-light text-gradient-gold">Gallery</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  A curated collection of our finest transformations and artistry
                </p>
              </motion.div>
            </div>
          </section>

          {/* Gallery Grid */}
          <section ref={ref} className="py-16 lg:py-24 bg-card">
            <div className="container mx-auto px-6">
              {loading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <p>Gallery coming soon!</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="group relative overflow-hidden rounded-sm"
                    >
                      <div className="aspect-[3/4] overflow-hidden">
                        {item.media_type === 'video' ? (
                          <div className="relative w-full h-full">
                            <video
                              src={item.media_url}
                              className="w-full h-full object-cover"
                              muted
                              loop
                              playsInline
                              onMouseEnter={(e) => e.currentTarget.play()}
                              onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:opacity-0 transition-opacity">
                                <Play className="h-5 w-5 text-white ml-1" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={item.media_url}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        {item.category && (
                          <span className="text-primary uppercase tracking-[0.2em] text-xs font-medium">
                            {item.category}
                          </span>
                        )}
                        <p className="text-white font-serif text-lg mt-1">{item.title}</p>
                      </div>
                      <div className="absolute top-4 right-4 w-8 h-8 border border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>

          <Footer />
          <FloatingBookButton />
        </main>
      </PageTransition>
    </BookingDialogProvider>
  );
};

export default Gallery;
