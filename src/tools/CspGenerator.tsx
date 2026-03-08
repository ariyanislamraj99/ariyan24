import { useState } from "react"; import { ToolLayout, ToolOutput } from "./ToolComponents";
const CspGenerator = () => { const [opts,sO]=useState({self:true,inline:false,eval:false,https:true});
  const toggle=(k:string)=>sO(p=>({...p,[k]:!(p as any)[k]}));
  const csp=`Content-Security-Policy: default-src ${opts.self?"'self'":"'none'"}${opts.https?" https:":""}${opts.inline?" 'unsafe-inline'":""}${opts.eval?" 'unsafe-eval'":""}; img-src 'self' data: https:; font-src 'self' https:;`;
  return <ToolLayout><div className="space-y-2">{Object.entries({self:"Allow 'self'",inline:"Allow inline scripts",eval:"Allow eval",https:"Allow HTTPS"}).map(([k,l])=><label key={k} className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={(opts as any)[k]} onChange={()=>toggle(k)} />{l}</label>)}</div><ToolOutput label="CSP Header" value={csp} /></ToolLayout>; };
export default CspGenerator;
