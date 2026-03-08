import { ExternalLink, Github } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with real-time inventory, payments, and admin dashboard.",
    tags: ["React", "Node.js", "Stripe"],
    gradient: "from-primary to-secondary",
  },
  {
    title: "AI Dashboard",
    description: "Analytics dashboard powered by machine learning with real-time data visualization.",
    tags: ["TypeScript", "Python", "D3.js"],
    gradient: "from-secondary to-accent",
  },
  {
    title: "Social Network",
    description: "A modern social platform with real-time messaging, stories, and content feeds.",
    tags: ["React", "Firebase", "Tailwind"],
    gradient: "from-accent to-primary",
  },
  {
    title: "Portfolio Generator",
    description: "A drag-and-drop portfolio builder with custom themes and instant deployment.",
    tags: ["Vue.js", "Supabase", "Vercel"],
    gradient: "from-primary via-accent to-secondary",
  },
];

const ProjectsSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="projects" className="relative py-16 md:py-24">
      <div className="glow-orb w-[400px] h-[400px] bg-accent top-[20%] left-[-5%] animate-float animate-glow-pulse" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for building great products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="glass rounded-2xl overflow-hidden gradient-border group hover:shadow-glass-strong transition-all duration-500 hover:-translate-y-2 opacity-0 animate-slide-up"
              style={{ animationDelay: `${0.2 + i * 0.15}s` }}
            >
              {/* Color bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

              <div className="p-8">
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full glass-subtle text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="View source">
                    <Github size={20} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="View live">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
