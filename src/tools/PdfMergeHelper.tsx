import { useState } from "react";
import { ToolLayout, ToolButton, ToolOutput } from "./ToolComponents";
import { Upload, Plus, X, ArrowUp, ArrowDown } from "lucide-react";

const PdfMergeHelper = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState("");

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setFiles(prev => [...prev, ...Array.from(newFiles).filter(f => f.type === "application/pdf")]);
  };

  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));
  
  const moveFile = (index: number, dir: -1 | 1) => {
    const newIndex = index + dir;
    if (newIndex < 0 || newIndex >= files.length) return;
    const arr = [...files];
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    setFiles(arr);
  };

  const analyze = () => {
    if (files.length < 2) { setResult("⚠️ Please add at least 2 PDF files to merge."); return; }
    
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    const report = 
      `📎 PDF Merge Plan\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Files to merge (in order):\n` +
      files.map((f, i) => `  ${i + 1}. ${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join("\n") +
      `\n\n📊 Summary:\n` +
      `  Total files: ${files.length}\n` +
      `  Combined size: ${(totalSize / 1024).toFixed(1)} KB (${(totalSize / (1024 * 1024)).toFixed(2)} MB)\n` +
      `  Est. merged size: ${((totalSize * 0.95) / 1024).toFixed(1)} KB\n\n` +
      `🛠️ Merge Commands:\n\n` +
      `Using pdftk:\n  pdftk ${files.map(f => `"${f.name}"`).join(" ")} cat output merged.pdf\n\n` +
      `Using qpdf:\n  qpdf --empty --pages ${files.map(f => `"${f.name}"`).join(" ")} -- merged.pdf\n\n` +
      `Using Python (PyPDF2):\n` +
      `  from PyPDF2 import PdfMerger\n` +
      `  merger = PdfMerger()\n` +
      files.map(f => `  merger.append("${f.name}")`).join("\n") +
      `\n  merger.write("merged.pdf")\n  merger.close()\n\n` +
      `Using Ghostscript:\n  gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=merged.pdf ${files.map(f => `"${f.name}"`).join(" ")}`;

    setResult(report);
  };

  return (
    <ToolLayout>
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Add PDF Files</label>
        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-glass-border/30 rounded-xl cursor-pointer hover:bg-muted/30 transition-colors">
          <Plus size={20} className="text-muted-foreground mb-1" />
          <span className="text-xs text-muted-foreground">Click to add PDFs</span>
          <input type="file" accept=".pdf" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
        </label>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Files ({files.length}):</label>
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 text-sm">
              <span className="text-xs text-muted-foreground w-5">{i + 1}.</span>
              <span className="flex-1 truncate text-foreground">{f.name}</span>
              <span className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(0)}KB</span>
              <button onClick={() => moveFile(i, -1)} className="p-1 hover:text-primary"><ArrowUp size={12} /></button>
              <button onClick={() => moveFile(i, 1)} className="p-1 hover:text-primary"><ArrowDown size={12} /></button>
              <button onClick={() => removeFile(i)} className="p-1 hover:text-destructive"><X size={12} /></button>
            </div>
          ))}
        </div>
      )}
      <ToolButton onClick={analyze}>Generate Merge Plan</ToolButton>
      {result && <ToolOutput label="Merge Plan & Commands" value={result} />}
    </ToolLayout>
  );
};

export default PdfMergeHelper;
