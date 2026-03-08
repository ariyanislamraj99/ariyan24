import { useState } from "react"; import { ToolLayout, ToolOutput, ToolButton, ToolNumber } from "./ToolComponents";
const WpPasswordGen = () => { const [len,sL]=useState(24); const [o,sO]=useState("");
  const gen=()=>{const c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";sO(Array.from({length:len},()=>c[Math.floor(Math.random()*c.length)]).join(""))};
  return <ToolLayout><ToolNumber label="Length" value={len} onChange={sL} min={8} max={64} /><ToolButton onClick={gen}>Generate WP Password</ToolButton><ToolOutput label="Password" value={o} /></ToolLayout>; };
export default WpPasswordGen;
