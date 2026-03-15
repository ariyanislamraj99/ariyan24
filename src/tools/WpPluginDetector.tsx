import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const WpPluginDetector = () => {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");
  const detect = () => {
    if (!url) return;
    setOutput(`WordPress Plugin Detection for: ${url}\n\n# Methods to detect WP plugins:\n\n1. View Page Source → Search for "wp-content/plugins/"\n   Each folder name = a plugin slug.\n\n2. Common plugin signatures:\n   - Yoast SEO: "yoast-seo" in source\n   - WooCommerce: "woocommerce" in source\n   - Contact Form 7: "wpcf7" in source\n   - Elementor: "elementor" in source\n   - WP Rocket: "wp-rocket" in source\n\n3. cURL method:\n   curl -s ${url} | grep -oP 'wp-content/plugins/\\K[^/]+' | sort -u\n\n4. Check meta generators:\n   curl -s ${url} | grep '<meta name="generator"'\n\n5. Online tools:\n   - https://www.wpthemedetector.com/\n   - https://builtwith.com/\n   - https://w3techs.com/`);
  };
  return <ToolLayout><ToolInput label="WordPress Site URL" value={url} onChange={setUrl} placeholder="https://example.com" /><ToolButton onClick={detect}>Detect Plugins</ToolButton><ToolOutput label="Detection Guide" value={output} /></ToolLayout>;
};
export default WpPluginDetector;