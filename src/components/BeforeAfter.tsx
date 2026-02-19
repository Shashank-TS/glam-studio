import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';

// South Indian transformation images
const comparisons = [
  {
    before: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&h=800&fit=crop',
    after: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?w=600&h=800&fit=crop',
    title: 'South Indian Bridal',
  },
  {
    before: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&h=800&fit=crop',
    after: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=600&h=800&fit=crop',
    title: 'Traditional Saree Look',
  },
  {
    before: 'https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=600&h=800&fit=crop',
    after: 'https://images.unsplash.com/photo-1610173826608-e96a08c34b12?w=600&h=800&fit=crop',
    title: 'Festive Glam',
  },
];

interface ComparisonSliderProps {
  before: string;
  after: string;
  title: string;
}

const ComparisonSlider = ({ before, after, title }: ComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  return (
    <div className="relative group">
      <div
        ref={containerRef}
        className="relative aspect-[3/4] overflow-hidden rounded-lg cursor-ew-resize select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
      >
        {/* After Image (Background) */}
        <img
          src={after}
          alt="After transformation"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={before}
            alt="Before transformation"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary border-4 border-background flex items-center justify-center cursor-grab active:cursor-grabbing shadow-gold"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
          >
            <div className="flex items-center gap-1">
              <div className="w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-background" />
              <div className="w-0 h-0 border-y-4 border-y-transparent border-l-4 border-l-background" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-background/80 rounded text-xs uppercase tracking-wider text-foreground">
          Before
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-primary/90 rounded text-xs uppercase tracking-wider text-foreground">
          After
        </div>
      </div>

      {/* Title */}
      <p className="text-center mt-4 font-serif text-lg text-foreground">{title}</p>
    </div>
  );
};

const BeforeAfter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="transformations" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            Transformations
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground">
            Before & <span className="italic font-light text-gradient-gold">After</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Drag the slider to reveal the magic of our transformations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {comparisons.map((comparison, index) => (
            <motion.div
              key={comparison.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1), ease: 'easeOut' }}
            >
              <ComparisonSlider {...comparison} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfter;