import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const CssFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const format = () => {
    let css = input.replace(/\s*{\s*/g, " {\n  ").replace(/\s*}\s*/g, "\n}\n\n").replace(/;\s*/g, ";\n  ").replace(/\n  }/g, "\n}").replace(/\n{3,}/g, "\n\n").trim();
    setOutput(css);
  };
  return <ToolLayout><ToolInput label="CSS Input" value={input} onChange={setInput} multiline rows={6} placeholder=".class{color:red;margin:0}" /><ToolButton onClick={format}>Format CSS</ToolButton><ToolOutput label="Formatted CSS" value={output} /></ToolLayout>;
};
export default CssFormatter;