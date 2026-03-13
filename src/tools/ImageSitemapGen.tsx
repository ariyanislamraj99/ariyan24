import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const ImageSitemapGen = () => {
  const [entries, setEntries] = useState([{page:"",images:""}]);
  const [output, setOutput] = useState("");
  const add = () => setEntries([...entries, {page:"",images:""}]);
  const upd = (i:number,k:string,v:string) => { const e=[...entries]; (e[i] as any)[k]=v; setEntries(e); };
  const generate = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.filter(e=>e.page).map(e=>`  <url>\n    <loc>${e.page}</loc>\n${e.images.split("\n").filter(Boolean).map(img=>`    <image:image>\n      <image:loc>${img.trim()}</image:loc>\n    </image:image>`).join("\n")}\n  </url>`).join("\n")}\n</urlset>`;
    setOutput(xml);
  };
  return <ToolLayout>
    {entries.map((e,i) => <div key={i} className="p-3 rounded-xl bg-muted/30 border border-glass-border/20 space-y-2">
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="Page URL" value={e.page} onChange={ev=>upd(i,'page',ev.target.value)} />
      <textarea className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground resize-y" placeholder="Image URLs (one per line)" value={e.images} onChange={ev=>upd(i,'images',ev.target.value)} rows={3} />
    </div>)}
    <div className="flex gap-2">
      <ToolButton onClick={add} variant="secondary">Add Page</ToolButton>
      <ToolButton onClick={generate}>Generate Sitemap</ToolButton>
    </div>
    <ToolOutput label="Image Sitemap" value={output} />
  </ToolLayout>;
};
export default ImageSitemapGen;
