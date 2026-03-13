import { useState } from "react";
import { ToolLayout, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const AbTestCalc = () => {
  const [vA,setVA]=useState(1000); const [cA,setCA]=useState(50); const [vB,setVB]=useState(1000); const [cB,setCB]=useState(65); const [output,setOutput]=useState("");
  const calc = () => {
    const rA = cA/vA; const rB = cB/vB;
    const seA = Math.sqrt(rA*(1-rA)/vA); const seB = Math.sqrt(rB*(1-rB)/vB);
    const z = Math.abs(rA-rB)/Math.sqrt(seA*seA+seB*seB);
    const significant = z > 1.96;
    const lift = ((rB-rA)/rA*100).toFixed(1);
    const confidence = z > 2.576 ? "99%" : z > 1.96 ? "95%" : z > 1.645 ? "90%" : "<90%";
    setOutput(`🧪 A/B Test Results\n\nVariant A: ${(rA*100).toFixed(2)}% (${cA}/${vA})\nVariant B: ${(rB*100).toFixed(2)}% (${cB}/${vB})\n\nLift: ${lift}%\nZ-Score: ${z.toFixed(3)}\nConfidence: ${confidence}\nStatistically Significant: ${significant?"✅ Yes":"❌ No"}\n\n${significant?`🏆 ${rB>rA?"Variant B wins!":"Variant A wins!"}`:("⏳ Not enough evidence. Need more data.")}`);
  };
  return <ToolLayout>
    <ToolNumber label="Variant A - Visitors" value={vA} onChange={setVA} min={1} />
    <ToolNumber label="Variant A - Conversions" value={cA} onChange={setCA} min={0} />
    <ToolNumber label="Variant B - Visitors" value={vB} onChange={setVB} min={1} />
    <ToolNumber label="Variant B - Conversions" value={cB} onChange={setCB} min={0} />
    <ToolButton onClick={calc}>Calculate</ToolButton>
    <ToolOutput label="A/B Test Analysis" value={output} />
  </ToolLayout>;
};
export default AbTestCalc;
