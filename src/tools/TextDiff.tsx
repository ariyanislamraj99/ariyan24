import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const TextDiff = () => { const [a,sA]=useState(""); const [b,sB]=useState("");
  const diff=()=>{ const la=a.split("\n"),lb=b.split("\n"); const r:string[]=[]; const max=Math.max(la.length,lb.length); for(let i=0;i<max;i++){ if(la[i]===lb[i]) r.push(`  ${la[i]||""}`); else { if(la[i]!==undefined) r.push(`- ${la[i]}`); if(lb[i]!==undefined) r.push(`+ ${lb[i]}`); } } return r.join("\n"); };
  return <ToolLayout><ToolInput label="Text A" value={a} onChange={sA} multiline rows={5} /><ToolInput label="Text B" value={b} onChange={sB} multiline rows={5} /><ToolOutput label="Diff" value={diff()} /></ToolLayout>; };
export default TextDiff;
