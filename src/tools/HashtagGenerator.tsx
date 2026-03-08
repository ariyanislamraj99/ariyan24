import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const HashtagGenerator = () => { const [topic,sT]=useState(""); const [o,sO]=useState("");
  const gen=()=>{const words=topic.toLowerCase().split(/\s+/);const tags=[...words.map(w=>`#${w}`),`#${words.join("")}`,`#${topic.replace(/\s+/g,"")}`,`#${words[0]}tips`,`#${words[0]}life`,`#${words[0]}daily`,`#${words[0]}lover`];sO(tags.join(" "))};
  return <ToolLayout><ToolInput label="Topic" value={topic} onChange={sT} placeholder="web development" /><ToolButton onClick={gen}>Generate</ToolButton><ToolOutput label="Hashtags" value={o} /></ToolLayout>; };
export default HashtagGenerator;
