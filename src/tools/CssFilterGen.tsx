import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const CssFilterGen = () => {
  const [f, setF] = useState({blur:0,brightness:100,contrast:100,grayscale:0,hueRotate:0,saturate:100,sepia:0,opacity:100});
  const upd = (k:string,v:number) => setF(p=>({...p,[k]:v}));
  const css = `filter: blur(${f.blur}px) brightness(${f.brightness}%) contrast(${f.contrast}%) grayscale(${f.grayscale}%) hue-rotate(${f.hueRotate}deg) saturate(${f.saturate}%) sepia(${f.sepia}%) opacity(${f.opacity}%);`;
  const controls: [string,string,number,number][] = [["blur","Blur (px)",0,20],["brightness","Brightness (%)",0,300],["contrast","Contrast (%)",0,300],["grayscale","Grayscale (%)",0,100],["hueRotate","Hue Rotate (°)",0,360],["saturate","Saturate (%)",0,300],["sepia","Sepia (%)",0,100],["opacity","Opacity (%)",0,100]];
  return <ToolLayout>
    <div className="grid gap-3">{controls.map(([k,l,min,max])=><div key={k}><label className="text-sm text-foreground flex justify-between"><span>{l}</span><span>{(f as any)[k]}</span></label><input type="range" min={min} max={max} value={(f as any)[k]} onChange={e=>upd(k,+e.target.value)} className="w-full" /></div>)}</div>
    <div className="flex justify-center p-4"><div className="w-48 h-48 rounded-xl bg-gradient-to-br from-primary to-accent" style={{filter:`blur(${f.blur}px) brightness(${f.brightness}%) contrast(${f.contrast}%) grayscale(${f.grayscale}%) hue-rotate(${f.hueRotate}deg) saturate(${f.saturate}%) sepia(${f.sepia}%) opacity(${f.opacity}%)`}} /></div>
    <ToolOutput label="CSS" value={css} />
  </ToolLayout>;
};
export default CssFilterGen;