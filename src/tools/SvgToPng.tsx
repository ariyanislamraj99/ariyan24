import { useState, useRef } from "react";
import { ToolLayout, ToolInput, ToolButton } from "./ToolComponents";
const SvgToPng = () => {
  const [svg, setSvg] = useState(""); const canvasRef = useRef<HTMLCanvasElement>(null);
  const convert = () => { if (!canvasRef.current) return; const c = canvasRef.current; const ctx = c.getContext("2d"); const i = new Image(); const blob = new Blob([svg], {type:"image/svg+xml"}); const url = URL.createObjectURL(blob); i.onload = () => { c.width = i.width||300; c.height = i.height||300; ctx?.drawImage(i,0,0); URL.revokeObjectURL(url); }; i.src = url; };
  const download = () => { if (!canvasRef.current) return; const a = document.createElement("a"); a.download = "converted.png"; a.href = canvasRef.current.toDataURL(); a.click(); };
  return <ToolLayout><ToolInput label="SVG Code" value={svg} onChange={setSvg} multiline rows={6} placeholder='<svg>...</svg>' /><ToolButton onClick={convert}>Convert to PNG</ToolButton><canvas ref={canvasRef} className="max-w-full border border-glass-border/20 rounded" /><ToolButton onClick={download} variant="secondary">Download PNG</ToolButton></ToolLayout>;
};
export default SvgToPng;
