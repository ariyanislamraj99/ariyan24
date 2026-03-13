import { useState } from "react";
import { ToolLayout, ToolButton, ToolOutput } from "./ToolComponents";
const CoreWebVitals = () => {
  const [output, setOutput] = useState("");
  const show = () => setOutput(`📊 Core Web Vitals Guide\n${"═".repeat(35)}\n\n1️⃣ LCP (Largest Contentful Paint)\n   Good: ≤2.5s | Needs Improvement: ≤4.0s | Poor: >4.0s\n   Tips:\n   • Optimize server response times\n   • Use CDN for static assets\n   • Preload hero images\n   • Remove render-blocking resources\n\n2️⃣ FID (First Input Delay) → INP\n   Good: ≤100ms | Needs Improvement: ≤300ms | Poor: >300ms\n   Tips:\n   • Break up long tasks\n   • Use web workers for heavy processing\n   • Reduce JavaScript execution time\n   • Minimize third-party scripts\n\n3️⃣ CLS (Cumulative Layout Shift)\n   Good: ≤0.1 | Needs Improvement: ≤0.25 | Poor: >0.25\n   Tips:\n   • Set dimensions on images/videos\n   • Reserve space for ads/embeds\n   • Avoid inserting content above existing content\n   • Use transform animations\n\n4️⃣ INP (Interaction to Next Paint)\n   Good: ≤200ms | Needs Improvement: ≤500ms | Poor: >500ms\n   Tips:\n   • Optimize event handlers\n   • Use requestAnimationFrame\n   • Reduce main thread work`);
  return <ToolLayout>
    <ToolButton onClick={show}>Show Core Web Vitals Guide</ToolButton>
    <ToolOutput label="Core Web Vitals" value={output} />
  </ToolLayout>;
};
export default CoreWebVitals;
