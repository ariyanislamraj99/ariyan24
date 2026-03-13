import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const GoogleAnalyticsGen = () => {
  const [id, setId] = useState(""); const [output, setOutput] = useState("");
  const generate = () => {
    setOutput(`<!-- Google Analytics 4 -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${id||"G-XXXXXXXXXX"}"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', '${id||"G-XXXXXXXXXX"}');\n</script>\n\n<!-- Place this in the <head> section of every page -->`);
  };
  return <ToolLayout>
    <ToolInput label="GA4 Measurement ID" value={id} onChange={setId} placeholder="G-XXXXXXXXXX" />
    <ToolButton onClick={generate}>Generate Code</ToolButton>
    <ToolOutput label="GA4 Tracking Code" value={output} />
  </ToolLayout>;
};
export default GoogleAnalyticsGen;
