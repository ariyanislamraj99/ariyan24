import { useState } from "react";
import { ToolLayout, ToolOutput, ToolButton } from "./ToolComponents";
const IpLookup = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const lookup = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setOutput(`🌐 Your IP Information\n\n📍 IP: ${data.ip}\n🏙️ City: ${data.city}\n🗺️ Region: ${data.region}\n🇧🇩 Country: ${data.country_name} (${data.country_code})\n📮 Postal: ${data.postal}\n🕐 Timezone: ${data.timezone}\n🏢 ISP: ${data.org}\n📡 ASN: ${data.asn}\n🌍 Latitude: ${data.latitude}\n🌍 Longitude: ${data.longitude}`);
    } catch {
      setOutput("Could not fetch IP information. Try:\n\ncurl https://ipapi.co/json/\ncurl https://ipinfo.io/json\ncurl https://api.ipify.org?format=json");
    }
    setLoading(false);
  };
  return <ToolLayout><ToolButton onClick={lookup}>{loading ? "Looking up..." : "Get My IP Info"}</ToolButton><ToolOutput label="IP Details" value={output} /></ToolLayout>;
};
export default IpLookup;