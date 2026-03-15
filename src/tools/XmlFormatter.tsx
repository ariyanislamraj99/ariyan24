import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const XmlFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const format = () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/xml");
      const err = doc.querySelector("parsererror");
      if (err) { setOutput("❌ Invalid XML"); return; }
      const serializer = new XMLSerializer();
      let xml = serializer.serializeToString(doc);
      // Basic prettify
      let formatted = "";
      let indent = 0;
      xml.replace(/>\s*</g, ">\n<").split("\n").forEach(line => {
        if (line.match(/^<\//)) indent--;
        formatted += "  ".repeat(Math.max(0, indent)) + line.trim() + "\n";
        if (line.match(/^<[^/?]/) && !line.match(/\/>$/)) indent++;
      });
      setOutput(formatted.trim());
    } catch (e:any) { setOutput(`Error: ${e.message}`); }
  };
  return <ToolLayout><ToolInput label="XML" value={input} onChange={setInput} multiline rows={6} placeholder="<root><item>value</item></root>" /><ToolButton onClick={format}>Format XML</ToolButton><ToolOutput label="Formatted XML" value={output} /></ToolLayout>;
};
export default XmlFormatter;