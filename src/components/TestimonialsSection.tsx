import { useState, useEffect, useCallback, useRef } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager, TechCorp",
    text: "Ariyan delivered an exceptional product that exceeded our expectations. His attention to detail and technical expertise made the entire process seamless.",
    avatar: "SC",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "CEO, StartupX",
    text: "Working with Ariyan was a game-changer for our startup. He built our entire platform from scratch and it's been rock-solid since day one.",
    avatar: "JR",
    rating: 5,
  },
  {
    name: "Emily Nakamura",
    role: "Design Lead, CreativeHub",
    text: "Ariyan has a rare combination of design sensibility and engineering skill. He turned our Figma mockups into pixel-perfect, performant code.",
    avatar: "EN",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "CTO, DataFlow",
    text: "The quality of code Ariyan writes is outstanding — clean, well-documented, and maintainable. He's my go-to developer for complex projects.",
    avatar: "DK",
    rating: 5,
  },
];

const Card3D = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(0)" }}>
        {children}
      </div>
      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, hsl(var(--primary) / 0.12) 0%, transparent 60%)`
          ),
        }}
      />
    </motion.div>
  );
};

const FloatingParticle = ({ delay, x, y }: { delay: number; x: string; y: string }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 rounded-full"
    style={{
      left: x,
      top: y,
      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
    }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const TestimonialsSection = () => {
  const ref = useScrollReveal();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const isMobile = useIsMobile();
  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? 200 : -200,
      rotateY: d > 0 ? 45 : -45,
      opacity: 0,
      scale: 0.8,
      z: -200,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0,
    },
    exit: (d: number) => ({
      x: d > 0 ? -200 : 200,
      rotateY: d > 0 ? -45 : 45,
      opacity: 0,
      scale: 0.8,
      z: -200,
    }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative py-16 md:py-24 overflow-hidden">
      <div className="glow-orb w-[350px] h-[350px] bg-secondary top-[10%] right-[-5%] animate-float animate-glow-pulse" />
      <div className="glow-orb w-[250px] h-[250px] bg-primary bottom-[15%] left-[-3%] animate-float-delayed animate-glow-pulse" />

      {/* Floating particles */}
      <FloatingParticle delay={0} x="15%" y="20%" />
      <FloatingParticle delay={0.5} x="80%" y="30%" />
      <FloatingParticle delay={1} x="25%" y="70%" />
      <FloatingParticle delay={1.5} x="70%" y="65%" />
      <FloatingParticle delay={2} x="50%" y="15%" />
      <FloatingParticle delay={0.8} x="90%" y="50%" />
      <FloatingParticle delay={1.2} x="10%" y="45%" />
      <FloatingParticle delay={1.8} x="60%" y="80%" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="text-center mb-10 md:mb-14">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Client <span className="gradient-text">Testimonials</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Here's what people I've worked with have to say.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto" style={{ perspective: 1200 }}>
          {/* 3D Carousel */}
          <div className="relative min-h-[340px] flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  mass: 0.8,
                }}
                className="w-full group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card3D className="relative">
                  <div className="glass rounded-2xl p-8 md:p-10 gradient-border relative overflow-hidden">
                    {/* Ambient light effect */}
                    <div
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                      }}
                    />

                    {/* Quote icon with 3D depth */}
                    <motion.div
                      style={{ transform: "translateZ(30px)" }}
                      className="mb-4"
                    >
                      <Quote size={36} className="text-primary/30" />
                    </motion.div>

                    {/* Testimonial text */}
                    <motion.p
                      className="text-foreground text-base md:text-lg leading-relaxed mb-6 italic relative z-10"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      "{t.text}"
                    </motion.p>

                    {/* Star rating */}
                    <div className="flex gap-1 mb-6" style={{ transform: "translateZ(25px)" }}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.08, type: "spring" }}
                        >
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Author info */}
                    <div
                      className="flex items-center gap-4 relative z-10"
                      style={{ transform: "translateZ(15px)" }}
                    >
                      <motion.div
                        className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0 shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {t.avatar}
                      </motion.div>
                      <div>
                        <p className="font-semibold text-foreground text-lg">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </div>

                    {/* Bottom gradient line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{
                        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    />
                  </div>
                </Card3D>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side preview cards */}
          <div className="hidden lg:flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none px-0" style={{ perspective: 800 }}>
            {[-1, 1].map((offset) => {
              const idx = (current + offset + testimonials.length) % testimonials.length;
              return (
                <motion.div
                  key={`preview-${offset}`}
                  className="w-48 glass-subtle rounded-xl p-4 opacity-30 pointer-events-auto cursor-pointer"
                  style={{
                    transform: `translateX(${offset * -20}px) rotateY(${offset * -15}deg) translateZ(-50px) scale(0.85)`,
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{ opacity: 0.6, scale: 0.9 }}
                  onClick={() => {
                    setDirection(offset);
                    setCurrent(idx);
                  }}
                >
                  <Quote size={14} className="text-primary/30 mb-2" />
                  <p className="text-xs text-muted-foreground line-clamp-3 italic">
                    "{testimonials[idx].text}"
                  </p>
                  <p className="text-xs text-foreground/60 mt-2 font-medium">
                    {testimonials[idx].name}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <motion.button
              onClick={() => paginate(-1)}
              className="glass w-12 h-12 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1, rotateZ: -10 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={22} />
            </motion.button>

            <div className="flex gap-2.5 items-center">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className="relative"
                  whileHover={{ scale: 1.3 }}
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  <motion.div
                    className="rounded-full"
                    animate={{
                      width: i === current ? 28 : 10,
                      height: 10,
                      background:
                        i === current
                          ? "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))"
                          : "hsl(var(--muted-foreground) / 0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  {i === current && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
                      }}
                      animate={{ opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={() => paginate(1)}
              className="glass w-12 h-12 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1, rotateZ: 10 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={22} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
