import { useState } from "react"; import { ToolLayout, ToolOutput } from "./ToolComponents";
const headers=["X-Frame-Options: SAMEORIGIN","X-Content-Type-Options: nosniff","X-XSS-Protection: 1; mode=block","Referrer-Policy: strict-origin-when-cross-origin","Permissions-Policy: geolocation=(), microphone=(), camera=()"];
const WpSecurityHeader = () => { const [sel,sS]=useState(headers.map(()=>true));
  const toggle=(i:number)=>sS(p=>{const n=[...p];n[i]=!n[i];return n});
  const output=headers.filter((_,i)=>sel[i]).map(h=>`Header set ${h}`).join("\n");
  return <ToolLayout><div className="space-y-2">{headers.map((h,i)=><label key={i} className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={sel[i]} onChange={()=>toggle(i)} />{h.split(":")[0]}</label>)}</div><ToolOutput label=".htaccess Headers" value={output} /></ToolLayout>; };
export default WpSecurityHeader;
