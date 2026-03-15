import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const HttpHeaderChecker = () => {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");
  const check = () => {
    if (!url) return;
    const headers = [
      `HTTP/1.1 200 OK`,
      `Server: nginx/1.24.0`,
      `Content-Type: text/html; charset=UTF-8`,
      `X-Content-Type-Options: nosniff`,
      `X-Frame-Options: SAMEORIGIN`,
      `X-XSS-Protection: 1; mode=block`,
      `Strict-Transport-Security: max-age=31536000; includeSubDomains`,
      `Content-Security-Policy: default-src 'self'`,
      `Cache-Control: public, max-age=3600`,
      `Date: ${new Date().toUTCString()}`,
    ];
    setOutput(`Headers for: ${url}\n\n${headers.join("\n")}\n\n⚠️ Note: This is a simulated response. For real headers, use:\ncurl -I ${url}`);
  };
  return <ToolLayout><ToolInput label="URL" value={url} onChange={setUrl} placeholder="https://example.com" /><ToolButton onClick={check}>Check Headers</ToolButton><ToolOutput label="HTTP Headers" value={output} /></ToolLayout>;
};
export default HttpHeaderChecker;