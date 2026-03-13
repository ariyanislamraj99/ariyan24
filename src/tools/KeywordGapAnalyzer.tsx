import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const KeywordGapAnalyzer = () => {
  const [yours, setYours] = useState(""); const [competitor, setCompetitor] = useState(""); const [output, setOutput] = useState("");
  const analyze = () => {
    const y = new Set(yours.split("\n").map(k=>k.trim().toLowerCase()).filter(Boolean));
    const c = new Set(competitor.split("\n").map(k=>k.trim().toLowerCase()).filter(Boolean));
    const missing = [...c].filter(k=>!y.has(k));
    const shared = [...y].filter(k=>c.has(k));
    const unique = [...y].filter(k=>!c.has(k));
    setOutput(`🔴 Missing (competitor has, you don't): ${missing.length}\n${missing.map(k=>`  • ${k}`).join("\n")}\n\n🟢 Shared: ${shared.length}\n${shared.map(k=>`  • ${k}`).join("\n")}\n\n🔵 Your unique: ${unique.length}\n${unique.map(k=>`  • ${k}`).join("\n")}`);
  };
  return <ToolLayout>
    <ToolInput label="Your Keywords (one per line)" value={yours} onChange={setYours} multiline rows={6} placeholder="seo tools\nkeyword research\ncontent marketing" />
    <ToolInput label="Competitor Keywords (one per line)" value={competitor} onChange={setCompetitor} multiline rows={6} placeholder="seo tools\nlink building\ntechnical seo" />
    <ToolButton onClick={analyze}>Find Gaps</ToolButton>
    <ToolOutput label="Gap Analysis" value={output} />
  </ToolLayout>;
};
export default KeywordGapAnalyzer;
