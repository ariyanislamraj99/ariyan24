import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const OpenGraphGenerator = () => {
  const [title, setTitle] = useState(""); const [desc, setDesc] = useState(""); const [url, setUrl] = useState(""); const [img, setImg] = useState(""); const [output, setOutput] = useState("");
  const gen = () => setOutput(`<meta property="og:title" content="${title}">\n<meta property="og:description" content="${desc}">\n<meta property="og:url" content="${url}">\n<meta property="og:image" content="${img}">\n<meta property="og:type" content="website">`);
  return <ToolLayout><ToolInput label="Title" value={title} onChange={setTitle} placeholder="Page Title" /><ToolInput label="Description" value={desc} onChange={setDesc} placeholder="Page description" /><ToolInput label="URL" value={url} onChange={setUrl} placeholder="https://example.com" /><ToolInput label="Image URL" value={img} onChange={setImg} placeholder="https://example.com/image.jpg" /><ToolButton onClick={gen}>Generate OG Tags</ToolButton><ToolOutput label="Open Graph Tags" value={output} /></ToolLayout>;
};
export default OpenGraphGenerator;
