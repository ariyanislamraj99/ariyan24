import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const RemoveDuplicates = () => { const [t,sT]=useState(""); const [o,sO]=useState("");
  const run=()=>sO([...new Set(t.split("\n"))].join("\n"));
  return <ToolLayout><ToolInput label="Text (one item per line)" value={t} onChange={sT} multiline rows={6} /><ToolButton onClick={run}>Remove Duplicates</ToolButton><ToolOutput label="Result" value={o} /></ToolLayout>; };
export default RemoveDuplicates;
