import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolNumber } from "./ToolComponents";
const TextTruncator = () => { const [t,sT]=useState(""); const [n,sN]=useState(100); return <ToolLayout><ToolInput label="Text" value={t} onChange={sT} multiline /><ToolNumber label="Max Length" value={n} onChange={sN} min={1} /><ToolOutput label="Truncated" value={t.length>n?t.slice(0,n)+"...":t} /></ToolLayout>; };
export default TextTruncator;
