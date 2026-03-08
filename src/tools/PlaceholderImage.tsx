import { useState } from "react";
import { ToolLayout, ToolInput, ToolNumber, ToolButton } from "./ToolComponents";
const PlaceholderImage = () => {
  const [w, setW] = useState(400); const [h, setH] = useState(300); const [text, setText] = useState("400x300"); const [bg, setBg] = useState("#374151"); const [fg, setFg] = useState("#9CA3AF");
  const url = `https://via.placeholder.com/${w}x${h}/${bg.slice(1)}/${fg.slice(1)}?text=${encodeURIComponent(text||`${w}x${h}`)}`;
  return <ToolLayout><div className="flex gap-4"><ToolNumber label="Width" value={w} onChange={setW} min={1} /><ToolNumber label="Height" value={h} onChange={setH} min={1} /></div><ToolInput label="Text" value={text} onChange={setText} placeholder="Custom text" /><div className="flex items-center gap-4"><label className="text-sm text-foreground">BG: <input type="color" value={bg} onChange={e=>setBg(e.target.value)} /></label><label className="text-sm text-foreground">FG: <input type="color" value={fg} onChange={e=>setFg(e.target.value)} /></label></div><img src={url} alt="Placeholder" className="max-w-full rounded border border-glass-border/20" /><p className="text-xs text-muted-foreground font-mono break-all">{url}</p></ToolLayout>;
};
export default PlaceholderImage;
