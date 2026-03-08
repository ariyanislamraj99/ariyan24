import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const JsMinifier = () => {
  const [input, setInput] = useState(""); const [output, setOutput] = useState("");
  const minify = () => setOutput(input.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, "$1").trim());
  return <ToolLayout><ToolInput label="JavaScript" value={input} onChange={setInput} multiline placeholder="function hello() { return 'world'; }" /><ToolButton onClick={minify}>Minify JS</ToolButton><ToolOutput label="Minified" value={output} /></ToolLayout>;
};
export default JsMinifier;
