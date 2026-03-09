import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";

const SeoContentAnalyzer = () => {
  const [content, setContent] = useState("");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");

  const analyze = () => {
    if (!content.trim()) return;
    const text = content.trim();
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const paragraphs = text.split(/\n\s*\n/).filter(Boolean);
    const wordCount = words.length;
    const charCount = text.length;
    const avgSentenceLen = sentences.length ? Math.round(wordCount / sentences.length) : 0;
    const avgWordLen = words.length ? (words.reduce((s, w) => s + w.length, 0) / words.length).toFixed(1) : "0";

    // Readability (Flesch-Kincaid approx)
    const syllables = words.reduce((s, w) => s + Math.max(1, w.replace(/[^aeiouy]/gi, "").length), 0);
    const fk = 206.835 - 1.015 * (wordCount / Math.max(1, sentences.length)) - 84.6 * (syllables / wordCount);
    const readability = Math.max(0, Math.min(100, Math.round(fk)));

    const checks: string[] = [];
    let score = 0;

    // Word count
    if (wordCount >= 1500) { score += 15; checks.push("✅ Word count: " + wordCount + " (excellent for SEO)"); }
    else if (wordCount >= 800) { score += 10; checks.push("⚠️ Word count: " + wordCount + " (good, aim for 1500+)"); }
    else if (wordCount >= 300) { score += 5; checks.push("⚠️ Word count: " + wordCount + " (thin content, aim for 800+)"); }
    else { checks.push("❌ Word count: " + wordCount + " (too short for SEO)"); }

    // Readability
    if (readability >= 60) { score += 10; checks.push(`✅ Readability: ${readability}/100 (easy to read)`); }
    else if (readability >= 40) { score += 6; checks.push(`⚠️ Readability: ${readability}/100 (moderate)`); }
    else { checks.push(`❌ Readability: ${readability}/100 (difficult to read)`); }

    // Sentence length
    if (avgSentenceLen <= 20) { score += 8; checks.push(`✅ Avg sentence length: ${avgSentenceLen} words (good)`); }
    else if (avgSentenceLen <= 30) { score += 4; checks.push(`⚠️ Avg sentence length: ${avgSentenceLen} words (a bit long)`); }
    else { checks.push(`❌ Avg sentence length: ${avgSentenceLen} words (too long, break up sentences)`); }

    // Paragraphs
    if (paragraphs.length >= 5) { score += 8; checks.push(`✅ Paragraphs: ${paragraphs.length} (well-structured)`); }
    else if (paragraphs.length >= 3) { score += 4; checks.push(`⚠️ Paragraphs: ${paragraphs.length} (add more breaks)`); }
    else { checks.push(`❌ Paragraphs: ${paragraphs.length} (add paragraph breaks for readability)`); }

    // Keyword analysis
    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      const kwCount = text.toLowerCase().split(kw).length - 1;
      const density = ((kwCount / wordCount) * 100).toFixed(2);
      const kwInFirst100 = text.toLowerCase().slice(0, text.indexOf(" ", 500) || 500).includes(kw);

      if (kwCount >= 3 && parseFloat(density) <= 3) { score += 15; checks.push(`✅ Keyword "${keyword}": found ${kwCount}x (${density}% density)`); }
      else if (kwCount >= 1) { score += 8; checks.push(`⚠️ Keyword "${keyword}": found ${kwCount}x (${density}% density) — aim for 1-3%`); }
      else { checks.push(`❌ Keyword "${keyword}" not found in content`); }

      if (kwInFirst100) { score += 8; checks.push(`✅ Keyword appears in first paragraph`); }
      else { checks.push(`❌ Keyword not in first paragraph — add it early`); }
    }

    // Check for headings-like patterns
    const hasHeadingPatterns = /^(#{1,6}\s|[A-Z][A-Z\s]{5,}$)/m.test(text);
    if (hasHeadingPatterns) { score += 8; checks.push("✅ Heading patterns detected"); }
    else { checks.push("❌ No headings detected — add H2/H3 headings"); }

    // Check for links
    const linkCount = (text.match(/https?:\/\/\S+/g) || []).length;
    if (linkCount >= 2) { score += 7; checks.push(`✅ Links found: ${linkCount}`); }
    else if (linkCount >= 1) { score += 4; checks.push(`⚠️ Only ${linkCount} link — add internal/external links`); }
    else { checks.push("❌ No links — add internal and external links"); }

    // Check for lists
    const hasList = /^[\s]*[-•*]\s/m.test(text) || /^\d+\.\s/m.test(text);
    if (hasList) { score += 7; checks.push("✅ Lists detected (good for readability)"); }
    else { checks.push("❌ No lists — add bullet points for scannability"); }

    const maxScore = keyword ? 86 : 63;
    const pct = Math.round((score / maxScore) * 100);
    const grade = pct >= 85 ? "A+" : pct >= 70 ? "A" : pct >= 55 ? "B" : pct >= 40 ? "C" : "D";

    setResult(
      `📊 SEO Content Score: ${score}/${maxScore} (${pct}%) — Grade: ${grade}\n\n` +
      `${"█".repeat(Math.round(pct / 5))}${"░".repeat(20 - Math.round(pct / 5))} ${pct}%\n\n` +
      `📈 Stats:\n` +
      `  Words: ${wordCount} | Chars: ${charCount}\n` +
      `  Sentences: ${sentences.length} | Paragraphs: ${paragraphs.length}\n` +
      `  Avg word length: ${avgWordLen} chars\n` +
      `  Reading time: ~${Math.ceil(wordCount / 200)} min\n\n` +
      `Detailed Analysis:\n${checks.join("\n\n")}` +
      `\n\n💡 Top Priorities:\n` +
      checks.filter(c => c.startsWith("❌")).map(c => `• ${c.slice(2)}`).join("\n")
    );
  };

  return (
    <ToolLayout>
      <ToolInput label="Target Keyword (optional)" value={keyword} onChange={setKeyword} placeholder="e.g., react tutorial" />
      <ToolInput label="Content to Analyze" value={content} onChange={setContent} placeholder="Paste your article or blog post content here..." multiline rows={10} />
      <ToolButton onClick={analyze}>Analyze Content</ToolButton>
      {result && <ToolOutput label="SEO Content Analysis" value={result} />}
    </ToolLayout>
  );
};

export default SeoContentAnalyzer;
