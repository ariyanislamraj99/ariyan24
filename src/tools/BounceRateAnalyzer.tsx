import { useState } from "react";
import { ToolLayout, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const BounceRateAnalyzer = () => {
  const [rate, setRate] = useState(55); const [output, setOutput] = useState("");
  const analyze = () => {
    const level = rate < 26 ? "🟢 Excellent" : rate < 40 ? "🟢 Good" : rate < 55 ? "🟡 Average" : rate < 70 ? "🟠 Above Average" : "🔴 High";
    setOutput(`📊 Bounce Rate Analysis: ${rate}%\nStatus: ${level}\n\n📈 Industry Benchmarks:\n• Blog/Content: 65-90%\n• Landing Pages: 60-90%\n• Service Sites: 10-30%\n• E-commerce: 20-45%\n• B2B Sites: 25-55%\n• Lead Gen: 30-55%\n\n💡 Reduce Bounce Rate:\n• Improve page load speed\n• Match content to search intent\n• Use clear navigation\n• Add internal links\n• Improve mobile experience\n• Use engaging visuals\n• Add clear CTAs\n• Reduce pop-ups & interstitials\n• Improve content quality\n• Fix broken pages/errors`);
  };
  return <ToolLayout>
    <ToolNumber label="Bounce Rate (%)" value={rate} onChange={setRate} min={0} max={100} />
    <ToolButton onClick={analyze}>Analyze</ToolButton>
    <ToolOutput label="Bounce Rate Report" value={output} />
  </ToolLayout>;
};
export default BounceRateAnalyzer;
