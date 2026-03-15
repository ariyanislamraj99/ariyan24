import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const CssScrollbarGen = () => {
  const [w, setW] = useState(8);
  const [track, setTrack] = useState("#1e1e2e");
  const [thumb, setThumb] = useState("#6366f1");
  const [radius, setRadius] = useState(4);
  const css = `/* Webkit (Chrome, Safari, Edge) */\n::-webkit-scrollbar {\n  width: ${w}px;\n}\n::-webkit-scrollbar-track {\n  background: ${track};\n  border-radius: ${radius}px;\n}\n::-webkit-scrollbar-thumb {\n  background: ${thumb};\n  border-radius: ${radius}px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: ${thumb}cc;\n}\n\n/* Firefox */\n* {\n  scrollbar-width: ${w<=6?"thin":"auto"};\n  scrollbar-color: ${thumb} ${track};\n}`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Width: {w}px</label><input type="range" min={4} max={20} value={w} onChange={e=>setW(+e.target.value)} className="w-full" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Radius: {radius}px</label><input type="range" min={0} max={10} value={radius} onChange={e=>setRadius(+e.target.value)} className="w-full" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Track Color</label><input type="color" value={track} onChange={e=>setTrack(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Thumb Color</label><input type="color" value={thumb} onChange={e=>setThumb(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
    </div>
    <ToolOutput label="CSS" value={css} />
  </ToolLayout>;
};
export default CssScrollbarGen;