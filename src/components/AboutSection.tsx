import { Code, Palette, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { lazy, Suspense } from "react";

const AboutCube = lazy(() => import("@/components/AboutCube"));

const cards = [
  {
    icon: Code,
    title: "Development",
    description: "Building robust, scalable applications with modern frameworks and clean architecture.",
  },
  {
    icon: Palette,
    title: "Design",
    description: "Creating stunning interfaces that blend aesthetics with seamless user experience.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing every pixel and millisecond to deliver blazing-fast experiences.",
  },
];

const AboutSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="about" className="relative py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6" ref={ref}>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm Ariyan Islam Raj — a passionate full-stack developer who loves turning ideas into polished, high-performance web applications that users enjoy.
          </p>
        </div>

        {/* 3D Cube */}
        <div className="max-w-xs mx-auto mb-10 md:mb-14 opacity-0 animate-scale-in" style={{ animationDelay: "0.1s" }}>
          <Suspense fallback={<div className="w-full h-[280px] md:h-[320px] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>}>
            <AboutCube />
          </Suspense>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="glass rounded-2xl p-8 gradient-border group hover:shadow-glass-strong transition-all duration-500 hover:-translate-y-2 opacity-0 animate-slide-up"
              style={{ animationDelay: `${0.2 + i * 0.15}s` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:shadow-glass-glow transition-shadow duration-500">
                <card.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
