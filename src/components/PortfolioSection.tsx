import { ExternalLink, Github } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-featured online store with real-time inventory, Stripe payments, and admin dashboard.",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    image: portfolio1,
  },
  {
    title: "AI Analytics Dashboard",
    description: "Data visualization platform powered by machine learning with real-time metrics and insights.",
    tags: ["TypeScript", "Python", "D3.js", "TensorFlow"],
    image: portfolio2,
  },
  {
    title: "Social Chat App",
    description: "Real-time messaging app with stories, media sharing, and end-to-end encryption.",
    tags: ["React Native", "Firebase", "WebSocket"],
    image: portfolio3,
  },
  {
    title: "Task Management Board",
    description: "Kanban-style project management tool with drag-and-drop, team collaboration, and automation.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    image: portfolio4,
  },
  {
    title: "Real Estate Listings",
    description: "Property listing platform with map integration, advanced filters, and virtual tours.",
    tags: ["React", "Mapbox", "Express", "AWS"],
    image: portfolio5,
  },
  {
    title: "Fitness Tracker",
    description: "Health & fitness app with workout tracking, progress visualization, and personalized goals.",
    tags: ["React Native", "Node.js", "Chart.js"],
    image: portfolio6,
  },
];

const PortfolioSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="portfolio" className="relative py-16 md:py-24">
      <div className="glow-orb w-[400px] h-[400px] bg-accent top-[20%] left-[-5%] animate-float animate-glow-pulse" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of real-world projects I've designed and developed from concept to deployment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="group [perspective:1000px] opacity-0 animate-slide-up"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(8deg)_rotateX(4deg)_scale(1.03)] will-change-transform">
              <div className="glass rounded-2xl overflow-hidden gradient-border hover:shadow-glass-strong transition-shadow duration-500">
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end p-4 gap-3">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors"
                    aria-label="View source"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full glass flex items-center justify-center text-foreground hover:text-primary transition-colors"
                    aria-label="View live"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold mb-2 text-foreground">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full glass-subtle text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
