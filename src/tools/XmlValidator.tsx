import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const XmlValidator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const validate = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "text/xml");
    const err = doc.querySelector("parsererror");
    if (err) setOutput("❌ Invalid XML\n\n" + (err.textContent || "Parse error"));
    else {
      const root = doc.documentElement.tagName;
      const elements = doc.getElementsByTagName("*").length;
      setOutput(`✅ Valid XML!\n\nRoot element: <${root}>\nTotal elements: ${elements}\nSize: ${new Blob([input]).size} bytes`);
    }
  };
  return <ToolLayout><ToolInput label="XML Input" value={input} onChange={setInput} multiline rows={6} placeholder="<root><item>value</item></root>" /><ToolButton onClick={validate}>Validate XML</ToolButton><ToolOutput label="Result" value={output} /></ToolLayout>;
};
export default XmlValidator;