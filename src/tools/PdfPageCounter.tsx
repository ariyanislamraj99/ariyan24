import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";

const PdfPageCounter = () => {
  const [result, setResult] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.name.toLowerCase().endsWith(".pdf")) {
      setResult("❌ Please upload a valid PDF file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const pages = (text.match(/\/Type\s*\/Page[^s]/g) || []).length;
      const sizeKb = (file.size / 1024).toFixed(1);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setResult(`📄 File: ${file.name}\n📦 Size: ${sizeKb} KB (${sizeMb} MB)\n📃 Pages: ${pages}\n📊 Avg size per page: ${pages ? (file.size / 1024 / pages).toFixed(1) + " KB" : "N/A"}`);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <ToolLayout>
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Upload PDF File</label>
        <input type="file" accept=".pdf" onChange={handleFile} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:text-xs file:cursor-pointer" />
      </div>
      <ToolOutput label="Result" value={result} />
    </ToolLayout>
  );
};

export default PdfPageCounter;
