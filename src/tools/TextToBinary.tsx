import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const TextToBinary = () => { const [t,sT]=useState(""); const [o,sO]=useState("");
  return <ToolLayout><ToolInput label="Text" value={t} onChange={sT} /><div className="flex gap-2"><ToolButton onClick={()=>sO(t.split("").map(c=>c.charCodeAt(0).toString(2).padStart(8,"0")).join(" "))}>To Binary</ToolButton><ToolButton onClick={()=>{try{sO(t.trim().split(/\s+/).map(b=>String.fromCharCode(parseInt(b,2))).join(""))}catch{sO("Invalid binary")}}} variant="secondary">From Binary</ToolButton></div><ToolOutput label="Result" value={o} /></ToolLayout>; };
export default TextToBinary;
