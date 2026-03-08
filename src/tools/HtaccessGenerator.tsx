import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton, ToolSelect } from "./ToolComponents";
const HtaccessGenerator = () => {
  const [from, setFrom] = useState(""); const [to, setTo] = useState(""); const [type, setType] = useState("301"); const [output, setOutput] = useState("");
  const gen = () => setOutput(`RewriteEngine On\nRewriteRule ^${from}$ ${to} [R=${type},L]`);
  return <ToolLayout><ToolInput label="From Path" value={from} onChange={setFrom} placeholder="old-page" /><ToolInput label="To URL" value={to} onChange={setTo} placeholder="https://example.com/new-page" /><ToolSelect label="Redirect Type" value={type} onChange={setType} options={[{value:"301",label:"301 Permanent"},{value:"302",label:"302 Temporary"}]} /><ToolButton onClick={gen}>Generate</ToolButton><ToolOutput label=".htaccess" value={output} /></ToolLayout>;
};
export default HtaccessGenerator;
