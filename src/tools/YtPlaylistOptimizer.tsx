import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";

const YtPlaylistOptimizer = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [videos, setVideos] = useState("");
  const [result, setResult] = useState("");

  const optimize = () => {
    if (!name.trim()) { setResult("⚠️ Please enter a playlist name."); return; }

    const videoList = videos.split("\n").map(v => v.trim()).filter(Boolean);
    const nameScore = name.length >= 30 && name.length <= 60 ? 100 : name.length < 30 ? 60 : 70;
    const descScore = desc.length >= 150 ? 100 : desc.length >= 50 ? 70 : 30;
    const videoScore = videoList.length >= 5 ? 100 : videoList.length >= 3 ? 70 : 40;
    const overall = Math.round((nameScore + descScore + videoScore) / 3);

    const suggestions: string[] = [];
    if (name.length < 30) suggestions.push("• Add keywords to playlist title (aim for 30-60 chars)");
    if (name.length > 60) suggestions.push("• Shorten title - keep under 60 chars for visibility");
    if (desc.length < 150) suggestions.push("• Expand description with keywords (150+ chars recommended)");
    if (videoList.length < 5) suggestions.push("• Add more videos - playlists with 5+ videos rank better");
    if (!name.toLowerCase().includes("tutorial") && !name.toLowerCase().includes("guide") && !name.toLowerCase().includes("how")) {
      suggestions.push("• Consider adding 'Tutorial', 'Guide', or 'How to' to title");
    }

    setResult(
      `🎬 Playlist Optimization Report\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `Overall Score: ${overall}/100 ${overall >= 80 ? "🌟" : overall >= 60 ? "👍" : "⚠️"}\n\n` +
      `📊 Breakdown:\n` +
      `  Title Score: ${nameScore}/100 (${name.length} chars)\n` +
      `  Description Score: ${descScore}/100 (${desc.length} chars)\n` +
      `  Video Count Score: ${videoScore}/100 (${videoList.length} videos)\n\n` +
      (suggestions.length > 0 ? `💡 Suggestions:\n${suggestions.join("\n")}\n\n` : "✅ Great job! Playlist is well optimized.\n\n") +
      `📝 Optimized Title Suggestions:\n` +
      `  • "${name} - Complete Guide 2024"\n` +
      `  • "Best ${name} Tutorials for Beginners"\n` +
      `  • "${name}: Step-by-Step Series"\n\n` +
      `🔑 Recommended Keywords:\n` +
      `  ${name.toLowerCase().split(" ").slice(0, 3).join(", ")}, tutorial, guide, series, playlist, learn, how to`
    );
  };

  return (
    <ToolLayout>
      <ToolInput label="Playlist Name" value={name} onChange={setName} placeholder="e.g. React JS Tutorial for Beginners" />
      <ToolInput label="Playlist Description" value={desc} onChange={setDesc} multiline rows={3} placeholder="Description with keywords..." />
      <ToolInput label="Video Titles in Playlist (one per line)" value={videos} onChange={setVideos} multiline rows={5} placeholder="Video 1 Title&#10;Video 2 Title&#10;Video 3 Title" />
      <ToolButton onClick={optimize}>Optimize Playlist</ToolButton>
      {result && <ToolOutput label="Optimization Report" value={result} />}
    </ToolLayout>
  );
};

export default YtPlaylistOptimizer;
