import { useState } from "react"; import { ToolLayout, ToolNumber, ToolOutput } from "./ToolComponents";
const BorderRadiusGen = () => { const [tl,sTL]=useState(8);const [tr,sTR]=useState(8);const [br,sBR]=useState(8);const [bl,sBL]=useState(8);
  const css=`border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;
  return <ToolLayout><div className="flex justify-center py-8"><div className="w-32 h-32 bg-primary/30 border-2 border-primary" style={{borderRadius:`${tl}px ${tr}px ${br}px ${bl}px`}} /></div><div className="grid grid-cols-2 gap-4"><ToolNumber label="Top Left" value={tl} onChange={sTL} min={0} max={100} /><ToolNumber label="Top Right" value={tr} onChange={sTR} min={0} max={100} /><ToolNumber label="Bottom Right" value={br} onChange={sBR} min={0} max={100} /><ToolNumber label="Bottom Left" value={bl} onChange={sBL} min={0} max={100} /></div><ToolOutput label="CSS" value={css} /></ToolLayout>; };
export default BorderRadiusGen;
