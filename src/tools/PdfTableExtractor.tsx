import { useState } from "react";
import { ToolLayout, ToolButton, ToolOutput } from "./ToolComponents";
import { Upload } from "lucide-react";

const PdfTableExtractor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");

  const extract = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const raw = reader.result as string;
      const lines: string[] = [];
      const streamRegex = /stream\s*([\s\S]*?)\s*endstream/g;
      let match;
      while ((match = streamRegex.exec(raw)) !== null) {
        const text = match[1].replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s+/g, " ").trim();
        if (text.length > 5) lines.push(text);
      }

      // Detect table-like patterns (lines with consistent delimiters)
      const tableLines: string[] = [];
      const allText = lines.join("\n");
      const rows = allText.split(/[\n\r]+/);
      
      for (const row of rows) {
        // Lines with multiple spaces, tabs, or pipe-like separations suggest table data
        const parts = row.split(/\s{2,}|\t+|\|/).filter(p => p.trim().length > 0);
        if (parts.length >= 2 && parts.length <= 15) {
          tableLines.push(parts.join(" | "));
        }
      }

      if (tableLines.length > 0) {
        // Convert to CSV format
        const csv = tableLines.map(line => 
          line.split(" | ").map(cell => `"${cell.trim()}"`).join(",")
        ).join("\n");
        
        setResult(
          `📋 Extracted Table Data (${tableLines.length} rows)\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `Table Preview:\n${tableLines.slice(0, 50).join("\n")}\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `CSV Format:\n${csv.slice(0, 3000)}`
        );
      } else {
        setResult("⚠️ No clear table structures detected in this PDF.\n\nTip: This tool works best with PDFs that contain data tables with clear column separation.");
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <ToolLayout>
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Upload PDF</label>
        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-glass-border/30 rounded-xl cursor-pointer hover:bg-muted/30 transition-colors">
          <Upload size={20} className="text-muted-foreground mb-1" />
          <span className="text-xs text-muted-foreground">{file ? file.name : "Choose PDF file"}</span>
          <input type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>
      </div>
      <ToolButton onClick={extract}>Extract Tables</ToolButton>
      {result && <ToolOutput label="Extracted Tables" value={result} />}
    </ToolLayout>
  );
};

export default PdfTableExtractor;
