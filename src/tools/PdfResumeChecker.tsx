import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";

const PdfResumeChecker = () => {
  const [result, setResult] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const raw = ev.target?.result as string;
      const text = raw.replace(/[^\x20-\x7E\n]/g, " ").toLowerCase();
      const pages = (raw.match(/\/Type\s*\/Page[^s]/g) || []).length;
      const sizeKb = file.size / 1024;

      const checks = [
        { label: "File is PDF format", pass: file.name.toLowerCase().endsWith(".pdf") },
        { label: "File size under 2 MB", pass: sizeKb < 2048 },
        { label: "1-2 pages recommended", pass: pages >= 1 && pages <= 2 },
        { label: "Contains email address", pass: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(text) },
        { label: "Contains phone number", pass: /\d{3}[\s.-]?\d{3}[\s.-]?\d{4}/.test(text) },
        { label: "Contains links/URLs", pass: /https?:\/\//.test(text) },
        { label: 'Has "experience" section', pass: text.includes("experience") },
        { label: 'Has "education" section', pass: text.includes("education") },
        { label: 'Has "skills" section', pass: text.includes("skill") },
        { label: "Not image-only PDF", pass: text.replace(/\s/g, "").length > 500 },
      ];

      const passed = checks.filter((c) => c.pass).length;
      const total = checks.length;
      const score = Math.round((passed / total) * 100);

      const emoji = score >= 80 ? "🟢" : score >= 60 ? "🟡" : "🔴";

      setResult(
        `📄 ${file.name}\n📃 Pages: ${pages} | 📦 Size: ${sizeKb.toFixed(0)} KB\n\n${emoji} Resume Score: ${score}%  (${passed}/${total} checks passed)\n\n${checks
          .map((c) => `${c.pass ? "✅" : "❌"} ${c.label}`)
          .join("\n")}\n\n💡 Tips:\n${pages > 2 ? "• Keep your resume to 1-2 pages\n" : ""}${sizeKb > 2048 ? "• Reduce file size (compress images)\n" : ""}${!text.includes("skill") ? "• Add a Skills section with keywords\n" : ""}• Use action verbs (managed, led, built)\n• Include measurable achievements`
      );
    };
    reader.readAsBinaryString(file);
  };

  return (
    <ToolLayout>
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Upload Resume PDF</label>
        <input type="file" accept=".pdf" onChange={handleFile} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:text-xs file:cursor-pointer" />
      </div>
      <ToolOutput label="Resume Check Results" value={result} />
    </ToolLayout>
  );
};

export default PdfResumeChecker;
