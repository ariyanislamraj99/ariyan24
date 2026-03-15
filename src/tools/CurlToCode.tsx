import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton, ToolSelect } from "./ToolComponents";
const CurlToCode = () => {
  const [curl, setCurl] = useState("");
  const [lang, setLang] = useState("javascript");
  const [output, setOutput] = useState("");
  const convert = () => {
    const urlMatch = curl.match(/curl\s+(?:-[A-Z]+\s+)?["']?([^\s"']+)/i);
    const methodMatch = curl.match(/-X\s+(\w+)/i);
    const headerMatches = [...curl.matchAll(/-H\s+["']([^"']+)["']/gi)];
    const dataMatch = curl.match(/-d\s+["']([^"']+)["']/i);
    const url = urlMatch?.[1] || "https://example.com";
    const method = methodMatch?.[1] || (dataMatch ? "POST" : "GET");
    const headers = headerMatches.map(m => { const [k,...v] = m[1].split(":"); return [k.trim(), v.join(":").trim()]; });
    const body = dataMatch?.[1] || "";
    if (lang === "javascript") {
      const opts: any = { method };
      if (headers.length) opts.headers = Object.fromEntries(headers);
      if (body) opts.body = body;
      setOutput(`const response = await fetch("${url}", ${JSON.stringify(opts, null, 2)});\nconst data = await response.json();\nconsole.log(data);`);
    } else if (lang === "python") {
      const h = headers.length ? `\nheaders = ${JSON.stringify(Object.fromEntries(headers))}` : "";
      setOutput(`import requests${h}\nresponse = requests.${method.toLowerCase()}("${url}"${headers.length?", headers=headers":""}${body?`, json=${body}`:""})\nprint(response.json())`);
    } else {
      setOutput(`<?php\n$ch = curl_init("${url}");\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\ncurl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${method}");\n${headers.map(([k,v])=>`curl_setopt($ch, CURLOPT_HTTPHEADER, ["${k}: ${v}"]);`).join("\n")}\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;`);
    }
  };
  return <ToolLayout><ToolInput label="cURL Command" value={curl} onChange={setCurl} multiline rows={4} placeholder="curl -X GET https://api.example.com -H 'Content-Type: application/json'" />
    <ToolSelect label="Output Language" value={lang} onChange={setLang} options={[{value:"javascript",label:"JavaScript"},{value:"python",label:"Python"},{value:"php",label:"PHP"}]} />
    <ToolButton onClick={convert}>Convert</ToolButton><ToolOutput label="Code" value={output} /></ToolLayout>;
};
export default CurlToCode;