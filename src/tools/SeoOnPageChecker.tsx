import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";

const SeoOnPageChecker = () => {
  const [html, setHtml] = useState("");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");

  const analyze = () => {
    if (!html.trim()) return;
    const checks: string[] = [];
    let score = 0;
    const lowerHtml = html.toLowerCase();
    const kw = keyword.toLowerCase().trim();

    // Title tag
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch?.[1]?.trim() || "";
    if (title) {
      score += 5;
      checks.push(`✅ Title tag found: "${title}" (${title.length} chars)`);
      if (title.length >= 30 && title.length <= 60) { score += 5; checks.push("✅ Title length is optimal (30-60 chars)"); }
      else checks.push(`⚠️ Title length: ${title.length} chars (aim for 30-60)`);
      if (kw && title.toLowerCase().includes(kw)) { score += 8; checks.push("✅ Keyword found in title"); }
      else if (kw) checks.push("❌ Keyword not in title — add it near the beginning");
    } else { checks.push("❌ No <title> tag found"); }

    // Meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
    const desc = descMatch?.[1]?.trim() || "";
    if (desc) {
      score += 5;
      checks.push(`✅ Meta description found (${desc.length} chars)`);
      if (desc.length >= 120 && desc.length <= 160) { score += 5; checks.push("✅ Meta description length is optimal"); }
      else checks.push(`⚠️ Meta description: ${desc.length} chars (aim for 120-160)`);
      if (kw && desc.toLowerCase().includes(kw)) { score += 5; checks.push("✅ Keyword in meta description"); }
      else if (kw) checks.push("❌ Keyword not in meta description");
    } else { checks.push("❌ No meta description found"); }

    // H1 tag
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    if (h1Matches.length === 1) {
      score += 8;
      const h1Text = h1Matches[0].replace(/<[^>]+>/g, "").trim();
      checks.push(`✅ Single H1 tag: "${h1Text}"`);
      if (kw && h1Text.toLowerCase().includes(kw)) { score += 5; checks.push("✅ Keyword in H1"); }
      else if (kw) checks.push("❌ Keyword not in H1");
    } else if (h1Matches.length > 1) { checks.push(`⚠️ Multiple H1 tags (${h1Matches.length}) — use only one`); score += 3; }
    else { checks.push("❌ No H1 tag found"); }

    // Heading hierarchy
    const h2Count = (html.match(/<h2/gi) || []).length;
    const h3Count = (html.match(/<h3/gi) || []).length;
    if (h2Count >= 2) { score += 5; checks.push(`✅ H2 tags: ${h2Count} (good structure)`); }
    else if (h2Count >= 1) { score += 3; checks.push(`⚠️ Only ${h2Count} H2 tag — add more subheadings`); }
    else { checks.push("❌ No H2 tags — add section headings"); }
    if (h3Count >= 1) { score += 3; checks.push(`✅ H3 tags: ${h3Count}`); }

    // Images & alt text
    const imgMatches = html.match(/<img[^>]*>/gi) || [];
    const imgsWithAlt = imgMatches.filter(img => /alt=["'][^"']+["']/i.test(img));
    if (imgMatches.length > 0) {
      checks.push(`📷 Images: ${imgMatches.length} found, ${imgsWithAlt.length} with alt text`);
      if (imgsWithAlt.length === imgMatches.length) { score += 8; checks.push("✅ All images have alt text"); }
      else { score += 3; checks.push(`⚠️ ${imgMatches.length - imgsWithAlt.length} images missing alt text`); }
    } else { checks.push("⚠️ No images — consider adding relevant images"); }

    // Internal/external links
    const linkMatches = html.match(/<a[^>]*href=["']([^"']+)["']/gi) || [];
    const internalLinks = linkMatches.filter(l => !/https?:\/\//i.test(l) || /href=["']\//.test(l));
    const externalLinks = linkMatches.filter(l => /https?:\/\//i.test(l));
    if (internalLinks.length >= 2) { score += 5; checks.push(`✅ Internal links: ${internalLinks.length}`); }
    else { checks.push(`⚠️ Internal links: ${internalLinks.length} — add more internal links`); }
    if (externalLinks.length >= 1) { score += 3; checks.push(`✅ External links: ${externalLinks.length}`); }
    else { checks.push("⚠️ No external links — add authoritative references"); }

    // Canonical tag
    if (/<link[^>]*rel=["']canonical["']/i.test(html)) { score += 5; checks.push("✅ Canonical tag found"); }
    else { checks.push("❌ No canonical tag — add to prevent duplicate content issues"); }

    // Open Graph tags
    if (/<meta[^>]*property=["']og:/i.test(html)) { score += 3; checks.push("✅ Open Graph tags found"); }
    else { checks.push("⚠️ No Open Graph tags — add for social sharing"); }

    // Schema markup
    if (/application\/ld\+json/i.test(html)) { score += 5; checks.push("✅ Schema markup (JSON-LD) found"); }
    else { checks.push("⚠️ No schema markup — add structured data"); }

    // Viewport
    if (/<meta[^>]*name=["']viewport["']/i.test(html)) { score += 3; checks.push("✅ Viewport meta tag found"); }
    else { checks.push("❌ No viewport meta — required for mobile responsiveness"); }

    const maxScore = kw ? 96 : 78;
    const pct = Math.round((score / maxScore) * 100);
    const grade = pct >= 85 ? "A+" : pct >= 70 ? "A" : pct >= 55 ? "B" : pct >= 40 ? "C" : "D";

    setResult(
      `🔍 On-Page SEO Score: ${score}/${maxScore} (${pct}%) — Grade: ${grade}\n\n` +
      `${"█".repeat(Math.round(pct / 5))}${"░".repeat(20 - Math.round(pct / 5))} ${pct}%\n\n` +
      checks.join("\n\n") +
      `\n\n🔧 Fix These First:\n` +
      checks.filter(c => c.startsWith("❌")).map(c => `• ${c.slice(2)}`).join("\n")
    );
  };

  return (
    <ToolLayout>
      <ToolInput label="Target Keyword (optional)" value={keyword} onChange={setKeyword} placeholder="e.g., react tutorial" />
      <ToolInput label="Page HTML" value={html} onChange={setHtml} placeholder="Paste your page HTML here..." multiline rows={10} />
      <ToolButton onClick={analyze}>Check On-Page SEO</ToolButton>
      {result && <ToolOutput label="On-Page SEO Report" value={result} />}
    </ToolLayout>
  );
};

export default SeoOnPageChecker;
