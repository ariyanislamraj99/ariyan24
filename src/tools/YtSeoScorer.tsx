import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";

const YtSeoScorer = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [result, setResult] = useState("");

  const analyze = () => {
    const checks: { name: string; score: number; max: number; tip: string }[] = [];

    // Title checks
    const tLen = title.length;
    checks.push({
      name: "Title length (40-60 chars)",
      score: tLen >= 40 && tLen <= 60 ? 10 : tLen >= 30 && tLen <= 70 ? 6 : 2,
      max: 10,
      tip: tLen < 40 ? "Add more descriptive words" : tLen > 70 ? "Shorten your title" : "Great length!",
    });
    checks.push({
      name: "Title has keyword/number",
      score: (/\d/.test(title) ? 5 : 0) + (/(how|what|why|best|top|guide|tutorial|review)/i.test(title) ? 5 : 0),
      max: 10,
      tip: "Include numbers and power words like 'How to', 'Best', 'Guide'",
    });

    // Description checks
    const dLen = description.length;
    checks.push({
      name: "Description length (200+ chars)",
      score: dLen >= 500 ? 15 : dLen >= 200 ? 10 : dLen >= 100 ? 5 : 0,
      max: 15,
      tip: dLen < 200 ? "Write at least 200 characters, ideally 500+" : "Good description length!",
    });
    checks.push({
      name: "Description has timestamps",
      score: /\d{1,2}:\d{2}/.test(description) ? 10 : 0,
      max: 10,
      tip: "Add timestamps (e.g., 00:00 Intro, 03:00 Main topic)",
    });
    checks.push({
      name: "Description has links",
      score: /https?:\/\//.test(description) ? 8 : 0,
      max: 8,
      tip: "Include relevant links to resources, social media, or your website",
    });
    checks.push({
      name: "Description has hashtags",
      score: /#\w+/.test(description) ? 7 : 0,
      max: 7,
      tip: "Add 3-5 relevant hashtags at the end",
    });
    checks.push({
      name: "Description has CTA",
      score: /(subscribe|like|comment|share|follow|click|check out|link in)/i.test(description) ? 8 : 0,
      max: 8,
      tip: "Include a call-to-action (subscribe, like, comment)",
    });

    // Tags checks
    const tagList = tags.split(",").map(t => t.trim()).filter(Boolean);
    checks.push({
      name: "Tags count (5-15 tags)",
      score: tagList.length >= 5 && tagList.length <= 15 ? 12 : tagList.length >= 3 ? 6 : 0,
      max: 12,
      tip: tagList.length < 5 ? "Add more tags (5-15 recommended)" : tagList.length > 15 ? "Too many tags, focus on 5-15" : "Good tag count!",
    });
    checks.push({
      name: "Tags include long-tail keywords",
      score: tagList.filter(t => t.split(" ").length >= 3).length >= 2 ? 10 : tagList.filter(t => t.split(" ").length >= 2).length >= 1 ? 5 : 0,
      max: 10,
      tip: "Include multi-word tags like 'react tutorial for beginners'",
    });
    checks.push({
      name: "Title keyword in tags",
      score: title && tagList.some(t => title.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(title.toLowerCase().split(" ")[0])) ? 10 : 0,
      max: 10,
      tip: "Make sure your main title keyword appears in your tags",
    });

    const total = checks.reduce((s, c) => s + c.score, 0);
    const maxTotal = checks.reduce((s, c) => s + c.max, 0);
    const pct = Math.round((total / maxTotal) * 100);
    const grade = pct >= 85 ? "A+" : pct >= 70 ? "A" : pct >= 55 ? "B" : pct >= 40 ? "C" : "D";

    const output =
      `🎯 YouTube SEO Score: ${total}/${maxTotal} (${pct}%) — Grade: ${grade}\n\n` +
      `${"█".repeat(Math.round(pct / 5))}${"░".repeat(20 - Math.round(pct / 5))} ${pct}%\n\n` +
      checks.map(c => `${c.score >= c.max * 0.7 ? "✅" : c.score > 0 ? "⚠️" : "❌"} ${c.name}: ${c.score}/${c.max}\n   → ${c.tip}`).join("\n\n") +
      `\n\n📋 Quick Fixes:\n` +
      checks.filter(c => c.score < c.max * 0.7).map(c => `• ${c.tip}`).join("\n");

    setResult(output);
  };

  return (
    <ToolLayout>
      <ToolInput label="Video Title" value={title} onChange={setTitle} placeholder="Enter your video title" />
      <ToolInput label="Video Description" value={description} onChange={setDescription} placeholder="Paste your full video description" multiline rows={6} />
      <ToolInput label="Tags (comma-separated)" value={tags} onChange={setTags} placeholder="react, tutorial, web development, react hooks tutorial" />
      <ToolButton onClick={analyze}>Analyze SEO Score</ToolButton>
      {result && <ToolOutput label="SEO Analysis" value={result} />}
    </ToolLayout>
  );
};

export default YtSeoScorer;
