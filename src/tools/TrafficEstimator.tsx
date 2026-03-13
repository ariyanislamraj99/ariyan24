import { useState } from "react";
import { ToolLayout, ToolInput, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const TrafficEstimator = () => {
  const [keyword, setKeyword] = useState(""); const [volume, setVolume] = useState(1000); const [position, setPosition] = useState(5); const [output, setOutput] = useState("");
  const ctrByPos = [0,31.7,24.7,18.7,13.6,9.5,6.2,4.2,3.2,2.8,2.5];
  const calc = () => {
    const ctr = position <= 10 ? ctrByPos[position] : 1;
    const monthly = Math.round(volume * ctr / 100);
    const yearly = monthly * 12;
    setOutput(`📈 Traffic Estimate for "${keyword}"\n\nPosition: #${position}\nSearch Volume: ${volume.toLocaleString()}/mo\nEstimated CTR: ${ctr}%\n\n📊 Traffic Projections:\n• Monthly: ${monthly.toLocaleString()} visits\n• Yearly: ${yearly.toLocaleString()} visits\n\n💡 If you moved to position #1:\n• CTR: ${ctrByPos[1]}%\n• Monthly: ${Math.round(volume * ctrByPos[1] / 100).toLocaleString()} visits`);
  };
  return <ToolLayout>
    <ToolInput label="Keyword" value={keyword} onChange={setKeyword} placeholder="target keyword" />
    <ToolNumber label="Monthly Search Volume" value={volume} onChange={setVolume} min={0} />
    <ToolNumber label="Current Position (1-100)" value={position} onChange={setPosition} min={1} max={100} />
    <ToolButton onClick={calc}>Estimate Traffic</ToolButton>
    <ToolOutput label="Traffic Estimate" value={output} />
  </ToolLayout>;
};
export default TrafficEstimator;
