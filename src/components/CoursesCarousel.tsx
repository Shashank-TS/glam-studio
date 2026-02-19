import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Clock, GraduationCap } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

interface Course {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  level: string | null;
  price: string | null;
  image_url: string | null;
}

const CoursesCarousel = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title, description, duration, level, price, image_url')
        .eq('is_active', true)
        .limit(6);

      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        setCourses(data || []);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  if (loading || courses.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="w-full py-8"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <span className="text-primary uppercase tracking-[0.2em] text-xs font-medium">
            Featured Courses
          </span>
        </div>
        
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {courses.map((course) => (
              <CarouselItem key={course.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <motion.div
                  className="glass-card overflow-hidden h-full group cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => navigate('/courses')}
                >
                  {course.image_url && (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={course.image_url}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      {course.price && (
                        <span className="absolute bottom-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {course.price}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    {course.description && (
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {course.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {course.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </span>
                      )}
                      {course.level && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" />
                          {course.level}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        <div className="text-center mt-6">
          <Link to="/courses">
            <Button variant="outline" size="sm" className="border-primary/50 hover:bg-primary/10">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CoursesCarousel;
