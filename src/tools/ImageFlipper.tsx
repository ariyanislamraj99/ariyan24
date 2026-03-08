import { useState, useRef } from "react";
import { ToolLayout, ToolButton, ToolSelect } from "./ToolComponents";
const ImageFlipper = () => {
  const [img, setImg] = useState<string|null>(null); const canvasRef = useRef<HTMLCanvasElement>(null);
  const load = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = (ev) => setImg(ev.target?.result as string); r.readAsDataURL(f); } };
  const transform = (mode: string) => { if (!img || !canvasRef.current) return; const c = canvasRef.current; const ctx = c.getContext("2d"); const i = new Image(); i.onload = () => { c.width = mode === "rotate" ? i.height : i.width; c.height = mode === "rotate" ? i.width : i.height; ctx?.save(); if (mode === "h") { ctx?.scale(-1,1); ctx?.drawImage(i,-i.width,0); } else if (mode === "v") { ctx?.scale(1,-1); ctx?.drawImage(i,0,-i.height); } else { ctx?.translate(c.width/2,c.height/2); ctx?.rotate(Math.PI/2); ctx?.drawImage(i,-i.width/2,-i.height/2); } ctx?.restore(); }; i.src = img; };
  const download = () => { if (!canvasRef.current) return; const a = document.createElement("a"); a.download = "flipped.png"; a.href = canvasRef.current.toDataURL(); a.click(); };
  return <ToolLayout><input type="file" accept="image/*" onChange={load} className="text-sm text-foreground" /><div className="flex gap-2"><ToolButton onClick={()=>transform("h")}>Flip H</ToolButton><ToolButton onClick={()=>transform("v")} variant="secondary">Flip V</ToolButton><ToolButton onClick={()=>transform("rotate")} variant="secondary">Rotate 90°</ToolButton></div><canvas ref={canvasRef} className="max-w-full border border-glass-border/20 rounded" /><ToolButton onClick={download} variant="secondary">Download</ToolButton></ToolLayout>;
};
export default ImageFlipper;
