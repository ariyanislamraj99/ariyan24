import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const RobotsTxtGenerator = () => {
  const [sitemap, setSitemap] = useState(""); const [disallow, setDisallow] = useState(""); const [output, setOutput] = useState("");
  const gen = () => { let r = "User-agent: *\n"; disallow.split(",").map(d => d.trim()).filter(Boolean).forEach(d => r += `Disallow: ${d}\n`); r += "Allow: /\n"; if (sitemap) r += `\nSitemap: ${sitemap}`; setOutput(r); };
  return <ToolLayout><ToolInput label="Sitemap URL" value={sitemap} onChange={setSitemap} placeholder="https://example.com/sitemap.xml" /><ToolInput label="Disallow paths (comma-separated)" value={disallow} onChange={setDisallow} placeholder="/admin, /private" /><ToolButton onClick={gen}>Generate</ToolButton><ToolOutput label="robots.txt" value={output} /></ToolLayout>;
};
export default RobotsTxtGenerator;
