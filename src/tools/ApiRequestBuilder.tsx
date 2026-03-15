import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton, ToolSelect } from "./ToolComponents";
const ApiRequestBuilder = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("Content-Type: application/json");
  const [body, setBody] = useState("");
  const [output, setOutput] = useState("");
  const generate = () => {
    const hdrs = headers.split("\n").filter(Boolean).map(h => { const [k,...v] = h.split(":"); return [k.trim(), v.join(":").trim()]; });
    // Generate fetch code
    const fetchOpts: any = { method };
    if (hdrs.length) fetchOpts.headers = Object.fromEntries(hdrs);
    if (body && method !== "GET") fetchOpts.body = body;
    const fetchCode = `fetch("${url}", ${JSON.stringify(fetchOpts, null, 2)})\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));`;
    // Generate cURL
    const curlHeaders = hdrs.map(([k,v]) => `-H "${k}: ${v}"`).join(" ");
    const curlBody = body && method !== "GET" ? `-d '${body}'` : "";
    const curl = `curl -X ${method} "${url}" ${curlHeaders} ${curlBody}`.trim();
    setOutput(`// JavaScript (fetch)\n${fetchCode}\n\n# cURL\n${curl}`);
  };
  return <ToolLayout>
    <ToolSelect label="Method" value={method} onChange={setMethod} options={["GET","POST","PUT","PATCH","DELETE","HEAD","OPTIONS"].map(m=>({value:m,label:m}))} />
    <ToolInput label="URL" value={url} onChange={setUrl} placeholder="https://api.example.com/endpoint" />
    <ToolInput label="Headers (one per line)" value={headers} onChange={setHeaders} multiline rows={3} placeholder="Content-Type: application/json" />
    {method !== "GET" && <ToolInput label="Body" value={body} onChange={setBody} multiline rows={4} placeholder='{"key":"value"}' />}
    <ToolButton onClick={generate}>Generate Code</ToolButton>
    <ToolOutput label="Request Code" value={output} />
  </ToolLayout>;
};
export default ApiRequestBuilder;