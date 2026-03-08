import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import profileAvatar from "@/assets/profile-avatar.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative py-16 md:py-24 overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-primary top-[-10%] left-[-10%] animate-float animate-glow-pulse" />
      <div className="glow-orb w-[400px] h-[400px] bg-secondary bottom-[-10%] right-[-5%] animate-float-delayed animate-glow-pulse" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="glass rounded-2xl gradient-border overflow-hidden">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Image side */}
            <div className="md:col-span-2 relative">
              <div className="aspect-[3/4] md:aspect-auto md:h-full">
                <img
                  src={profileAvatar}
                  alt="Ariyan Islam Raj"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background/80 via-transparent to-transparent" />
              </div>
            </div>

            {/* Bio side */}
            <div className="md:col-span-3 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <p className="text-xs tracking-widest uppercase text-primary font-medium mb-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                About Me
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <span className="gradient-text">Ariyan Islam</span>{" "}
                <span className="text-foreground">Raj</span>
              </h1>
              <p className="text-sm text-primary font-medium mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                Full-Stack Developer &bull; Bangladesh
              </p>

              <div className="space-y-3 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I'm a passionate full-stack developer with expertise in building scalable web applications using modern technologies. With a strong foundation in both frontend and backend development, I create seamless digital experiences that users love.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  My journey in software development started with a curiosity for problem-solving and has evolved into a career focused on clean architecture, performance optimization, and intuitive design. I thrive on turning complex ideas into elegant, production-ready solutions.
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                {[
                  { value: "3+", label: "Years Experience" },
                  { value: "50+", label: "Projects Done" },
                  { value: "30+", label: "Happy Clients" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center glass-subtle rounded-xl py-3 px-2">
                    <p className="text-lg sm:text-xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-in" style={{ animationDelay: "0.7s" }}>
                <Button variant="gradient" size="default" asChild>
                  <a href="#portfolio">
                    View My Work
                    <ArrowRight size={14} className="ml-2" />
                  </a>
                </Button>
                <Button variant="outline" size="default" asChild>
                  <a href="#contact">
                    Get In Touch
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
