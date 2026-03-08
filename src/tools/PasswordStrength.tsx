import { useState } from "react"; import { ToolLayout, ToolInput } from "./ToolComponents";
const PasswordStrength = () => { const [p,sP]=useState("");
  const score=(()=>{let s=0;if(p.length>=8)s++;if(p.length>=12)s++;if(/[a-z]/.test(p)&&/[A-Z]/.test(p))s++;if(/\d/.test(p))s++;if(/[^a-zA-Z0-9]/.test(p))s++;return s})();
  const labels=["Very Weak","Weak","Fair","Strong","Very Strong"];const colors=["bg-red-500","bg-orange-500","bg-yellow-500","bg-green-400","bg-green-500"];
  return <ToolLayout><ToolInput label="Password" value={p} onChange={sP} placeholder="Enter password" /><div className="space-y-2"><div className="flex gap-1">{[0,1,2,3,4].map(i=><div key={i} className={`h-2 flex-1 rounded ${i<=score-1?colors[score-1]:"bg-muted"}`} />)}</div><p className="text-sm text-foreground">{p?labels[Math.max(score-1,0)]:"Enter a password"}</p></div></ToolLayout>; };
export default PasswordStrength;
