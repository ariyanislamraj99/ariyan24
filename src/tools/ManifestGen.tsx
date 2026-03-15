import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const ManifestGen = () => {
  const [name, setName] = useState("My App");
  const [short, setShort] = useState("App");
  const [desc, setDesc] = useState("A progressive web application");
  const [theme, setTheme] = useState("#6366f1");
  const [bg, setBg] = useState("#ffffff");
  const [display, setDisplay] = useState("standalone");
  const [start, setStart] = useState("/");
  const manifest = JSON.stringify({name,short_name:short,description:desc,start_url:start,display,background_color:bg,theme_color:theme,icons:[{src:"/icon-192.png",sizes:"192x192",type:"image/png"},{src:"/icon-512.png",sizes:"512x512",type:"image/png"}]},null,2);
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">App Name</label><input value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Short Name</label><input value={short} onChange={e=>setShort(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Theme Color</label><input type="color" value={theme} onChange={e=>setTheme(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Background</label><input type="color" value={bg} onChange={e=>setBg(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Display</label><select value={display} onChange={e=>setDisplay(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm"><option>standalone</option><option>fullscreen</option><option>minimal-ui</option><option>browser</option></select></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Start URL</label><input value={start} onChange={e=>setStart(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Description</label><input value={desc} onChange={e=>setDesc(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <ToolOutput label="manifest.json" value={manifest} />
    <ToolOutput label="HTML Link Tag" value={`<link rel="manifest" href="/manifest.json" />\n<meta name="theme-color" content="${theme}" />`} />
  </ToolLayout>;
};
export default ManifestGen;