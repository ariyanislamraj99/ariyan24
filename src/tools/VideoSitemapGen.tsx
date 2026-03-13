import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const VideoSitemapGen = () => {
  const [entries, setEntries] = useState([{page:"",title:"",desc:"",thumb:"",url:""}]);
  const [output, setOutput] = useState("");
  const add = () => setEntries([...entries, {page:"",title:"",desc:"",thumb:"",url:""}]);
  const upd = (i:number,k:string,v:string) => { const e=[...entries]; (e[i] as any)[k]=v; setEntries(e); };
  const generate = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${entries.filter(e=>e.page).map(e=>`  <url>\n    <loc>${e.page}</loc>\n    <video:video>\n      <video:thumbnail_loc>${e.thumb}</video:thumbnail_loc>\n      <video:title>${e.title}</video:title>\n      <video:description>${e.desc}</video:description>\n      <video:content_loc>${e.url}</video:content_loc>\n    </video:video>\n  </url>`).join("\n")}\n</urlset>`;
    setOutput(xml);
  };
  return <ToolLayout>
    {entries.map((e,i) => <div key={i} className="p-3 rounded-xl bg-muted/30 border border-glass-border/20 space-y-2">
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="Page URL" value={e.page} onChange={ev=>upd(i,'page',ev.target.value)} />
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="Video Title" value={e.title} onChange={ev=>upd(i,'title',ev.target.value)} />
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="Description" value={e.desc} onChange={ev=>upd(i,'desc',ev.target.value)} />
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="Thumbnail URL" value={e.thumb} onChange={ev=>upd(i,'thumb',ev.target.value)} />
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="Video URL" value={e.url} onChange={ev=>upd(i,'url',ev.target.value)} />
    </div>)}
    <div className="flex gap-2">
      <ToolButton onClick={add} variant="secondary">Add Video</ToolButton>
      <ToolButton onClick={generate}>Generate Sitemap</ToolButton>
    </div>
    <ToolOutput label="Video Sitemap" value={output} />
  </ToolLayout>;
};
export default VideoSitemapGen;
