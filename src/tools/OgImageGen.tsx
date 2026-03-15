import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const OgImageGen = () => {
  const [title, setTitle] = useState("My Blog Post Title");
  const [subtitle, setSubtitle] = useState("A brief description of the content");
  const [author, setAuthor] = useState("John Doe");
  const [bg, setBg] = useState("#6366f1");
  const [fg, setFg] = useState("#ffffff");
  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${bg}"/>
  <text x="80" y="260" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="${fg}">${title}</text>
  <text x="80" y="330" font-family="Arial, sans-serif" font-size="24" fill="${fg}" opacity="0.8">${subtitle}</text>
  <text x="80" y="530" font-family="Arial, sans-serif" font-size="20" fill="${fg}" opacity="0.6">By ${author}</text>
  <rect x="80" y="370" width="120" height="4" fill="${fg}" opacity="0.5"/>
</svg>`;
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svgCode)}`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Title</label><input value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Author</label><input value={author} onChange={e=>setAuthor(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Subtitle</label><input value={subtitle} onChange={e=>setSubtitle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Background</label><input type="color" value={bg} onChange={e=>setBg(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Text Color</label><input type="color" value={fg} onChange={e=>setFg(e.target.value)} className="w-full h-10 rounded cursor-pointer" /></div>
    </div>
    <div className="rounded-xl overflow-hidden border border-glass-border/20"><img src={dataUrl} alt="OG Preview" className="w-full" /></div>
    <ToolOutput label="SVG Code (1200x630)" value={svgCode} />
  </ToolLayout>;
};
export default OgImageGen;