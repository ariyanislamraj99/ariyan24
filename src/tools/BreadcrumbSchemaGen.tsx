import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const BreadcrumbSchemaGen = () => {
  const [items, setItems] = useState([{name:"Home",url:"https://example.com"},{name:"Category",url:"https://example.com/category"}]);
  const [output, setOutput] = useState("");
  const add = () => setItems([...items, {name:"",url:""}]);
  const upd = (i:number,k:string,v:string) => { const e=[...items]; (e[i] as any)[k]=v; setItems(e); };
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":items.filter(i=>i.name).map((item,i)=>({"@type":"ListItem","position":i+1,"name":item.name,"item":item.url}))};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    {items.map((item,i) => <div key={i} className="flex gap-2">
      <input className="w-1/3 px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="Name" value={item.name} onChange={e=>upd(i,'name',e.target.value)} />
      <input className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="URL" value={item.url} onChange={e=>upd(i,'url',e.target.value)} />
    </div>)}
    <div className="flex gap-2">
      <ToolButton onClick={add} variant="secondary">Add Item</ToolButton>
      <ToolButton onClick={generate}>Generate Schema</ToolButton>
    </div>
    <ToolOutput label="Breadcrumb Schema" value={output} />
  </ToolLayout>;
};
export default BreadcrumbSchemaGen;
