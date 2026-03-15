import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const XmlToJson = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const convert = () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/xml");
      const err = doc.querySelector("parsererror");
      if (err) { setOutput("❌ Invalid XML: " + err.textContent); return; }
      const nodeToObj = (node: Element): any => {
        const obj: any = {};
        if (node.children.length === 0) return node.textContent || "";
        Array.from(node.children).forEach(child => {
          const key = child.tagName;
          const val = nodeToObj(child);
          if (obj[key]) {
            if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
            obj[key].push(val);
          } else obj[key] = val;
        });
        return obj;
      };
      setOutput(JSON.stringify(nodeToObj(doc.documentElement), null, 2));
    } catch (e:any) { setOutput(`Error: ${e.message}`); }
  };
  return <ToolLayout><ToolInput label="XML" value={input} onChange={setInput} multiline rows={6} placeholder="<root><name>John</name></root>" /><ToolButton onClick={convert}>Convert to JSON</ToolButton><ToolOutput label="JSON" value={output} /></ToolLayout>;
};
export default XmlToJson;