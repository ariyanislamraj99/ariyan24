import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const KeywordPositionChecker = () => {
  const [content, setContent] = useState(""); const [keyword, setKeyword] = useState(""); const [output, setOutput] = useState("");
  const check = () => {
    if (!content || !keyword) return;
    const lower = content.toLowerCase(); const kw = keyword.toLowerCase();
    const positions: string[] = [];
    const first100 = lower.substring(0, 100);
    const last100 = lower.substring(lower.length - 100);
    positions.push(`📍 First 100 chars: ${first100.includes(kw) ? "✅ Found" : "❌ Not found"}`);
    positions.push(`📍 Last 100 chars: ${last100.includes(kw) ? "✅ Found" : "❌ Not found"}`);
    const sentences = content.split(/[.!?]+/);
    const firstSentence = sentences[0]?.toLowerCase() || "";
    positions.push(`📍 First sentence: ${firstSentence.includes(kw) ? "✅ Found" : "❌ Not found"}`);
    let count = 0; let idx = lower.indexOf(kw); const indices: number[] = [];
    while (idx !== -1) { count++; indices.push(idx); idx = lower.indexOf(kw, idx + 1); }
    positions.push(`\n📊 Total occurrences: ${count}`);
    positions.push(`📊 Positions: ${indices.join(", ")}`);
    const density = ((count * kw.split(" ").length) / content.split(/\s+/).length * 100).toFixed(2);
    positions.push(`📊 Keyword density: ${density}%`);
    setOutput(positions.join("\n"));
  };
  return <ToolLayout>
    <ToolInput label="Content" value={content} onChange={setContent} multiline rows={6} placeholder="Paste your content here..." />
    <ToolInput label="Keyword" value={keyword} onChange={setKeyword} placeholder="target keyword" />
    <ToolButton onClick={check}>Check Positions</ToolButton>
    <ToolOutput label="Position Analysis" value={output} />
  </ToolLayout>;
};
export default KeywordPositionChecker;
