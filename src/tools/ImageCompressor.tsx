import { useState, useRef } from "react";
import { ToolLayout, ToolButton, ToolOutput } from "./ToolComponents";
const ImageCompressor = () => {
  const [img, setImg] = useState<string|null>(null); const [quality, setQuality] = useState(0.7); const [result, setResult] = useState<string|null>(null); const [info, setInfo] = useState("");
  const load = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = (ev) => { setImg(ev.target?.result as string); setInfo(`Original: ${(f.size/1024).toFixed(1)}KB`); }; r.readAsDataURL(f); } };
  const compress = () => { if (!img) return; const c = document.createElement("canvas"); const i = new Image(); i.onload = () => { c.width = i.width; c.height = i.height; c.getContext("2d")?.drawImage(i, 0, 0); const d = c.toDataURL("image/jpeg", quality); setResult(d); const size = Math.round((d.length * 3) / 4); setInfo(prev => prev + ` → Compressed: ${(size/1024).toFixed(1)}KB`); }; i.src = img; };
  const download = () => { if (!result) return; const a = document.createElement("a"); a.download = "compressed.jpg"; a.href = result; a.click(); };
  return <ToolLayout><input type="file" accept="image/*" onChange={load} className="text-sm text-foreground" /><div><label className="text-sm font-medium text-foreground block mb-1">Quality: {Math.round(quality*100)}%</label><input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e=>setQuality(Number(e.target.value))} className="w-full" /></div><ToolButton onClick={compress}>Compress</ToolButton>{info && <p className="text-sm text-muted-foreground">{info}</p>}{result && <><img src={result} className="max-w-full rounded border border-glass-border/20" alt="Compressed" /><ToolButton onClick={download} variant="secondary">Download</ToolButton></>}</ToolLayout>;
};
export default ImageCompressor;
