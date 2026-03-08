import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const TextSorter = () => { const [t,sT]=useState(""); const [o,sO]=useState("");
  return <ToolLayout><ToolInput label="Text (one item per line)" value={t} onChange={sT} multiline rows={6} /><div className="flex gap-2"><ToolButton onClick={()=>sO(t.split("\n").sort().join("\n"))}>Sort A-Z</ToolButton><ToolButton onClick={()=>sO(t.split("\n").sort().reverse().join("\n"))} variant="secondary">Sort Z-A</ToolButton></div><ToolOutput label="Sorted" value={o} /></ToolLayout>; };
export default TextSorter;
