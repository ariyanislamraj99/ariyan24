import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const TwitterCardGen = () => { const [title,sT]=useState(""); const [desc,sD]=useState(""); const [img,sI]=useState(""); const [site,sS]=useState("");
  const out=`<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${title}">\n<meta name="twitter:description" content="${desc}">\n<meta name="twitter:image" content="${img}">\n<meta name="twitter:site" content="${site}">`;
  return <ToolLayout><ToolInput label="Title" value={title} onChange={sT} /><ToolInput label="Description" value={desc} onChange={sD} /><ToolInput label="Image URL" value={img} onChange={sI} /><ToolInput label="@username" value={site} onChange={sS} /><ToolOutput label="Twitter Card Tags" value={out} /></ToolLayout>; };
export default TwitterCardGen;
