import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";

const YtDescOptimizer = () => {
  const [desc, setDesc] = useState("");
  const [keyword, setKeyword] = useState("");
  const [output, setOutput] = useState("");

  const analyze = () => {
    if (!desc) return;
    const words = desc.split(/\s+/).filter(Boolean);
    const chars = desc.length;
    const links = (desc.match(/https?:\/\/\S+/g) || []).length;
    const hashtags = (desc.match(/#\w+/g) || []).length;
    const timestamps = (desc.match(/\d{1,2}:\d{2}/g) || []).length;
    const ctas = (desc.match(/subscribe|like|comment|share|click|watch|follow|download|sign up|join/gi) || []).length;
    const emojis = (desc.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || []).length;

    let kwDensity = "N/A";
    let kwCount = 0;
    if (keyword) {
      const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      kwCount = (desc.match(regex) || []).length;
      kwDensity = words.length ? `${((kwCount / words.length) * 100).toFixed(1)}%` : "0%";
    }

    const checks = [
      { label: "250+ words", pass: words.length >= 250 },
      { label: "First 150 chars optimized", pass: chars >= 150 },
      { label: "Contains links", pass: links > 0 },
      { label: "Has timestamps/chapters", pass: timestamps >= 3 },
      { label: "Has hashtags (3-5)", pass: hashtags >= 3 && hashtags <= 15 },
      { label: "Contains CTAs", pass: ctas >= 1 },
      { label: "Uses emojis for formatting", pass: emojis >= 1 },
      { label: "Keyword in first 2 sentences", pass: keyword ? desc.slice(0, 200).toLowerCase().includes(keyword.toLowerCase()) : false },
      { label: "Keyword density 1-3%", pass: keyword ? parseFloat(kwDensity) >= 1 && parseFloat(kwDensity) <= 3 : false },
    ];

    const passed = checks.filter((c) => c.pass).length;
    const score = Math.round((passed / checks.length) * 100);
    const emoji = score >= 80 ? "🟢" : score >= 60 ? "🟡" : "🔴";

    setOutput(
      `${emoji} Description SEO Score: ${score}%\n\n📊 Stats:\n• Words: ${words.length}\n• Characters: ${chars}/5000\n• Links: ${links}\n• Hashtags: ${hashtags}\n• Timestamps: ${timestamps}\n• CTAs: ${ctas}\n${keyword ? `• Keyword "${keyword}": ${kwCount}x (${kwDensity})\n` : ""}\n📋 Checklist:\n${checks.map((c) => `${c.pass ? "✅" : "❌"} ${c.label}`).join("\n")}\n\n💡 Optimize:\n${words.length < 250 ? "• Add more detail (aim for 250+ words)\n" : ""}${links === 0 ? "• Add links to your socials/website\n" : ""}${timestamps < 3 ? "• Add chapter timestamps\n" : ""}${hashtags === 0 ? "• Add 3-5 relevant hashtags at the end\n" : ""}`
    );
  };

  return (
    <ToolLayout>
      <ToolInput label="Main Keyword" value={keyword} onChange={setKeyword} placeholder="youtube seo" />
      <ToolInput label="Video Description" value={desc} onChange={setDesc} multiline rows={8} placeholder="Paste your full YouTube description here..." />
      <ToolButton onClick={analyze}>Analyze Description</ToolButton>
      <ToolOutput label="SEO Analysis" value={output} />
    </ToolLayout>
  );
};

export default YtDescOptimizer;
