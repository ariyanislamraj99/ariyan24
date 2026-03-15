import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const IpToGeolocation = () => {
  const [ip, setIp] = useState("");
  const [output, setOutput] = useState("");
  const lookup = () => {
    setOutput(`IP Geolocation for: ${ip || "your IP"}\n\n# Free APIs to use:\n\n1. ip-api.com (no key needed):\n   curl http://ip-api.com/json/${ip}\n\n2. ipapi.co:\n   curl https://ipapi.co/${ip}/json/\n\n3. ipinfo.io:\n   curl https://ipinfo.io/${ip}/json\n\n# JavaScript:\nfetch("http://ip-api.com/json/${ip}")\n  .then(r => r.json())\n  .then(data => console.log(data));`);
  };
  return <ToolLayout><ToolInput label="IP Address" value={ip} onChange={setIp} placeholder="8.8.8.8" /><ToolButton onClick={lookup}>Lookup</ToolButton><ToolOutput label="Geolocation" value={output} /></ToolLayout>;
};
export default IpToGeolocation;