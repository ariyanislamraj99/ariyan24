import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const HtmlToPug = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const convert = () => {
    let indent = 0;
    const lines: string[] = [];
    const tokens = input.replace(/>\s+</g, ">\n<").split("\n");
    tokens.forEach(token => {
      const t = token.trim();
      if (!t) return;
      const closeMatch = t.match(/^<\/(\w+)>/);
      if (closeMatch) { indent = Math.max(0, indent - 1); return; }
      const openMatch = t.match(/^<(\w+)([^>]*)>(.*?)(?:<\/\1>)?$/);
      if (openMatch) {
        const [, tag, attrs, content] = openMatch;
        let pugAttrs = "";
        const attrRegex = /(\w[\w-]*)=["']([^"']*?)["']/g;
        let m; const attrParts: string[] = [];
        while ((m = attrRegex.exec(attrs)) !== null) {
          if (m[1] === "class") pugAttrs = "." + m[2].split(" ").join(".");
          else if (m[1] === "id") pugAttrs = "#" + m[2] + pugAttrs;
          else attrParts.push(`${m[1]}="${m[2]}"`);
        }
        const attrStr = attrParts.length ? `(${attrParts.join(", ")})` : "";
        const line = "  ".repeat(indent) + tag + pugAttrs + attrStr + (content ? " " + content.replace(/<[^>]+>/g, "") : "");
        lines.push(line);
        if (!t.includes(`</${tag}>`)) indent++;
      } else {
        lines.push("  ".repeat(indent) + "| " + t.replace(/<[^>]+>/g, ""));
      }
    });
    setOutput(lines.join("\n") || "Paste valid HTML to convert");
  };
  return <ToolLayout><ToolInput label="HTML Input" value={input} onChange={setInput} multiline rows={6} placeholder='<div class="container"><p>Hello</p></div>' /><ToolButton onClick={convert}>Convert to Pug</ToolButton><ToolOutput label="Pug Output" value={output} /></ToolLayout>;
};
export default HtmlToPug;