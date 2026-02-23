import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  location?: string;
  role?: string;
  quote?: string;
  text?: string;
  image?: string;
}

const TestimonialSlider = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPaused = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      setFading(true);
      setTimeout(() => {
        setCurrent(index);
        setFading(false);
      }, 300);
    },
    []
  );

  const next = useCallback(() => goTo((current + 1) % testimonials.length), [current, testimonials.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + testimonials.length) % testimonials.length), [current, testimonials.length, goTo]);

  // Auto-scroll every 6s, pause on hover
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!isPaused.current) {
        goTo((current + 1) % testimonials.length);
      }
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, testimonials.length, goTo]);

  // Swipe support
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStart.current = null;
  };

  const t = testimonials[current];
  const displayQuote = t.quote || t.text || "";

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`glass-card-strong p-8 sm:p-12 text-center transition-opacity duration-300 ease-in-out ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Quote className="mx-auto mb-6 text-accent/60" size={36} />

        {t.image && (
          <img
            src={t.image}
            alt={t.name}
            className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-accent/30"
          />
        )}

        <p className="text-lg sm:text-xl font-display italic leading-relaxed mb-8">
          "{displayQuote}"
        </p>
        <div>
          <p className="font-semibold">{t.name}</p>
          {(t.location || t.role) && (
            <p className="text-sm text-foreground/60">{t.location || t.role}</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={prev} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-accent w-6" : "bg-white/30"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition" aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
