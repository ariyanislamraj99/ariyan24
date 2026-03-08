import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const YtTagGenerator = () => { const [topic,sT]=useState(""); const [o,sO]=useState("");
  const gen=()=>{ const base=topic.toLowerCase().split(/\s+/); const tags=[topic,...base,`${topic} tutorial`,`${topic} guide`,`how to ${topic}`,`${topic} 2024`,`best ${topic}`,`${topic} tips`,`learn ${topic}`,`${topic} for beginners`,`${topic} explained`,`${topic} review`]; sO(tags.join(", ")); };
  return <ToolLayout><ToolInput label="Video Topic" value={topic} onChange={sT} placeholder="React hooks tutorial" /><ToolButton onClick={gen}>Generate Tags</ToolButton><ToolOutput label="Tags" value={o} /></ToolLayout>; };
export default YtTagGenerator;
