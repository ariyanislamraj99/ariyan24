import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const JsonValidator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const validate = () => {
    try { const parsed = JSON.parse(input); const keys = typeof parsed === "object" ? Object.keys(parsed).length : 0; setOutput(`✅ Valid JSON!\n\nType: ${Array.isArray(parsed)?"Array":"Object"}\n${Array.isArray(parsed)?`Items: ${parsed.length}`:`Keys: ${keys}`}\nSize: ${new Blob([input]).size} bytes`); }
    catch (e: any) { setOutput(`❌ Invalid JSON\n\nError: ${e.message}`); }
  };
  return <ToolLayout><ToolInput label="JSON Input" value={input} onChange={setInput} multiline rows={6} placeholder='{"key": "value"}' /><ToolButton onClick={validate}>Validate JSON</ToolButton><ToolOutput label="Result" value={output} /></ToolLayout>;
};
export default JsonValidator;