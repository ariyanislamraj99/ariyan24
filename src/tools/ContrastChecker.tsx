import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const ContrastChecker = () => {
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const hexToRgb = (hex:string) => {
    const r = parseInt(hex.slice(1,3),16)/255;
    const g = parseInt(hex.slice(3,5),16)/255;
    const b = parseInt(hex.slice(5,7),16)/255;
    return [r,g,b].map(c => c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4));
  };
  const luminance = (hex:string) => {const[r,g,b]=hexToRgb(hex);return 0.2126*r+0.7152*g+0.0722*b;};
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const ratio = ((Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05));
  const aaLarge = ratio >= 3;
  const aaNormal = ratio >= 4.5;
  const aaaLarge = ratio >= 4.5;
  const aaaNormal = ratio >= 7;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Foreground</label><input type="color" value={fg} onChange={e=>setFg(e.target.value)} className="w-full h-12 rounded cursor-pointer" /><input value={fg} onChange={e=>setFg(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-foreground text-sm font-mono" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Background</label><input type="color" value={bg} onChange={e=>setBg(e.target.value)} className="w-full h-12 rounded cursor-pointer" /><input value={bg} onChange={e=>setBg(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-foreground text-sm font-mono" /></div>
    </div>
    <div className="rounded-xl p-6 text-center" style={{background:bg,color:fg}}>
      <p className="text-2xl font-bold">Sample Text</p>
      <p className="text-sm">The quick brown fox jumps over the lazy dog</p>
    </div>
    <ToolOutput label="Contrast Ratio" value={`Ratio: ${ratio.toFixed(2)}:1\n\nWCAG AA:\n  Normal text (≥4.5:1): ${aaNormal?"✅ Pass":"❌ Fail"}\n  Large text (≥3:1): ${aaLarge?"✅ Pass":"❌ Fail"}\n\nWCAG AAA:\n  Normal text (≥7:1): ${aaaNormal?"✅ Pass":"❌ Fail"}\n  Large text (≥4.5:1): ${aaaLarge?"✅ Pass":"❌ Fail"}`} />
  </ToolLayout>;
};
export default ContrastChecker;