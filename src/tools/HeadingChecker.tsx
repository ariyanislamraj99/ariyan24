import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const HeadingChecker = () => { const [t,sT]=useState(""); const [o,sO]=useState("");
  const check=()=>{ const matches=[...t.matchAll(/<h([1-6])[^>]*>(.*?)<\/h\1>/gi)]; if(!matches.length){ sO("No headings found"); return; } sO(matches.map(m=>`H${m[1]}: ${m[2].replace(/<[^>]*>/g,"")}`).join("\n")); };
  return <ToolLayout><ToolInput label="HTML" value={t} onChange={sT} multiline rows={6} placeholder="<h1>Title</h1><h2>Sub</h2>" /><ToolButton onClick={check}>Analyze Headings</ToolButton><ToolOutput label="Heading Structure" value={o} /></ToolLayout>; };
export default HeadingChecker;
