import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const HtmlToJsx = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const convert = () => {
    let jsx = input
      .replace(/\bclass=/g, "className=")
      .replace(/\bfor=/g, "htmlFor=")
      .replace(/\btabindex=/g, "tabIndex=")
      .replace(/\bautocomplete=/g, "autoComplete=")
      .replace(/\bautofocus/g, "autoFocus")
      .replace(/\bcrossorigin/g, "crossOrigin")
      .replace(/\breadonly/g, "readOnly")
      .replace(/\bmaxlength=/g, "maxLength=")
      .replace(/\bminlength=/g, "minLength=")
      .replace(/\bplaceholder=/g, "placeholder=")
      .replace(/\bstroke-width=/g, "strokeWidth=")
      .replace(/\bstroke-linecap=/g, "strokeLinecap=")
      .replace(/\bfill-rule=/g, "fillRule=")
      .replace(/\bclip-rule=/g, "clipRule=")
      .replace(/\bfont-size=/g, "fontSize=")
      .replace(/<!--([\s\S]*?)-->/g, "{/*$1*/}")
      .replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, "<$1$2 />")
      .replace(/style="([^"]+)"/g, (_, styles) => {
        const obj = styles.split(";").filter(Boolean).map((s: string) => {
          const [k, v] = s.split(":").map((x: string) => x.trim());
          const key = k.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
          return `${key}: "${v}"`;
        }).join(", ");
        return `style={{${obj}}}`;
      });
    setOutput(jsx);
  };
  return <ToolLayout><ToolInput label="HTML Input" value={input} onChange={setInput} multiline rows={6} placeholder='<div class="container" style="color: red;">...</div>' /><ToolButton onClick={convert}>Convert to JSX</ToolButton><ToolOutput label="JSX Output" value={output} /></ToolLayout>;
};
export default HtmlToJsx;