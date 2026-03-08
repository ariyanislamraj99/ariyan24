import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const TimestampConverter = () => { const [ts,sTs]=useState(String(Math.floor(Date.now()/1000))); const [o,sO]=useState("");
  const convert=()=>{ const n=Number(ts); const d=ts.length>10?new Date(n):new Date(n*1000); sO(`UTC: ${d.toUTCString()}\nLocal: ${d.toLocaleString()}\nISO: ${d.toISOString()}`); };
  const now=()=>{ const n=Math.floor(Date.now()/1000); sTs(String(n)); };
  return <ToolLayout><ToolInput label="Unix Timestamp" value={ts} onChange={sTs} /><div className="flex gap-2"><ToolButton onClick={convert}>Convert</ToolButton><ToolButton onClick={now} variant="secondary">Now</ToolButton></div><ToolOutput label="Date" value={o} /></ToolLayout>; };
export default TimestampConverter;
