import { useState } from "react";
import { ToolLayout, ToolInput, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const PageAuthorityCalc = () => {
  const [url,setUrl]=useState(""); const [backlinks,setBacklinks]=useState(10); const [domains,setDomains]=useState(5); const [age,setAge]=useState(12); const [output,setOutput]=useState("");
  const calc = () => {
    let pa = Math.min(100, Math.log2(backlinks + 1) * 8 + Math.log2(domains + 1) * 12 + Math.min(age / 6, 10));
    pa = Math.round(pa);
    setOutput(`📊 Estimated Page Authority: ${pa}/100\n\nURL: ${url||"N/A"}\nBacklinks: ${backlinks}\nReferring Domains: ${domains}\nPage Age: ${age} months\n\nLevel: ${pa>60?"🟢 High Authority":pa>30?"🟡 Medium Authority":"🔴 Low Authority"}\n\n💡 Increase PA:\n• Build quality backlinks\n• Get links from diverse domains\n• Create comprehensive content\n• Earn editorial links\n• Internal link to this page`);
  };
  return <ToolLayout>
    <ToolInput label="Page URL" value={url} onChange={setUrl} placeholder="https://example.com/page" />
    <ToolNumber label="Number of Backlinks" value={backlinks} onChange={setBacklinks} min={0} />
    <ToolNumber label="Referring Domains" value={domains} onChange={setDomains} min={0} />
    <ToolNumber label="Page Age (months)" value={age} onChange={setAge} min={0} />
    <ToolButton onClick={calc}>Estimate PA</ToolButton>
    <ToolOutput label="Page Authority Estimate" value={output} />
  </ToolLayout>;
};
export default PageAuthorityCalc;
