import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="glow-orb w-[500px] h-[500px] bg-primary top-[-10%] left-[-10%] animate-float animate-glow-pulse" />
      <div className="glow-orb w-[400px] h-[400px] bg-secondary bottom-[-10%] right-[-5%] animate-float-delayed animate-glow-pulse" />
      <div className="glow-orb w-[250px] h-[250px] bg-accent top-[40%] right-[20%] animate-float animate-glow-pulse" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <div className="glass rounded-2xl p-6 sm:p-10 lg:p-14 max-w-2xl mx-auto gradient-border">
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Hello, I'm
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <span className="gradient-text">Ariyan Islam</span>{" "}
            <span className="text-foreground">Raj</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            Full-Stack Developer passionate about building scalable web applications with modern technologies, clean architecture, and exceptional user experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Button variant="gradient" size="default" asChild>
              <a href="#portfolio">View My Work</a>
            </Button>
            <Button variant="outline" size="default" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
        </div>

        <a
          href="#services"
          className="inline-block mt-10 text-muted-foreground hover:text-foreground transition-colors animate-float opacity-0 animate-fade-in"
          style={{ animationDelay: "1.2s" }}
          aria-label="Scroll down"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
