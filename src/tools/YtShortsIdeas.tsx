import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";

const YtShortsIdeas = () => {
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");

  const generate = () => {
    if (!topic) return;
    const ideas = [
      `⚡ Quick Tip: One ${topic} hack most people don't know`,
      `🤯 Did you know this about ${topic}? #shorts`,
      `❌ Stop doing THIS with ${topic}! Here's why...`,
      `✅ ${topic} in 60 seconds — beginner guide`,
      `🔥 3 ${topic} tips that changed everything for me`,
      `💡 The #1 mistake beginners make with ${topic}`,
      `📱 ${topic} tutorial under 60 seconds`,
      `🎯 How to ${topic} — the EASY way #shorts`,
      `😱 I can't believe ${topic} is this simple!`,
      `🚀 ${topic} speedrun — watch till the end!`,
      `📊 ${topic} vs the alternative — which is better?`,
      `🔑 Secret ${topic} trick pros don't share`,
      `⏱️ ${topic} challenge: Can I do it in 30 seconds?`,
      `💰 How ${topic} can save you time & money`,
      `🎓 ${topic} explained for 5-year-olds`,
    ];

    setOutput(
      `🎬 YouTube Shorts Ideas for "${topic}":\n\n${ideas.map((idea, i) => `${i + 1}. ${idea}`).join("\n")}\n\n📋 Shorts Best Practices:\n• Keep under 60 seconds\n• Hook viewers in first 2 seconds\n• Use vertical format (9:16)\n• Add text overlays\n• Loop-friendly endings boost views\n• Post 3-5 Shorts per week\n• Use trending sounds when relevant\n\n🏷️ Suggested Hashtags:\n#shorts #${topic.replace(/\s+/g, "")} #${topic.split(" ")[0]}tips #viral #trending`
    );
  };

  return (
    <ToolLayout>
      <ToolInput label="Topic / Niche" value={topic} onChange={setTopic} placeholder="web development, cooking, fitness..." />
      <ToolButton onClick={generate}>Generate Shorts Ideas</ToolButton>
      <ToolOutput label="Shorts Ideas" value={output} />
    </ToolLayout>
  );
};

export default YtShortsIdeas;
