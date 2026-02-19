import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2, MessageCircle, Check } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const WHATSAPP_NUMBER = '919353653315';

interface Course {
  id: string;
  title: string;
}

interface BookingFormProps {
  selectedCourse?: { id: string; title: string } | null;
}

const BookingForm = ({ selectedCourse }: BookingFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');
  const [preferredDate, setPreferredDate] = useState<Date>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .eq('is_active', true);

      if (!error && data) {
        setCourses(data);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      setCourse(selectedCourse.id);
    }
  }, [selectedCourse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !course || !preferredDate) {
      toast({
        title: "Please complete all required fields",
        description: "Name, email, phone, course, and preferred date are required.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const selectedCourseData = courses.find(c => c.id === course);
      const courseTitle = selectedCourseData?.title || course;
      
      // Insert booking into database
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          name,
          email,
          phone,
          service: `Course: ${courseTitle}`,
          preferred_date: format(preferredDate, 'yyyy-MM-dd'),
          preferred_time: '10:00',
          message,
          status: 'pending',
        });

      if (bookingError) {
        console.error('Booking error:', bookingError);
        throw bookingError;
      }

      // Send notification
      await supabase.functions.invoke('send-booking-notification', {
        body: {
          name,
          email,
          phone,
          service: `Course Application: ${courseTitle}`,
          date: format(preferredDate, 'PPP'),
          message,
        },
      });

      // Build WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `*New Course Application*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Phone:* ${phone}\n` +
        `*Course:* ${courseTitle}\n` +
        `*Preferred Date:* ${format(preferredDate, 'PPP')}\n` +
        `${message ? `*Message:* ${message}` : ''}`
      );
      
      // Open WhatsApp with the application details
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, '_blank');

      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Your application has been sent via WhatsApp.",
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-serif text-2xl text-foreground mb-2">Application Received!</h3>
        <p className="text-muted-foreground">
          Thank you for applying to our course. Our team will contact you shortly to discuss enrollment details and next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Select Course *</Label>
        <Select value={course} onValueChange={setCourse}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a course" />
          </SelectTrigger>
          <SelectContent className="z-[9999]" position="popper" sideOffset={4}>
            {courses.length === 0 ? (
              <div className="py-2 px-3 text-sm text-muted-foreground">No courses available</div>
            ) : (
              courses.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.title}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Preferred Start Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !preferredDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {preferredDate ? format(preferredDate, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={preferredDate}
              onSelect={setPreferredDate}
              disabled={(date) => date < new Date()}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Additional Message (Optional)</Label>
        <Textarea
          id="message"
          placeholder="Any questions or special requirements?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
      </div>

      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <MessageCircle className="mr-2 h-4 w-4" />
            Submit Application via WhatsApp
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to receive communications regarding your course enrollment.
      </p>
    </form>
  );
};

export default BookingForm;
