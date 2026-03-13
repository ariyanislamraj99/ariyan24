import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const ContentGapFinder = () => {
  const [existing, setExisting] = useState(""); const [topics, setTopics] = useState(""); const [output, setOutput] = useState("");
  const find = () => {
    const ex = new Set(existing.split("\n").map(t=>t.trim().toLowerCase()).filter(Boolean));
    const all = topics.split("\n").map(t=>t.trim()).filter(Boolean);
    const gaps = all.filter(t => !ex.has(t.toLowerCase()));
    const covered = all.filter(t => ex.has(t.toLowerCase()));
    setOutput(`🔴 Content Gaps (${gaps.length}):\n${gaps.map(g=>`  • ${g}`).join("\n")}\n\n✅ Already Covered (${covered.length}):\n${covered.map(c=>`  • ${c}`).join("\n")}\n\n📊 Coverage: ${((covered.length/Math.max(all.length,1))*100).toFixed(0)}%`);
  };
  return <ToolLayout>
    <ToolInput label="Your Existing Content Topics (one per line)" value={existing} onChange={setExisting} multiline rows={5} placeholder="SEO basics\nKeyword research\nLink building" />
    <ToolInput label="Target Topics to Cover (one per line)" value={topics} onChange={setTopics} multiline rows={5} placeholder="SEO basics\nTechnical SEO\nLocal SEO\nContent marketing" />
    <ToolButton onClick={find}>Find Gaps</ToolButton>
    <ToolOutput label="Content Gap Analysis" value={output} />
  </ToolLayout>;
};
export default ContentGapFinder;
