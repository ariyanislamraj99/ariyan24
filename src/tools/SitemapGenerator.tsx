import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton, ToolNumber } from "./ToolComponents";
const SitemapGenerator = () => {
  const [urls, setUrls] = useState(""); const [output, setOutput] = useState("");
  const gen = () => { const u = urls.split("\n").filter(Boolean); let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'; u.forEach(url => { xml += `  <url>\n    <loc>${url.trim()}</loc>\n    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`; }); xml += "</urlset>"; setOutput(xml); };
  return <ToolLayout><ToolInput label="URLs (one per line)" value={urls} onChange={setUrls} multiline rows={6} placeholder="https://example.com\nhttps://example.com/about" /><ToolButton onClick={gen}>Generate Sitemap</ToolButton><ToolOutput label="sitemap.xml" value={output} /></ToolLayout>;
};
export default SitemapGenerator;
