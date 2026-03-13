import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const HowtoSchemaGen = () => {
  const [name, setName] = useState(""); const [desc, setDesc] = useState(""); const [steps, setSteps] = useState([{text:""}]);
  const [output, setOutput] = useState("");
  const add = () => setSteps([...steps, {text:""}]);
  const upd = (i:number,v:string) => { const s=[...steps]; s[i].text=v; setSteps(s); };
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"HowTo","name":name,"description":desc,"step":steps.filter(s=>s.text).map((s,i)=>({"@type":"HowToStep","position":i+1,"text":s.text}))};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolInput label="How-To Title" value={name} onChange={setName} placeholder="How to Optimize Your Website" />
    <ToolInput label="Description" value={desc} onChange={setDesc} placeholder="Learn how to..." />
    {steps.map((s,i) => <div key={i} className="flex gap-2 items-center">
      <span className="text-xs text-muted-foreground w-8">#{i+1}</span>
      <input className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-glass-border/20 text-sm text-foreground" placeholder={`Step ${i+1}`} value={s.text} onChange={e=>upd(i,e.target.value)} />
    </div>)}
    <div className="flex gap-2">
      <ToolButton onClick={add} variant="secondary">Add Step</ToolButton>
      <ToolButton onClick={generate}>Generate Schema</ToolButton>
    </div>
    <ToolOutput label="HowTo Schema" value={output} />
  </ToolLayout>;
};
export default HowtoSchemaGen;
