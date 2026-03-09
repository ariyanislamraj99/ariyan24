import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";

const PdfTextExtractor = () => {
  const [result, setResult] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const raw = ev.target?.result as string;
      const btBlocks = raw.match(/BT[\s\S]*?ET/g) || [];
      let extracted = btBlocks
        .map((block) => {
          const tjMatches = block.match(/\(([^)]*)\)\s*Tj/g) || [];
          const tdMatches = block.match(/\(([^)]*)\)\s*'/g) || [];
          return [...tjMatches, ...tdMatches]
            .map((m) => m.replace(/^\(/, "").replace(/\)\s*(Tj|')$/, ""))
            .join(" ");
        })
        .filter(Boolean)
        .join("\n")
        .replace(/[^\x20-\x7E\n]/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      if (!extracted) {
        const readable = raw
          .replace(/[^\x20-\x7E\n\r\t]/g, " ")
          .replace(/\s{3,}/g, " ")
          .trim()
          .slice(0, 3000);
        extracted = readable || "No readable text found. This PDF may be image-based (scanned).";
      }
      setResult(extracted);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <ToolLayout>
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Upload PDF File</label>
        <input type="file" accept=".pdf" onChange={handleFile} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:text-xs file:cursor-pointer" />
      </div>
      <ToolOutput label="Extracted Text" value={result} />
    </ToolLayout>
  );
};

export default PdfTextExtractor;
