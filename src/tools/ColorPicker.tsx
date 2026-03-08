import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const ColorPicker = () => {
  const [color, setColor] = useState("#6366f1");
  const r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
  const hsl = (() => { const rr=r/255,gg=g/255,bb=b/255; const mx=Math.max(rr,gg,bb),mn=Math.min(rr,gg,bb),l=(mx+mn)/2; if(mx===mn) return `hsl(0, 0%, ${Math.round(l*100)}%)`; const d=mx-mn,s=l>0.5?d/(2-mx-mn):d/(mx+mn); let h=0; if(mx===rr) h=((gg-bb)/d+(gg<bb?6:0)); else if(mx===gg) h=(bb-rr)/d+2; else h=(rr-gg)/d+4; h/=6; return `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`; })();
  return <ToolLayout><div className="flex items-center gap-4"><input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-16 h-16 rounded cursor-pointer" /><div className="w-24 h-24 rounded-xl border border-glass-border/20" style={{backgroundColor:color}} /></div><ToolOutput label="HEX" value={color} /><ToolOutput label="RGB" value={`rgb(${r}, ${g}, ${b})`} /><ToolOutput label="HSL" value={hsl} /></ToolLayout>;
};
export default ColorPicker;
