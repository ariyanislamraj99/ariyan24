import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";

const PdfSizeAnalyzer = () => {
  const [result, setResult] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const raw = ev.target?.result as string;
      const pages = (raw.match(/\/Type\s*\/Page[^s]/g) || []).length;
      const images = (raw.match(/\/Subtype\s*\/Image/g) || []).length;
      const fonts = (raw.match(/\/Type\s*\/Font/g) || []).length;
      const streams = (raw.match(/stream\r?\n/g) || []).length;
      const sizeKb = file.size / 1024;
      const sizeMb = sizeKb / 1024;

      let rating = "✅ Optimized";
      if (pages > 0 && sizeKb / pages > 500) rating = "⚠️ Large - consider compressing";
      if (pages > 0 && sizeKb / pages > 1000) rating = "❌ Very large - needs optimization";

      setResult(
        `📄 File: ${file.name}\n📦 Size: ${sizeKb.toFixed(1)} KB (${sizeMb.toFixed(2)} MB)\n📃 Pages: ${pages}\n\n📊 Analysis:\n• Images found: ${images}\n• Fonts embedded: ${fonts}\n• Data streams: ${streams}\n• Avg per page: ${pages ? (sizeKb / pages).toFixed(1) + " KB" : "N/A"}\n\n${rating}\n\n💡 Tips:\n${images > 5 ? "• Compress images to reduce size\n" : ""}${sizeKb > 5000 ? "• Consider splitting into smaller files\n" : ""}${fonts > 10 ? "• Reduce embedded fonts\n" : ""}• Use PDF compression tools for best results`
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
      <ToolOutput label="Size Analysis" value={result} />
    </ToolLayout>
  );
};

export default PdfSizeAnalyzer;
