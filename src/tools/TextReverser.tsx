import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const TextReverser = () => { const [t,sT]=useState(""); return <ToolLayout><ToolInput label="Text" value={t} onChange={sT} multiline /><ToolOutput label="Reversed" value={t.split("").reverse().join("")} /></ToolLayout>; };
export default TextReverser;
