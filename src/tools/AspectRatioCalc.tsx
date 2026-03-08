import { useState } from "react"; import { ToolLayout, ToolNumber, ToolOutput } from "./ToolComponents";
const AspectRatioCalc = () => { const [w,sW]=useState(1920);const [h,sH]=useState(1080);const gcd=(a:number,b:number):number=>b?gcd(b,a%b):a;const g=gcd(w,h);
  return <ToolLayout><div className="flex gap-4"><ToolNumber label="Width" value={w} onChange={sW} min={1} /><ToolNumber label="Height" value={h} onChange={sH} min={1} /></div><ToolOutput label="Aspect Ratio" value={`${w/g}:${h/g}`} /><div className="w-full max-w-xs mx-auto border-2 border-primary/30 rounded" style={{aspectRatio:`${w}/${h}`}}><div className="w-full h-full bg-primary/10 flex items-center justify-center text-sm text-muted-foreground">{w/g}:{h/g}</div></div></ToolLayout>; };
export default AspectRatioCalc;
