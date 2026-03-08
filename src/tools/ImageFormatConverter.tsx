import { useState, useRef } from "react";
import { ToolLayout, ToolButton, ToolSelect } from "./ToolComponents";
const ImageFormatConverter = () => {
  const [img, setImg] = useState<string|null>(null); const [fmt, setFmt] = useState("image/png"); const canvasRef = useRef<HTMLCanvasElement>(null);
  const load = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = (ev) => setImg(ev.target?.result as string); r.readAsDataURL(f); } };
  const convert = () => { if (!img || !canvasRef.current) return; const c = canvasRef.current; const ctx = c.getContext("2d"); const i = new Image(); i.onload = () => { c.width = i.width; c.height = i.height; ctx?.drawImage(i,0,0); }; i.src = img; };
  const download = () => { if (!canvasRef.current) return; const ext = fmt.split("/")[1]; const a = document.createElement("a"); a.download = `converted.${ext}`; a.href = canvasRef.current.toDataURL(fmt, 0.9); a.click(); };
  return <ToolLayout><input type="file" accept="image/*" onChange={load} className="text-sm text-foreground" /><ToolSelect label="Output Format" value={fmt} onChange={setFmt} options={[{value:"image/png",label:"PNG"},{value:"image/jpeg",label:"JPEG"},{value:"image/webp",label:"WebP"}]} /><ToolButton onClick={convert}>Convert</ToolButton><canvas ref={canvasRef} className="max-w-full border border-glass-border/20 rounded hidden" /><ToolButton onClick={download} variant="secondary">Download</ToolButton></ToolLayout>;
};
export default ImageFormatConverter;
