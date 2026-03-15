import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const TelLinkGen = () => {
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("Call Us");
  const clean = phone.replace(/[^+\d]/g, "");
  const link = `tel:${clean}`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Phone Number</label><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 (555) 123-4567" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Link Text</label><input value={text} onChange={e=>setText(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <ToolOutput label="Tel Link" value={link} />
    <ToolOutput label="HTML" value={`<a href="${link}">${text}</a>`} />
    <ToolOutput label="With Schema.org" value={`<a href="${link}" itemprop="telephone">${text}</a>`} />
  </ToolLayout>;
};
export default TelLinkGen;