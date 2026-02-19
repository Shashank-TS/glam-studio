import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BookingDialogProvider } from '@/components/BookingDialog';
import PageTransition from '@/components/PageTransition';

import lookbook1 from '@/assets/lookbook-1.jpg';
import lookbook2 from '@/assets/lookbook-2.jpg';
import lookbook3 from '@/assets/lookbook-3.jpg';
import lookbook4 from '@/assets/lookbook-4.jpg';
import lookbook5 from '@/assets/lookbook-5.jpg';
import lookbook6 from '@/assets/lookbook-6.jpg';

const serviceCategories = [
  {
    name: 'Bridal',
    description: 'Master the art of bridal beauty with our comprehensive bridal makeup and styling courses. Learn traditional and contemporary techniques.',
    image: lookbook1,
    services: [
      'Bridal Sweat Resident Makeup',
      'Bridal Hairstyle',
      'Saree Pre Pleating',
      'Box Folding',
      'Saree Draping',
    ],
  },
  {
    name: 'Hair',
    description: 'From precision cuts to advanced coloring techniques, our hair courses cover everything you need to become a professional stylist.',
    image: lookbook2,
    services: [
      'Precision Cut & Style',
      'Balayage / Highlights',
      'Full Color Treatment',
      'Keratin Smoothing',
      'Bridal Hair Styling',
      'Blowout & Finish',
    ],
  },
  {
    name: 'Skin',
    description: 'Learn advanced skincare treatments and techniques to help clients achieve their best skin. Includes facial therapies and modern treatments.',
    image: lookbook3,
    services: [
      'Signature Facial',
      'HydraFacial MD',
      'Chemical Peel',
      'Microdermabrasion',
      'LED Light Therapy',
      'Anti-Aging Treatment',
    ],
  },
  {
    name: 'Nails',
    description: 'Become a nail art expert with our nail technician courses. From manicures to intricate nail art, master all techniques.',
    image: lookbook4,
    services: [
      'Luxury Manicure',
      'Spa Pedicure',
      'Gel Polish Application',
      'Nail Art (per nail)',
      'Acrylic Full Set',
      'Paraffin Treatment',
    ],
  },
  {
    name: 'Makeup',
    description: 'Transform faces with our professional makeup courses. Learn editorial, party, and special occasion makeup from industry experts.',
    image: lookbook5,
    services: [
      'Bridal Makeup',
      'Party Makeup',
      'Editorial Makeup',
      'Makeup Lesson',
      'Airbrush Makeup',
      'Engagement Makeup',
    ],
  },
];

const ServiceSection = ({ 
  category, 
  index, 
  isInView 
}: { 
  category: typeof serviceCategories[0]; 
  index: number;
  isInView: boolean;
}) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 * index, ease: 'easeOut' }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
    >
      {/* Image */}
      <div className="flex-1 w-full">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl luxury-card">
          <img
            src={category.image}
            alt={`${category.name} services at SP Academy`}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 w-full">
        <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-2 block">
          {category.name} Training
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
          {category.name} <span className="italic font-light text-gradient-gold">Services</span>
        </h2>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {category.description}
        </p>
        <ul className="space-y-3">
          {category.services.map((service) => (
            <li 
              key={service}
              className="flex items-center gap-3 text-foreground"
            >
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              {service}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <BookingDialogProvider>
      <PageTransition>
        <main className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-card">
          <div className="container mx-auto px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block"
            >
              What We Offer
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground"
            >
              Our <span className="italic font-light text-gradient-gold">Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-muted-foreground max-w-2xl mx-auto"
            >
              Discover our comprehensive range of professional beauty training programs, each designed to elevate your skills and launch your career.
            </motion.p>
          </div>
        </section>

        {/* Services Sections */}
        <section ref={ref} className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6">
            <div className="space-y-24 lg:space-y-32">
              {serviceCategories.map((category, index) => (
                <ServiceSection 
                  key={category.name}
                  category={category}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
        </main>
      </PageTransition>
    </BookingDialogProvider>
  );
};

export default Services;