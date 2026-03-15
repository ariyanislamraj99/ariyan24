import { useState } from "react";
import { ToolLayout, ToolOutput, ToolSelect } from "./ToolComponents";
const PreloadGen = () => {
  const [type, setType] = useState("script");
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState("preload");
  const types: Record<string,string> = {script:"script",style:"style",font:"font",image:"image",document:"document",fetch:"fetch"};
  const tag = `<link rel="${strategy}" href="${url||"https://example.com/resource"}" as="${types[type]}"${type==="font"?' type="font/woff2" crossorigin':""} />`;
  const all = `<!-- Preload: High priority, current page -->\n<link rel="preload" href="${url||"/critical.css"}" as="${types[type]}" />\n\n<!-- Prefetch: Low priority, future navigation -->\n<link rel="prefetch" href="${url||"/next-page.js"}" />\n\n<!-- Preconnect: Establish early connections -->\n<link rel="preconnect" href="https://cdn.example.com" />\n\n<!-- DNS Prefetch: Resolve DNS early -->\n<link rel="dns-prefetch" href="https://analytics.example.com" />`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <ToolSelect label="Resource Type" value={type} onChange={setType} options={Object.keys(types).map(t=>({value:t,label:t}))} />
      <ToolSelect label="Strategy" value={strategy} onChange={setStrategy} options={[{value:"preload",label:"Preload"},{value:"prefetch",label:"Prefetch"},{value:"preconnect",label:"Preconnect"}]} />
    </div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Resource URL</label><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://cdn.example.com/style.css" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <ToolOutput label="Link Tag" value={tag} />
    <ToolOutput label="All Strategies Reference" value={all} />
  </ToolLayout>;
};
export default PreloadGen;