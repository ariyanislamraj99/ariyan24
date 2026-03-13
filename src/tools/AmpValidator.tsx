import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const AmpValidator = () => {
  const [html, setHtml] = useState(""); const [output, setOutput] = useState("");
  const validate = () => {
    const issues: string[] = [];
    if (!html.includes("⚡") && !html.includes("amp")) issues.push("❌ Missing ⚡ or amp attribute on <html>");
    if (!html.includes("amp-boilerplate")) issues.push("❌ Missing AMP boilerplate CSS");
    if (!html.includes("cdn.ampproject.org")) issues.push("❌ Missing AMP runtime script");
    if (html.includes("<script") && !html.includes("cdn.ampproject.org") && !html.includes("application/ld+json")) issues.push("❌ Custom JavaScript not allowed in AMP");
    if (!html.includes('rel="canonical"')) issues.push("❌ Missing canonical link");
    if (!html.includes("charset")) issues.push("⚠️ Missing charset declaration");
    if (html.includes("<img") && !html.includes("amp-img")) issues.push("❌ Use <amp-img> instead of <img>");
    if (html.includes("<video") && !html.includes("amp-video")) issues.push("❌ Use <amp-video> instead of <video>");
    if (issues.length === 0 && html.length > 0) issues.push("✅ No obvious AMP issues found!");
    else if (html.length === 0) issues.push("Paste AMP HTML to validate");
    setOutput(`AMP Validation Results\n${"═".repeat(35)}\n\n${issues.join("\n")}\n\n📖 AMP docs: https://amp.dev/documentation/`);
  };
  return <ToolLayout>
    <ToolInput label="AMP HTML" value={html} onChange={setHtml} multiline rows={10} placeholder="Paste your AMP HTML..." />
    <ToolButton onClick={validate}>Validate AMP</ToolButton>
    <ToolOutput label="Validation Results" value={output} />
  </ToolLayout>;
};
export default AmpValidator;
