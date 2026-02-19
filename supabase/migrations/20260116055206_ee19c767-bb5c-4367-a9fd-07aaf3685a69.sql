-- Create courses table for admin-managed courses
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  max_students INTEGER,
  level TEXT,
  price TEXT,
  highlights TEXT[],
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery_media table for admin-managed gallery
CREATE TABLE public.gallery_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_media ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses - public read, admin write
CREATE POLICY "Anyone can view active courses"
ON public.courses FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage courses"
ON public.courses FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for gallery_media - public read, admin write
CREATE POLICY "Anyone can view active gallery items"
ON public.gallery_media FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage gallery"
ON public.gallery_media FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gallery_media_updated_at
BEFORE UPDATE ON public.gallery_media
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets for course images and gallery media
INSERT INTO storage.buckets (id, name, public) VALUES ('course-images', 'course-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-media', 'gallery-media', true);

-- Storage policies for course-images bucket
CREATE POLICY "Anyone can view course images"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-images');

CREATE POLICY "Admins can upload course images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'course-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update course images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'course-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete course images"
ON storage.objects FOR DELETE
USING (bucket_id = 'course-images' AND has_role(auth.uid(), 'admin'::app_role));

-- Storage policies for gallery-media bucket
CREATE POLICY "Anyone can view gallery media"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery-media');

CREATE POLICY "Admins can upload gallery media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update gallery media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gallery media"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery-media' AND has_role(auth.uid(), 'admin'::app_role));