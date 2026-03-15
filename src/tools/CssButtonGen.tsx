import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const CssButtonGen = () => {
  const [bg, setBg] = useState("#6366f1");
  const [fg, setFg] = useState("#ffffff");
  const [px, setPx] = useState(24);
  const [py, setPy] = useState(12);
  const [br, setBr] = useState(8);
  const [fs, setFs] = useState(16);
  const [shadow, setShadow] = useState(true);
  const [text, setText] = useState("Click Me");
  const style: React.CSSProperties = {background:bg,color:fg,padding:`${py}px ${px}px`,borderRadius:`${br}px`,fontSize:`${fs}px`,border:"none",cursor:"pointer",fontWeight:600,boxShadow:shadow?`0 4px 14px ${bg}66`:"none",transition:"all 0.2s"};
  const css = `.button {\n  background: ${bg};\n  color: ${fg};\n  padding: ${py}px ${px}px;\n  border-radius: ${br}px;\n  font-size: ${fs}px;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;${shadow?`\n  box-shadow: 0 4px 14px ${bg}66;`:""}\n  transition: all 0.2s;\n}\n.button:hover {\n  opacity: 0.9;\n  transform: translateY(-1px);\n}`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Background</label><input type="color" value={bg} onChange={e=>setBg(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Text Color</label><input type="color" value={fg} onChange={e=>setFg(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Font Size: {fs}px</label><input type="range" min={10} max={32} value={fs} onChange={e=>setFs(+e.target.value)} className="w-full" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Border Radius: {br}px</label><input type="range" min={0} max={50} value={br} onChange={e=>setBr(+e.target.value)} className="w-full" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Padding X: {px}px</label><input type="range" min={8} max={60} value={px} onChange={e=>setPx(+e.target.value)} className="w-full" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Padding Y: {py}px</label><input type="range" min={4} max={30} value={py} onChange={e=>setPy(+e.target.value)} className="w-full" /></div>
    </div>
    <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={shadow} onChange={e=>setShadow(e.target.checked)} />Box Shadow</label>
    <div><label className="text-sm font-medium text-foreground block mb-1">Button Text</label><input value={text} onChange={e=>setText(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <div className="flex justify-center py-6"><button style={style}>{text}</button></div>
    <ToolOutput label="CSS" value={css} />
  </ToolLayout>;
};
export default CssButtonGen;