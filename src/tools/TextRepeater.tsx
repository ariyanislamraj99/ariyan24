import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton, ToolNumber } from "./ToolComponents";
const TextRepeater = () => { const [t,sT]=useState(""); const [n,sN]=useState(5); const [sep,sS]=useState("\\n"); const [o,sO]=useState("");
  const run=()=>{ const s=sep==="\\n"?"\n":sep; sO(Array(n).fill(t).join(s)); };
  return <ToolLayout><ToolInput label="Text" value={t} onChange={sT} /><ToolNumber label="Repeat Count" value={n} onChange={sN} min={1} max={1000} /><ToolInput label="Separator" value={sep} onChange={sS} placeholder="\\n" /><ToolButton onClick={run}>Repeat</ToolButton><ToolOutput label="Result" value={o} /></ToolLayout>; };
export default TextRepeater;
