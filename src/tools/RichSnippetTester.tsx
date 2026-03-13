import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const RichSnippetTester = () => {
  const [json, setJson] = useState(""); const output = (() => {
    try { if (!json) return ""; const data = JSON.parse(json); const type = data["@type"]||"Unknown";
      return `✅ Valid JSON-LD\n\nType: ${type}\n${Object.entries(data).filter(([k])=>k!=="@context"&&k!=="@type").map(([k,v])=>`${k}: ${typeof v==="object"?JSON.stringify(v):v}`).join("\n")}\n\n🔍 Preview:\nThis would appear as a ${type} rich snippet in Google search results.`;
    } catch { return json ? "❌ Invalid JSON - check syntax" : ""; }})();
  return <ToolLayout>
    <ToolInput label="Structured Data (JSON-LD)" value={json} onChange={setJson} multiline rows={10} placeholder='{"@context":"https://schema.org","@type":"Product",...}' />
    <ToolOutput label="Rich Snippet Preview" value={output} />
  </ToolLayout>;
};
export default RichSnippetTester;
