import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const TechnicalSeoChecker = () => {
  const [html, setHtml] = useState(""); const [output, setOutput] = useState("");
  const check = () => {
    const c: string[] = [];
    c.push(`${html.includes('charset')?"✅":"❌"} Character encoding declared`);
    c.push(`${html.includes('viewport')?"✅":"❌"} Viewport meta tag`);
    c.push(`${html.includes('<title')?"✅":"❌"} Title tag present`);
    c.push(`${html.includes('description')?"✅":"❌"} Meta description`);
    c.push(`${html.includes('canonical')?"✅":"❌"} Canonical tag`);
    c.push(`${html.includes('lang=')?"✅":"❌"} Language attribute`);
    c.push(`${html.includes('alt=')?"✅":"⚠️"} Image alt attributes`);
    c.push(`${html.includes('<h1')?"✅":"❌"} H1 tag present`);
    c.push(`${!html.includes('http://')?"✅":"⚠️"} No mixed content (HTTP in HTTPS)`);
    c.push(`${html.includes('rel="nofollow"')||!html.includes('nofollow')?"✅":"⚠️"} Nofollow usage checked`);
    const pass = c.filter(x=>x.startsWith("✅")).length;
    setOutput(`Technical SEO Score: ${pass}/${c.length}\n\n${c.join("\n")}`);
  };
  return <ToolLayout>
    <ToolInput label="HTML Source" value={html} onChange={setHtml} multiline rows={10} placeholder="Paste page HTML source..." />
    <ToolButton onClick={check}>Check Technical SEO</ToolButton>
    <ToolOutput label="Technical SEO Report" value={output} />
  </ToolLayout>;
};
export default TechnicalSeoChecker;
