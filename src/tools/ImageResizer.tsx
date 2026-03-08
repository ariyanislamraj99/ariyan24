import { useState, useRef } from "react";
import { ToolLayout, ToolButton, ToolNumber } from "./ToolComponents";
const ImageResizer = () => {
  const [img, setImg] = useState<string|null>(null); const [w, setW] = useState(800); const [h, setH] = useState(600); const canvasRef = useRef<HTMLCanvasElement>(null);
  const load = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = (ev) => setImg(ev.target?.result as string); r.readAsDataURL(f); } };
  const resize = () => { if (!img || !canvasRef.current) return; const c = canvasRef.current; c.width = w; c.height = h; const ctx = c.getContext("2d"); const i = new Image(); i.onload = () => { ctx?.drawImage(i, 0, 0, w, h); }; i.src = img; };
  const download = () => { const c = canvasRef.current; if (!c) return; const a = document.createElement("a"); a.download = "resized.png"; a.href = c.toDataURL(); a.click(); };
  return <ToolLayout><input type="file" accept="image/*" onChange={load} className="text-sm text-foreground" /><div className="flex gap-4"><ToolNumber label="Width" value={w} onChange={setW} min={1} /><ToolNumber label="Height" value={h} onChange={setH} min={1} /></div><ToolButton onClick={resize}>Resize</ToolButton><canvas ref={canvasRef} className="max-w-full border border-glass-border/20 rounded" /><ToolButton onClick={download} variant="secondary">Download</ToolButton></ToolLayout>;
};
export default ImageResizer;
