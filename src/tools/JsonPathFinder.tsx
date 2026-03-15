import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const JsonPathFinder = () => {
  const [json, setJson] = useState("");
  const [path, setPath] = useState("");
  const [output, setOutput] = useState("");
  const find = () => {
    try {
      const obj = JSON.parse(json);
      const parts = path.replace(/^\$\.?/, "").split(".").filter(Boolean);
      let current: any = obj;
      for (const p of parts) {
        const arrMatch = p.match(/^(\w+)\[(\d+)\]$/);
        if (arrMatch) { current = current[arrMatch[1]][parseInt(arrMatch[2])]; }
        else { current = current[p]; }
        if (current === undefined) { setOutput("Path not found"); return; }
      }
      setOutput(JSON.stringify(current, null, 2));
    } catch (e: any) { setOutput(`Error: ${e.message}`); }
  };
  return <ToolLayout><ToolInput label="JSON" value={json} onChange={setJson} multiline rows={6} placeholder='{"user":{"name":"John","items":[1,2,3]}}' /><ToolInput label="JSONPath" value={path} onChange={setPath} placeholder="$.user.name or user.items[0]" /><ToolButton onClick={find}>Find Value</ToolButton><ToolOutput label="Result" value={output} /></ToolLayout>;
};
export default JsonPathFinder;