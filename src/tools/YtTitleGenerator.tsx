import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const YtTitleGenerator = () => { const [topic,sT]=useState(""); const [o,sO]=useState("");
  const gen=()=>{ const titles=[`🔥 ${topic} - Complete Guide for Beginners`,`${topic}: Everything You Need to Know in 2024`,`How to ${topic} (Step by Step Tutorial)`,`${topic} Made Easy | Full Tutorial`,`I Tried ${topic} for 30 Days - Here's What Happened`,`The ULTIMATE ${topic} Guide`,`${topic} Tips That Will Blow Your Mind`,`Why ${topic} Will Change Everything`,`${topic} in 10 Minutes (Quick Guide)`,`Stop Making These ${topic} Mistakes!`]; sO(titles.join("\n")); };
  return <ToolLayout><ToolInput label="Video Topic" value={topic} onChange={sT} placeholder="React hooks" /><ToolButton onClick={gen}>Generate Titles</ToolButton><ToolOutput label="Title Ideas" value={o} /></ToolLayout>; };
export default YtTitleGenerator;
