import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const presets: Record<string,[string,string]> = {
  bounce: ["bounce","0%,100%{transform:translateY(0)}50%{transform:translateY(-30px)}"],
  pulse: ["pulse","0%,100%{transform:scale(1)}50%{transform:scale(1.1)}"],
  shake: ["shake","0%,100%{transform:translateX(0)}25%{transform:translateX(-10px)}75%{transform:translateX(10px)}"],
  fadeIn: ["fadeIn","0%{opacity:0}100%{opacity:1}"],
  slideIn: ["slideIn","0%{transform:translateX(-100%)}100%{transform:translateX(0)}"],
  rotate: ["rotate","0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}"],
  swing: ["swing","0%{transform:rotate(0deg)}25%{transform:rotate(15deg)}50%{transform:rotate(-10deg)}75%{transform:rotate(5deg)}100%{transform:rotate(0deg)}"],
};
const CssAnimationGen = () => {
  const [name, setName] = useState("bounce");
  const [dur, setDur] = useState(1);
  const [iter, setIter] = useState("infinite");
  const [ease, setEase] = useState("ease");
  const [n,kf] = presets[name];
  const css = `.element {\n  animation: ${n} ${dur}s ${ease} ${iter};\n}\n\n@keyframes ${n} {\n  ${kf.replace(/}/g,"}\n  ").trim()}\n}`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Animation</label><select value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm">{Object.keys(presets).map(k=><option key={k} value={k}>{k}</option>)}</select></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Duration (s)</label><input type="number" value={dur} onChange={e=>setDur(+e.target.value)} min={0.1} step={0.1} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Easing</label><select value={ease} onChange={e=>setEase(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm">{["ease","linear","ease-in","ease-out","ease-in-out"].map(e=><option key={e}>{e}</option>)}</select></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Iteration</label><select value={iter} onChange={e=>setIter(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm">{["infinite","1","2","3"].map(i=><option key={i}>{i}</option>)}</select></div>
    </div>
    <div className="flex justify-center py-8"><div className="w-16 h-16 rounded-xl bg-primary" style={{animation:`${n} ${dur}s ${ease} ${iter}`}} /><style>{`@keyframes ${n}{${kf}}`}</style></div>
    <ToolOutput label="CSS" value={css} />
  </ToolLayout>;
};
export default CssAnimationGen;