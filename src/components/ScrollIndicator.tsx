import { useState, useEffect } from "react";

const ScrollIndicator = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1">
      <div
        className="h-full rounded-r-full transition-[width] duration-100"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, hsl(220 90% 55%), hsl(260 85% 65%), hsl(240 80% 60%))",
          boxShadow: "0 0 8px hsl(260 80% 65% / 0.5)",
        }}
      />
    </div>
  );
};

export default ScrollIndicator;
