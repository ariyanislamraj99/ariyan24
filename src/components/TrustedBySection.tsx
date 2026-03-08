import { useScrollReveal } from "@/hooks/useScrollReveal";

const clients = [
  { name: "Google", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
  { name: "Microsoft", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Amazon", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Meta", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" },
  { name: "Apple", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" },
];

// Double for seamless loop
const doubled = [...clients, ...clients];

const TrustedBySection = () => {
  const ref = useScrollReveal();

  return (
    <section className="relative py-12 md:py-16 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <p className="text-center text-sm font-medium text-muted-foreground tracking-widest uppercase mb-8">
          Trusted by Industry Leaders
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="flex animate-marquee gap-12 w-max">
          {doubled.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex items-center gap-3 px-6 py-3 rounded-xl glass-subtle hover:bg-glass/60 transition-all duration-300 group shrink-0"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="w-8 h-8 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 dark:invert"
                loading="lazy"
              />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
