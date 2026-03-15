import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const SslCertGenerator = () => {
  const [cn, setCn] = useState("");
  const [org, setOrg] = useState("");
  const [country, setCountry] = useState("US");
  const [output, setOutput] = useState("");
  const generate = () => {
    setOutput(`# Generate SSL CSR and Private Key\n\n# Generate private key:\nopenssl genrsa -out ${cn || "domain"}.key 2048\n\n# Generate CSR:\nopenssl req -new -key ${cn || "domain"}.key -out ${cn || "domain"}.csr \\\n  -subj "/C=${country}/O=${org || "Organization"}/CN=${cn || "example.com"}"\n\n# Self-signed certificate (for testing):\nopenssl req -x509 -nodes -days 365 \\\n  -newkey rsa:2048 \\\n  -keyout ${cn || "domain"}.key \\\n  -out ${cn || "domain"}.crt \\\n  -subj "/C=${country}/O=${org || "Organization"}/CN=${cn || "example.com"}"\n\n# View CSR:\nopenssl req -text -noout -in ${cn || "domain"}.csr`);
  };
  return <ToolLayout>
    <ToolInput label="Common Name (Domain)" value={cn} onChange={setCn} placeholder="example.com" />
    <ToolInput label="Organization" value={org} onChange={setOrg} placeholder="My Company" />
    <ToolInput label="Country Code" value={country} onChange={setCountry} placeholder="US" />
    <ToolButton onClick={generate}>Generate CSR</ToolButton>
    <ToolOutput label="OpenSSL Commands" value={output} />
  </ToolLayout>;
};
export default SslCertGenerator;