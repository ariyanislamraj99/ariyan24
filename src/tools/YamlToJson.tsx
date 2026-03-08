import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const YamlToJson = () => { const [y,sY]=useState(""); const [o,sO]=useState("");
  const convert=()=>{try{const lines=y.split("\n");const obj:any={};lines.forEach(l=>{const[k,...v]=l.split(":");if(k.trim())obj[k.trim()]=v.join(":").trim()});sO(JSON.stringify(obj,null,2))}catch{sO("Invalid YAML")}};
  return <ToolLayout><ToolInput label="YAML" value={y} onChange={sY} multiline rows={6} placeholder="name: John&#10;age: 30" /><button onClick={convert} className="px-6 py-2.5 rounded-xl text-sm font-medium gradient-bg text-primary-foreground">Convert</button><ToolOutput label="JSON" value={o} /></ToolLayout>; };
export default YamlToJson;
