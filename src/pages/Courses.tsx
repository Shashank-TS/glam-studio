import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingBookButton from '@/components/FloatingBookButton';
import { BookingDialogProvider, useBookingDialog } from '@/components/BookingDialog';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Clock, Users, Award, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import { supabase } from '@/integrations/supabase/client';

interface Course {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  max_students: number | null;
  level: string | null;
  price: string | null;
  highlights: string[] | null;
  image_url: string | null;
}

const CourseCard = ({ course, index, isInView }: { course: Course; index: number; isInView: boolean }) => {
  const { setOpen } = useBookingDialog();

  return (
    <motion.div
      key={course.id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="luxury-card overflow-hidden"
    >
      {course.image_url && (
        <div className="h-48 -mx-6 -mt-6 mb-6">
          <img 
            src={course.image_url} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-serif text-2xl text-foreground">
          {course.title}
        </h3>
        {course.price && (
          <span className="text-primary font-serif text-xl">{course.price}</span>
        )}
      </div>
      
      {course.description && (
        <p className="text-muted-foreground mb-6">{course.description}</p>
      )}
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {course.duration && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={16} className="text-primary" />
            {course.duration}
          </div>
        )}
        {course.max_students && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users size={16} className="text-primary" />
            {course.max_students} Max
          </div>
        )}
        {course.level && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award size={16} className="text-primary" />
            {course.level}
          </div>
        )}
      </div>

      {course.highlights && course.highlights.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm uppercase tracking-wider text-primary mb-3">What You'll Learn</h4>
          <ul className="grid grid-cols-2 gap-2">
            {course.highlights.map((highlight) => (
              <li key={highlight} className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="w-1 h-1 bg-primary rounded-full" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button 
        variant="gold" 
        className="w-full"
        onClick={() => setOpen(true, course.id, course.title)}
      >
        <Calendar size={16} className="mr-2" />
        Enroll Now
      </Button>
    </motion.div>
  );
};

const CoursesContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      setCourses(data || []);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
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
              Learn From The Best
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
              Our <span className="italic font-light text-gradient-gold">Courses</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Professional beauty training programs designed to elevate your skills and launch your career
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section ref={ref} className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>No courses available at the moment. Check back soon!</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {courses.map((course, index) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  index={index} 
                  isInView={isInView} 
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingBookButton />
    </main>
  );
};

const Courses = () => {
  return (
    <BookingDialogProvider>
      <PageTransition>
        <CoursesContent />
      </PageTransition>
    </BookingDialogProvider>
  );
};

export default Courses;
