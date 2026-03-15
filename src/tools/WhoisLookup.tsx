import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const WhoisLookup = () => {
  const [domain, setDomain] = useState("");
  const [output, setOutput] = useState("");
  const lookup = () => {
    if (!domain) return;
    const d = domain.replace(/^https?:\/\//, "").replace(/\/.*/, "");
    setOutput(`WHOIS Lookup for: ${d}\n\n# Command:\nwhois ${d}\n\n# Online WHOIS Services:\n- https://whois.domaintools.com/${d}\n- https://who.is/whois/${d}\n- https://www.whois.com/whois/${d}\n\n# Common WHOIS Fields:\n- Domain Name\n- Registrar\n- Registration Date\n- Expiration Date\n- Name Servers\n- Registrant Contact\n- Admin Contact`);
  };
  return <ToolLayout><ToolInput label="Domain" value={domain} onChange={setDomain} placeholder="example.com" /><ToolButton onClick={lookup}>WHOIS Lookup</ToolButton><ToolOutput label="WHOIS Info" value={output} /></ToolLayout>;
};
export default WhoisLookup;