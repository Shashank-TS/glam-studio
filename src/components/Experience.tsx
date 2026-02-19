import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import salonInterior from '@/assets/salon-interior.jpg';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
              The Experience
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
              Where Craft Meets
              <br />
              <span className="italic font-light text-gradient-gold">Intention</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                At Lumière Atelier, we believe beauty is deeply personal. Our approach 
                begins with understanding—your lifestyle, your vision, your essence.
              </p>
              <p>
                Each service is a collaboration between artist and canvas, crafted with 
                precision and delivered in an atmosphere of refined tranquility. From the 
                moment you arrive, every detail is designed to elevate your experience.
              </p>
              <p>
                We use only the finest products, sourced from the world's most respected 
                beauty houses, ensuring results that are as enduring as they are beautiful.
              </p>
            </div>
            {/* Signature */}
            <div className="mt-10 pt-8 border-t border-border">
              <p className="font-serif italic text-lg text-foreground">
                "Beauty is not about perfection. It's about expression."
              </p>
              <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wide">
                — Isabelle Laurent, Founder
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden shadow-medium">
              <img
                src={salonInterior}
                alt="Lumière Atelier luxury salon interior with modern design"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative gold elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary/40 rounded-lg hidden lg:block" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/10 rounded-lg hidden lg:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;