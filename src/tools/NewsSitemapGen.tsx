import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const NewsSitemapGen = () => {
  const [entries, setEntries] = useState([{url:"",title:"",date:"",lang:"en"}]);
  const [name, setName] = useState(""); const [output, setOutput] = useState("");
  const add = () => setEntries([...entries, {url:"",title:"",date:"",lang:"en"}]);
  const upd = (i:number,k:string,v:string) => { const e=[...entries]; (e[i] as any)[k]=v; setEntries(e); };
  const generate = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${entries.filter(e=>e.url).map(e=>`  <url>\n    <loc>${e.url}</loc>\n    <news:news>\n      <news:publication>\n        <news:name>${name}</news:name>\n        <news:language>${e.lang}</news:language>\n      </news:publication>\n      <news:publication_date>${e.date||new Date().toISOString()}</news:publication_date>\n      <news:title>${e.title}</news:title>\n    </news:news>\n  </url>`).join("\n")}\n</urlset>`;
    setOutput(xml);
  };
  return <ToolLayout>
    <ToolInput label="Publication Name" value={name} onChange={setName} placeholder="My News Site" />
    {entries.map((e,i) => <div key={i} className="p-3 rounded-xl bg-muted/30 border border-glass-border/20 space-y-2">
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="URL" value={e.url} onChange={ev=>upd(i,'url',ev.target.value)} />
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="Title" value={e.title} onChange={ev=>upd(i,'title',ev.target.value)} />
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="Date (YYYY-MM-DD)" value={e.date} onChange={ev=>upd(i,'date',ev.target.value)} />
    </div>)}
    <div className="flex gap-2">
      <ToolButton onClick={add} variant="secondary">Add Article</ToolButton>
      <ToolButton onClick={generate}>Generate Sitemap</ToolButton>
    </div>
    <ToolOutput label="News Sitemap" value={output} />
  </ToolLayout>;
};
export default NewsSitemapGen;
