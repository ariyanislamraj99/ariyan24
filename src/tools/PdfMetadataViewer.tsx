import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";

const PdfMetadataViewer = () => {
  const [result, setResult] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const get = (key: string) => {
        const m = text.match(new RegExp(`/${key}\\s*\\(([^)]+)\\)`));
        return m ? m[1] : "N/A";
      };
      const version = text.match(/%PDF-(\d+\.\d+)/)?.[1] || "Unknown";
      const pages = (text.match(/\/Type\s*\/Page[^s]/g) || []).length;
      setResult(
        `📄 File: ${file.name}\n📦 Size: ${(file.size / 1024).toFixed(1)} KB\n📃 Pages: ${pages}\n📋 PDF Version: ${version}\n\n📌 Title: ${get("Title")}\n👤 Author: ${get("Author")}\n🛠️ Creator: ${get("Creator")}\n🖨️ Producer: ${get("Producer")}\n📅 Created: ${get("CreationDate")}\n✏️ Modified: ${get("ModDate")}`
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
      <ToolOutput label="PDF Metadata" value={result} />
    </ToolLayout>
  );
};

export default PdfMetadataViewer;
