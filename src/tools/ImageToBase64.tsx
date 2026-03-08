import { useState } from "react";
import { ToolLayout, ToolOutput, ToolButton } from "./ToolComponents";
const ImageToBase64 = () => {
  const [output, setOutput] = useState("");
  const load = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = (ev) => setOutput(ev.target?.result as string); r.readAsDataURL(f); } };
  return <ToolLayout><input type="file" accept="image/*" onChange={load} className="text-sm text-foreground" /><ToolOutput label="Base64 String" value={output} /></ToolLayout>;
};
export default ImageToBase64;
