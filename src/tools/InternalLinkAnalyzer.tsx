import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const InternalLinkAnalyzer = () => {
  const [html, setHtml] = useState(""); const [domain, setDomain] = useState(""); const [output, setOutput] = useState("");
  const analyze = () => {
    const linkRegex = /href=["']([^"']+)["']/gi; let match;
    const internal: string[] = []; const external: string[] = []; const anchors: string[] = [];
    while ((match = linkRegex.exec(html)) !== null) {
      const url = match[1];
      if (url.startsWith("#")) anchors.push(url);
      else if (url.startsWith("/") || (domain && url.includes(domain))) internal.push(url);
      else if (url.startsWith("http")) external.push(url);
    }
    setOutput(`🔗 Link Analysis\n${"═".repeat(35)}\n\n🏠 Internal Links: ${internal.length}\n${internal.map(l=>`  • ${l}`).join("\n")}\n\n🌐 External Links: ${external.length}\n${external.map(l=>`  • ${l}`).join("\n")}\n\n⚓ Anchor Links: ${anchors.length}\n${anchors.map(l=>`  • ${l}`).join("\n")}\n\n📊 Ratio: ${internal.length}:${external.length} (internal:external)\n${internal.length<3?"⚠️ Add more internal links":"✅ Good internal linking"}`);
  };
  return <ToolLayout>
    <ToolInput label="Your Domain" value={domain} onChange={setDomain} placeholder="example.com" />
    <ToolInput label="HTML Content" value={html} onChange={setHtml} multiline rows={8} placeholder='Paste HTML with <a href="..."> links...' />
    <ToolButton onClick={analyze}>Analyze Links</ToolButton>
    <ToolOutput label="Link Analysis" value={output} />
  </ToolLayout>;
};
export default InternalLinkAnalyzer;
