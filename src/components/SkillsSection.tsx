import { useRef, useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Code, Terminal, Globe, Cpu, Languages, FileCode, FileType, Braces, Database, Hash, Lightbulb, Users, ClipboardList, MessageSquare, IterationCcw, Crown } from "lucide-react";

const professionalSkills = [
  { name: "Problem Solving", level: 95, icon: Lightbulb },
  { name: "Team Collaboration", level: 90, icon: Users },
  { name: "Project Management", level: 85, icon: ClipboardList },
  { name: "Communication", level: 90, icon: MessageSquare },
  { name: "Agile / Scrum", level: 85, icon: IterationCcw },
  { name: "Leadership", level: 80, icon: Crown },
];

const technicalSkills = [
  { name: "React / Next.js", level: 95, icon: Braces },
  { name: "Node.js / Express", level: 90, icon: Terminal },
  { name: "TypeScript", level: 92, icon: FileType },
  { name: "REST API / GraphQL", level: 88, icon: Globe },
  { name: "Database Design", level: 85, icon: Database },
  { name: "Cloud / DevOps", level: 80, icon: Cpu },
];

const codingSkills = [
  { name: "JavaScript", level: 95, icon: FileCode },
  { name: "TypeScript", level: 92, icon: FileType },
  { name: "Python", level: 80, icon: Terminal },
  { name: "HTML / CSS", level: 95, icon: Code },
  { name: "SQL", level: 85, icon: Database },
  { name: "C / C++", level: 70, icon: Hash },
];

const languageSkills = [
  { name: "Bangla", level: 100, flag: "https://flagcdn.com/w40/bd.png" },
  { name: "English", level: 85, flag: "https://flagcdn.com/w40/gb.png" },
  { name: "Hindi", level: 60, flag: "https://flagcdn.com/w40/in.png" },
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
  
];

const SkillBar = ({
  name,
  level,
  accentVar,
  icon: Icon,
  delay,
  flag,
  inView,
}: {
  name: string;
  level: number;
  accentVar: string;
  delay: number;
  flag?: string;
  icon?: React.ElementType;
  inView: boolean;
}) => (
  <div className={`transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${delay}s` }}>
    <div className="flex justify-between mb-1.5">
      <span className="text-sm font-medium text-foreground flex items-center gap-2">
        {Icon && <Icon size={14} className="text-muted-foreground" />}
        {flag && <img src={flag} alt={`${name} flag`} className="w-5 h-3.5 object-cover rounded-sm shadow-sm" loading="lazy" />}
        {name}
      </span>
      <span className="text-xs text-muted-foreground">{level}%</span>
    </div>
    <div className="h-2 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-[1.5s] ease-out"
        style={
          {
            width: inView ? `${level}%` : "0%",
            transitionDelay: `${delay + 0.2}s`,
            background: `linear-gradient(90deg, hsl(var(--gradient-start)), hsl(var(--gradient-mid)), hsl(var(--gradient-end)))`,
          } as React.CSSProperties
        }
      />
    </div>
  </div>
);

const CircleSkill = ({
  name,
  level,
  delay,
  icon: Icon,
  inView,
}: {
  name: string;
  level: number;
  delay: number;
  icon?: React.ElementType;
  inView: boolean;
}) => {
  const circumference = 2 * Math.PI * 40;
  const offset = inView ? circumference - (level / 100) * circumference : circumference;
  const gradientId = `grad-${name.replace(/[^a-zA-Z]/g, "")}`;

  return (
    <div
      className={`flex flex-col items-center gap-2 transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 90 90">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--gradient-start))" />
              <stop offset="50%" stopColor="hsl(var(--gradient-mid))" />
              <stop offset="100%" stopColor="hsl(var(--gradient-end))" />
            </linearGradient>
          </defs>
          <circle cx="45" cy="45" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="5" />
          <circle
            cx="45"
            cy="45"
            r="40"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-[1.5s] ease-out"
            style={{ filter: "drop-shadow(0 0 4px hsl(var(--accent) / 0.4))", transitionDelay: `${delay}s` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {Icon && <Icon size={14} className="text-muted-foreground mb-0.5" />}
          <span className="text-xs font-bold text-foreground">{level}%</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground text-center leading-tight">{name}</span>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="skills" className="relative py-16 md:py-24">
      <div className="glow-orb w-[500px] h-[500px] bg-secondary bottom-[10%] right-[-10%] animate-float-delayed animate-glow-pulse" />
      <div className="glow-orb w-[300px] h-[300px] bg-accent top-[20%] left-[-5%] animate-float animate-glow-pulse" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my professional, technical, and creative capabilities.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
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

              {cat.useCircles ? (
                <div className="grid grid-cols-3 gap-4">
                  {cat.skills.map((skill, si) => (
                    <CircleSkill
                      key={skill.name}
                      {...skill}
                      delay={0.3 + ci * 0.1 + si * 0.08}
                    />
                  ))}
                </div>
              ) : (
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
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
