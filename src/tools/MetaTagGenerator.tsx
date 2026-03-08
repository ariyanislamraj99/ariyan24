import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const MetaTagGenerator = () => {
  const [title, setTitle] = useState(""); const [desc, setDesc] = useState(""); const [keys, setKeys] = useState(""); const [output, setOutput] = useState("");
  const gen = () => setOutput(`<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${title}</title>\n<meta name="description" content="${desc}">\n<meta name="keywords" content="${keys}">\n<meta name="robots" content="index, follow">`);
  return <ToolLayout><ToolInput label="Title" value={title} onChange={setTitle} placeholder="My Website" /><ToolInput label="Description" value={desc} onChange={setDesc} placeholder="A brief description..." /><ToolInput label="Keywords" value={keys} onChange={setKeys} placeholder="web, tools, seo" /><ToolButton onClick={gen}>Generate Meta Tags</ToolButton><ToolOutput label="Meta Tags" value={output} /></ToolLayout>;
};
export default MetaTagGenerator;
