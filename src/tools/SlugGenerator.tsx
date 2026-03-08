import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const SlugGenerator = () => { const [t,sT]=useState(""); const slug=t.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_]+/g,"-").replace(/-+/g,"-"); return <ToolLayout><ToolInput label="Title or Text" value={t} onChange={sT} placeholder="My Blog Post Title" /><ToolOutput label="URL Slug" value={slug} /></ToolLayout>; };
export default SlugGenerator;
