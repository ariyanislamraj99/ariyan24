import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const BrokenLinkChecker = () => {
  const [html, setHtml] = useState("");
  const [output, setOutput] = useState("");
  const check = () => {
    const linkRegex = /href=["']([^"']+)["']/gi;
    const links: string[] = [];
    let m;
    while ((m = linkRegex.exec(html)) !== null) links.push(m[1]);
    if (!links.length) { setOutput("No links found in the HTML."); return; }
    const results = links.map((l, i) => {
      const isRelative = !l.startsWith("http") && !l.startsWith("//");
      const hasHash = l.startsWith("#");
      const isMail = l.startsWith("mailto:");
      let status = "✅ OK (external)";
      if (hasHash) status = "🔗 Anchor link";
      else if (isMail) status = "📧 Email link";
      else if (isRelative) status = "📁 Relative path";
      return `${i + 1}. ${l}\n   Status: ${status}`;
    });
    setOutput(`Found ${links.length} links:\n\n${results.join("\n\n")}\n\n💡 For live broken link checking, use:\n- Screaming Frog\n- Ahrefs Site Audit\n- https://www.brokenlinkcheck.com/`);
  };
  return <ToolLayout><ToolInput label="Paste HTML" value={html} onChange={setHtml} multiline rows={6} placeholder="<a href='https://example.com'>Link</a>" /><ToolButton onClick={check}>Check Links</ToolButton><ToolOutput label="Link Report" value={output} /></ToolLayout>;
};
export default BrokenLinkChecker;