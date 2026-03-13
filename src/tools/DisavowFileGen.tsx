import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const DisavowFileGen = () => {
  const [urls, setUrls] = useState(""); const [output, setOutput] = useState("");
  const generate = () => {
    const lines = urls.split("\n").map(u=>u.trim()).filter(Boolean);
    const result = [`# Disavow file generated on ${new Date().toISOString().split("T")[0]}`, `# Total entries: ${lines.length}`, ""];
    lines.forEach(url => {
      try {
        const parsed = new URL(url.startsWith("http")?url:`https://${url}`);
        result.push(`domain:${parsed.hostname}`);
      } catch {
        result.push(url.startsWith("domain:") ? url : `domain:${url}`);
      }
    });
    setOutput(result.join("\n"));
  };
  return <ToolLayout>
    <ToolInput label="Toxic URLs/Domains (one per line)" value={urls} onChange={setUrls} multiline rows={8} placeholder="spam-site.com\nhttps://bad-links.com/page\ntoxic-domain.net" />
    <ToolButton onClick={generate}>Generate Disavow File</ToolButton>
    <div className="text-xs text-muted-foreground">Upload this file to Google Search Console's Disavow Tool</div>
    <ToolOutput label="Disavow File Content" value={output} />
  </ToolLayout>;
};
export default DisavowFileGen;
