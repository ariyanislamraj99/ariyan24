import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const CssMinifier = () => {
  const [input, setInput] = useState(""); const [output, setOutput] = useState("");
  const minify = () => setOutput(input.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").replace(/;}/g, "}").trim());
  return <ToolLayout><ToolInput label="CSS" value={input} onChange={setInput} multiline placeholder=".class { color: red; }" /><ToolButton onClick={minify}>Minify CSS</ToolButton><ToolOutput label="Minified" value={output} /></ToolLayout>;
};
export default CssMinifier;
