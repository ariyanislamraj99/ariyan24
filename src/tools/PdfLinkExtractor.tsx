import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";

const PdfLinkExtractor = () => {
  const [result, setResult] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const raw = ev.target?.result as string;
      const uriMatches = raw.match(/\/URI\s*\(([^)]+)\)/g) || [];
      const urls = uriMatches.map((m) => m.replace(/\/URI\s*\(/, "").replace(/\)$/, ""));
      const httpMatches = raw.match(/https?:\/\/[^\s)<>"\]]+/g) || [];
      const allUrls = [...new Set([...urls, ...httpMatches])].filter(
        (u) => u.length > 10 && !u.includes("\\") && !u.match(/^https?:\/\/[a-f0-9]+$/)
      );

      if (allUrls.length === 0) {
        setResult("No links found in this PDF.");
      } else {
        setResult(`🔗 Found ${allUrls.length} link(s):\n\n${allUrls.join("\n")}`);
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <ToolLayout>
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Upload PDF File</label>
        <input type="file" accept=".pdf" onChange={handleFile} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:text-xs file:cursor-pointer" />
      </div>
      <ToolOutput label="Links Found" value={result} />
    </ToolLayout>
  );
};

export default PdfLinkExtractor;
