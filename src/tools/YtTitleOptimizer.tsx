import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";

const scoringRules = [
  { name: "Length (40-60 chars)", check: (t: string) => t.length >= 40 && t.length <= 60 ? 15 : t.length >= 30 && t.length <= 70 ? 8 : 0 },
  { name: "Contains number", check: (t: string) => /\d/.test(t) ? 10 : 0 },
  { name: "Power word", check: (t: string) => /(ultimate|best|top|amazing|proven|secret|free|new|easy|fast|complete|essential|guide|how to|why|what)/i.test(t) ? 12 : 0 },
  { name: "Emotional trigger", check: (t: string) => /(incredible|shocking|insane|mind-blowing|never|always|worst|mistake|truth|hack|trick|genius)/i.test(t) ? 10 : 0 },
  { name: "Brackets/parentheses", check: (t: string) => /[\[\(]/.test(t) ? 8 : 0 },
  { name: "Year reference", check: (t: string) => /20\d{2}/.test(t) ? 8 : 0 },
  { name: "Question format", check: (t: string) => /\?$/.test(t.trim()) ? 7 : 0 },
  { name: "No all caps", check: (t: string) => t !== t.toUpperCase() ? 5 : 0 },
  { name: "Starts with keyword", check: (t: string) => t.split(" ").length >= 2 ? 10 : 0 },
  { name: "Curiosity gap", check: (t: string) => /(you won't believe|this is why|the reason|here's what|what happens|watch this)/i.test(t) ? 15 : 0 },
];

const templates = [
  "How to [TOPIC] in [YEAR] (Step-by-Step Guide)",
  "[NUMBER] [TOPIC] Tips That Actually Work",
  "Why [TOPIC] Is [RESULT] (And How to Fix It)",
  "I Tried [TOPIC] for [TIME] — Here's What Happened",
  "[TOPIC] vs [TOPIC]: Which Is Better in [YEAR]?",
  "The Ultimate [TOPIC] Guide for Beginners",
  "Stop Making These [NUMBER] [TOPIC] Mistakes",
  "[TOPIC]: Everything You Need to Know [YEAR]",
];

const YtTitleOptimizer = () => {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");
  const [keyword, setKeyword] = useState("");

  const analyze = () => {
    if (!title.trim()) return;
    let total = 0;
    const breakdown = scoringRules.map(rule => {
      const score = rule.check(title);
      total += score;
      return `${score > 0 ? "✅" : "❌"} ${rule.name}: ${score > 0 ? `+${score}` : "0"} pts`;
    });

    const grade = total >= 80 ? "A+" : total >= 65 ? "A" : total >= 50 ? "B" : total >= 35 ? "C" : "D";

    let suggestions = "\n\n💡 Suggestions:\n";
    if (title.length < 40) suggestions += "• Make it longer (40-60 chars ideal)\n";
    if (title.length > 70) suggestions += "• Shorten it (40-60 chars ideal)\n";
    if (!/\d/.test(title)) suggestions += "• Add a number (e.g., '5 Ways to...')\n";
    if (!/[\[\(]/.test(title)) suggestions += "• Add brackets like [2025 Guide]\n";
    if (!/20\d{2}/.test(title)) suggestions += "• Include the current year\n";
    if (!/(how to|why|what|best|top|guide)/i.test(title)) suggestions += "• Start with a power word\n";

    const templateSuggestions = keyword
      ? "\n\n📝 Title Templates:\n" + templates.map(t => `• ${t.replace(/\[TOPIC\]/g, keyword).replace("[YEAR]", "2026").replace("[NUMBER]", "7").replace("[TIME]", "30 Days").replace("[RESULT]", "Important")}`).join("\n")
      : "";

    setResult(
      `📊 Title Score: ${total}/100 (Grade: ${grade})\n` +
      `📏 Length: ${title.length} characters\n\n` +
      `Breakdown:\n${breakdown.join("\n")}` +
      suggestions +
      templateSuggestions
    );
  };

  return (
    <ToolLayout>
      <ToolInput label="Your YouTube Title" value={title} onChange={setTitle} placeholder="Enter your video title to analyze..." />
      <ToolInput label="Main Keyword (optional)" value={keyword} onChange={setKeyword} placeholder="e.g., react tutorial" />
      <ToolButton onClick={analyze}>Analyze Title</ToolButton>
      {result && <ToolOutput label="Title Analysis" value={result} />}
    </ToolLayout>
  );
};

export default YtTitleOptimizer;
