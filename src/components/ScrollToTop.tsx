import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass gradient-border flex items-center justify-center text-foreground shadow-glass-strong transition-all duration-300 hover:-translate-y-1 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
