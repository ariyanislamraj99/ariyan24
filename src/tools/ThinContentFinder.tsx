import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const ThinContentFinder = () => {
  const [content, setContent] = useState(""); const [output, setOutput] = useState("");
  const analyze = () => {
    const pages = content.split("---").map(p=>p.trim()).filter(Boolean);
    const results = pages.map((page, i) => {
      const words = page.split(/\s+/).filter(Boolean).length;
      const status = words < 100 ? "🔴 Very thin" : words < 300 ? "🟡 Thin" : words < 600 ? "🟢 Adequate" : "✅ Good length";
      return `Page ${i+1}: ${words} words - ${status}`;
    });
    const thin = pages.filter(p => p.split(/\s+/).filter(Boolean).length < 300).length;
    setOutput(`Thin Content Analysis\n${"═".repeat(35)}\n\n${results.join("\n")}\n\n📊 Summary:\nTotal sections: ${pages.length}\nThin content (<300 words): ${thin}\nAdequate content: ${pages.length - thin}\n\n💡 Tips:\n• Aim for 1000+ words for main pages\n• Merge thin pages covering similar topics\n• Add value: examples, data, visuals\n• Consider noindexing thin pages`);
  };
  return <ToolLayout>
    <ToolInput label="Content (separate pages with ---)" value={content} onChange={setContent} multiline rows={10} placeholder="First page content here...\n---\nSecond page content here..." />
    <ToolButton onClick={analyze}>Find Thin Content</ToolButton>
    <ToolOutput label="Thin Content Report" value={output} />
  </ToolLayout>;
};
export default ThinContentFinder;
