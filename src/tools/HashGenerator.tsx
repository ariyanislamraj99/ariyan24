import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const HashGenerator = () => { const [t,sT]=useState(""); const [o,sO]=useState("");
  const hash=async()=>{const enc=new TextEncoder().encode(t);const h256=await crypto.subtle.digest("SHA-256",enc);const h1=await crypto.subtle.digest("SHA-1",enc);const toHex=(b:ArrayBuffer)=>Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,"0")).join("");sO(`SHA-256: ${toHex(h256)}\nSHA-1: ${toHex(h1)}`)};
  return <ToolLayout><ToolInput label="Text" value={t} onChange={sT} multiline /><ToolButton onClick={hash}>Generate Hash</ToolButton><ToolOutput label="Hashes" value={o} /></ToolLayout>; };
export default HashGenerator;
