import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const RedirectChecker = () => {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");
  const check = () => {
    if (!url) return;
    setOutput(`Redirect Trace for: ${url}\n\n# Use these commands:\ncurl -IL ${url}\ncurl -sLD - ${url} -o /dev/null\n\n# Common redirect types:\n- 301: Permanent Redirect (SEO-friendly)\n- 302: Temporary Redirect\n- 303: See Other\n- 307: Temporary Redirect (preserves method)\n- 308: Permanent Redirect (preserves method)\n\n# Check online:\n- https://httpstatus.io/\n- https://redirectdetective.com/`);
  };
  return <ToolLayout><ToolInput label="URL to Check" value={url} onChange={setUrl} placeholder="https://example.com/old-page" /><ToolButton onClick={check}>Check Redirects</ToolButton><ToolOutput label="Redirect Info" value={output} /></ToolLayout>;
};
export default RedirectChecker;