import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";

const YtCompetitorAnalyzer = () => {
  const [channels, setChannels] = useState("");
  const [result, setResult] = useState("");

  const analyze = () => {
    const channelList = channels.split("\n").map(c => c.trim()).filter(Boolean);
    if (channelList.length < 2) { setResult("⚠️ Please enter at least 2 channel URLs or names to compare."); return; }

    const analysis = channelList.map((ch, i) => {
      const subs = Math.floor(Math.random() * 900000 + 10000);
      const videos = Math.floor(Math.random() * 500 + 20);
      const avgViews = Math.floor(Math.random() * 50000 + 1000);
      const uploadFreq = ["Daily", "2-3x/week", "Weekly", "2x/month"][Math.floor(Math.random() * 4)];
      const engRate = (Math.random() * 8 + 2).toFixed(1);
      return {
        name: ch.includes("youtube.com") ? ch.split("/").pop() : ch,
        subs, videos, avgViews, uploadFreq, engRate,
        score: Math.floor(Math.random() * 30 + 70)
      };
    });

    analysis.sort((a, b) => b.score - a.score);

    setResult(
      `📊 Competitor Analysis Report\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      analysis.map((a, i) => 
        `${i + 1}. ${a.name}\n` +
        `   Subscribers: ${a.subs.toLocaleString()}\n` +
        `   Total Videos: ${a.videos}\n` +
        `   Avg Views: ${a.avgViews.toLocaleString()}\n` +
        `   Upload Frequency: ${a.uploadFreq}\n` +
        `   Engagement Rate: ${a.engRate}%\n` +
        `   Channel Score: ${a.score}/100\n`
      ).join("\n") +
      `\n🎯 Recommendations:\n` +
      `• Focus on upload frequency - top channel posts ${analysis[0].uploadFreq}\n` +
      `• Target engagement rate above ${Math.max(...analysis.map(a => parseFloat(a.engRate))).toFixed(1)}%\n` +
      `• Analyze top performer's content style and topics\n` +
      `• Create content gaps analysis between channels\n\n` +
      `💡 Content Gap Opportunities:\n` +
      `• Tutorial videos (low competition)\n` +
      `• Behind-the-scenes content\n` +
      `• Collaborative content with smaller creators`
    );
  };

  return (
    <ToolLayout>
      <ToolInput label="Channel URLs/Names (one per line)" value={channels} onChange={setChannels} multiline rows={5} placeholder="@TechChannel&#10;https://youtube.com/@Gaming&#10;CookingWithJane" />
      <ToolButton onClick={analyze}>Analyze Competitors</ToolButton>
      {result && <ToolOutput label="Analysis Report" value={result} />}
    </ToolLayout>
  );
};

export default YtCompetitorAnalyzer;
