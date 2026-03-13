import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton } from "./ToolComponents";
const SerpSimulator = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([{title:"",url:"",desc:""}]);
  const add = () => setResults([...results, {title:"",url:"",desc:""}]);
  const upd = (i:number,k:string,v:string) => { const r=[...results]; (r[i] as any)[k]=v; setResults(r); };
  return <ToolLayout>
    <ToolInput label="Search Query" value={query} onChange={setQuery} placeholder="Enter search query..." />
    {results.map((r,i) => <div key={i} className="p-3 rounded-xl bg-muted/30 border border-glass-border/20 space-y-2">
      <div className="text-xs font-medium text-muted-foreground">Result #{i+1}</div>
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="Title" value={r.title} onChange={e=>upd(i,'title',e.target.value)} />
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="URL" value={r.url} onChange={e=>upd(i,'url',e.target.value)} />
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="Description" value={r.desc} onChange={e=>upd(i,'desc',e.target.value)} />
    </div>)}
    <ToolButton onClick={add} variant="secondary">Add Result</ToolButton>
    <div className="p-4 rounded-xl bg-white border space-y-4">
      <div className="text-lg font-normal text-[#202124]">{query || "Search query"}</div>
      <div className="text-xs text-[#70757a]">About {results.length} results</div>
      {results.map((r,i) => <div key={i}>
        <div className="text-sm text-[#1a0dab] hover:underline cursor-pointer">{r.title||`Result ${i+1}`}</div>
        <div className="text-xs text-[#006621]">{r.url||"https://example.com"}</div>
        <div className="text-xs text-[#545454]">{r.desc||"Description..."}</div>
      </div>)}
    </div>
  </ToolLayout>;
};
export default SerpSimulator;
