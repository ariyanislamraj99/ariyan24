import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const LessToCss = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const compile = () => {
    let css = input;
    const vars: Record<string,string> = {};
    css = css.replace(/@([a-zA-Z_-]+)\s*:\s*([^;]+);/g, (_,k,v) => { vars[k]=v.trim(); return ""; });
    Object.entries(vars).forEach(([k,v]) => { css = css.replace(new RegExp(`@${k}\\b`,"g"), v); });
    css = css.replace(/\.([a-zA-Z_-]+)\(\)/g, "/* mixin .$1() */");
    setOutput(css.trim() || "Paste LESS to compile");
  };
  return <ToolLayout><ToolInput label="LESS Input" value={input} onChange={setInput} multiline rows={6} placeholder="@primary: #6366f1;\n.btn { color: @primary; }" /><ToolButton onClick={compile}>Compile to CSS</ToolButton><ToolOutput label="CSS Output" value={output} /></ToolLayout>;
};
export default LessToCss;