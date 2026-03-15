import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton, ToolSelect } from "./ToolComponents";
const CodeToCurl = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const convert = () => {
    // Parse fetch calls
    const urlMatch = code.match(/fetch\s*\(\s*["']([^"']+)["']/);
    const methodMatch = code.match(/method\s*:\s*["'](\w+)["']/i);
    const bodyMatch = code.match(/body\s*:\s*(?:JSON\.stringify\s*\()?([^)},]+)/i);
    const headerMatches = [...code.matchAll(/["']([^"']+)["']\s*:\s*["']([^"']+)["']/g)];
    const url = urlMatch?.[1] || "https://example.com";
    const method = methodMatch?.[1] || "GET";
    let curl = `curl -X ${method} "${url}"`;
    headerMatches.forEach(([_,k,v]) => {
      if (!["method","body","credentials","mode","cache"].includes(k.toLowerCase())) {
        curl += ` \\\n  -H "${k}: ${v}"`;
      }
    });
    if (bodyMatch) curl += ` \\\n  -d '${bodyMatch[1].trim()}'`;
    setOutput(curl);
  };
  return <ToolLayout><ToolInput label="JavaScript Code (fetch/axios)" value={code} onChange={setCode} multiline rows={6} placeholder={'fetch("https://api.example.com", {\n  method: "POST",\n  headers: {"Content-Type": "application/json"},\n  body: JSON.stringify({key: "value"})\n})'} /><ToolButton onClick={convert}>Convert to cURL</ToolButton><ToolOutput label="cURL Command" value={output} /></ToolLayout>;
};
export default CodeToCurl;