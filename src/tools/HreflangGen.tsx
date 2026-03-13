import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const HreflangGen = () => {
  const [entries, setEntries] = useState([{lang:"en",url:"https://example.com"}]);
  const [output, setOutput] = useState("");
  const add = () => setEntries([...entries, {lang:"",url:""}]);
  const upd = (i:number,k:string,v:string) => { const e=[...entries]; (e[i] as any)[k]=v; setEntries(e); };
  const remove = (i:number) => setEntries(entries.filter((_,idx)=>idx!==i));
  const generate = () => {
    const tags = entries.filter(e=>e.lang&&e.url).map(e => `<link rel="alternate" hreflang="${e.lang}" href="${e.url}" />`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${entries[0]?.url||""}" />`);
    setOutput(tags.join("\n"));
  };
  return <ToolLayout>
    {entries.map((e,i) => <div key={i} className="flex gap-2 items-center">
      <input className="w-20 px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="en" value={e.lang} onChange={ev=>upd(i,'lang',ev.target.value)} />
      <input className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="https://example.com" value={e.url} onChange={ev=>upd(i,'url',ev.target.value)} />
      {entries.length>1 && <button onClick={()=>remove(i)} className="text-xs text-destructive">✕</button>}
    </div>)}
    <div className="flex gap-2">
      <ToolButton onClick={add} variant="secondary">Add Language</ToolButton>
      <ToolButton onClick={generate}>Generate Tags</ToolButton>
    </div>
    <ToolOutput label="Hreflang Tags" value={output} />
  </ToolLayout>;
};
export default HreflangGen;
