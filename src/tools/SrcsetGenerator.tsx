import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const SrcsetGenerator = () => {
  const [src, setSrc] = useState("");
  const [widths, setWidths] = useState("320,640,960,1280,1920");
  const [sizes, setSizes] = useState("(max-width: 768px) 100vw, 50vw");
  const generate = () => {
    const ws = widths.split(",").map(w=>w.trim()).filter(Boolean);
    const srcset = ws.map(w => `${src || "/image"}?w=${w} ${w}w`).join(",\n  ");
    return `<img\n  src="${src || "/image.jpg"}"\n  srcset="\n  ${srcset}"\n  sizes="${sizes}"\n  alt="Description"\n  loading="lazy"\n/>`;
  };
  return <ToolLayout>
    <div><label className="text-sm font-medium text-foreground block mb-1">Image URL</label><input value={src} onChange={e=>setSrc(e.target.value)} placeholder="/images/hero.jpg" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Widths (comma-separated)</label><input value={widths} onChange={e=>setWidths(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Sizes Attribute</label><input value={sizes} onChange={e=>setSizes(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <ToolOutput label="Srcset Markup" value={generate()} />
  </ToolLayout>;
};
export default SrcsetGenerator;