import { useState } from "react";
import { ToolLayout, ToolOutput, ToolNumber } from "./ToolComponents";
const GradientGenerator = () => {
  const [c1, setC1] = useState("#6366f1"); const [c2, setC2] = useState("#8b5cf6"); const [angle, setAngle] = useState(135);
  const css = `background: linear-gradient(${angle}deg, ${c1}, ${c2});`;
  return <ToolLayout><div className="w-full h-40 rounded-xl border border-glass-border/20" style={{background:`linear-gradient(${angle}deg,${c1},${c2})`}} /><div className="flex items-center gap-4"><label className="text-sm text-foreground">Color 1: <input type="color" value={c1} onChange={e=>setC1(e.target.value)} /></label><label className="text-sm text-foreground">Color 2: <input type="color" value={c2} onChange={e=>setC2(e.target.value)} /></label></div><ToolNumber label="Angle (deg)" value={angle} onChange={setAngle} min={0} max={360} /><ToolOutput label="CSS" value={css} /></ToolLayout>;
};
export default GradientGenerator;
