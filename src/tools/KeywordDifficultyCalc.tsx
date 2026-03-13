import { useState } from "react";
import { ToolLayout, ToolInput, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const KeywordDifficultyCalc = () => {
  const [kw, setKw] = useState(""); const [volume, setVolume] = useState(1000); const [results, setResults] = useState(0); const [output, setOutput] = useState("");
  const calc = () => {
    const wordCount = kw.split(" ").length;
    let score = 50;
    if (wordCount >= 4) score -= 20; else if (wordCount >= 3) score -= 10; else if (wordCount === 1) score += 20;
    if (volume > 10000) score += 15; else if (volume > 5000) score += 10; else if (volume < 500) score -= 15;
    if (results > 1000000) score += 15; else if (results > 100000) score += 5; else score -= 10;
    score = Math.max(0, Math.min(100, score));
    const level = score > 70 ? "Hard 🔴" : score > 40 ? "Medium 🟡" : "Easy 🟢";
    setOutput(`Keyword: ${kw}\nDifficulty Score: ${score}/100\nLevel: ${level}\n\nFactors:\n• Word count: ${wordCount} (${wordCount>=3?"long-tail, easier":"short-tail, harder"})\n• Search volume: ${volume.toLocaleString()}/mo\n• Competition results: ${results.toLocaleString()}\n\nRecommendation: ${score>70?"Focus on long-tail variations":score>40?"Build authority with quality content":"Good opportunity, target this keyword!"}`);
  };
  return <ToolLayout>
    <ToolInput label="Keyword" value={kw} onChange={setKw} placeholder="e.g., best seo tools" />
    <ToolNumber label="Monthly Search Volume" value={volume} onChange={setVolume} min={0} />
    <ToolNumber label="Search Results Count" value={results} onChange={setResults} min={0} />
    <ToolButton onClick={calc}>Calculate Difficulty</ToolButton>
    <ToolOutput label="Difficulty Analysis" value={output} />
  </ToolLayout>;
};
export default KeywordDifficultyCalc;
