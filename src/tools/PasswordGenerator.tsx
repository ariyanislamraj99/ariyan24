import { useState } from "react"; import { ToolLayout, ToolOutput, ToolButton, ToolNumber } from "./ToolComponents";
const PasswordGenerator = () => { const [len,sL]=useState(16); const [o,sO]=useState("");
  const gen=()=>{const c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";sO(Array.from({length:len},()=>c[Math.floor(Math.random()*c.length)]).join(""))};
  return <ToolLayout><ToolNumber label="Length" value={len} onChange={sL} min={4} max={128} /><ToolButton onClick={gen}>Generate Password</ToolButton><ToolOutput label="Password" value={o} /></ToolLayout>; };
export default PasswordGenerator;
