import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const CssTooltipGen = () => {
  const [pos, setPos] = useState("top");
  const [bg, setBg] = useState("#1e1e2e");
  const [fg, setFg] = useState("#ffffff");
  const [text, setText] = useState("Tooltip text here");
  const css = `/* Tooltip Container */\n.tooltip {\n  position: relative;\n  display: inline-block;\n  cursor: pointer;\n}\n.tooltip::after {\n  content: "${text}";\n  position: absolute;\n  ${pos==="top"?"bottom: 120%; left: 50%; transform: translateX(-50%);":pos==="bottom"?"top: 120%; left: 50%; transform: translateX(-50%);":pos==="left"?"right: 120%; top: 50%; transform: translateY(-50%);":"left: 120%; top: 50%; transform: translateY(-50%);"}\n  background: ${bg};\n  color: ${fg};\n  padding: 6px 12px;\n  border-radius: 6px;\n  font-size: 13px;\n  white-space: nowrap;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.2s;\n  z-index: 10;\n}\n.tooltip:hover::after {\n  opacity: 1;\n  visibility: visible;\n}`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Position</label><select value={pos} onChange={e=>setPos(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm">{["top","bottom","left","right"].map(p=><option key={p}>{p}</option>)}</select></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Tooltip Text</label><input value={text} onChange={e=>setText(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">BG Color</label><input type="color" value={bg} onChange={e=>setBg(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Text Color</label><input type="color" value={fg} onChange={e=>setFg(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
    </div>
    <ToolOutput label="CSS" value={css} />
  </ToolLayout>;
};
export default CssTooltipGen;