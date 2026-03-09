import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";

const YtAbTitle = () => {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [output, setOutput] = useState("");

  const generate = () => {
    if (!topic) return;
    const kw = keyword || topic;
    const variations = [
      // How-to
      `How to ${topic} (Step-by-Step Guide)`,
      `How to ${topic} in 2025 — Complete Tutorial`,
      `How I ${topic} (And You Can Too!)`,
      // Numbers
      `7 Ways to ${topic} That Actually Work`,
      `Top 10 ${kw} Tips You Need to Know`,
      `5 ${kw} Mistakes You're Making Right Now`,
      // Questions
      `Why Isn't Your ${kw} Working? Watch This!`,
      `What Nobody Tells You About ${topic}`,
      `Is ${topic} Worth It? Honest Review`,
      // Curiosity
      `I Tried ${topic} for 30 Days — Here's What Happened`,
      `The Secret to ${topic} Nobody Talks About`,
      `${topic}: The Ultimate Guide (You Won't Believe #3)`,
      // Authority
      `${topic} — Everything You Need to Know`,
      `The Complete ${kw} Guide for Beginners`,
      `${topic} Masterclass: From Zero to Pro`,
      // Urgency
      `STOP ${topic} Wrong! Do This Instead`,
      `${topic} in 2025: What's Changed?`,
      `Don't ${topic} Until You Watch This`,
    ];

    setOutput(
      `🎬 A/B Title Variations for "${topic}":\n\n${variations.map((v, i) => `${i + 1}. ${v}`).join("\n")}\n\n💡 Tips:\n• Test 2-3 titles using YouTube's A/B testing feature\n• Titles with numbers get 36% more clicks\n• Keep under 60 characters for mobile\n• Front-load keywords\n• Use emotional triggers (secret, mistake, proven)`
    );
  };

  return (
    <ToolLayout>
      <ToolInput label="Video Topic" value={topic} onChange={setTopic} placeholder="Master YouTube SEO" />
      <ToolInput label="Main Keyword (optional)" value={keyword} onChange={setKeyword} placeholder="YouTube SEO" />
      <ToolButton onClick={generate}>Generate Title Variations</ToolButton>
      <ToolOutput label="A/B Title Ideas" value={output} />
    </ToolLayout>
  );
};

export default YtAbTitle;
