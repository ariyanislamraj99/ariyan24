import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const CompetitorSeoAnalyzer = () => {
  const [yours, setYours] = useState(""); const [comp, setComp] = useState(""); const [output, setOutput] = useState("");
  const analyze = () => {
    const yKw = yours.split("\n").map(k=>k.trim().toLowerCase()).filter(Boolean);
    const cKw = comp.split("\n").map(k=>k.trim().toLowerCase()).filter(Boolean);
    const ySet = new Set(yKw); const cSet = new Set(cKw);
    const shared = yKw.filter(k => cSet.has(k));
    const yourOnly = yKw.filter(k => !cSet.has(k));
    const compOnly = cKw.filter(k => !ySet.has(k));
    setOutput(`🏆 Competitive SEO Analysis\n\n📊 Overview:\nYour keywords: ${yKw.length}\nCompetitor keywords: ${cKw.length}\nOverlap: ${shared.length} (${((shared.length/Math.max(yKw.length,1))*100).toFixed(0)}%)\n\n🟢 Shared Keywords (${shared.length}):\n${shared.map(k=>`  • ${k}`).join("\n")||"  None"}\n\n🔵 Your Unique (${yourOnly.length}):\n${yourOnly.map(k=>`  • ${k}`).join("\n")||"  None"}\n\n🔴 Competitor's Unique - Opportunities (${compOnly.length}):\n${compOnly.map(k=>`  • ${k}`).join("\n")||"  None"}\n\n💡 Strategy:\n• Target competitor's unique keywords\n• Strengthen content for shared keywords\n• Protect your unique keyword positions`);
  };
  return <ToolLayout>
    <ToolInput label="Your Keywords (one per line)" value={yours} onChange={setYours} multiline rows={6} placeholder="keyword 1\nkeyword 2" />
    <ToolInput label="Competitor Keywords (one per line)" value={comp} onChange={setComp} multiline rows={6} placeholder="keyword 1\nkeyword 3" />
    <ToolButton onClick={analyze}>Analyze Competition</ToolButton>
    <ToolOutput label="Competitive Analysis" value={output} />
  </ToolLayout>;
};
export default CompetitorSeoAnalyzer;
