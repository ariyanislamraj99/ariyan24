import { useState } from "react"; import { ToolLayout, ToolOutput, ToolButton, ToolNumber } from "./ToolComponents";
const RandomString = () => { const [len,sL]=useState(16); const [o,sO]=useState("");
  const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  const gen=()=>sO(Array.from({length:len},()=>chars[Math.floor(Math.random()*chars.length)]).join(""));
  return <ToolLayout><ToolNumber label="Length" value={len} onChange={sL} min={1} max={256} /><ToolButton onClick={gen}>Generate</ToolButton><ToolOutput label="Random String" value={o} /></ToolLayout>; };
export default RandomString;
