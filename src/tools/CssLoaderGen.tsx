import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const loaders: Record<string,{css:string,html:string}> = {
  spinner: {html:'<div class="loader"></div>',css:`.loader{width:40px;height:40px;border:4px solid #e5e7eb;border-top-color:#6366f1;border-radius:50%;animation:spin 0.8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`},
  dots: {html:'<div class="loader"><div></div><div></div><div></div></div>',css:`.loader{display:flex;gap:6px}.loader div{width:12px;height:12px;background:#6366f1;border-radius:50%;animation:bounce 0.6s infinite alternate}.loader div:nth-child(2){animation-delay:0.2s}.loader div:nth-child(3){animation-delay:0.4s}@keyframes bounce{to{transform:translateY(-10px);opacity:0.3}}`},
  bars: {html:'<div class="loader"><div></div><div></div><div></div><div></div></div>',css:`.loader{display:flex;gap:4px;align-items:end;height:30px}.loader div{width:6px;background:#6366f1;animation:bars 0.8s infinite ease-in-out alternate}.loader div:nth-child(1){height:10px}.loader div:nth-child(2){height:20px;animation-delay:0.2s}.loader div:nth-child(3){height:15px;animation-delay:0.4s}.loader div:nth-child(4){height:25px;animation-delay:0.6s}@keyframes bars{to{height:30px}}`},
  ring: {html:'<div class="loader"></div>',css:`.loader{width:40px;height:40px;border:4px solid transparent;border-top-color:#6366f1;border-bottom-color:#6366f1;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`},
};
const CssLoaderGen = () => {
  const [type, setType] = useState("spinner");
  const l = loaders[type];
  return <ToolLayout>
    <div><label className="text-sm font-medium text-foreground block mb-1">Loader Type</label><select value={type} onChange={e=>setType(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm">{Object.keys(loaders).map(k=><option key={k}>{k}</option>)}</select></div>
    <div className="flex justify-center py-8"><div dangerouslySetInnerHTML={{__html:`<style>${l.css}</style>${l.html}`}} /></div>
    <ToolOutput label="HTML" value={l.html} />
    <ToolOutput label="CSS" value={l.css} />
  </ToolLayout>;
};
export default CssLoaderGen;