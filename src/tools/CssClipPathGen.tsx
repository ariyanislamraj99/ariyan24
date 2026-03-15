import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const shapes: Record<string, string> = {
  triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
  rhombus: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  pentagon: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
  hexagon: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  cross: "polygon(10% 25%, 35% 25%, 35% 10%, 65% 10%, 65% 25%, 90% 25%, 90% 45%, 65% 45%, 65% 90%, 35% 90%, 35% 45%, 10% 45%)",
  arrow: "polygon(40% 0%, 40% 60%, 0% 60%, 50% 100%, 100% 60%, 60% 60%, 60% 0%)",
  circle: "circle(50% at 50% 50%)",
  ellipse: "ellipse(50% 35% at 50% 50%)",
  inset: "inset(10% 10% 10% 10% round 10px)",
};
const CssClipPathGen = () => {
  const [shape, setShape] = useState("triangle");
  const [custom, setCustom] = useState("");
  const val = custom || shapes[shape];
  return <ToolLayout>
    <div><label className="text-sm font-medium text-foreground block mb-1">Shape Preset</label>
    <select value={shape} onChange={e=>{setShape(e.target.value);setCustom("")}} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm">
      {Object.keys(shapes).map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
    </select></div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Custom (optional)</label>
    <input value={custom} onChange={e=>setCustom(e.target.value)} placeholder="polygon(50% 0%, ...)" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <div className="flex justify-center p-4"><div className="w-48 h-48 bg-primary" style={{clipPath:val}} /></div>
    <ToolOutput label="CSS" value={`clip-path: ${val};`} />
  </ToolLayout>;
};
export default CssClipPathGen;