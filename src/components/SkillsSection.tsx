import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Code, Terminal, Globe, Cpu, Languages, Monitor } from "lucide-react";

const professionalSkills = [
  { name: "Problem Solving", level: 95 },
  { name: "Team Collaboration", level: 90 },
  { name: "Project Management", level: 85 },
  { name: "Communication", level: 90 },
  { name: "Agile / Scrum", level: 85 },
  { name: "Leadership", level: 80 },
];

const technicalSkills = [
  { name: "React / Next.js", level: 95 },
  { name: "Node.js / Express", level: 90 },
  { name: "TypeScript", level: 92 },
  { name: "REST API / GraphQL", level: 88 },
  { name: "Database Design", level: 85 },
  { name: "Cloud / DevOps", level: 80 },
];

const codingSkills = [
  { name: "JavaScript", level: 95 },
  { name: "TypeScript", level: 92 },
  { name: "Python", level: 80 },
  { name: "HTML / CSS", level: 95 },
  { name: "SQL", level: 85 },
  { name: "C / C++", level: 70 },
];

const languageSkills = [
  { name: "Bangla", level: 100 },
  { name: "English", level: 85 },
  { name: "Hindi", level: 60 },
];

const platformSkills = [
  { name: "VS Code", level: 95 },
  { name: "GitHub / Git", level: 92 },
  { name: "Docker", level: 80 },
  { name: "Figma", level: 78 },
  { name: "Linux / Terminal", level: 85 },
  { name: "AWS / Vercel", level: 80 },
];

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: { name: string; level: number }[];
  accentVar: string;
  useCircles?: boolean;
}

const categories: SkillCategory[] = [
  { title: "Professional Skills", icon: Globe, skills: professionalSkills, accentVar: "--primary" },
  { title: "Technical Skills", icon: Cpu, skills: technicalSkills, accentVar: "--secondary" },
  { title: "Coding Skills", icon: Code, skills: codingSkills, accentVar: "--accent", useCircles: true },
  { title: "Language Skills", icon: Languages, skills: languageSkills, accentVar: "--primary" },
  { title: "Platform & Tools", icon: Monitor, skills: platformSkills, accentVar: "--secondary" },
];

const SkillBar = ({
  name,
  level,
  accentVar,
  delay,
}: {
  name: string;
  level: number;
  accentVar: string;
  delay: number;
}) => (
  <div className="opacity-0 animate-fade-in" style={{ animationDelay: `${delay}s` }}>
    <div className="flex justify-between mb-1.5">
      <span className="text-sm font-medium text-foreground">{name}</span>
      <span className="text-xs text-muted-foreground">{level}%</span>
    </div>
    <div className="h-2 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full animate-progress-fill"
        style={
          {
            "--progress-width": `${level}%`,
            animationDelay: `${delay + 0.2}s`,
            background: `linear-gradient(90deg, hsl(var(--gradient-start)), hsl(var(--gradient-mid)), hsl(var(--gradient-end)))`,
          } as React.CSSProperties
        }
      />
    </div>
  </div>
);

const SkillsSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="glow-orb w-[500px] h-[500px] bg-secondary bottom-[10%] right-[-10%] animate-float-delayed animate-glow-pulse" />
      <div className="glow-orb w-[300px] h-[300px] bg-accent top-[20%] left-[-5%] animate-float animate-glow-pulse" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my professional, technical, and creative capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, ci) => (
            <div
              key={cat.title}
              className={`glass rounded-2xl p-6 gradient-border hover:shadow-glass-strong transition-all duration-500 hover:-translate-y-1 opacity-0 animate-slide-up ${
                categories.length % 2 !== 0 && ci === categories.length - 1
                  ? "md:col-span-2 lg:col-span-1"
                  : ""
              }`}
              style={{ animationDelay: `${0.15 + ci * 0.12}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(${cat.accentVar})), hsl(var(${cat.accentVar}) / 0.6))`,
                  }}
                >
                  <cat.icon size={18} className="text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{cat.title}</h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    accentVar={cat.accentVar}
                    delay={0.3 + ci * 0.1 + si * 0.06}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
