import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useBookingDialog } from './BookingDialog';
import { Link } from 'react-router-dom';
import heroModel from '@/assets/hero-model.jpg';
import { Crown, Sparkles, Scissors, Palette } from 'lucide-react';


const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { setOpen } = useBookingDialog();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <img
          src={heroModel}
          alt="Luxury beauty salon hero"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <motion.div 
          className="container mx-auto px-6"
          style={{ y: textY }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            {/* Left Content */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              {/* Tagline */}
              <motion.span 
                className="inline-block text-primary uppercase tracking-[0.3em] text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Professional Beauty Training
              </motion.span>

              {/* Logo/Brand */}
              <motion.h1 
                className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                SP
                <br />
                <span className="italic font-light text-gradient-gold">Academy</span>
              </motion.h1>
              <p className="text-xs md:text-sm tracking-[0.2em] text-primary/80 uppercase mt-2">
                Beauty Salon | Makeup Studio | Nails
              </p>
              
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              >
                Master the art of beauty with our professional training courses. Learn bridal, party makeup & complete beauty techniques from industry experts.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              >
                <Button
                  variant="gold"
                  size="xl"
                  onClick={() => setOpen(true)}
                  className="shadow-gold text-lg px-10"
                >
                  Book Now
                </Button>
                <Link to="/services">
                  <Button
                    variant="outline"
                    size="xl"
                    className="border-primary/50 hover:bg-primary/10 text-lg px-10 w-full sm:w-auto"
                  >
                    View Our Services
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Quick Links */}
            <motion.div 
              className="hidden lg:flex flex-col gap-4"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            >
              {[
                { label: 'Bridal Makeup', icon: Crown },
                { label: 'Party Glam', icon: Sparkles },
                { label: 'Hair Styling', icon: Scissors },
                { label: 'Nail Art', icon: Palette },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="glass-card px-6 py-4 flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform duration-300 min-w-[200px]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <item.icon className="h-6 w-6 text-primary" />
                  <span className="font-serif text-foreground tracking-wide">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2"
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;