import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const HtmlMinifier = () => {
  const [input, setInput] = useState(""); const [output, setOutput] = useState("");
  const minify = () => setOutput(input.replace(/<!--[\s\S]*?-->/g, "").replace(/\s+/g, " ").replace(/>\s+</g, "><").trim());
  return <ToolLayout><ToolInput label="HTML" value={input} onChange={setInput} multiline /><ToolButton onClick={minify}>Minify HTML</ToolButton><ToolOutput label="Minified" value={output} /></ToolLayout>;
};
export default HtmlMinifier;
