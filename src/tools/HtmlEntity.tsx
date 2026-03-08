import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const HtmlEntity = () => { const [t,sT]=useState(""); const [o,sO]=useState("");
  const encode=()=>sO(t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"));
  const decode=()=>{const el=document.createElement("textarea");el.innerHTML=t;sO(el.value);};
  return <ToolLayout><ToolInput label="Text" value={t} onChange={sT} multiline /><div className="flex gap-2"><ToolButton onClick={encode}>Encode</ToolButton><ToolButton onClick={decode} variant="secondary">Decode</ToolButton></div><ToolOutput label="Result" value={o} /></ToolLayout>; };
export default HtmlEntity;
