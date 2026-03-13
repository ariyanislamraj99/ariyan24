import { useState } from "react";
import { ToolLayout, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const ConversionRateCalc = () => {
  const [visitors, setVisitors] = useState(1000); const [conversions, setConversions] = useState(25); const [output, setOutput] = useState("");
  const calc = () => {
    const rate = visitors > 0 ? ((conversions / visitors) * 100).toFixed(2) : "0";
    const r = parseFloat(rate);
    const benchmark = r > 5 ? "🟢 Excellent" : r > 2 ? "🟡 Average" : "🔴 Below average";
    setOutput(`📊 Conversion Rate: ${rate}%\nStatus: ${benchmark}\n\nVisitors: ${visitors.toLocaleString()}\nConversions: ${conversions}\n\n📈 Industry Benchmarks:\n• E-commerce: 2-4%\n• SaaS: 3-5%\n• Lead Gen: 5-15%\n• Landing Pages: 10-25%\n\n💡 Improvement Tips:\n• A/B test headlines and CTAs\n• Simplify forms\n• Add social proof\n• Improve page speed\n• Use clear value proposition`);
  };
  return <ToolLayout>
    <ToolNumber label="Total Visitors" value={visitors} onChange={setVisitors} min={0} />
    <ToolNumber label="Conversions" value={conversions} onChange={setConversions} min={0} />
    <ToolButton onClick={calc}>Calculate</ToolButton>
    <ToolOutput label="Conversion Analysis" value={output} />
  </ToolLayout>;
};
export default ConversionRateCalc;
