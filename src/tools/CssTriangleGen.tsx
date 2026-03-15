import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const CssTriangleGen = () => {
  const [dir, setDir] = useState("up");
  const [size, setSize] = useState(60);
  const [color, setColor] = useState("#6366f1");
  const styles: Record<string,Record<string,string>> = {
    up: {borderLeft:`${size}px solid transparent`,borderRight:`${size}px solid transparent`,borderBottom:`${size}px solid ${color}`},
    down: {borderLeft:`${size}px solid transparent`,borderRight:`${size}px solid transparent`,borderTop:`${size}px solid ${color}`},
    left: {borderTop:`${size}px solid transparent`,borderBottom:`${size}px solid transparent`,borderRight:`${size}px solid ${color}`},
    right: {borderTop:`${size}px solid transparent`,borderBottom:`${size}px solid transparent`,borderLeft:`${size}px solid ${color}`},
  };
  const s = styles[dir];
  const css = `.triangle {\n  width: 0;\n  height: 0;\n  ${Object.entries(s).map(([k,v])=>`${k.replace(/([A-Z])/g,"-$1").toLowerCase()}: ${v};`).join("\n  ")}\n}`;
  return <ToolLayout>
    <div className="grid grid-cols-3 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Direction</label><select value={dir} onChange={e=>setDir(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm">{["up","down","left","right"].map(d=><option key={d}>{d}</option>)}</select></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Size (px)</label><input type="number" value={size} onChange={e=>setSize(+e.target.value)} min={10} max={200} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Color</label><input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
    </div>
    <div className="flex justify-center py-6"><div style={{width:0,height:0,...s}} /></div>
    <ToolOutput label="CSS" value={css} />
  </ToolLayout>;
};
export default CssTriangleGen;