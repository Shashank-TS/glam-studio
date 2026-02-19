import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Crown, Heart, Camera, Star, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const serviceHighlights = [
  {
    icon: Crown,
    title: 'Bridal Makeup',
    description: 'We groom every bride to look her best—for the coy traditional bride and the bold modern bride alike.',
  },
  {
    icon: Sparkles,
    title: 'Party & Event',
    description: 'Glamorous looks crafted for special occasions, from galas to celebrations.',
  },
  {
    icon: Heart,
    title: 'Hair Styling',
    description: 'Precision cuts, stunning color, and styling that transforms your look.',
  },
  {
    icon: Camera,
    title: 'Portfolio Shoots',
    description: 'Editorial and portfolio makeup that captures the essence of fashion.',
  },
  {
    icon: Star,
    title: 'Skincare',
    description: 'Advanced treatments for radiant, glowing skin using premium products.',
  },
  {
    icon: Gem,
    title: 'Nail Artistry',
    description: 'Luxurious manicures and creative nail art for the finishing touch.',
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            Our Expertise
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            What We <span className="italic font-light text-gradient-gold">Do</span>
          </h2>
        </motion.div>

        {/* Service Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {serviceHighlights.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1), ease: 'easeOut' }}
              className="service-card group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Pricing Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <Link to="/services">
            <Button variant="gold" size="lg">
              View Our Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
