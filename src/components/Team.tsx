import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import stylist1 from '@/assets/stylist-1.jpg';
import stylist2 from '@/assets/stylist-2.jpg';
import stylist3 from '@/assets/stylist-3.jpg';

const teamMembers = [
  {
    name: 'Sophia Chen',
    role: 'Creative Director',
    specialty: 'Precision Cutting',
    image: stylist1,
  },
  {
    name: 'Marcus Rivera',
    role: 'Senior Colorist',
    specialty: 'Balayage & Color Correction',
    image: stylist2,
  },
  {
    name: 'Emma Laurent',
    role: 'Lead Aesthetician',
    specialty: 'Advanced Skincare',
    image: stylist3,
  },
];

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            Our Artists
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            The <span className="italic font-light text-gradient-gold">Team</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.12 * (index + 1), ease: 'easeOut' }}
              className="group luxury-card"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg mb-6 bg-card border border-border/50">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role} at Lumière Atelier`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="text-center">
                <h3 className="font-serif text-2xl text-foreground mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary uppercase tracking-[0.2em] text-xs font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm">{member.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;