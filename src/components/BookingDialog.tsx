import { createContext, useContext, useState, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import BookingForm from './BookingForm';

interface BookingDialogContextType {
  open: boolean;
  setOpen: (open: boolean, courseId?: string, courseTitle?: string) => void;
  selectedCourse: { id: string; title: string } | null;
}

const BookingDialogContext = createContext<BookingDialogContextType | undefined>(undefined);

export const useBookingDialog = () => {
  const context = useContext(BookingDialogContext);
  if (!context) {
    throw new Error('useBookingDialog must be used within BookingDialogProvider');
  }
  return context;
};

export const BookingDialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpenState] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<{ id: string; title: string } | null>(null);

  const setOpen = (isOpen: boolean, courseId?: string, courseTitle?: string) => {
    if (isOpen && courseId && courseTitle) {
      setSelectedCourse({ id: courseId, title: courseTitle });
    } else if (!isOpen) {
      setSelectedCourse(null);
    }
    setOpenState(isOpen);
  };

  return (
    <BookingDialogContext.Provider value={{ open, setOpen, selectedCourse }}>
      {children}
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-center">
              Course Application
            </DialogTitle>
          </DialogHeader>
          <BookingForm selectedCourse={selectedCourse} />
        </DialogContent>
      </Dialog>
    </BookingDialogContext.Provider>
  );
};
