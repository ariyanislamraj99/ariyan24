import { useScrollReveal } from "@/hooks/useScrollReveal";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "UI/UX Design", level: 80 },
  { name: "Python", level: 75 },
  { name: "DevOps / CI/CD", level: 70 },
];

const circleSkills = [
  { name: "Frontend", value: 95, color: "var(--primary)" },
  { name: "Backend", value: 85, color: "var(--secondary)" },
  { name: "Design", value: 80, color: "var(--accent)" },
];

const CircleIndicator = ({ name, value, color, delay }: { name: string; value: number; color: string; delay: number }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 opacity-0 animate-scale-in" style={{ animationDelay: `${delay}s` }}>
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="45" fill="none"
            stroke={`hsl(${color})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-[1.5s] ease-out"
            style={{ filter: `drop-shadow(0 0 6px hsl(${color} / 0.4))` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-foreground">{value}%</span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground">{name}</span>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="glow-orb w-[500px] h-[500px] bg-secondary bottom-[10%] right-[-10%] animate-float-delayed animate-glow-pulse" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Circular indicators */}
        <div className="flex justify-center gap-10 md:gap-16 mb-16">
          {circleSkills.map((skill, i) => (
            <CircleIndicator key={skill.name} {...skill} delay={0.2 + i * 0.15} />
          ))}
        </div>

        {/* Progress bars */}
        <div className="max-w-2xl mx-auto glass rounded-2xl p-8 gradient-border">
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-bg animate-progress-fill"
                    style={{ "--progress-width": `${skill.level}%`, animationDelay: `${0.6 + i * 0.1}s` } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
