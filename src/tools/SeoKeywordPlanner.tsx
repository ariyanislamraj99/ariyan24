import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput, ToolSelect } from "./ToolComponents";

const modifiers = {
  informational: ["how to", "what is", "guide to", "tutorial", "tips for", "ways to", "examples of", "best practices", "introduction to", "learn"],
  commercial: ["best", "top", "review", "comparison", "vs", "alternative to", "cheap", "affordable", "premium", "recommended"],
  transactional: ["buy", "download", "get", "sign up", "free trial", "pricing", "discount", "coupon", "deal", "order"],
  navigational: ["login", "sign in", "official", "website", "app", "tool", "platform", "service", "dashboard"],
};

const niches: Record<string, string[]> = {
  tech: ["software", "app", "tool", "platform", "framework", "library", "api", "plugin", "extension", "integration"],
  marketing: ["strategy", "campaign", "analytics", "automation", "funnel", "conversion", "roi", "engagement", "branding", "content"],
  health: ["workout", "diet", "nutrition", "supplement", "exercise", "wellness", "fitness", "mental health", "recovery", "routine"],
  finance: ["investing", "savings", "budget", "crypto", "stocks", "trading", "passive income", "side hustle", "tax", "credit"],
  education: ["course", "certification", "training", "bootcamp", "tutorial", "workshop", "class", "degree", "study", "exam"],
};

const SeoKeywordPlanner = () => {
  const [seed, setSeed] = useState("");
  const [intent, setIntent] = useState("informational");
  const [niche, setNiche] = useState("tech");
  const [result, setResult] = useState("");

  const generate = () => {
    if (!seed.trim()) return;
    const kw = seed.toLowerCase().trim();
    const mods = modifiers[intent as keyof typeof modifiers] || modifiers.informational;
    const nicheTerms = niches[niche] || niches.tech;

    const keywords: { keyword: string; type: string; difficulty: string; priority: string }[] = [];

    // Modifier + keyword
    mods.forEach(mod => {
      keywords.push({ keyword: `${mod} ${kw}`, type: "Modified", difficulty: "Medium", priority: "High" });
    });

    // Keyword + niche terms
    nicheTerms.slice(0, 5).forEach(term => {
      keywords.push({ keyword: `${kw} ${term}`, type: "Niche", difficulty: "Low", priority: "Medium" });
    });

    // Question variations
    const questions = [
      `what is ${kw}`, `how does ${kw} work`, `why use ${kw}`,
      `${kw} vs alternative`, `is ${kw} worth it`, `${kw} for beginners`,
      `${kw} examples`, `${kw} best practices`, `${kw} in 2026`,
    ];
    questions.forEach(q => {
      keywords.push({ keyword: q, type: "Question", difficulty: "Low", priority: "High" });
    });

    // Long-tail
    const longTail = [
      `best ${kw} for beginners 2026`, `${kw} step by step guide`,
      `free ${kw} tools online`, `${kw} tips and tricks`,
      `complete ${kw} tutorial`, `${kw} mistakes to avoid`,
    ];
    longTail.forEach(lt => {
      keywords.push({ keyword: lt, type: "Long-tail", difficulty: "Low", priority: "High" });
    });

    const output =
      `🔑 Keyword Research for "${kw}"\n` +
      `Intent: ${intent.charAt(0).toUpperCase() + intent.slice(1)} | Niche: ${niche.charAt(0).toUpperCase() + niche.slice(1)}\n` +
      `Generated: ${keywords.length} keyword ideas\n\n` +
      `═══════════════════════════════════════\n\n` +
      `📝 Modified Keywords (${mods.length}):\n` +
      keywords.filter(k => k.type === "Modified").map(k => `  • ${k.keyword}`).join("\n") +
      `\n\n❓ Question Keywords (${questions.length}):\n` +
      keywords.filter(k => k.type === "Question").map(k => `  • ${k.keyword}`).join("\n") +
      `\n\n🎯 Long-tail Keywords (${longTail.length}):\n` +
      keywords.filter(k => k.type === "Long-tail").map(k => `  • ${k.keyword}`).join("\n") +
      `\n\n🏷️ Niche Keywords (${nicheTerms.slice(0, 5).length}):\n` +
      keywords.filter(k => k.type === "Niche").map(k => `  • ${k.keyword}`).join("\n") +
      `\n\n💡 Strategy Tips:\n` +
      `• Target long-tail keywords first (lower competition)\n` +
      `• Group keywords by topic for content clusters\n` +
      `• Create one pillar page for "${kw}" linking to subtopic pages\n` +
      `• Answer question keywords in FAQ sections\n` +
      `• Update content annually with "[YEAR]" keywords`;

    setResult(output);
  };

  return (
    <ToolLayout>
      <ToolInput label="Seed Keyword" value={seed} onChange={setSeed} placeholder="e.g., react, seo, fitness" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ToolSelect label="Search Intent" value={intent} onChange={setIntent} options={[
          { value: "informational", label: "Informational (How-to, Guides)" },
          { value: "commercial", label: "Commercial (Reviews, Comparisons)" },
          { value: "transactional", label: "Transactional (Buy, Download)" },
          { value: "navigational", label: "Navigational (Brand, Login)" },
        ]} />
        <ToolSelect label="Niche" value={niche} onChange={setNiche} options={[
          { value: "tech", label: "Technology" },
          { value: "marketing", label: "Marketing" },
          { value: "health", label: "Health & Fitness" },
          { value: "finance", label: "Finance" },
          { value: "education", label: "Education" },
        ]} />
      </div>
      <ToolButton onClick={generate}>Generate Keywords</ToolButton>
      {result && <ToolOutput label="Keyword Ideas" value={result} />}
    </ToolLayout>
  );
};

export default SeoKeywordPlanner;
