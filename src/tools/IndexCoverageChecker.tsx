import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const IndexCoverageChecker = () => {
  const [urls, setUrls] = useState(""); const [output, setOutput] = useState("");
  const analyze = () => {
    const list = urls.split("\n").map(u=>u.trim()).filter(Boolean);
    const results = list.map(url => {
      const issues: string[] = [];
      if (!url.startsWith("http")) issues.push("Missing protocol");
      if (url.includes("?")) issues.push("Has query parameters (may cause duplicate)");
      if (url.includes("#")) issues.push("Has fragment (not indexed separately)");
      if (url.length > 200) issues.push("URL too long");
      if (/[A-Z]/.test(url)) issues.push("Contains uppercase (may cause duplicates)");
      return `${url}\n  ${issues.length?issues.map(i=>`⚠️ ${i}`).join("\n  "):"✅ Looks good"}`;
    });
    setOutput(`Index Coverage Analysis\n${list.length} URLs checked\n\n${results.join("\n\n")}`);
  };
  return <ToolLayout>
    <ToolInput label="URLs to Check (one per line)" value={urls} onChange={setUrls} multiline rows={8} placeholder="https://example.com/page1\nhttps://example.com/page2" />
    <ToolButton onClick={analyze}>Analyze Coverage</ToolButton>
    <ToolOutput label="Coverage Report" value={output} />
  </ToolLayout>;
};
export default IndexCoverageChecker;
