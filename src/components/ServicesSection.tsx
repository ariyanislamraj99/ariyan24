import { Code, Palette, Zap, Globe, Smartphone, Server } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Building modern, responsive websites and web applications using React, Next.js, and cutting-edge technologies.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Creating seamless mobile experiences with responsive layouts and progressive web app capabilities.",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Developing robust APIs, databases, and server-side logic with Node.js, Express, and cloud services.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Designing intuitive, beautiful interfaces with a focus on user experience and accessibility.",
  },
  {
    icon: Globe,
    title: "SEO Optimization",
    description: "Improving search engine visibility with technical SEO, performance optimization, and best practices.",
  },
  {
    icon: Zap,
    title: "Performance Tuning",
    description: "Optimizing load times, Core Web Vitals, and overall application performance for the best user experience.",
  },
];

const ServicesSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="services" className="relative py-16 md:py-24">
      <div className="glow-orb w-[400px] h-[400px] bg-secondary top-[10%] right-[-5%] animate-float animate-glow-pulse" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I offer a wide range of development and design services to help bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="glass rounded-2xl p-8 gradient-border group hover:shadow-glass-strong transition-all duration-500 hover:-translate-y-2 opacity-0 animate-slide-up"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6 group-hover:shadow-glass-glow transition-shadow duration-500">
                <service.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
