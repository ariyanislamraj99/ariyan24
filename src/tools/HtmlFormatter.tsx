import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const fmt = (h: string) => { let r = "", indent = 0; h.replace(/>\s*</g, "><").split(/(<[^>]+>)/g).forEach(t => { if (!t.trim()) return; if (t.match(/^<\//)) indent--; r += "  ".repeat(Math.max(indent, 0)) + t + "\n"; if (t.match(/^<[^/!][^>]*[^/]>$/) && !t.match(/^<(br|hr|img|input|meta|link)/i)) indent++; }); return r.trim(); };
const HtmlFormatter = () => {
  const [input, setInput] = useState(""); const [output, setOutput] = useState("");
  return <ToolLayout><ToolInput label="HTML" value={input} onChange={setInput} multiline placeholder="<div><p>Hello</p></div>" /><ToolButton onClick={() => setOutput(fmt(input))}>Format HTML</ToolButton><ToolOutput label="Formatted" value={output} /></ToolLayout>;
};
export default HtmlFormatter;
