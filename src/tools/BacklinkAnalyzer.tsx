import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const BacklinkAnalyzer = () => {
  const [links, setLinks] = useState(""); const [output, setOutput] = useState("");
  const analyze = () => {
    const urls = links.split("\n").map(l=>l.trim()).filter(Boolean);
    const domains = urls.map(u => { try { return new URL(u.startsWith("http")?u:`https://${u}`).hostname; } catch { return u; }});
    const unique = new Set(domains);
    const tlds: Record<string,number> = {};
    domains.forEach(d => { const tld = d.split(".").pop()||""; tlds[tld] = (tlds[tld]||0) + 1; });
    setOutput(`🔗 Backlink Profile Analysis\n${"═".repeat(35)}\n\n📊 Total Backlinks: ${urls.length}\n🌐 Unique Domains: ${unique.size}\n📈 Domain Diversity: ${((unique.size/Math.max(urls.length,1))*100).toFixed(0)}%\n\n🏷️ TLD Distribution:\n${Object.entries(tlds).map(([t,c])=>`  .${t}: ${c} (${((c/urls.length)*100).toFixed(0)}%)`).join("\n")}\n\n${unique.size<5?"⚠️ Low domain diversity - get links from more domains":"✅ Good domain diversity"}\n${urls.length>0?`\n🌐 Unique Referring Domains:\n${[...unique].map(d=>`  • ${d}`).join("\n")}`:""}`);
  };
  return <ToolLayout>
    <ToolInput label="Backlink URLs (one per line)" value={links} onChange={setLinks} multiline rows={8} placeholder="https://example.com/page1\nhttps://blog.site.com/post" />
    <ToolButton onClick={analyze}>Analyze Backlinks</ToolButton>
    <ToolOutput label="Backlink Analysis" value={output} />
  </ToolLayout>;
};
export default BacklinkAnalyzer;
