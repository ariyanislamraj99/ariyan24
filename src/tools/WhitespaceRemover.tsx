import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const WhitespaceRemover = () => { const [t,sT]=useState(""); return <ToolLayout><ToolInput label="Text" value={t} onChange={sT} multiline /><ToolOutput label="Cleaned" value={t.replace(/\s+/g," ").trim()} /></ToolLayout>; };
export default WhitespaceRemover;
