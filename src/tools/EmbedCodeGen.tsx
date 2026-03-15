import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const EmbedCodeGen = () => {
  const [url, setUrl] = useState("");
  const [w, setW] = useState(560);
  const [h, setH] = useState(315);
  const [responsive, setResponsive] = useState(true);
  const iframe = `<iframe src="${url}" width="${w}" height="${h}" frameborder="0" allowfullscreen loading="lazy"></iframe>`;
  const respCode = `<div style="position:relative;padding-bottom:${((h/w)*100).toFixed(1)}%;height:0;overflow:hidden;">\n  <iframe src="${url}" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen loading="lazy"></iframe>\n</div>`;
  return <ToolLayout>
    <div><label className="text-sm font-medium text-foreground block mb-1">URL to Embed</label><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Width</label><input type="number" value={w} onChange={e=>setW(+e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Height</label><input type="number" value={h} onChange={e=>setH(+e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={responsive} onChange={e=>setResponsive(e.target.checked)} />Responsive</label>
    <ToolOutput label="Embed Code" value={responsive ? respCode : iframe} />
  </ToolLayout>;
};
export default EmbedCodeGen;