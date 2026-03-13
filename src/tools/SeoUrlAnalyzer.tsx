import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const SeoUrlAnalyzer = () => {
  const [url, setUrl] = useState("");
  const analyze = () => {
    if (!url) return "";
    const issues: string[] = [];
    try {
      const parsed = new URL(url.startsWith("http")?url:`https://${url}`);
      issues.push(`Protocol: ${parsed.protocol} ${parsed.protocol==="https:"?"✅":"⚠️ Use HTTPS"}`);
      issues.push(`Path: ${parsed.pathname}`);
      issues.push(`Length: ${url.length} chars ${url.length>75?"⚠️ Too long":"✅"}`);
      if (parsed.pathname.includes("_")) issues.push("⚠️ Use hyphens instead of underscores");
      else issues.push("✅ No underscores");
      if (/[A-Z]/.test(parsed.pathname)) issues.push("⚠️ Contains uppercase letters");
      else issues.push("✅ All lowercase");
      if (parsed.pathname.split("/").some(s=>s.length>50)) issues.push("⚠️ Slug segment too long");
      if (parsed.search) issues.push(`⚠️ Has query parameters: ${parsed.search}`);
      if (parsed.hash) issues.push(`⚠️ Has fragment: ${parsed.hash}`);
      const depth = parsed.pathname.split("/").filter(Boolean).length;
      issues.push(`Depth: ${depth} ${depth>3?"⚠️ Deep URL structure":"✅"}`);
    } catch { issues.push("❌ Invalid URL"); }
    return issues.join("\n");
  };
  return <ToolLayout>
    <ToolInput label="URL to Analyze" value={url} onChange={setUrl} placeholder="https://example.com/my-page" />
    <ToolOutput label="URL SEO Analysis" value={analyze()} />
  </ToolLayout>;
};
export default SeoUrlAnalyzer;
