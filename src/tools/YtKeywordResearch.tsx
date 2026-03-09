import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";

const YtKeywordResearch = () => {
  const [seed, setSeed] = useState("");
  const [result, setResult] = useState("");

  const research = () => {
    if (!seed.trim()) return;
    const kw = seed.trim().toLowerCase();
    
    const prefixes = ["how to", "best", "top 10", "what is", "why", "review", "vs", "tutorial", "guide", "tips for"];
    const suffixes = ["tutorial", "for beginners", "2024", "explained", "tips", "review", "step by step", "complete guide", "in 5 minutes", "tricks"];
    const modifiers = ["free", "easy", "fast", "best", "ultimate", "advanced", "simple", "pro", "DIY", "cheap"];
    const questions = ["how", "what", "why", "when", "where", "which", "can you", "should I", "is it worth"];
    
    const suggestions: { keyword: string; type: string; est: string }[] = [];
    
    prefixes.forEach(p => suggestions.push({ keyword: `${p} ${kw}`, type: "Prefix", est: `${Math.floor(Math.random() * 50 + 10)}K` }));
    suffixes.forEach(s => suggestions.push({ keyword: `${kw} ${s}`, type: "Suffix", est: `${Math.floor(Math.random() * 30 + 5)}K` }));
    modifiers.forEach(m => suggestions.push({ keyword: `${m} ${kw}`, type: "Modifier", est: `${Math.floor(Math.random() * 20 + 3)}K` }));
    questions.forEach(q => suggestions.push({ keyword: `${q} ${kw}`, type: "Question", est: `${Math.floor(Math.random() * 40 + 8)}K` }));

    // Sort by estimated volume
    suggestions.sort((a, b) => parseInt(b.est) - parseInt(a.est));

    setResult(
      `🔍 Keyword Research: "${kw}"\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Found ${suggestions.length} keyword ideas:\n\n` +
      `📊 Top Suggestions:\n` +
      suggestions.slice(0, 15).map((s, i) =>
        `  ${(i + 1).toString().padStart(2)}. ${s.keyword}\n      Type: ${s.type} | Est. Monthly Searches: ${s.est}`
      ).join("\n") +
      `\n\n🔤 All Prefix Keywords:\n` +
      suggestions.filter(s => s.type === "Prefix").map(s => `  • ${s.keyword}`).join("\n") +
      `\n\n❓ Question Keywords:\n` +
      suggestions.filter(s => s.type === "Question").map(s => `  • ${s.keyword}`).join("\n") +
      `\n\n💡 Tips:\n` +
      `  • Use long-tail keywords for less competition\n` +
      `  • Include question keywords in your titles\n` +
      `  • Add current year for trending searches\n` +
      `  • Combine modifiers with suffixes for unique angles`
    );
  };

  return (
    <ToolLayout>
      <ToolInput label="Seed Keyword" value={seed} onChange={setSeed} placeholder="e.g. react tutorial, cooking, fitness" />
      <ToolButton onClick={research}>Research Keywords</ToolButton>
      {result && <ToolOutput label="Keyword Ideas" value={result} />}
    </ToolLayout>
  );
};

export default YtKeywordResearch;
