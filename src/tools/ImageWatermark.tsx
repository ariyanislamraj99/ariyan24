import { useState, useRef } from "react";
import { ToolLayout, ToolInput, ToolButton } from "./ToolComponents";
const ImageWatermark = () => {
  const [img, setImg] = useState<string|null>(null); const [text, setText] = useState("© Watermark"); const canvasRef = useRef<HTMLCanvasElement>(null);
  const load = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = (ev) => setImg(ev.target?.result as string); r.readAsDataURL(f); } };
  const apply = () => { if (!img || !canvasRef.current) return; const c = canvasRef.current; const ctx = c.getContext("2d"); const i = new Image(); i.onload = () => { c.width = i.width; c.height = i.height; ctx?.drawImage(i,0,0); if (ctx) { ctx.font = `${Math.max(i.width/20,16)}px sans-serif`; ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.textAlign = "center"; ctx.fillText(text, i.width/2, i.height - 30); } }; i.src = img; };
  const download = () => { if (!canvasRef.current) return; const a = document.createElement("a"); a.download = "watermarked.png"; a.href = canvasRef.current.toDataURL(); a.click(); };
  return <ToolLayout><input type="file" accept="image/*" onChange={load} className="text-sm text-foreground" /><ToolInput label="Watermark Text" value={text} onChange={setText} /><ToolButton onClick={apply}>Apply Watermark</ToolButton><canvas ref={canvasRef} className="max-w-full border border-glass-border/20 rounded" /><ToolButton onClick={download} variant="secondary">Download</ToolButton></ToolLayout>;
};
export default ImageWatermark;
