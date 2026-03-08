import { useState } from "react"; import { ToolLayout, ToolOutput, ToolButton, ToolNumber } from "./ToolComponents";
const UuidGenerator = () => { const [count,sC]=useState(1); const [uuids,sU]=useState("");
  const gen=()=>{ const r=[]; for(let i=0;i<count;i++) r.push(crypto.randomUUID()); sU(r.join("\n")); };
  return <ToolLayout><ToolNumber label="Count" value={count} onChange={sC} min={1} max={100} /><ToolButton onClick={gen}>Generate UUIDs</ToolButton><ToolOutput label="UUIDs" value={uuids} /></ToolLayout>; };
export default UuidGenerator;
