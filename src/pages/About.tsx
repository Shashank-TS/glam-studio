import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { BookingDialogProvider } from '@/components/BookingDialog';
import PageTransition from '@/components/PageTransition';
import { Sparkles, Heart, Award, Users } from 'lucide-react';

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

const values = [
  {
    icon: Sparkles,
    title: 'Excellence',
    description: 'We strive for perfection in every service, ensuring you leave feeling your absolute best.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Our love for beauty and artistry drives us to continuously innovate and improve.',
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'We use only premium products and the latest techniques to deliver exceptional results.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building lasting relationships with our clients is at the heart of everything we do.',
  },
];

const About = () => {
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const storyRef = useRef(null);
  const isTeamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const isValuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const isStoryInView = useInView(storyRef, { once: true, margin: '-100px' });

  return (
    <BookingDialogProvider>
      <PageTransition>
        <main className="min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                About Us
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Welcome to <span className="italic font-light text-gradient-gold">SP Academy</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Your premier destination for professional beauty training. 
                We believe in empowering aspiring beauty professionals through comprehensive education and hands-on expertise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              ref={storyRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                  Our Story
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                  A Journey of <span className="italic font-light text-gradient-gold">Passion</span>
                </h2>
              </div>
              <div className="prose prose-lg mx-auto text-center text-muted-foreground">
                <p className="mb-6 leading-relaxed">
                  SP Academy was founded with a vision to create a space where aspiring beauty professionals can master their craft. 
                  Located in the heart of Bangalore, our academy has become a premier training destination for those seeking 
                  exceptional beauty education and career-transforming experiences.
                </p>
                <p className="leading-relaxed">
                  Our team of skilled professionals brings together years of experience and a shared 
                  commitment to excellence. We continuously evolve with the latest trends and techniques, 
                  ensuring our clients always receive the best in beauty and styling.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              ref={valuesRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="text-center mb-16"
            >
              <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                Our Values
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                What We <span className="italic font-light text-gradient-gold">Stand For</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.12 * (index + 1), ease: 'easeOut' }}
                  className="text-center p-6 luxury-card"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Team */}
        <section id="team" className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              ref={teamRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="text-center mb-16"
            >
              <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
                Our Artists
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                The <span className="italic font-light text-gradient-gold">Team</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.12 * (index + 1), ease: 'easeOut' }}
                  className="group luxury-card"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-lg mb-6 bg-card border border-border/50">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role} at SP Academy`}
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

        <Footer />
        </main>
      </PageTransition>
    </BookingDialogProvider>
  );
};

export default About;
