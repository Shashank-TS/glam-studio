import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CoursesCarousel from '@/components/CoursesCarousel';
import Experience from '@/components/Experience';
import ServicesSection from '@/components/ServicesSection';
import BeforeAfter from '@/components/BeforeAfter';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import FloatingBookButton from '@/components/FloatingBookButton';
import { BookingDialogProvider } from '@/components/BookingDialog';
import PageTransition from '@/components/PageTransition';

const Index = () => {
  return (
    <BookingDialogProvider>
      <PageTransition>
        <main className="min-h-screen">
          <Navigation />
          <Hero />
          <CoursesCarousel />
          <Experience />
          <ServicesSection />
          <BeforeAfter />
          <Testimonials />
          <Footer />
          <FloatingBookButton />
        </main>
      </PageTransition>
    </BookingDialogProvider>
  );
};

export default Index;
