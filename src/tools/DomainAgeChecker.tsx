import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const DomainAgeChecker = () => {
  const [domain, setDomain] = useState("");
  const [output, setOutput] = useState("");
  const check = () => {
    if (!domain) return;
    const d = domain.replace(/^https?:\/\//, "").replace(/\/.*/, "");
    setOutput(`Domain Age Check: ${d}\n\n# Use WHOIS to find registration date:\nwhois ${d} | grep -i "creation date"\n\n# Online tools:\n- https://whois.domaintools.com/${d}\n- https://www.whois.com/whois/${d}\n- https://who.is/whois/${d}\n\n# The "Creation Date" field shows when the domain was first registered.\n# Domain age is a minor SEO ranking factor.`);
  };
  return <ToolLayout><ToolInput label="Domain" value={domain} onChange={setDomain} placeholder="example.com" /><ToolButton onClick={check}>Check Age</ToolButton><ToolOutput label="Result" value={output} /></ToolLayout>;
};
export default DomainAgeChecker;