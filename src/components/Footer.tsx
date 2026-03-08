import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="glass-subtle py-6 mt-8">
    <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © 2026 Ariyan Islam Raj.
      </p>
      <div className="flex gap-5">
        {[Github, Linkedin, Twitter].map((Icon, i) => (
          <a key={i} href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Social link">
            <Icon size={18} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
