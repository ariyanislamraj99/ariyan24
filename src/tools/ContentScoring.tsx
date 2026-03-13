import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const ContentScoring = () => {
  const [content, setContent] = useState(""); const [keyword, setKeyword] = useState(""); const [output, setOutput] = useState("");
  const score = () => {
    const words = content.split(/\s+/).filter(Boolean);
    const wordCount = words.length; const sentences = content.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = content.split(/\n\n+/).filter(Boolean).length;
    const kw = keyword.toLowerCase(); const kwCount = content.toLowerCase().split(kw).length - 1;
    const density = wordCount > 0 ? ((kwCount * kw.split(" ").length) / wordCount * 100).toFixed(2) : "0";
    const hasH1 = /^#\s/.test(content) || /<h1/i.test(content);
    const hasH2 = /^##\s/m.test(content) || /<h2/i.test(content);
    const hasLinks = /\[.*\]\(.*\)/.test(content) || /<a\s/i.test(content);
    const hasList = /^[-*]\s/m.test(content) || /<[uo]l/i.test(content);
    let s = 0;
    if (wordCount >= 300) s += 15; if (wordCount >= 1000) s += 10; if (wordCount >= 1500) s += 5;
    if (parseFloat(density) >= 1 && parseFloat(density) <= 3) s += 20; else if (kwCount > 0) s += 10;
    if (hasH1) s += 10; if (hasH2) s += 10; if (hasLinks) s += 10; if (hasList) s += 10;
    if (sentences > 0 && wordCount/sentences < 25) s += 10;
    s = Math.min(100, s);
    setOutput(`📊 SEO Content Score: ${s}/100\n\n📏 Word Count: ${wordCount}\n📝 Sentences: ${sentences}\n📄 Paragraphs: ${paragraphs}\n🔑 Keyword "${keyword}" found: ${kwCount} times\n📈 Keyword Density: ${density}%\n\nChecklist:\n${hasH1?"✅":"❌"} H1 heading\n${hasH2?"✅":"❌"} H2 subheadings\n${hasLinks?"✅":"❌"} Links included\n${hasList?"✅":"❌"} Lists used\n${wordCount>=300?"✅":"❌"} Minimum 300 words\n${parseFloat(density)>=1&&parseFloat(density)<=3?"✅":"❌"} Keyword density 1-3%`);
  };
  return <ToolLayout>
    <ToolInput label="Content" value={content} onChange={setContent} multiline rows={8} placeholder="Paste your content..." />
    <ToolInput label="Target Keyword" value={keyword} onChange={setKeyword} placeholder="primary keyword" />
    <ToolButton onClick={score}>Score Content</ToolButton>
    <ToolOutput label="SEO Score" value={output} />
  </ToolLayout>;
};
export default ContentScoring;
