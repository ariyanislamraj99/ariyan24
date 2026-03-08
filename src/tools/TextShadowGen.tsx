import { useState } from "react"; import { ToolLayout, ToolNumber, ToolOutput } from "./ToolComponents";
const TextShadowGen = () => { const [x,sX]=useState(2);const [y,sY]=useState(2);const [blur,sB]=useState(4);const [color,sC]=useState("#00000080");
  const css=`text-shadow: ${x}px ${y}px ${blur}px ${color};`;
  return <ToolLayout><div className="flex justify-center py-8"><p className="text-3xl font-bold text-foreground" style={{textShadow:`${x}px ${y}px ${blur}px ${color}`}}>Preview Text</p></div><div className="grid grid-cols-2 gap-4"><ToolNumber label="X" value={x} onChange={sX} /><ToolNumber label="Y" value={y} onChange={sY} /><ToolNumber label="Blur" value={blur} onChange={sB} min={0} /></div><label className="text-sm text-foreground">Color: <input type="color" value={color.slice(0,7)} onChange={e=>sC(e.target.value+"80")} /></label><ToolOutput label="CSS" value={css} /></ToolLayout>; };
export default TextShadowGen;
