import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const CssGradientAnimator = () => {
  const [c1, setC1] = useState("#667eea");
  const [c2, setC2] = useState("#764ba2");
  const [c3, setC3] = useState("#f093fb");
  const [speed, setSpeed] = useState(3);
  const css = `background: linear-gradient(-45deg, ${c1}, ${c2}, ${c3}, ${c1});
background-size: 400% 400%;
animation: gradientShift ${speed}s ease infinite;

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`;
  return <ToolLayout>
    <div className="grid grid-cols-3 gap-4">
      {[["Color 1",c1,setC1],["Color 2",c2,setC2],["Color 3",c3,setC3]].map(([l,v,s]:any)=><div key={l}><label className="text-sm font-medium text-foreground block mb-1">{l}</label><input type="color" value={v} onChange={e=>s(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>)}
    </div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Speed: {speed}s</label><input type="range" min={1} max={10} value={speed} onChange={e=>setSpeed(+e.target.value)} className="w-full" /></div>
    <div className="h-32 rounded-xl" style={{background:`linear-gradient(-45deg,${c1},${c2},${c3},${c1})`,backgroundSize:"400% 400%",animation:`gradientShift ${speed}s ease infinite`}} />
    <style>{`@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
    <ToolOutput label="CSS Code" value={css} />
  </ToolLayout>;
};
export default CssGradientAnimator;