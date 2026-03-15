import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const GraphqlFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const format = () => {
    let indent = 0;
    const lines = input.replace(/\{/g, " {\n").replace(/\}/g, "\n}").replace(/,/g,"\n").split("\n").map(l => l.trim()).filter(Boolean);
    const formatted = lines.map(line => {
      if (line === "}") indent--;
      const result = "  ".repeat(Math.max(0, indent)) + line;
      if (line.endsWith("{")) indent++;
      return result;
    }).join("\n");
    setOutput(formatted);
  };
  return <ToolLayout><ToolInput label="GraphQL Query" value={input} onChange={setInput} multiline rows={6} placeholder="query { user(id: 1) { name email posts { title } } }" /><ToolButton onClick={format}>Format</ToolButton><ToolOutput label="Formatted" value={output} /></ToolLayout>;
};
export default GraphqlFormatter;