import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const RedirectMapGen = () => {
  const [input, setInput] = useState(""); const [output, setOutput] = useState("");
  const generate = () => {
    const lines = input.split("\n").map(l=>l.trim()).filter(Boolean);
    const htaccess = lines.map(line => {
      const [from, to] = line.split(/\s*[,\t→>]\s*/);
      return from && to ? `Redirect 301 ${from} ${to}` : `# Invalid: ${line}`;
    });
    const nginx = lines.map(line => {
      const [from, to] = line.split(/\s*[,\t→>]\s*/);
      return from && to ? `rewrite ^${from}$ ${to} permanent;` : `# Invalid: ${line}`;
    });
    setOutput(`# Apache .htaccess\n${htaccess.join("\n")}\n\n# Nginx\n${nginx.join("\n")}\n\n# Total redirects: ${lines.length}`);
  };
  return <ToolLayout>
    <ToolInput label="Redirect Pairs (old → new, one per line)" value={input} onChange={setInput} multiline rows={8} placeholder="/old-page, /new-page\n/blog/old, /blog/new" />
    <ToolButton onClick={generate}>Generate Redirect Map</ToolButton>
    <ToolOutput label="Redirect Rules" value={output} />
  </ToolLayout>;
};
export default RedirectMapGen;
