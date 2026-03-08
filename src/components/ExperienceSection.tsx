import { Briefcase, GraduationCap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const experience = [
  {
    role: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    period: "2024 – Present",
    description:
      "Leading development of scalable SaaS products with React, Node.js, and cloud infrastructure. Mentoring junior developers and driving architectural decisions.",
  },
  {
    role: "Full-Stack Developer",
    company: "StartupX",
    period: "2022 – 2024",
    description:
      "Built and shipped multiple client-facing web applications from scratch. Implemented CI/CD pipelines and improved page load times by 40%.",
  },
  {
    role: "Frontend Developer",
    company: "CreativeHub Agency",
    period: "2021 – 2022",
    description:
      "Developed responsive, accessible interfaces for diverse clients across e-commerce, healthcare, and fintech industries.",
  },
];

const education = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "University of Dhaka",
    period: "2018 – 2022",
    description:
      "Focused on software engineering, data structures, and web technologies. Graduated with distinction.",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Dhaka College",
    period: "2016 – 2018",
    description:
      "Science group with emphasis on mathematics and physics.",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Ideal School & College",
    period: "2014 – 2016",
    description:
      "Completed secondary education with a strong foundation in science and mathematics.",
  },
];

const ExperienceSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="experience" className="relative py-16 md:py-24">
      <div className="glow-orb w-[350px] h-[350px] bg-primary top-[30%] right-[-8%] animate-float animate-glow-pulse" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and academic background.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                <Briefcase size={18} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Work Experience</h3>
            </div>

            <div className="relative pl-6 border-l border-primary/30">
              {experience.map((item, i) => (
                <div
                  key={item.role}
                  className="relative mb-8 last:mb-0 opacity-0 animate-slide-up"
                  style={{ animationDelay: `${0.2 + i * 0.15}s` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[calc(1.5rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full gradient-bg shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />

                  <div className="glass rounded-xl p-6 gradient-border hover:shadow-glass-strong transition-all duration-500 hover:-translate-y-1">
                    <p className="text-xs text-primary font-medium tracking-wider uppercase mb-1">
                      {item.period}
                    </p>
                    <h4 className="text-base font-semibold text-foreground mb-1">{item.role}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{item.company}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                <GraduationCap size={18} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Education</h3>
            </div>

            <div className="relative pl-6 border-l border-accent/30">
              {education.map((item, i) => (
                <div
                  key={item.degree}
                  className="relative mb-8 last:mb-0 opacity-0 animate-slide-up"
                  style={{ animationDelay: `${0.35 + i * 0.15}s` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[calc(1.5rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.5)]" />

                  <div className="glass rounded-xl p-6 gradient-border hover:shadow-glass-strong transition-all duration-500 hover:-translate-y-1">
                    <p className="text-xs text-accent font-medium tracking-wider uppercase mb-1">
                      {item.period}
                    </p>
                    <h4 className="text-base font-semibold text-foreground mb-1">{item.degree}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{item.institution}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
