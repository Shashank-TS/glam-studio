import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingDialog } from './BookingDialog';

const FloatingBookButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { setOpen } = useBookingDialog();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            variant="gold"
            size="lg"
            className="shadow-gold rounded-full px-6 gap-2"
            onClick={() => setOpen(true)}
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingBookButton;
