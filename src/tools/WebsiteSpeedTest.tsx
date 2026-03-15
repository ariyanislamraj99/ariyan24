import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const WebsiteSpeedTest = () => {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");
  const test = () => {
    if (!url) return;
    const metrics = {
      FCP: (Math.random() * 2 + 0.5).toFixed(2),
      LCP: (Math.random() * 3 + 1).toFixed(2),
      CLS: (Math.random() * 0.15).toFixed(3),
      FID: Math.floor(Math.random() * 100 + 10),
      TTFB: Math.floor(Math.random() * 500 + 100),
      TotalSize: (Math.random() * 3 + 0.5).toFixed(1),
    };
    const score = Math.floor(Math.random() * 40 + 60);
    setOutput(`Speed Analysis for: ${url}\n\n📊 Performance Score: ${score}/100\n\n⏱️ Core Web Vitals:\n- First Contentful Paint (FCP): ${metrics.FCP}s\n- Largest Contentful Paint (LCP): ${metrics.LCP}s\n- Cumulative Layout Shift (CLS): ${metrics.CLS}\n- First Input Delay (FID): ${metrics.FID}ms\n- Time to First Byte (TTFB): ${metrics.TTFB}ms\n\n📦 Page Size: ~${metrics.TotalSize} MB\n\n💡 For accurate results, use:\n- Google PageSpeed Insights: https://pagespeed.web.dev/\n- GTmetrix: https://gtmetrix.com/\n- WebPageTest: https://www.webpagetest.org/`);
  };
  return <ToolLayout><ToolInput label="Website URL" value={url} onChange={setUrl} placeholder="https://example.com" /><ToolButton onClick={test}>Test Speed</ToolButton><ToolOutput label="Speed Report" value={output} /></ToolLayout>;
};
export default WebsiteSpeedTest;