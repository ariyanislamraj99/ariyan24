import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const VideoSeoChecker = () => {
  const [title,setTitle]=useState(""); const [desc,setDesc]=useState(""); const [tags,setTags]=useState(""); const [output,setOutput]=useState("");
  const check = () => {
    const issues: string[] = [];
    if (!title) issues.push("❌ Missing title"); else if (title.length<20) issues.push("⚠️ Title too short"); else issues.push("✅ Title length OK");
    if (!desc) issues.push("❌ Missing description"); else if (desc.length<100) issues.push("⚠️ Description too short (<100 chars)"); else issues.push("✅ Description length OK");
    const tagList = tags.split(",").map(t=>t.trim()).filter(Boolean);
    if (tagList.length<3) issues.push("⚠️ Add more tags (min 5)"); else issues.push("✅ Tags count OK");
    issues.push(`\n💡 Video SEO Tips:\n• Use keyword in first 3 words of title\n• Write 200+ word descriptions\n• Add timestamps/chapters\n• Include transcript\n• Use custom thumbnail\n• Add end screens & cards\n• Create video sitemap`);
    setOutput(issues.join("\n"));
  };
  return <ToolLayout>
    <ToolInput label="Video Title" value={title} onChange={setTitle} placeholder="Video title..." />
    <ToolInput label="Description" value={desc} onChange={setDesc} multiline rows={4} placeholder="Video description..." />
    <ToolInput label="Tags (comma separated)" value={tags} onChange={setTags} placeholder="tag1, tag2, tag3" />
    <ToolButton onClick={check}>Check Video SEO</ToolButton>
    <ToolOutput label="Video SEO Report" value={output} />
  </ToolLayout>;
};
export default VideoSeoChecker;
