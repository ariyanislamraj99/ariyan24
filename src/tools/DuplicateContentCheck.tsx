import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const DuplicateContentCheck = () => {
  const [text1, setText1] = useState(""); const [text2, setText2] = useState(""); const [output, setOutput] = useState("");
  const check = () => {
    const w1 = text1.toLowerCase().split(/\s+/).filter(Boolean);
    const w2 = text2.toLowerCase().split(/\s+/).filter(Boolean);
    const set1 = new Set(w1); const set2 = new Set(w2);
    const common = [...set1].filter(w => set2.has(w));
    const similarity = ((2 * common.length) / (set1.size + set2.size) * 100).toFixed(1);
    const sim = parseFloat(similarity);
    setOutput(`📊 Duplicate Content Analysis\n\nSimilarity: ${similarity}%\nStatus: ${sim>80?"🔴 High duplication!":sim>50?"🟡 Moderate overlap":"🟢 Unique content"}\n\nText 1: ${w1.length} words, ${set1.size} unique\nText 2: ${w2.length} words, ${set2.size} unique\nCommon words: ${common.length}\n\n${sim>80?"⚠️ Consider rewriting one of these pieces to avoid duplicate content penalties.":sim>50?"💡 Some overlap detected. Ensure each page has unique value.":"✅ Content appears sufficiently unique."}`);
  };
  return <ToolLayout>
    <ToolInput label="Text 1" value={text1} onChange={setText1} multiline rows={5} placeholder="Paste first content..." />
    <ToolInput label="Text 2" value={text2} onChange={setText2} multiline rows={5} placeholder="Paste second content..." />
    <ToolButton onClick={check}>Check Duplicates</ToolButton>
    <ToolOutput label="Duplicate Analysis" value={output} />
  </ToolLayout>;
};
export default DuplicateContentCheck;
