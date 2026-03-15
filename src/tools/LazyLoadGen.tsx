import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const LazyLoadGen = () => {
  const [method, setMethod] = useState("native");
  const native = `<!-- Native Lazy Loading -->\n<img src="image.jpg" alt="Description" loading="lazy" />\n\n<!-- With width/height for CLS -->\n<img src="image.jpg" alt="Description" loading="lazy" width="800" height="600" />`;
  const io = `// Intersection Observer\nconst observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      const img = entry.target;\n      img.src = img.dataset.src;\n      img.classList.remove('lazy');\n      observer.unobserve(img);\n    }\n  });\n});\n\ndocument.querySelectorAll('img.lazy').forEach(img => {\n  observer.observe(img);\n});\n\n<!-- HTML -->\n<img class="lazy" data-src="image.jpg" alt="Description" />`;
  const css = `/* CSS Fade-in effect */\nimg.lazy {\n  opacity: 0;\n  transition: opacity 0.3s;\n}\nimg.lazy.loaded {\n  opacity: 1;\n}`;
  return <ToolLayout>
    <div><label className="text-sm font-medium text-foreground block mb-1">Method</label><select value={method} onChange={e=>setMethod(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm"><option value="native">Native (loading="lazy")</option><option value="io">Intersection Observer</option><option value="css">CSS Fade-in</option></select></div>
    <ToolOutput label="Code" value={method==="native"?native:method==="io"?io:css} />
  </ToolLayout>;
};
export default LazyLoadGen;