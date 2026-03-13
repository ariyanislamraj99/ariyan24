import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput, ToolSelect } from "./ToolComponents";
const XmlSitemapGenAdv = () => {
  const [urls, setUrls] = useState(""); const [freq, setFreq] = useState("weekly"); const [output, setOutput] = useState("");
  const generate = () => {
    const list = urls.split("\n").map(u=>u.trim()).filter(Boolean);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${list.map((url,i) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${i===0?"1.0":"0.8"}</priority>\n  </url>`).join("\n")}\n</urlset>`;
    setOutput(xml);
  };
  return <ToolLayout>
    <ToolInput label="URLs (one per line)" value={urls} onChange={setUrls} multiline rows={8} placeholder="https://example.com\nhttps://example.com/about" />
    <ToolSelect label="Change Frequency" value={freq} onChange={setFreq} options={[{value:"always",label:"Always"},{value:"hourly",label:"Hourly"},{value:"daily",label:"Daily"},{value:"weekly",label:"Weekly"},{value:"monthly",label:"Monthly"},{value:"yearly",label:"Yearly"}]} />
    <ToolButton onClick={generate}>Generate Sitemap</ToolButton>
    <ToolOutput label="XML Sitemap" value={output} />
  </ToolLayout>;
};
export default XmlSitemapGenAdv;
