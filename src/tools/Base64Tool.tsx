import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return <ToolLayout><ToolInput label="Text" value={input} onChange={setInput} multiline placeholder="Enter text" /><div className="flex gap-2"><ToolButton onClick={() => setOutput(btoa(unescape(encodeURIComponent(input))))}>Encode</ToolButton><ToolButton onClick={() => { try { setOutput(decodeURIComponent(escape(atob(input)))); } catch { setOutput("Invalid Base64"); } }} variant="secondary">Decode</ToolButton></div><ToolOutput label="Result" value={output} /></ToolLayout>;
};
export default Base64Tool;
