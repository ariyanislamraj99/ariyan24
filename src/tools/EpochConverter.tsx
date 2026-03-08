import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const EpochConverter = () => { const [ts,sT]=useState(String(Math.floor(Date.now()/1000))); const n=Number(ts); const d=ts.length>10?new Date(n):new Date(n*1000);
  return <ToolLayout><ToolInput label="Epoch Timestamp" value={ts} onChange={sT} /><ToolButton onClick={()=>sT(String(Math.floor(Date.now()/1000)))}>Now</ToolButton>{!isNaN(d.getTime())&&<ToolOutput label="Date" value={`UTC: ${d.toUTCString()}\nLocal: ${d.toLocaleString()}\nISO: ${d.toISOString()}`} />}</ToolLayout>; };
export default EpochConverter;
