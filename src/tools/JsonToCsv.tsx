import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const JsonToCsv = () => { const [json,sJ]=useState(""); const [o,sO]=useState("");
  const convert=()=>{ try { const arr=JSON.parse(json); if(!Array.isArray(arr)){sO("Input must be an array");return;} const headers=Object.keys(arr[0]); const csv=[headers.join(","),...arr.map((r:any)=>headers.map(h=>String(r[h]||"")).join(","))].join("\n"); sO(csv); } catch{sO("Invalid JSON")} };
  return <ToolLayout><ToolInput label="JSON Array" value={json} onChange={sJ} multiline rows={6} placeholder='[{"name":"John","age":30}]' /><ToolButton onClick={convert}>Convert to CSV</ToolButton><ToolOutput label="CSV" value={o} /></ToolLayout>; };
export default JsonToCsv;
