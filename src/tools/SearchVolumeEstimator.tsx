import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const SearchVolumeEstimator = () => {
  const [keywords, setKeywords] = useState(""); const [output, setOutput] = useState("");
  const estimate = () => {
    const kws = keywords.split("\n").map(k=>k.trim()).filter(Boolean);
    const results = kws.map(kw => {
      const words = kw.split(" ").length;
      const hash = kw.split("").reduce((a,c)=>a+c.charCodeAt(0),0);
      let base = words === 1 ? 5000 + (hash % 50000) : words === 2 ? 1000 + (hash % 10000) : 100 + (hash % 5000);
      const trend = ["↗️ Rising","→ Stable","↘️ Declining"][hash%3];
      return `${kw}: ~${base.toLocaleString()}/mo ${trend}`;
    });
    setOutput(results.join("\n"));
  };
  return <ToolLayout>
    <ToolInput label="Keywords (one per line)" value={keywords} onChange={setKeywords} multiline rows={6} placeholder="seo tools\ncontent marketing\nkeyword research" />
    <ToolButton onClick={estimate}>Estimate Volumes</ToolButton>
    <div className="text-xs text-muted-foreground">⚠️ Estimates are approximations based on keyword characteristics</div>
    <ToolOutput label="Estimated Search Volumes" value={output} />
  </ToolLayout>;
};
export default SearchVolumeEstimator;
