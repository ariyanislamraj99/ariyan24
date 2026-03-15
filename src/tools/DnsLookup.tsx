import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const DnsLookup = () => {
  const [domain, setDomain] = useState("");
  const [output, setOutput] = useState("");
  const lookup = () => {
    if (!domain) return;
    const d = domain.replace(/^https?:\/\//, "").replace(/\/.*/, "");
    setOutput(`DNS Records for: ${d}\n\n# Use these commands to look up DNS records:\n\n# A Record\nnslookup ${d}\ndig ${d} A\n\n# MX Records\ndig ${d} MX\n\n# NS Records\ndig ${d} NS\n\n# TXT Records\ndig ${d} TXT\n\n# CNAME\ndig ${d} CNAME\n\n# All Records\ndig ${d} ANY\n\n# Online: Use Google DNS (https://dns.google/resolve?name=${d}&type=A)`);
  };
  return <ToolLayout><ToolInput label="Domain" value={domain} onChange={setDomain} placeholder="example.com" /><ToolButton onClick={lookup}>Lookup DNS</ToolButton><ToolOutput label="DNS Commands" value={output} /></ToolLayout>;
};
export default DnsLookup;