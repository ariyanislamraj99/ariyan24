import { useState } from "react"; import { ToolLayout, ToolInput } from "./ToolComponents";
const MarkdownPreview = () => { const [md,sMd]=useState("# Hello\n\n**Bold** and *italic*\n\n- Item 1\n- Item 2\n\n```js\nconsole.log('hi')\n```");
  const toHtml=(s:string)=>s.replace(/^### (.+)$/gm,"<h3>$1</h3>").replace(/^## (.+)$/gm,"<h2>$1</h2>").replace(/^# (.+)$/gm,"<h1>$1</h1>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/`([^`]+)`/g,"<code class='bg-muted px-1 rounded text-sm'>$1</code>").replace(/^- (.+)$/gm,"<li>$1</li>").replace(/\n/g,"<br/>");
  return <ToolLayout><ToolInput label="Markdown" value={md} onChange={sMd} multiline rows={8} /><div className="glass rounded-xl p-6 gradient-border"><div className="prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={{__html:toHtml(md)}} /></div></ToolLayout>; };
export default MarkdownPreview;
