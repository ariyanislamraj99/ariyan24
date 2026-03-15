import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const AccessibilityChecker = () => {
  const [html, setHtml] = useState("");
  const [output, setOutput] = useState("");
  const check = () => {
    const issues: string[] = [];
    const warnings: string[] = [];
    const passed: string[] = [];
    // Check for alt attributes
    const imgs = html.match(/<img[^>]*>/gi) || [];
    const noAlt = imgs.filter(i => !i.includes("alt="));
    if (noAlt.length) issues.push(`❌ ${noAlt.length} image(s) missing alt attribute`);
    else if (imgs.length) passed.push(`✅ All ${imgs.length} images have alt attributes`);
    // Check for heading hierarchy
    const headings = [...html.matchAll(/<h(\d)[^>]*>/gi)].map(m => +m[1]);
    if (headings.length && headings[0] !== 1) warnings.push("⚠️ First heading is not <h1>");
    for (let i = 1; i < headings.length; i++) {
      if (headings[i] > headings[i-1] + 1) warnings.push(`⚠️ Heading level skipped: h${headings[i-1]} → h${headings[i]}`);
    }
    if (headings.length && !warnings.some(w=>w.includes("Heading"))) passed.push("✅ Heading hierarchy is correct");
    // Check for form labels
    const inputs = (html.match(/<input[^>]*>/gi) || []).filter(i => !i.includes('type="hidden"') && !i.includes('type="submit"'));
    const labels = html.match(/<label[^>]*>/gi) || [];
    if (inputs.length > labels.length) warnings.push(`⚠️ ${inputs.length - labels.length} form input(s) may be missing labels`);
    // Check lang attribute
    if (html.includes("<html") && !html.includes("lang=")) issues.push("❌ Missing lang attribute on <html>");
    // Check for ARIA
    if (html.includes("role=") || html.includes("aria-")) passed.push("✅ ARIA attributes found");
    // Check for link text
    const emptyLinks = html.match(/<a[^>]*>\s*<\/a>/gi) || [];
    if (emptyLinks.length) issues.push(`❌ ${emptyLinks.length} empty link(s) found`);
    const result = [...issues, ...warnings, ...passed].join("\n") || "Paste HTML to check";
    setOutput(`WCAG Accessibility Check\n${"═".repeat(30)}\n\n${result}\n\nIssues: ${issues.length} | Warnings: ${warnings.length} | Passed: ${passed.length}`);
  };
  return <ToolLayout><ToolInput label="HTML" value={html} onChange={setHtml} multiline rows={8} placeholder="<html><body>...</body></html>" /><ToolButton onClick={check}>Check Accessibility</ToolButton><ToolOutput label="Results" value={output} /></ToolLayout>;
};
export default AccessibilityChecker;