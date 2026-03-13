import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const HtmlSitemapGen = () => {
  const [urls, setUrls] = useState(""); const [output, setOutput] = useState("");
  const generate = () => {
    const list = urls.split("\n").map(u=>u.trim()).filter(Boolean);
    const groups: Record<string,string[]> = {};
    list.forEach(url => {
      try { const p = new URL(url.startsWith("http")?url:`https://${url}`); const seg = p.pathname.split("/").filter(Boolean)[0]||"Home"; groups[seg]=(groups[seg]||[]); groups[seg].push(url); } catch { groups["Other"]=(groups["Other"]||[]); groups["Other"].push(url); }
    });
    const html = `<nav class="sitemap">\n  <h2>Sitemap</h2>\n${Object.entries(groups).map(([cat,urls])=>`  <h3>${cat.charAt(0).toUpperCase()+cat.slice(1)}</h3>\n  <ul>\n${urls.map(u=>`    <li><a href="${u}">${u}</a></li>`).join("\n")}\n  </ul>`).join("\n")}\n</nav>`;
    setOutput(html);
  };
  return <ToolLayout>
    <ToolInput label="URLs (one per line)" value={urls} onChange={setUrls} multiline rows={8} placeholder="https://example.com\nhttps://example.com/about\nhttps://example.com/blog/post-1" />
    <ToolButton onClick={generate}>Generate HTML Sitemap</ToolButton>
    <ToolOutput label="HTML Sitemap" value={output} />
  </ToolLayout>;
};
export default HtmlSitemapGen;
