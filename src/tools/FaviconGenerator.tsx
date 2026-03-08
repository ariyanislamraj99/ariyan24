import { useState, useRef } from "react";
import { ToolLayout, ToolInput, ToolButton } from "./ToolComponents";
const FaviconGenerator = () => {
  const [emoji, setEmoji] = useState("🚀"); const canvasRef = useRef<HTMLCanvasElement>(null);
  const gen = () => { const c = canvasRef.current; if (!c) return; const ctx = c.getContext("2d"); if (!ctx) return; c.width = 64; c.height = 64; ctx.font = "52px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(emoji, 32, 36); };
  const download = () => { const c = canvasRef.current; if (!c) return; const a = document.createElement("a"); a.download = "favicon.png"; a.href = c.toDataURL(); a.click(); };
  return <ToolLayout><ToolInput label="Emoji or Character" value={emoji} onChange={setEmoji} placeholder="🚀" /><ToolButton onClick={gen}>Generate</ToolButton><div className="flex items-center gap-4"><canvas ref={canvasRef} className="border border-glass-border/20 rounded" width={64} height={64} /><ToolButton onClick={download} variant="secondary">Download PNG</ToolButton></div></ToolLayout>;
};
export default FaviconGenerator;
