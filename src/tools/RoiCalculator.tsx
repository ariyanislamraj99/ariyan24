import { useState } from "react";
import { ToolLayout, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const RoiCalculator = () => {
  const [investment, setInvestment] = useState(5000); const [revenue, setRevenue] = useState(15000); const [months, setMonths] = useState(6); const [output, setOutput] = useState("");
  const calc = () => {
    const roi = investment > 0 ? (((revenue - investment) / investment) * 100).toFixed(1) : "0";
    const monthly = (revenue / Math.max(months, 1)).toFixed(0);
    const breakeven = revenue > 0 ? Math.ceil(investment / (revenue / months)) : 0;
    setOutput(`💰 SEO ROI Analysis\n\nInvestment: $${investment.toLocaleString()}\nRevenue: $${revenue.toLocaleString()}\nROI: ${roi}%\nProfit: $${(revenue - investment).toLocaleString()}\n\n📊 Monthly Avg Revenue: $${monthly}\n⏱️ Breakeven: ~${breakeven} months\n\n${parseFloat(roi) > 200 ? "🟢 Excellent ROI!" : parseFloat(roi) > 100 ? "🟡 Good ROI" : parseFloat(roi) > 0 ? "🟠 Moderate ROI" : "🔴 Negative ROI"}`);
  };
  return <ToolLayout>
    <ToolNumber label="SEO Investment ($)" value={investment} onChange={setInvestment} min={0} />
    <ToolNumber label="Revenue Generated ($)" value={revenue} onChange={setRevenue} min={0} />
    <ToolNumber label="Time Period (months)" value={months} onChange={setMonths} min={1} />
    <ToolButton onClick={calc}>Calculate ROI</ToolButton>
    <ToolOutput label="ROI Analysis" value={output} />
  </ToolLayout>;
};
export default RoiCalculator;
