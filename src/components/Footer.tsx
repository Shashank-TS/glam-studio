import { motion } from 'framer-motion';
import { Instagram, MapPin, Mail, Phone, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const WHATSAPP_NUMBER = '919353653315';
const EMAIL = 'theglamstudio09blr@gmail.com';
const ADDRESS = '1st floor, ML Complex, 367, 60 Feet Rd, Bhadrappa Layout, MEI Layout, Bagalakunte, Bengaluru, Karnataka 560073';
const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=1st+floor,+ML+Complex,+367,+60+Feet+Rd,+Bhadrappa+Layout,+MEI+Layout,+Bagalakunte,+Bengaluru,+Karnataka+560073';
const INSTAGRAM_ID = 'theglamstudio.blr';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { isAdmin } = useAuth();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to our circle",
        description: "You'll receive our latest updates and exclusive offers.",
      });
      setEmail('');
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello! I would like to inquire about your services.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${EMAIL}`;
  };

  return (
    <footer className="bg-charcoal text-cream py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-3xl mb-1">
              SP <span className="italic font-light text-gradient-gold">Academy</span>
            </h3>
            <p className="text-xs tracking-[0.15em] text-primary/70 uppercase mb-4">
              Beauty Salon | Makeup Studio | Nails
            </p>
            <p className="text-cream/60 leading-relaxed mb-6">
              Your premier destination for professional beauty training. Master the art of beauty.
            </p>
            {/* WhatsApp Button */}
            <Button
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </Button>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="uppercase tracking-[0.2em] text-sm font-medium mb-6 flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              Visit Us
            </h4>
            <address className="text-cream/60 not-italic leading-relaxed text-sm">
              {ADDRESS}
            </address>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-primary hover:text-primary/80 transition-colors text-sm uppercase tracking-wide"
            >
              Get Directions →
            </a>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="uppercase tracking-[0.2em] text-sm font-medium mb-6 flex items-center gap-2">
              <Phone size={16} className="text-primary" />
              Contact
            </h4>
            <div className="text-cream/60 space-y-3">
              <a 
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone size={14} />
                +{WHATSAPP_NUMBER}
              </a>
              <button
                onClick={handleEmailClick}
                className="flex items-center gap-2 hover:text-primary transition-colors text-left"
              >
                <Mail size={14} />
                {EMAIL}
              </button>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="uppercase tracking-[0.2em] text-sm font-medium mb-6 flex items-center gap-2">
              <Mail size={16} className="text-primary" />
              Stay Connected
            </h4>
            <p className="text-cream/60 mb-4 text-sm">
              Exclusive offers and beauty insights delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/40 focus:border-primary"
                required
              />
              <Button type="submit" variant="gold" size="default">
                Join
              </Button>
            </form>
            {/* Social */}
            <div className="mt-6">
              <a
                href={`https://instagram.com/${INSTAGRAM_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cream/60 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
                <span className="text-sm">@{INSTAGRAM_ID}</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-cream/40 text-sm">
          <p>© 2024 SP Academy. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
            {isAdmin && (
              <Link to="/admin" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Settings size={14} />
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;