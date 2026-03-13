import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const ImageSeoChecker = () => {
  const [html, setHtml] = useState(""); const [output, setOutput] = useState("");
  const check = () => {
    const imgRegex = /<img[^>]*>/gi; const imgs = html.match(imgRegex) || [];
    const results = imgs.map((img, i) => {
      const hasAlt = /alt=["'][^"']+["']/.test(img); const hasSrc = /src=["'][^"']+["']/.test(img);
      const hasWidth = /width=/i.test(img); const hasHeight = /height=/i.test(img);
      const hasLazy = /loading=["']lazy["']/.test(img);
      const src = img.match(/src=["']([^"']+)["']/)?.[1] || "unknown";
      return `Image ${i+1}: ${src.substring(0,40)}...\n  ${hasAlt?"✅":"❌"} Alt text\n  ${hasSrc?"✅":"❌"} Source\n  ${hasWidth&&hasHeight?"✅":"⚠️"} Dimensions set\n  ${hasLazy?"✅":"⚠️"} Lazy loading`;
    });
    const noAlt = imgs.filter(i => !/alt=["'][^"']+["']/.test(i)).length;
    setOutput(`🖼️ Image SEO Report\n\nImages found: ${imgs.length}\nMissing alt text: ${noAlt}\n\n${results.join("\n\n")}${imgs.length===0?"\nNo <img> tags found in the HTML.":""}`);
  };
  return <ToolLayout>
    <ToolInput label="HTML Content" value={html} onChange={setHtml} multiline rows={8} placeholder="Paste HTML with <img> tags..." />
    <ToolButton onClick={check}>Check Image SEO</ToolButton>
    <ToolOutput label="Image SEO Report" value={output} />
  </ToolLayout>;
};
export default ImageSeoChecker;
