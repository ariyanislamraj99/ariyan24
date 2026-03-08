import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const format = () => { try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); } catch { setOutput("Invalid JSON"); } };
  return <ToolLayout><ToolInput label="JSON Input" value={input} onChange={setInput} multiline placeholder='{"key": "value"}' /><ToolButton onClick={format}>Format JSON</ToolButton><ToolOutput label="Formatted Output" value={output} /></ToolLayout>;
};
export default JsonFormatter;
