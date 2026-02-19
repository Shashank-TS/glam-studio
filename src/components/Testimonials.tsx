import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "SP Academy transformed not just my skills, but my entire career. Every session feels like a masterclass in beauty.",
    author: "Alexandra M.",
    title: "Makeup Artist Graduate",
    rating: 5,
    initials: "AM",
  },
  {
    quote: "The attention to detail is unmatched. The instructors truly listen and help you develop your unique style.",
    author: "Jonathan K.",
    title: "Nail Technician Graduate",
    rating: 5,
    initials: "JK",
  },
  {
    quote: "I've never felt more confident in my abilities. The team's expertise in color theory is extraordinary.",
    author: "Victoria S.",
    title: "Salon Owner",
    rating: 5,
    initials: "VS",
  },
  {
    quote: "From the moment you walk in, you know you're somewhere special. This isn't just a school—it's an experience.",
    author: "Michelle T.",
    title: "Beauty Entrepreneur",
    rating: 5,
    initials: "MT",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            What Our <span className="italic font-light text-gradient-gold">Students Say</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="max-w-5xl mx-auto"
        >
          {/* Main testimonial card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 lg:p-16 shadow-lg relative overflow-hidden">
                  {/* Large quote icon */}
                  <Quote className="absolute top-6 left-6 w-16 h-16 text-primary/10" />
                  <Quote className="absolute bottom-6 right-6 w-16 h-16 text-primary/10 rotate-180" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center mb-6 shadow-lg ring-4 ring-primary/20">
                      <span className="text-2xl font-serif font-bold text-primary-foreground">
                        {testimonials[current].initials}
                      </span>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-primary fill-primary"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed mb-8 max-w-3xl">
                      "{testimonials[current].quote}"
                    </p>

                    {/* Author info */}
                    <div className="space-y-1">
                      <p className="text-primary font-semibold text-lg">
                        {testimonials[current].author}
                      </p>
                      <p className="text-muted-foreground text-sm uppercase tracking-wider">
                        {testimonials[current].title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows - positioned on the sides */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 text-foreground hover:text-primary transition-all duration-300 shadow-lg group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 p-3 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 text-foreground hover:text-primary transition-all duration-300 shadow-lg group"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'bg-primary w-8' 
                    : 'bg-border hover:bg-primary/50 w-2'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-border/50"
          >
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-primary font-bold">500+</p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">Happy Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-primary font-bold">4.9</p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-primary font-bold">10+</p>
              <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">Years Experience</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;