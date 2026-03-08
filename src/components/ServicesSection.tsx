import { Code, Palette, Zap, Globe, Smartphone, Server } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Building modern, responsive websites and web applications using React, Next.js, and cutting-edge technologies.",
    backText: "React • Next.js • TypeScript • Tailwind CSS • Vite",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Creating seamless mobile experiences with responsive layouts and progressive web app capabilities.",
    backText: "PWA • Responsive • Touch-optimized • Cross-browser",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Developing robust APIs, databases, and server-side logic with Node.js, Express, and cloud services.",
    backText: "Node.js • Express • PostgreSQL • REST • GraphQL",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Designing intuitive, beautiful interfaces with a focus on user experience and accessibility.",
    backText: "Figma • Wireframing • Prototyping • Design Systems",
  },
  {
    icon: Globe,
    title: "SEO Optimization",
    description: "Improving search engine visibility with technical SEO, performance optimization, and best practices.",
    backText: "Core Web Vitals • Schema • Analytics • Audits",
  },
  {
    icon: Zap,
    title: "Performance Tuning",
    description: "Optimizing load times, Core Web Vitals, and overall application performance for the best user experience.",
    backText: "Lazy Loading • Caching • CDN • Code Splitting",
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const Icon = service.icon;

  return (
    <div
      className="group [perspective:1000px] opacity-0 animate-slide-up"
      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    >
      <div className="relative w-full h-64 sm:h-72 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] glass rounded-2xl p-6 sm:p-8 gradient-border flex flex-col">
          <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6 shadow-glass-glow">
            <Icon size={24} className="text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] glass rounded-2xl p-6 sm:p-8 gradient-border flex flex-col items-center justify-center text-center gap-4">
          <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-glass-glow">
            <Icon size={28} className="text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{service.backText}</p>
        </div>
      </div>
    </div>
  );
};

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
