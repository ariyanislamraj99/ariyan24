import { useState } from "react";
import { ToolLayout, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const CpcCalculator = () => {
  const [cost, setCost] = useState(100); const [clicks, setClicks] = useState(50); const [impressions, setImpressions] = useState(1000); const [conversions, setConversions] = useState(5); const [output, setOutput] = useState("");
  const calc = () => {
    const cpc = clicks > 0 ? (cost / clicks).toFixed(2) : "0";
    const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : "0";
    const cpa = conversions > 0 ? (cost / conversions).toFixed(2) : "0";
    const cvr = clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : "0";
    setOutput(`💰 Cost Per Click (CPC): $${cpc}\n📊 Click-Through Rate (CTR): ${ctr}%\n🎯 Cost Per Acquisition (CPA): $${cpa}\n✅ Conversion Rate: ${cvr}%\n\nBudget: $${cost}\nClicks: ${clicks}\nImpressions: ${impressions.toLocaleString()}\nConversions: ${conversions}`);
  };
  return <ToolLayout>
    <ToolNumber label="Total Ad Spend ($)" value={cost} onChange={setCost} min={0} />
    <ToolNumber label="Total Clicks" value={clicks} onChange={setClicks} min={0} />
    <ToolNumber label="Total Impressions" value={impressions} onChange={setImpressions} min={0} />
    <ToolNumber label="Total Conversions" value={conversions} onChange={setConversions} min={0} />
    <ToolButton onClick={calc}>Calculate</ToolButton>
    <ToolOutput label="CPC Metrics" value={output} />
  </ToolLayout>;
};
export default CpcCalculator;
