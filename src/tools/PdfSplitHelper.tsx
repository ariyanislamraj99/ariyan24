import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
import { Upload } from "lucide-react";

const PdfSplitHelper = () => {
  const [file, setFile] = useState<File | null>(null);
  const [ranges, setRanges] = useState("1-3, 4-6, 7-10");
  const [pageCount, setPageCount] = useState(0);
  const [result, setResult] = useState("");

  const onFileChange = (f: File | null) => {
    setFile(f);
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const raw = reader.result as string;
      const matches = raw.match(/\/Type\s*\/Page[^s]/g);
      setPageCount(matches ? matches.length : 0);
    };
    reader.readAsBinaryString(f);
  };

  const generate = () => {
    if (!file) { setResult("⚠️ Please upload a PDF file first."); return; }
    
    const parts = ranges.split(",").map(r => r.trim()).filter(Boolean);
    const parsedRanges = parts.map(p => {
      const m = p.match(/(\d+)\s*-\s*(\d+)/);
      if (m) return { start: parseInt(m[1]), end: parseInt(m[2]), label: p };
      const single = parseInt(p);
      if (!isNaN(single)) return { start: single, end: single, label: p };
      return null;
    }).filter(Boolean) as { start: number; end: number; label: string }[];

    const name = file.name.replace(".pdf", "");
    
    const report =
      `✂️ PDF Split Plan\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Source: ${file.name}\n` +
      `Total pages: ${pageCount || "unknown"}\n` +
      `Splits: ${parsedRanges.length}\n\n` +
      `📋 Split Details:\n` +
      parsedRanges.map((r, i) => `  Part ${i + 1}: Pages ${r.start}-${r.end} (${r.end - r.start + 1} pages) → ${name}_part${i + 1}.pdf`).join("\n") +
      `\n\n🛠️ Split Commands:\n\n` +
      `Using pdftk:\n` +
      parsedRanges.map((r, i) => `  pdftk "${file.name}" cat ${r.start}-${r.end} output ${name}_part${i + 1}.pdf`).join("\n") +
      `\n\nUsing qpdf:\n` +
      parsedRanges.map((r, i) => `  qpdf "${file.name}" --pages . ${r.start}-${r.end} -- ${name}_part${i + 1}.pdf`).join("\n") +
      `\n\nUsing Python (PyPDF2):\n` +
      `  from PyPDF2 import PdfReader, PdfWriter\n` +
      `  reader = PdfReader("${file.name}")\n` +
      parsedRanges.map((r, i) =>
        `  writer${i + 1} = PdfWriter()\n` +
        `  for p in range(${r.start - 1}, ${r.end}):\n` +
        `      writer${i + 1}.add_page(reader.pages[p])\n` +
        `  writer${i + 1}.write("${name}_part${i + 1}.pdf")`
      ).join("\n") +
      `\n\nUsing Ghostscript:\n` +
      parsedRanges.map((r, i) => `  gs -dBATCH -dNOPAUSE -dFirstPage=${r.start} -dLastPage=${r.end} -sDEVICE=pdfwrite -sOutputFile=${name}_part${i + 1}.pdf "${file.name}"`).join("\n");

    setResult(report);
  };

  return (
    <ToolLayout>
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Upload PDF</label>
        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-glass-border/30 rounded-xl cursor-pointer hover:bg-muted/30 transition-colors">
          <Upload size={20} className="text-muted-foreground mb-1" />
          <span className="text-xs text-muted-foreground">{file ? `${file.name}${pageCount ? ` (${pageCount} pages)` : ""}` : "Choose PDF file"}</span>
          <input type="file" accept=".pdf" className="hidden" onChange={(e) => onFileChange(e.target.files?.[0] || null)} />
        </label>
      </div>
      <ToolInput label="Page Ranges (comma-separated, e.g. 1-3, 4-6, 7)" value={ranges} onChange={setRanges} />
      <ToolButton onClick={generate}>Generate Split Plan</ToolButton>
      {result && <ToolOutput label="Split Plan & Commands" value={result} />}
    </ToolLayout>
  );
};

export default PdfSplitHelper;
