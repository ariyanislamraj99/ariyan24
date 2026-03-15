import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const WpThemeDetector = () => {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");
  const detect = () => {
    if (!url) return;
    setOutput(`WordPress Theme Detection for: ${url}\n\n# Methods to detect WP theme:\n\n1. View Page Source → Search for "wp-content/themes/"\n   The folder name after /themes/ is the theme name.\n\n2. Check /wp-content/themes/[theme-name]/style.css\n   for Theme Name, Author, Version.\n\n3. Use browser DevTools:\n   - Open Network tab\n   - Filter by CSS\n   - Look for /wp-content/themes/ paths\n\n4. cURL method:\n   curl -s ${url} | grep -oP 'wp-content/themes/\\K[^/]+' | head -1\n\n5. Online detectors:\n   - https://www.wpthemedetector.com/\n   - https://whatwpthemeisthat.com/\n   - https://builtwith.com/`);
  };
  return <ToolLayout><ToolInput label="WordPress Site URL" value={url} onChange={setUrl} placeholder="https://example.com" /><ToolButton onClick={detect}>Detect Theme</ToolButton><ToolOutput label="Detection Guide" value={output} /></ToolLayout>;
};
export default WpThemeDetector;