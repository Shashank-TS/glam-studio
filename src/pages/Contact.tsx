import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingBookButton from '@/components/FloatingBookButton';
import { BookingDialogProvider } from '@/components/BookingDialog';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PageTransition from '@/components/PageTransition';

const ADDRESS = '1st floor, ML Complex, 367, 60 Feet Rd, Bhadrappa Layout, MEI Layout, Bagalakunte, Bengaluru, Karnataka 560073';
const PHONE_NUMBER = '+919353653315';
const PHONE_DISPLAY = '+91 93536 53315';
const EMAIL = 'theglamstudio09blr@gmail.com';
const MAPS_LINK = 'https://maps.google.com/?q=1st+floor,+ML+Complex,+367,+60+Feet+Rd,+Bhadrappa+Layout,+MEI+Layout,+Bagalakunte,+Bengaluru,+Karnataka+560073';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [ADDRESS],
    href: MAPS_LINK,
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: [PHONE_DISPLAY],
    href: `tel:${PHONE_NUMBER}`,
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [EMAIL],
    href: `mailto:${EMAIL}`,
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });

  const handleSendMessage = () => {
    const message = encodeURIComponent(`Hi, I'm ${formData.name}. ${formData.message}`);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank');
  };

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
                  Get In Touch
                </span>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
                  Contact <span className="italic font-light text-gradient-gold">Us</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  We'd love to hear from you. Reach out for appointments, inquiries, or just to say hello.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section ref={ref} className="py-16 lg:py-24 bg-card">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.9 }}
                >
                  <h2 className="font-serif text-3xl text-foreground mb-8">
                    Let's <span className="italic text-gradient-gold">Connect</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                      {contactInfo.map((info, index) => {
                        const CardWrapper = info.href ? 'a' : 'div';
                        const cardProps = info.href ? { 
                          href: info.href, 
                          target: info.href.startsWith('http') ? '_blank' : undefined,
                          rel: info.href.startsWith('http') ? 'noopener noreferrer' : undefined 
                        } : {};
                        
                        return (
                          <motion.div
                            key={info.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                          >
                            <CardWrapper
                              {...cardProps}
                              className={`luxury-card block ${info.href ? 'cursor-pointer hover:border-primary/50 transition-colors' : ''}`}
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-primary/10">
                                  <info.icon size={20} className="text-primary" />
                                </div>
                                <h3 className="font-medium text-foreground">{info.title}</h3>
                              </div>
                              <div className="space-y-1">
                                {info.details.map((detail) => (
                                  <p key={detail} className="text-muted-foreground text-sm">{detail}</p>
                                ))}
                              </div>
                            </CardWrapper>
                          </motion.div>
                        );
                      })}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.2 }}
                >
                  <div className="luxury-card">
                    <h2 className="font-serif text-2xl text-foreground mb-6">Send a Message via WhatsApp</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Your Name</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your name"
                          className="bg-background/50 border-border/50 focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us how we can help..."
                          rows={5}
                          className="bg-background/50 border-border/50 focus:border-primary resize-none"
                        />
                      </div>
                      <Button 
                        type="button" 
                        variant="gold" 
                        size="lg" 
                        className="w-full" 
                        onClick={handleSendMessage}
                        disabled={!formData.name || !formData.message}
                      >
                        <MessageCircle size={16} className="mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <Footer />
          <FloatingBookButton />
        </main>
      </PageTransition>
    </BookingDialogProvider>
  );
};

export default Contact;
