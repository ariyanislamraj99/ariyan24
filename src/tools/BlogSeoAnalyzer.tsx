import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const BlogSeoAnalyzer = () => {
  const [title,setTitle]=useState(""); const [content,setContent]=useState(""); const [keyword,setKeyword]=useState(""); const [output,setOutput]=useState("");
  const analyze = () => {
    const words = content.split(/\s+/).filter(Boolean).length;
    const kw = keyword.toLowerCase();
    const kwInTitle = title.toLowerCase().includes(kw);
    const kwInFirst = content.substring(0, 150).toLowerCase().includes(kw);
    const kwCount = content.toLowerCase().split(kw).length - 1;
    const density = words > 0 ? ((kwCount * kw.split(" ").length) / words * 100).toFixed(2) : "0";
    const hasH2 = /##|<h2/i.test(content);
    const hasLinks = /\[.*\]\(|<a\s/i.test(content);
    const hasImages = /!\[|<img/i.test(content);
    let score = 0;
    if (kwInTitle) score += 15; if (kwInFirst) score += 15; if (words >= 1000) score += 15;
    if (parseFloat(density)>=1 && parseFloat(density)<=3) score += 15; if (hasH2) score += 10;
    if (hasLinks) score += 10; if (hasImages) score += 10; if (title.length>=30 && title.length<=60) score += 10;
    setOutput(`📝 Blog SEO Score: ${score}/100\n\n${kwInTitle?"✅":"❌"} Keyword in title\n${kwInFirst?"✅":"❌"} Keyword in first paragraph\n${words>=1000?"✅":"⚠️"} Word count: ${words} (aim 1000+)\n${parseFloat(density)>=1&&parseFloat(density)<=3?"✅":"⚠️"} Density: ${density}%\n${hasH2?"✅":"❌"} Subheadings used\n${hasLinks?"✅":"❌"} Links included\n${hasImages?"✅":"❌"} Images included\n${title.length>=30&&title.length<=60?"✅":"⚠️"} Title: ${title.length} chars`);
  };
  return <ToolLayout>
    <ToolInput label="Blog Title" value={title} onChange={setTitle} placeholder="Your blog post title" />
    <ToolInput label="Target Keyword" value={keyword} onChange={setKeyword} placeholder="primary keyword" />
    <ToolInput label="Blog Content" value={content} onChange={setContent} multiline rows={8} placeholder="Paste blog content..." />
    <ToolButton onClick={analyze}>Analyze Blog SEO</ToolButton>
    <ToolOutput label="Blog SEO Report" value={output} />
  </ToolLayout>;
};
export default BlogSeoAnalyzer;
