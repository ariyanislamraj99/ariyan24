import { useState } from "react"; import { ToolLayout, ToolOutput } from "./ToolComponents";
const ChmodCalculator = () => { const [perms,sP]=useState({ur:true,uw:true,ux:false,gr:true,gw:false,gx:false,or:true,ow:false,ox:false});
  const calc=()=>{ const u=(perms.ur?4:0)+(perms.uw?2:0)+(perms.ux?1:0); const g=(perms.gr?4:0)+(perms.gw?2:0)+(perms.gx?1:0); const o=(perms.or?4:0)+(perms.ow?2:0)+(perms.ox?1:0); return `${u}${g}${o}`; };
  const toggle=(k:string)=>sP(p=>({...p,[k]:!(p as any)[k]}));
  const Check=({k,label}:{k:string;label:string})=><label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={(perms as any)[k]} onChange={()=>toggle(k)} />{label}</label>;
  return <ToolLayout><div className="grid grid-cols-3 gap-4"><div><p className="text-sm font-medium text-foreground mb-2">Owner</p><Check k="ur" label="Read" /><Check k="uw" label="Write" /><Check k="ux" label="Execute" /></div><div><p className="text-sm font-medium text-foreground mb-2">Group</p><Check k="gr" label="Read" /><Check k="gw" label="Write" /><Check k="gx" label="Execute" /></div><div><p className="text-sm font-medium text-foreground mb-2">Others</p><Check k="or" label="Read" /><Check k="ow" label="Write" /><Check k="ox" label="Execute" /></div></div><ToolOutput label="Permission" value={`chmod ${calc()}`} /></ToolLayout>; };
export default ChmodCalculator;
