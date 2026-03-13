import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const MobileFriendlyTest = () => {
  const [html, setHtml] = useState(""); const [output, setOutput] = useState("");
  const test = () => {
    const checks: string[] = [];
    const hasViewport = html.includes('viewport') && html.includes('width=device-width');
    const hasResponsive = html.includes('@media') || html.includes('responsive') || html.includes('flex') || html.includes('grid');
    const hasTouchTargets = !html.includes('font-size: 10px') && !html.includes('font-size:10px');
    const hasReadableFont = !html.includes('font-size: 8') && !html.includes('font-size:8');
    const noHorizontalScroll = !html.includes('overflow-x: scroll');
    checks.push(`${hasViewport?"✅":"❌"} Viewport meta tag`);
    checks.push(`${hasResponsive?"✅":"⚠️"} Responsive design patterns`);
    checks.push(`${hasTouchTargets?"✅":"❌"} Appropriate touch target sizes`);
    checks.push(`${hasReadableFont?"✅":"❌"} Readable font sizes`);
    checks.push(`${noHorizontalScroll?"✅":"❌"} No horizontal scrolling`);
    const score = [hasViewport,hasResponsive,hasTouchTargets,hasReadableFont,noHorizontalScroll].filter(Boolean).length;
    setOutput(`📱 Mobile-Friendly Score: ${score}/5\n\n${checks.join("\n")}\n\n💡 Tips:\n• Add: <meta name="viewport" content="width=device-width, initial-scale=1">\n• Use relative units (%, em, rem)\n• Min touch target: 48x48px\n• Min font size: 16px`);
  };
  return <ToolLayout>
    <ToolInput label="HTML/CSS Content" value={html} onChange={setHtml} multiline rows={8} placeholder="Paste your HTML/CSS to check..." />
    <ToolButton onClick={test}>Test Mobile-Friendliness</ToolButton>
    <ToolOutput label="Mobile-Friendly Report" value={output} />
  </ToolLayout>;
};
export default MobileFriendlyTest;
