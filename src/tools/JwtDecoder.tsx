import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const JwtDecoder = () => { const [jwt,sJ]=useState(""); const [o,sO]=useState("");
  const decode=()=>{ try { const parts=jwt.split("."); if(parts.length!==3){ sO("Invalid JWT format"); return; } const header=JSON.parse(atob(parts[0])); const payload=JSON.parse(atob(parts[1].replace(/-/g,"+").replace(/_/g,"/"))); sO(`Header:\n${JSON.stringify(header,null,2)}\n\nPayload:\n${JSON.stringify(payload,null,2)}\n\nExpires: ${payload.exp?new Date(payload.exp*1000).toLocaleString():"N/A"}`); } catch { sO("Failed to decode JWT"); } };
  return <ToolLayout><ToolInput label="JWT Token" value={jwt} onChange={sJ} multiline rows={4} placeholder="eyJhbGciOiJIUzI1NiIs..." /><ToolButton onClick={decode}>Decode</ToolButton><ToolOutput label="Decoded" value={o} /></ToolLayout>; };
export default JwtDecoder;
