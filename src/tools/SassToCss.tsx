import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const SassToCss = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const compile = () => {
    let css = input;
    // Handle variables
    const vars: Record<string,string> = {};
    css = css.replace(/\$([a-zA-Z_-]+)\s*:\s*([^;]+);/g, (_,k,v) => { vars[k]=v.trim(); return ""; });
    Object.entries(vars).forEach(([k,v]) => { css = css.replace(new RegExp(`\\$${k}`,"g"), v); });
    // Handle nesting (one level)
    css = css.replace(/([^{]+)\{([^}]*?)([^{]+)\{([^}]*?)\}/g, (_,parent,parentRules,child,childRules) => {
      const p = parent.trim();
      const c = child.trim();
      let result = "";
      if (parentRules.trim()) result += `${p} {\n  ${parentRules.trim()}\n}\n`;
      result += `${p} ${c} {\n  ${childRules.trim()}\n}`;
      return result;
    });
    // Handle mixins (basic)
    css = css.replace(/@mixin\s+([^({\s]+)[^{]*\{([^}]+)\}/g, "/* mixin $1 */");
    css = css.replace(/@include\s+([^;(]+)[^;]*;/g, "/* @include $1 */");
    setOutput(css.trim() || "Paste SCSS to compile");
  };
  return <ToolLayout><ToolInput label="SASS/SCSS Input" value={input} onChange={setInput} multiline rows={8} placeholder="$primary: #6366f1;\n.btn {\n  color: $primary;\n  &:hover { opacity: 0.8; }\n}" /><ToolButton onClick={compile}>Compile to CSS</ToolButton><ToolOutput label="CSS Output" value={output} /></ToolLayout>;
};
export default SassToCss;