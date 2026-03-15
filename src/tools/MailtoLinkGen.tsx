import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const MailtoLinkGen = () => {
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const params = new URLSearchParams();
  if (cc) params.set("cc", cc);
  if (bcc) params.set("bcc", bcc);
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const paramStr = params.toString();
  const link = `mailto:${to}${paramStr ? "?" + paramStr : ""}`;
  const html = `<a href="${link}">Send Email</a>`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">To</label><input value={to} onChange={e=>setTo(e.target.value)} placeholder="user@example.com" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">CC</label><input value={cc} onChange={e=>setCc(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">BCC</label><input value={bcc} onChange={e=>setBcc(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Subject</label><input value={subject} onChange={e=>setSubject(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Body</label><textarea value={body} onChange={e=>setBody(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm resize-y" /></div>
    <ToolOutput label="Mailto Link" value={link} />
    <ToolOutput label="HTML" value={html} />
  </ToolLayout>;
};
export default MailtoLinkGen;