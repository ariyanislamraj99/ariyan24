import { useState } from "react";
import { ToolLayout, ToolButton, ToolOutput } from "./ToolComponents";
import { Upload, FileText } from "lucide-react";

const PdfCompare = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [result, setResult] = useState("");

  const readPdfText = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const raw = reader.result as string;
        const textParts: string[] = [];
        const streamRegex = /stream\s*([\s\S]*?)\s*endstream/g;
        let match;
        while ((match = streamRegex.exec(raw)) !== null) {
          const cleaned = match[1]
            .replace(/[^\x20-\x7E\n\r\t]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          if (cleaned.length > 10) textParts.push(cleaned);
        }
        resolve(textParts.join("\n") || "[Could not extract readable text]");
      };
      reader.readAsBinaryString(file);
    });

  const compare = async () => {
    if (!file1 || !file2) return;
    const [text1, text2] = await Promise.all([readPdfText(file1), readPdfText(file2)]);
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const maxLen = Math.max(lines1.length, lines2.length);
    let same = 0, diff = 0;
    const diffs: string[] = [];
    for (let i = 0; i < maxLen; i++) {
      const l1 = lines1[i] || "";
      const l2 = lines2[i] || "";
      if (l1 === l2) { same++; }
      else {
        diff++;
        if (diffs.length < 20) {
          diffs.push(`Line ${i + 1}:\n  File 1: ${l1.slice(0, 100)}\n  File 2: ${l2.slice(0, 100)}`);
        }
      }
    }
    const similarity = maxLen > 0 ? ((same / maxLen) * 100).toFixed(1) : "0";
    setResult(
      `📊 Comparison Summary\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `File 1: ${file1.name} (${(file1.size / 1024).toFixed(1)} KB)\n` +
      `File 2: ${file2.name} (${(file2.size / 1024).toFixed(1)} KB)\n\n` +
      `Similarity: ${similarity}%\n` +
      `Matching sections: ${same}\n` +
      `Different sections: ${diff}\n\n` +
      (diffs.length > 0 ? `🔍 First ${diffs.length} differences:\n${diffs.join("\n\n")}` : "✅ Files appear identical!")
    );
  };

  return (
    <ToolLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[{ file: file1, setFile: setFile1, label: "PDF File 1" }, { file: file2, setFile: setFile2, label: "PDF File 2" }].map(({ file, setFile, label }) => (
          <div key={label}>
            <label className="text-sm font-medium text-foreground mb-1.5 block">{label}</label>
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-glass-border/30 rounded-xl cursor-pointer hover:bg-muted/30 transition-colors">
              <Upload size={20} className="text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground">{file ? file.name : "Upload PDF"}</span>
              <input type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>
        ))}
      </div>
      <ToolButton onClick={compare}>Compare PDFs</ToolButton>
      {result && <ToolOutput label="Comparison Result" value={result} />}
    </ToolLayout>
  );
};

export default PdfCompare;
