import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const codes: Record<string,{status:string,desc:string}[]> = {
  "1xx Informational": [{status:"100",desc:"Continue"},{status:"101",desc:"Switching Protocols"},{status:"102",desc:"Processing"},{status:"103",desc:"Early Hints"}],
  "2xx Success": [{status:"200",desc:"OK"},{status:"201",desc:"Created"},{status:"202",desc:"Accepted"},{status:"204",desc:"No Content"},{status:"206",desc:"Partial Content"}],
  "3xx Redirection": [{status:"301",desc:"Moved Permanently"},{status:"302",desc:"Found"},{status:"303",desc:"See Other"},{status:"304",desc:"Not Modified"},{status:"307",desc:"Temporary Redirect"},{status:"308",desc:"Permanent Redirect"}],
  "4xx Client Error": [{status:"400",desc:"Bad Request"},{status:"401",desc:"Unauthorized"},{status:"403",desc:"Forbidden"},{status:"404",desc:"Not Found"},{status:"405",desc:"Method Not Allowed"},{status:"408",desc:"Request Timeout"},{status:"409",desc:"Conflict"},{status:"410",desc:"Gone"},{status:"413",desc:"Payload Too Large"},{status:"415",desc:"Unsupported Media Type"},{status:"422",desc:"Unprocessable Entity"},{status:"429",desc:"Too Many Requests"}],
  "5xx Server Error": [{status:"500",desc:"Internal Server Error"},{status:"501",desc:"Not Implemented"},{status:"502",desc:"Bad Gateway"},{status:"503",desc:"Service Unavailable"},{status:"504",desc:"Gateway Timeout"}],
};
const HttpStatusCodes = () => {
  const [filter, setFilter] = useState("");
  const text = Object.entries(codes).map(([cat,items]) => {
    const filtered = items.filter(i => !filter || i.status.includes(filter) || i.desc.toLowerCase().includes(filter.toLowerCase()));
    if (!filtered.length) return "";
    return `═══ ${cat} ═══\n${filtered.map(i=>`  ${i.status} - ${i.desc}`).join("\n")}`;
  }).filter(Boolean).join("\n\n");
  return <ToolLayout>
    <div><label className="text-sm font-medium text-foreground block mb-1">Search</label><input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search by code or description..." className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <ToolOutput label="HTTP Status Codes" value={text} />
  </ToolLayout>;
};
export default HttpStatusCodes;