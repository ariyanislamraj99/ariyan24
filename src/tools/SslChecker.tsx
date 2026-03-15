import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const SslChecker = () => {
  const [domain, setDomain] = useState("");
  const [output, setOutput] = useState("");
  const check = () => {
    if (!domain) return;
    const d = domain.replace(/^https?:\/\//, "").replace(/\/.*/, "");
    setOutput(`SSL Certificate Check for: ${d}\n\n# Command line:\nopenssl s_client -connect ${d}:443 -servername ${d} 2>/dev/null | openssl x509 -text -noout\n\n# Quick check:\nopenssl s_client -connect ${d}:443 -servername ${d} 2>/dev/null | openssl x509 -dates -noout\n\n# Check expiry:\necho | openssl s_client -connect ${d}:443 2>/dev/null | openssl x509 -enddate -noout\n\n# Online tools:\n- https://www.ssllabs.com/ssltest/analyze.html?d=${d}\n- https://www.sslshopper.com/ssl-checker.html#hostname=${d}\n- https://crt.sh/?q=${d}`);
  };
  return <ToolLayout><ToolInput label="Domain" value={domain} onChange={setDomain} placeholder="example.com" /><ToolButton onClick={check}>Check SSL</ToolButton><ToolOutput label="SSL Info" value={output} /></ToolLayout>;
};
export default SslChecker;