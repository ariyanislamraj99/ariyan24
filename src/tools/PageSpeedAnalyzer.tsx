import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const PageSpeedAnalyzer = () => {
  const [url, setUrl] = useState(""); const [output, setOutput] = useState("");
  const analyze = () => {
    const tips = [`🚀 Page Speed Tips for: ${url||"your site"}\n`,`✅ Optimize images (use WebP, compress)\n✅ Enable GZIP/Brotli compression\n✅ Minify CSS, JS, HTML\n✅ Leverage browser caching\n✅ Use a CDN\n✅ Reduce server response time\n✅ Eliminate render-blocking resources\n✅ Defer non-critical JavaScript\n✅ Preload key resources\n✅ Reduce DOM size\n✅ Avoid excessive redirects\n✅ Use lazy loading for images\n✅ Optimize web fonts (font-display: swap)\n✅ Remove unused CSS/JS\n✅ Inline critical CSS`,`\n💡 Use Google PageSpeed Insights for real metrics:\nhttps://pagespeed.web.dev/`];
    setOutput(tips.join("\n"));
  };
  return <ToolLayout>
    <ToolInput label="Website URL" value={url} onChange={setUrl} placeholder="https://example.com" />
    <ToolButton onClick={analyze}>Get Speed Tips</ToolButton>
    <ToolOutput label="Speed Optimization Tips" value={output} />
  </ToolLayout>;
};
export default PageSpeedAnalyzer;
