import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const EncryptionTool = () => { const [t,sT]=useState(""); const [key,sK]=useState("secret"); const [o,sO]=useState("");
  const encrypt=()=>{let r="";for(let i=0;i<t.length;i++)r+=String.fromCharCode(t.charCodeAt(i)^key.charCodeAt(i%key.length));sO(btoa(r))};
  const decrypt=()=>{try{const d=atob(t);let r="";for(let i=0;i<d.length;i++)r+=String.fromCharCode(d.charCodeAt(i)^key.charCodeAt(i%key.length));sO(r)}catch{sO("Invalid input")}};
  return <ToolLayout><ToolInput label="Text" value={t} onChange={sT} multiline /><ToolInput label="Key" value={key} onChange={sK} /><div className="flex gap-2"><ToolButton onClick={encrypt}>Encrypt</ToolButton><ToolButton onClick={decrypt} variant="secondary">Decrypt</ToolButton></div><ToolOutput label="Result" value={o} /></ToolLayout>; };
export default EncryptionTool;
