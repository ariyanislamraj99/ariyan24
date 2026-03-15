import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const CorsHeaderGen = () => {
  const [origins, setOrigins] = useState("*");
  const [methods, setMethods] = useState(["GET","POST","PUT","DELETE"]);
  const [headers, setHeaders] = useState("Content-Type, Authorization");
  const [credentials, setCredentials] = useState(false);
  const [maxAge, setMaxAge] = useState(86400);
  const toggleMethod = (m:string) => setMethods(p => p.includes(m) ? p.filter(x=>x!==m) : [...p,m]);
  const output = `Access-Control-Allow-Origin: ${origins}\nAccess-Control-Allow-Methods: ${methods.join(", ")}\nAccess-Control-Allow-Headers: ${headers}${credentials?"\nAccess-Control-Allow-Credentials: true":""}\nAccess-Control-Max-Age: ${maxAge}\n\n# Nginx:\nadd_header 'Access-Control-Allow-Origin' '${origins}';\nadd_header 'Access-Control-Allow-Methods' '${methods.join(", ")}';\nadd_header 'Access-Control-Allow-Headers' '${headers}';\n\n# Express.js:\napp.use(cors({\n  origin: "${origins}",\n  methods: [${methods.map(m=>`"${m}"`).join(",")}],\n  allowedHeaders: "${headers}",\n  credentials: ${credentials}\n}));`;
  return <ToolLayout>
    <div><label className="text-sm font-medium text-foreground block mb-1">Allowed Origins</label><input value={origins} onChange={e=>setOrigins(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" placeholder="* or https://example.com" /></div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Methods</label><div className="flex flex-wrap gap-2">{["GET","POST","PUT","PATCH","DELETE","OPTIONS","HEAD"].map(m=><label key={m} className="flex items-center gap-1 text-sm text-foreground"><input type="checkbox" checked={methods.includes(m)} onChange={()=>toggleMethod(m)} />{m}</label>)}</div></div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Allowed Headers</label><input value={headers} onChange={e=>setHeaders(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={credentials} onChange={e=>setCredentials(e.target.checked)} />Allow Credentials</label>
    <ToolOutput label="CORS Configuration" value={output} />
  </ToolLayout>;
};
export default CorsHeaderGen;