import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const AnchorTextAnalyzer = () => {
  const [anchors, setAnchors] = useState(""); const [output, setOutput] = useState("");
  const analyze = () => {
    const list = anchors.split("\n").map(a=>a.trim()).filter(Boolean);
    const freq: Record<string,number> = {};
    list.forEach(a => { freq[a.toLowerCase()] = (freq[a.toLowerCase()]||0) + 1; });
    const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]);
    const exact = sorted.filter(([a])=>a.length>0&&!a.includes("click here")&&!a.includes("read more"));
    const generic = sorted.filter(([a])=>a.includes("click here")||a.includes("read more")||a.includes("here"));
    const branded = sorted.filter(([a])=>a.length<=20&&!a.includes(" "));
    setOutput(`⚓ Anchor Text Analysis\n${"═".repeat(35)}\n\n📊 Total Anchors: ${list.length}\n🔤 Unique Anchors: ${sorted.length}\n\n📋 Distribution:\n${sorted.map(([a,c])=>`  "${a}" × ${c} (${((c/list.length)*100).toFixed(0)}%)`).join("\n")}\n\n${generic.length>list.length*0.3?"⚠️ Too many generic anchors (>30%)":"✅ Good anchor diversity"}\n${sorted.length<3&&list.length>5?"⚠️ Low anchor text variety":"✅ Good variety"}`);
  };
  return <ToolLayout>
    <ToolInput label="Anchor Texts (one per line)" value={anchors} onChange={setAnchors} multiline rows={8} placeholder="best seo tools\nclick here\nbrand name\nseo guide" />
    <ToolButton onClick={analyze}>Analyze Anchors</ToolButton>
    <ToolOutput label="Anchor Text Report" value={output} />
  </ToolLayout>;
};
export default AnchorTextAnalyzer;
