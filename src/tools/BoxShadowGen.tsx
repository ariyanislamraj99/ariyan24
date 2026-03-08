import { useState } from "react"; import { ToolLayout, ToolNumber, ToolOutput } from "./ToolComponents";
const BoxShadowGen = () => { const [x,sX]=useState(0);const [y,sY]=useState(4);const [blur,sB]=useState(10);const [spread,sS]=useState(0);const [color,sC]=useState("#00000040");
  const css=`box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};`;
  return <ToolLayout><div className="w-full flex justify-center py-8"><div className="w-32 h-32 rounded-xl bg-card" style={{boxShadow:`${x}px ${y}px ${blur}px ${spread}px ${color}`}} /></div><div className="grid grid-cols-2 gap-4"><ToolNumber label="X" value={x} onChange={sX} /><ToolNumber label="Y" value={y} onChange={sY} /><ToolNumber label="Blur" value={blur} onChange={sB} min={0} /><ToolNumber label="Spread" value={spread} onChange={sS} /></div><ToolOutput label="CSS" value={css} /></ToolLayout>; };
export default BoxShadowGen;
