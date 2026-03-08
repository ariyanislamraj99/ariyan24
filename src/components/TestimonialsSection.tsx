import { useState, useEffect, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager, TechCorp",
    text: "Ariyan delivered an exceptional product that exceeded our expectations. His attention to detail and technical expertise made the entire process seamless.",
    avatar: "SC",
  },
  {
    name: "James Rodriguez",
    role: "CEO, StartupX",
    text: "Working with Ariyan was a game-changer for our startup. He built our entire platform from scratch and it's been rock-solid since day one.",
    avatar: "JR",
  },
  {
    name: "Emily Nakamura",
    role: "Design Lead, CreativeHub",
    text: "Ariyan has a rare combination of design sensibility and engineering skill. He turned our Figma mockups into pixel-perfect, performant code.",
    avatar: "EN",
  },
  {
    name: "David Kim",
    role: "CTO, DataFlow",
    text: "The quality of code Ariyan writes is outstanding — clean, well-documented, and maintainable. He's my go-to developer for complex projects.",
    avatar: "DK",
  },
];

const TestimonialsSection = () => {
  const ref = useScrollReveal();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0, scale: 0.95 }),
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      <div className="glow-orb w-[350px] h-[350px] bg-secondary top-[10%] right-[-5%] animate-float animate-glow-pulse" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here's what people I've worked with have to say.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Carousel */}
          <div className="relative min-h-[280px] flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="glass rounded-2xl p-8 md:p-10 gradient-border w-full"
              >
                <Quote size={32} className="text-primary/40 mb-4" />
                <p className="text-foreground text-base md:text-lg leading-relaxed mb-8 italic">
                  "{testimonials[current].text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                    {testimonials[current].avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonials[current].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => paginate(-1)}
              className="glass w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "gradient-bg w-7"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="glass w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
