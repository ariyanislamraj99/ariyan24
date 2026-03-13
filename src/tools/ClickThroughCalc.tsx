import { useState } from "react";
import { ToolLayout, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const ClickThroughCalc = () => {
  const [clicks, setClicks] = useState(150); const [impressions, setImpressions] = useState(5000); const [output, setOutput] = useState("");
  const calc = () => {
    const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : "0";
    const r = parseFloat(ctr);
    setOutput(`📊 Click-Through Rate: ${ctr}%\n\nClicks: ${clicks.toLocaleString()}\nImpressions: ${impressions.toLocaleString()}\n\nBenchmark: ${r>5?"🟢 Excellent (>5%)":r>2?"🟡 Average (2-5%)":"🔴 Below average (<2%)"}\n\n💡 Improve CTR:\n• Write compelling title tags\n• Use numbers & power words\n• Add structured data for rich snippets\n• Match search intent\n• Use emotional triggers\n• Include year/date\n• Write meta descriptions as ad copy`);
  };
  return <ToolLayout>
    <ToolNumber label="Clicks" value={clicks} onChange={setClicks} min={0} />
    <ToolNumber label="Impressions" value={impressions} onChange={setImpressions} min={0} />
    <ToolButton onClick={calc}>Calculate CTR</ToolButton>
    <ToolOutput label="CTR Analysis" value={output} />
  </ToolLayout>;
};
export default ClickThroughCalc;
