import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const UrlEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return <ToolLayout><ToolInput label="Text" value={input} onChange={setInput} placeholder="Enter text to encode/decode" /><div className="flex gap-2"><ToolButton onClick={() => setOutput(encodeURIComponent(input))}>Encode</ToolButton><ToolButton onClick={() => { try { setOutput(decodeURIComponent(input)); } catch { setOutput("Invalid encoded string"); } }} variant="secondary">Decode</ToolButton></div><ToolOutput label="Result" value={output} /></ToolLayout>;
};
export default UrlEncoder;
