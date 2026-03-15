import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const CookieAnalyzer = () => {
  const [output, setOutput] = useState("");
  const analyze = () => {
    const cookies = document.cookie;
    if (!cookies) { setOutput("No cookies found on this page.\n\nCookies are domain-specific. This tool can only read cookies for the current domain."); return; }
    const parsed = cookies.split(";").map(c => {
      const [name, ...val] = c.split("=");
      return `Name: ${name.trim()}\nValue: ${val.join("=").trim()}`;
    }).join("\n\n");
    setOutput(`🍪 Found ${cookies.split(";").length} cookie(s):\n\n${parsed}`);
  };
  useState(() => { analyze(); });
  return <ToolLayout>
    <button onClick={analyze} className="px-6 py-2.5 rounded-xl text-sm font-medium gradient-bg text-primary-foreground hover:opacity-90 shadow-lg">Refresh Cookies</button>
    <ToolOutput label="Cookies" value={output || "Click Refresh to analyze cookies"} />
  </ToolLayout>;
};
export default CookieAnalyzer;