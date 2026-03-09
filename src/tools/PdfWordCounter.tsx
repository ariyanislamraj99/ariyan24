import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";

const PdfWordCounter = () => {
  const [result, setResult] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const raw = ev.target?.result as string;
      const btBlocks = raw.match(/BT[\s\S]*?ET/g) || [];
      const text = btBlocks
        .map((block) => {
          const tjMatches = block.match(/\(([^)]*)\)\s*Tj/g) || [];
          return tjMatches.map((m) => m.replace(/^\(/, "").replace(/\)\s*Tj$/, "")).join(" ");
        })
        .join(" ")
        .replace(/[^\x20-\x7E]/g, " ");

      const words = text.split(/\s+/).filter((w) => w.length > 0);
      const chars = text.replace(/\s/g, "").length;
      const sentences = text.split(/[.!?]+/).filter(Boolean).length;
      const readTime = Math.ceil(words.length / 200);

      setResult(
        `📄 File: ${file.name}\n\n📝 Words: ${words.length.toLocaleString()}\n🔤 Characters: ${chars.toLocaleString()}\n📋 Sentences: ~${sentences}\n⏱️ Read time: ~${readTime} min\n📊 Avg word length: ${words.length ? (chars / words.length).toFixed(1) : "0"} chars`
      );
    };
    reader.readAsBinaryString(file);
  };

  return (
    <ToolLayout>
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Upload PDF File</label>
        <input type="file" accept=".pdf" onChange={handleFile} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:text-xs file:cursor-pointer" />
      </div>
      <ToolOutput label="Word Count" value={result} />
    </ToolLayout>
  );
};

export default PdfWordCounter;
