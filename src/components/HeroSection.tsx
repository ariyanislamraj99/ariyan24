import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="glow-orb w-[600px] h-[600px] bg-primary top-[-10%] left-[-10%] animate-float animate-glow-pulse" />
      <div className="glow-orb w-[500px] h-[500px] bg-secondary bottom-[-10%] right-[-5%] animate-float-delayed animate-glow-pulse" />
      <div className="glow-orb w-[300px] h-[300px] bg-accent top-[40%] right-[20%] animate-float animate-glow-pulse" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="glass rounded-2xl p-8 md:p-16 max-w-3xl mx-auto gradient-border">
          <p className="text-sm md:text-base text-muted-foreground tracking-widest uppercase mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Hello, I'm
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <span className="gradient-text">Ariyan Islam</span>{" "}
            <span className="text-foreground">Raj</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            Full-Stack Developer passionate about building scalable web applications with modern technologies, clean architecture, and exceptional user experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Button variant="gradient" size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </div>

        <a
          href="#about"
          className="inline-block mt-16 text-muted-foreground hover:text-foreground transition-colors animate-float opacity-0 animate-fade-in"
          style={{ animationDelay: "1.2s" }}
          aria-label="Scroll down"
        >
          <ArrowDown size={28} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
