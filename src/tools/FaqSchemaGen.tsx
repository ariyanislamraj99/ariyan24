import { useState } from "react";
import { ToolLayout, ToolButton, ToolOutput } from "./ToolComponents";
const FaqSchemaGen = () => {
  const [faqs, setFaqs] = useState([{q:"",a:""}]);
  const [output, setOutput] = useState("");
  const add = () => setFaqs([...faqs, {q:"",a:""}]);
  const upd = (i:number,k:string,v:string) => { const e=[...faqs]; (e[i] as any)[k]=v; setFaqs(e); };
  const remove = (i:number) => setFaqs(faqs.filter((_,idx)=>idx!==i));
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqs.filter(f=>f.q&&f.a).map(f=>({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    {faqs.map((f,i) => <div key={i} className="p-3 rounded-xl bg-muted/30 border border-glass-border/20 space-y-2">
      <div className="flex justify-between"><span className="text-xs font-medium text-muted-foreground">FAQ #{i+1}</span>{faqs.length>1&&<button onClick={()=>remove(i)} className="text-xs text-destructive">Remove</button>}</div>
      <input className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder="Question" value={f.q} onChange={e=>upd(i,'q',e.target.value)} />
      <textarea className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground resize-y" placeholder="Answer" value={f.a} onChange={e=>upd(i,'a',e.target.value)} rows={2} />
    </div>)}
    <div className="flex gap-2">
      <ToolButton onClick={add} variant="secondary">Add FAQ</ToolButton>
      <ToolButton onClick={generate}>Generate Schema</ToolButton>
    </div>
    <ToolOutput label="FAQ Schema" value={output} />
  </ToolLayout>;
};
export default FaqSchemaGen;
