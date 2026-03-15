import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const PictureTagGen = () => {
  const [src, setSrc] = useState("/images/photo.jpg");
  const [alt, setAlt] = useState("Description");
  const [webp, setWebp] = useState(true);
  const [avif, setAvif] = useState(true);
  let code = "<picture>\n";
  if (avif) code += `  <source srcset="${src.replace(/\.\w+$/,".avif")}" type="image/avif" />\n`;
  if (webp) code += `  <source srcset="${src.replace(/\.\w+$/,".webp")}" type="image/webp" />\n`;
  code += `  <img src="${src}" alt="${alt}" loading="lazy" />\n</picture>`;
  return <ToolLayout>
    <div><label className="text-sm font-medium text-foreground block mb-1">Image Path</label><input value={src} onChange={e=>setSrc(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Alt Text</label><input value={alt} onChange={e=>setAlt(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <div className="flex gap-4">
      <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={avif} onChange={e=>setAvif(e.target.checked)} />AVIF source</label>
      <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={webp} onChange={e=>setWebp(e.target.checked)} />WebP source</label>
    </div>
    <ToolOutput label="Picture Element" value={code} />
  </ToolLayout>;
};
export default PictureTagGen;