import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const MarkdownToHtml = () => { const [md,sMd]=useState("");
  const toHtml=(s:string)=>s.replace(/^### (.+)$/gm,"<h3>$1</h3>").replace(/^## (.+)$/gm,"<h2>$1</h2>").replace(/^# (.+)$/gm,"<h1>$1</h1>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/`([^`]+)`/g,"<code>$1</code>").replace(/^- (.+)$/gm,"<li>$1</li>").replace(/\n\n/g,"<br/><br/>").replace(/\n/g,"<br/>");
  return <ToolLayout><ToolInput label="Markdown" value={md} onChange={sMd} multiline rows={6} /><ToolOutput label="HTML" value={toHtml(md)} /></ToolLayout>; };
export default MarkdownToHtml;
