import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput, ToolSelect } from "./ToolComponents";
const ContentBriefGen = () => {
  const [topic, setTopic] = useState(""); const [audience, setAudience] = useState(""); const [type, setType] = useState("blog"); const [output, setOutput] = useState("");
  const generate = () => {
    setOutput(`📋 CONTENT BRIEF\n${"═".repeat(40)}\n\n📌 Topic: ${topic||"N/A"}\n👥 Target Audience: ${audience||"General"}\n📝 Content Type: ${type}\n📏 Recommended Length: ${type==="blog"?"1500-2500 words":type==="guide"?"3000-5000 words":"800-1200 words"}\n\n🎯 Primary Keyword: ${topic.toLowerCase()}\n🔑 Secondary Keywords:\n  • ${topic} guide\n  • ${topic} tips\n  • best ${topic}\n  • how to ${topic}\n\n📑 Suggested Outline:\n  H1: ${topic} - Complete Guide\n  H2: What is ${topic}?\n  H2: Why ${topic} Matters\n  H2: How to Get Started with ${topic}\n  H2: Best Practices for ${topic}\n  H2: Common ${topic} Mistakes\n  H2: ${topic} Tools & Resources\n  H2: FAQ\n\n✅ Requirements:\n  • Include 3-5 internal links\n  • Add 2-3 external authoritative sources\n  • Include relevant images with alt text\n  • Add a meta description (155 chars)\n  • Use bullet points and numbered lists`);
  };
  return <ToolLayout>
    <ToolInput label="Topic" value={topic} onChange={setTopic} placeholder="e.g., Content Marketing Strategy" />
    <ToolInput label="Target Audience" value={audience} onChange={setAudience} placeholder="e.g., Small business owners" />
    <ToolSelect label="Content Type" value={type} onChange={setType} options={[{value:"blog",label:"Blog Post"},{value:"guide",label:"Ultimate Guide"},{value:"landing",label:"Landing Page"}]} />
    <ToolButton onClick={generate}>Generate Brief</ToolButton>
    <ToolOutput label="Content Brief" value={output} />
  </ToolLayout>;
};
export default ContentBriefGen;
