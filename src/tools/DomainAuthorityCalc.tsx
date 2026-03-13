import { useState } from "react";
import { ToolLayout, ToolInput, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const DomainAuthorityCalc = () => {
  const [domain,setDomain]=useState(""); const [backlinks,setBacklinks]=useState(100); const [domains,setDomains]=useState(30); const [age,setAge]=useState(24); const [pages,setPages]=useState(50); const [output,setOutput]=useState("");
  const calc = () => {
    let da = Math.min(100, Math.log2(backlinks + 1) * 6 + Math.log2(domains + 1) * 10 + Math.min(age / 12, 15) + Math.log2(pages + 1) * 3);
    da = Math.round(da);
    setOutput(`📊 Estimated Domain Authority: ${da}/100\n\nDomain: ${domain||"N/A"}\nBacklinks: ${backlinks.toLocaleString()}\nReferring Domains: ${domains}\nDomain Age: ${age} months\nIndexed Pages: ${pages}\n\nLevel: ${da>60?"🟢 High":da>30?"🟡 Medium":"🔴 Low"}\n\n💡 Increase DA:\n• Consistently create quality content\n• Build diverse backlink profile\n• Improve site structure\n• Remove toxic backlinks\n• Increase social presence`);
  };
  return <ToolLayout>
    <ToolInput label="Domain" value={domain} onChange={setDomain} placeholder="example.com" />
    <ToolNumber label="Total Backlinks" value={backlinks} onChange={setBacklinks} min={0} />
    <ToolNumber label="Referring Domains" value={domains} onChange={setDomains} min={0} />
    <ToolNumber label="Domain Age (months)" value={age} onChange={setAge} min={0} />
    <ToolNumber label="Indexed Pages" value={pages} onChange={setPages} min={0} />
    <ToolButton onClick={calc}>Estimate DA</ToolButton>
    <ToolOutput label="Domain Authority Estimate" value={output} />
  </ToolLayout>;
};
export default DomainAuthorityCalc;
