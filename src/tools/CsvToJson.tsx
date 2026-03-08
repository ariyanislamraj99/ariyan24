import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const CsvToJson = () => { const [csv,sC]=useState(""); const [o,sO]=useState("");
  const convert=()=>{ const lines=csv.trim().split("\n"); const headers=lines[0].split(",").map(h=>h.trim()); const result=lines.slice(1).map(line=>{const vals=line.split(",");const obj:any={};headers.forEach((h,i)=>obj[h]=vals[i]?.trim()||"");return obj;}); sO(JSON.stringify(result,null,2)); };
  return <ToolLayout><ToolInput label="CSV" value={csv} onChange={sC} multiline rows={6} placeholder="name,age,email&#10;John,30,john@test.com" /><ToolButton onClick={convert}>Convert to JSON</ToolButton><ToolOutput label="JSON" value={o} /></ToolLayout>; };
export default CsvToJson;
