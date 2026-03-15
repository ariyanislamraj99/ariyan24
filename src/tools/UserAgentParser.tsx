import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const UserAgentParser = () => {
  const [ua, setUa] = useState(navigator.userAgent);
  const [output, setOutput] = useState("");
  const parse = () => {
    const browser = ua.match(/(?:Chrome|Firefox|Safari|Edge|Opera|MSIE|Trident)[/\s][\d.]+/i)?.[0] || "Unknown";
    const os = ua.match(/(?:Windows NT [\d.]+|Mac OS X [\d._]+|Linux|Android [\d.]+|iOS [\d._]+)/i)?.[0] || "Unknown";
    const mobile = /Mobile|Android|iPhone|iPad/i.test(ua);
    const bot = /bot|crawl|spider|slurp/i.test(ua);
    const engine = ua.match(/(?:Gecko|WebKit|Blink|Trident|Presto)[/\s][\d.]+/i)?.[0] || "Unknown";
    setOutput(`📱 User Agent Analysis\n\n🌐 Browser: ${browser}\n💻 OS: ${os}\n⚙️ Engine: ${engine}\n📱 Mobile: ${mobile ? "Yes" : "No"}\n🤖 Bot: ${bot ? "Yes" : "No"}\n\n📋 Full UA:\n${ua}`);
  };
  return <ToolLayout><ToolInput label="User Agent String" value={ua} onChange={setUa} multiline rows={3} /><ToolButton onClick={parse}>Parse</ToolButton><ToolOutput label="Parsed Result" value={output} /></ToolLayout>;
};
export default UserAgentParser;