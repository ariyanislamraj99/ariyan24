import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const ContentReadabilityOpt = () => {
  const [content, setContent] = useState(""); const [output, setOutput] = useState("");
  const analyze = () => {
    const words = content.split(/\s+/).filter(Boolean); const wc = words.length;
    const sentences = content.split(/[.!?]+/).filter(s=>s.trim()).length;
    const syllables = words.reduce((a,w) => a + Math.max(1, w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,"").replace(/^y/,"").match(/[aeiouy]{1,2}/g)?.length||1), 0);
    const avgSentLen = sentences > 0 ? wc / sentences : 0;
    const avgSyll = wc > 0 ? syllables / wc : 0;
    const flesch = 206.835 - 1.015 * avgSentLen - 84.6 * avgSyll;
    const grade = 0.39 * avgSentLen + 11.8 * avgSyll - 15.59;
    const longSentences = content.split(/[.!?]+/).filter(s => s.trim().split(/\s+/).length > 20).length;
    const longWords = words.filter(w => w.length > 12).length;
    const level = flesch > 80 ? "Very Easy" : flesch > 60 ? "Standard" : flesch > 40 ? "Difficult" : "Very Difficult";
    setOutput(`📖 Readability Analysis\n${"═".repeat(35)}\n\n📊 Flesch Score: ${flesch.toFixed(1)} (${level})\n🎓 Grade Level: ${grade.toFixed(1)}\n\n📏 Words: ${wc}\n📝 Sentences: ${sentences}\n📐 Avg sentence length: ${avgSentLen.toFixed(1)} words\n📐 Avg syllables/word: ${avgSyll.toFixed(1)}\n\n⚠️ Issues:\n${longSentences>0?`  • ${longSentences} long sentences (>20 words)`:""}\n${longWords>0?`  • ${longWords} complex words (>12 chars)`:""}\n\n💡 Tips:\n  • Keep sentences under 20 words\n  • Use simple, common words\n  • Break up long paragraphs\n  • Use bullet points and lists`);
  };
  return <ToolLayout>
    <ToolInput label="Content" value={content} onChange={setContent} multiline rows={8} placeholder="Paste content to analyze readability..." />
    <ToolButton onClick={analyze}>Analyze Readability</ToolButton>
    <ToolOutput label="Readability Report" value={output} />
  </ToolLayout>;
};
export default ContentReadabilityOpt;
