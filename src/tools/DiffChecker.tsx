import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const DiffChecker = () => { const [a,sA]=useState(""); const [b,sB]=useState(""); const la=a.split("\n"),lb=b.split("\n"); const max=Math.max(la.length,lb.length); const r:string[]=[]; for(let i=0;i<max;i++){if(la[i]===lb[i])r.push(`  ${la[i]||""}`);else{if(la[i]!==undefined)r.push(`- ${la[i]}`);if(lb[i]!==undefined)r.push(`+ ${lb[i]}`);}}
  return <ToolLayout><ToolInput label="Code A" value={a} onChange={sA} multiline rows={6} /><ToolInput label="Code B" value={b} onChange={sB} multiline rows={6} /><ToolOutput label="Diff" value={r.join("\n")} /></ToolLayout>; };
export default DiffChecker;
