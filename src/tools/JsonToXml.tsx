import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const JsonToXml = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const convert = () => {
    try {
      const obj = JSON.parse(input);
      const toXml = (o:any, tag:string, indent:string): string => {
        if (Array.isArray(o)) return o.map(i => toXml(i, "item", indent)).join("\n");
        if (typeof o === "object" && o !== null) {
          const inner = Object.entries(o).map(([k,v]) => toXml(v, k, indent+"  ")).join("\n");
          return `${indent}<${tag}>\n${inner}\n${indent}</${tag}>`;
        }
        return `${indent}<${tag}>${String(o)}</${tag}>`;
      };
      setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n${toXml(obj, "root", "")}`);
    } catch (e:any) { setOutput(`Error: ${e.message}`); }
  };
  return <ToolLayout><ToolInput label="JSON" value={input} onChange={setInput} multiline rows={6} placeholder='{"name":"John","age":30}' /><ToolButton onClick={convert}>Convert to XML</ToolButton><ToolOutput label="XML" value={output} /></ToolLayout>;
};
export default JsonToXml;