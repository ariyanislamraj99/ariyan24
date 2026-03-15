import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const SriHashGen = () => {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");
  const generate = async () => {
    if (!url) return;
    setOutput(`# SRI Hash Generation\n\n# For URL: ${url}\n\n# Generate via command line:\ncurl -s ${url} | openssl dgst -sha384 -binary | openssl base64 -A\n\n# Usage in HTML:\n<script src="${url}"\n  integrity="sha384-HASH_HERE"\n  crossorigin="anonymous"></script>\n\n<link rel="stylesheet" href="${url}"\n  integrity="sha384-HASH_HERE"\n  crossorigin="anonymous">\n\n# Online: https://www.srihash.org/`);
  };
  return <ToolLayout><ToolInput label="Resource URL" value={url} onChange={setUrl} placeholder="https://cdn.example.com/script.js" /><ToolButton onClick={generate}>Generate SRI</ToolButton><ToolOutput label="SRI Hash" value={output} /></ToolLayout>;
};
export default SriHashGen;