import { useState, useRef } from "react";
import { ToolLayout, ToolButton } from "./ToolComponents";
const ImageCropper = () => {
  const [img, setImg] = useState<string|null>(null);
  const load = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = (ev) => setImg(ev.target?.result as string); r.readAsDataURL(f); } };
  return <ToolLayout><input type="file" accept="image/*" onChange={load} className="text-sm text-foreground" />{img && <img src={img} className="max-w-full rounded border border-glass-border/20" alt="Preview" />}<p className="text-xs text-muted-foreground">Tip: Right-click the image and use your browser's built-in crop tool, or use the Image Resizer tool for dimension changes.</p></ToolLayout>;
};
export default ImageCropper;
