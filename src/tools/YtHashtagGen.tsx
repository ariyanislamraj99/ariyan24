import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton, ToolNumber } from "./ToolComponents";

const YtHashtagGen = () => {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(15);
  const [output, setOutput] = useState("");

  const generate = () => {
    if (!topic) return;
    const words = topic.toLowerCase().split(/\s+/).filter(Boolean);
    const base = words.join("");
    const hashtags = new Set<string>();

    // Direct topic hashtag
    hashtags.add(`#${base}`);
    words.forEach((w) => hashtags.add(`#${w}`));

    // Common YouTube patterns
    const patterns = [
      `#${base}tips`, `#${base}tutorial`, `#${base}2024`, `#${base}2025`,
      `#${words[0]}hack`, `#${words[0]}tricks`, `#${words[0]}guide`,
      `#best${base}`, `#how${base}`, `#learn${base}`,
      `#${words[0]}forbeginners`, `#${words[0]}tips2024`,
      "#youtube", "#viral", "#trending", "#shorts", "#fyp",
      `#${words[0]}shorts`, `#${words[0]}tutorial`, `#${words[0]}explained`,
      `#${words[0]}review`, `#${words[0]}howto`, `#top${words[0]}`,
    ];

    patterns.forEach((p) => hashtags.add(p));

    const result = [...hashtags].slice(0, count);
    setOutput(
      `🏷️ YouTube Hashtags for "${topic}":\n\n${result.join(" ")}\n\n📋 Copy for description (first 3):\n${result.slice(0, 3).join(" ")}\n\n💡 Tips:\n• Use 3-5 hashtags in description (first 3 show above title)\n• Mix broad + niche hashtags\n• Don't use more than 15 hashtags\n• Place them at the end of your description`
    );
  };

  return (
    <ToolLayout>
      <ToolInput label="Video Topic / Keywords" value={topic} onChange={setTopic} placeholder="react tutorial, web development" />
      <ToolNumber label="Number of Hashtags" value={count} onChange={setCount} min={5} max={30} />
      <ToolButton onClick={generate}>Generate Hashtags</ToolButton>
      <ToolOutput label="Hashtags" value={output} />
    </ToolLayout>
  );
};

export default YtHashtagGen;
