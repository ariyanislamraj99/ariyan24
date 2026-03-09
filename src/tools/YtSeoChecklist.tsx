import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";

const YtSeoChecklist = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [output, setOutput] = useState("");

  const check = () => {
    const checks = [
      { label: "Title between 40-70 characters", pass: title.length >= 40 && title.length <= 70 },
      { label: "Title contains keyword at start", pass: title.length > 0 },
      { label: "Title uses numbers or power words", pass: /\d|best|top|how|why|ultimate|amazing|secret|proven/i.test(title) },
      { label: "Description has 250+ words", pass: desc.split(/\s+/).filter(Boolean).length >= 250 },
      { label: "Description first 150 chars compelling", pass: desc.length >= 150 },
      { label: "Description contains links", pass: /https?:\/\//.test(desc) },
      { label: "Description has timestamps", pass: /\d{1,2}:\d{2}/.test(desc) },
      { label: "Description has hashtags", pass: /#\w+/.test(desc) },
      { label: "Has 5+ tags", pass: tags.split(",").filter((t) => t.trim()).length >= 5 },
      { label: "Tags include long-tail keywords", pass: tags.split(",").some((t) => t.trim().split(" ").length >= 3) },
      { label: "Description has CTA (subscribe, like)", pass: /subscribe|like|comment|share|click|watch/i.test(desc) },
      { label: "Title has emotional hook", pass: /!|\?|amazing|shocking|secret|revealed|truth/i.test(title) },
    ];

    const passed = checks.filter((c) => c.pass).length;
    const score = Math.round((passed / checks.length) * 100);
    const emoji = score >= 80 ? "🟢" : score >= 60 ? "🟡" : "🔴";

    setOutput(
      `${emoji} YouTube SEO Score: ${score}% (${passed}/${checks.length})\n\n${checks
        .map((c) => `${c.pass ? "✅" : "❌"} ${c.label}`)
        .join("\n")}\n\n📊 Title: ${title.length} chars | Desc: ${desc.split(/\s+/).filter(Boolean).length} words | Tags: ${tags.split(",").filter((t) => t.trim()).length}`
    );
  };

  return (
    <ToolLayout>
      <ToolInput label="Video Title" value={title} onChange={setTitle} placeholder="How to Rank #1 on YouTube in 2024" />
      <ToolInput label="Video Description" value={desc} onChange={setDesc} multiline rows={6} placeholder="Full video description with links, timestamps..." />
      <ToolInput label="Tags (comma-separated)" value={tags} onChange={setTags} placeholder="youtube seo, video ranking, seo tips" />
      <ToolButton onClick={check}>Check SEO Score</ToolButton>
      <ToolOutput label="SEO Score" value={output} />
    </ToolLayout>
  );
};

export default YtSeoChecklist;
