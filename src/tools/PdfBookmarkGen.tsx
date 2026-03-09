import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";

const PdfBookmarkGen = () => {
  const [input, setInput] = useState("Chapter 1: Introduction\n  1.1 Overview\n  1.2 Background\nChapter 2: Methods\n  2.1 Design\n  2.2 Implementation\nChapter 3: Results\nChapter 4: Conclusion");
  const [format, setFormat] = useState<"xml" | "json" | "latex">("xml");
  const [result, setResult] = useState("");

  const generate = () => {
    const lines = input.split("\n").filter(l => l.trim());
    
    if (format === "xml") {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<Bookmarks>\n';
      let page = 1;
      for (const line of lines) {
        const indent = line.search(/\S/);
        const level = indent >= 2 ? 2 : 1;
        const title = line.trim();
        const padding = "  ".repeat(level);
        xml += `${padding}<Bookmark Title="${title}" Page="${page}" Level="${level}" />\n`;
        page++;
      }
      xml += '</Bookmarks>';
      setResult(xml);
    } else if (format === "json") {
      const bookmarks: any[] = [];
      let page = 1;
      let currentParent: any = null;
      for (const line of lines) {
        const indent = line.search(/\S/);
        const title = line.trim();
        const item = { title, page, children: [] as any[] };
        if (indent >= 2 && currentParent) {
          currentParent.children.push(item);
        } else {
          currentParent = item;
          bookmarks.push(item);
        }
        page++;
      }
      setResult(JSON.stringify(bookmarks, null, 2));
    } else {
      let latex = "% PDF Bookmark Structure (hyperref package)\n\\usepackage{hyperref}\n\\usepackage{bookmark}\n\n";
      let page = 1;
      for (const line of lines) {
        const indent = line.search(/\S/);
        const level = indent >= 2 ? 1 : 0;
        const title = line.trim();
        const cmd = level === 0 ? "\\bookmark[level=0" : "\\bookmark[level=1";
        latex += `${cmd},page=${page}]{${title}}\n`;
        page++;
      }
      setResult(latex);
    }
  };

  return (
    <ToolLayout>
      <ToolInput label="Table of Contents (indent sub-items with 2+ spaces)" value={input} onChange={setInput} multiline rows={8} />
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Output Format</label>
        <div className="flex gap-2">
          {(["xml", "json", "latex"] as const).map(f => (
            <button key={f} onClick={() => setFormat(f)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${format === f ? "gradient-bg text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground"}`}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <ToolButton onClick={generate}>Generate Bookmarks</ToolButton>
      {result && <ToolOutput label={`Bookmark Structure (${format.toUpperCase()})`} value={result} />}
    </ToolLayout>
  );
};

export default PdfBookmarkGen;
