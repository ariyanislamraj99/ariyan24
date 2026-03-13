import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const FeaturedSnippetOpt = () => {
  const [query, setQuery] = useState(""); const [content, setContent] = useState(""); const [output, setOutput] = useState("");
  const optimize = () => {
    const hasQuestion = /^(what|how|why|when|where|who|which|can|does|is|are)/i.test(query);
    const hasList = /^[-*•\d]|<[uo]l/m.test(content);
    const hasDefinition = content.toLowerCase().includes(query.toLowerCase().replace(/^(what is|what are)\s*/i,""));
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const isGoodLength = wordCount >= 40 && wordCount <= 60;
    let score = 0;
    if (hasQuestion) score += 20;
    if (hasList) score += 20;
    if (hasDefinition) score += 20;
    if (isGoodLength) score += 20;
    if (content.includes(query)) score += 20;
    setOutput(`⭐ Featured Snippet Optimization\n\nQuery: "${query}"\nScore: ${score}/100\n\n${hasQuestion?"✅":"⚠️"} Query is a question\n${hasDefinition?"✅":"❌"} Content answers the query\n${hasList?"✅":"⚠️"} Contains list/steps format\n${isGoodLength?"✅":"⚠️"} Optimal length (40-60 words): ${wordCount} words\n${content.includes(query)?"✅":"❌"} Exact query in content\n\n💡 Snippet Types & Tips:\n• Paragraph: Answer in 40-60 words right after H2\n• List: Use numbered/bullet lists\n• Table: Use HTML tables for comparisons\n• Start answer with "X is..." or "To X, you need..."\n• Place answer immediately after the question heading`);
  };
  return <ToolLayout>
    <ToolInput label="Target Query" value={query} onChange={setQuery} placeholder="What is SEO?" />
    <ToolInput label="Your Content/Answer" value={content} onChange={setContent} multiline rows={6} placeholder="SEO (Search Engine Optimization) is the practice of..." />
    <ToolButton onClick={optimize}>Optimize for Snippet</ToolButton>
    <ToolOutput label="Snippet Optimization" value={output} />
  </ToolLayout>;
};
export default FeaturedSnippetOpt;
