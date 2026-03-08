import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, Home, Briefcase, FolderOpen, Code, BookOpen, Mail, Wrench } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Services", href: "#services", icon: Briefcase },
  { label: "Portfolio", href: "#portfolio", icon: FolderOpen },
  { label: "Projects", href: "#projects", icon: Code },
  { label: "Skills", href: "#skills", icon: Code },
  { label: "Blog", href: "#blog", icon: BookOpen },
  { label: "Tools", href: "/tools", icon: Wrench, isRoute: true },
  { label: "Contact", href: "#contact", icon: Mail },
];

const bottomNavLinks = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Portfolio", href: "#portfolio", icon: FolderOpen },
  { label: "Tools", href: "/tools", icon: Wrench, isRoute: true },
  { label: "Contact", href: "#contact", icon: Mail },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "dark" | "light") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      {/* Top Navbar - glassmorphism with border radius */}
      <nav
        className={`fixed top-4 left-4 right-4 lg:left-[336px] z-50 transition-all duration-500 rounded-2xl border border-glass-border/20 backdrop-blur-xl bg-glass/60 shadow-glass ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6">
          {/* Mobile: show name */}
          <a href="#home" className="lg:hidden text-lg font-display font-bold gradient-text">
            Ariyan
          </a>
          {/* Desktop: spacer for centering */}
          <div className="hidden lg:block flex-1" />

          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {(link as any).isRoute ? (
                    <Link
                      to={link.href}
                      className="flex items-center gap-1.5 text-xs transition-colors duration-300 text-muted-foreground hover:text-foreground"
                    >
                      <link.icon size={14} />
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className={`flex items-center gap-1.5 text-xs transition-all duration-300 relative px-2 py-1 rounded-md after:content-[''] after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:rounded-full after:transition-all after:duration-500 ${
                        activeSection === link.href
                          ? "text-foreground after:w-3/4 after:bg-gradient-to-r after:from-[hsl(var(--gradient-start))] after:via-[hsl(var(--gradient-mid))] after:to-[hsl(var(--gradient-end))] bg-muted/40"
                          : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-1/2 after:bg-primary"
                      }`}
                    >
                      <link.icon size={14} className={activeSection === link.href ? "text-primary" : ""} />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}

            </ul>
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          {/* Mobile top controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              className="text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden glass-strong mt-2 mx-4 rounded-lg p-4 animate-fade-in">
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`flex items-center gap-3 text-sm transition-colors ${
                      activeSection === link.href
                        ? "text-primary font-medium"
                        : "text-foreground hover:text-primary"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <link.icon size={14} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-glass-border/10">
        <div className="flex items-center justify-around py-2 px-2">
          {bottomNavLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div
                  className={`p-1 rounded-lg transition-all duration-300 ${
                    isActive ? "gradient-bg shadow-[0_0_12px_hsl(var(--primary)/0.4)]" : ""
                  }`}
                >
                  <link.icon size={isActive ? 18 : 16} className={isActive ? "text-primary-foreground" : ""} />
                </div>
                <span className={`text-[10px] font-medium ${isActive ? "gradient-text" : ""}`}>
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
