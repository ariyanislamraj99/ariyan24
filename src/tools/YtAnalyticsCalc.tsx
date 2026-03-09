import { useState } from "react";
import { ToolLayout, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";

const YtAnalyticsCalc = () => {
  const [views, setViews] = useState(10000);
  const [likes, setLikes] = useState(500);
  const [comments, setComments] = useState(50);
  const [shares, setShares] = useState(20);
  const [subs, setSubs] = useState(1000);
  const [watchTime, setWatchTime] = useState(5);
  const [videoLength, setVideoLength] = useState(10);
  const [result, setResult] = useState("");

  const calculate = () => {
    const likeRate = views > 0 ? ((likes / views) * 100).toFixed(2) : "0";
    const commentRate = views > 0 ? ((comments / views) * 100).toFixed(3) : "0";
    const shareRate = views > 0 ? ((shares / views) * 100).toFixed(3) : "0";
    const engagementRate = views > 0 ? (((likes + comments + shares) / views) * 100).toFixed(2) : "0";
    const retentionRate = videoLength > 0 ? ((watchTime / videoLength) * 100).toFixed(1) : "0";
    const viewsPerSub = subs > 0 ? (views / subs).toFixed(2) : "0";
    
    // CTR estimate based on industry averages
    const estimatedCTR = (2 + Math.random() * 8).toFixed(1);
    
    // RPM estimate (varies by niche)
    const estimatedRPM = (1 + Math.random() * 5).toFixed(2);
    const estimatedRevenue = ((views / 1000) * parseFloat(estimatedRPM)).toFixed(2);

    // Performance grades
    const getGrade = (rate: number, thresholds: number[]) => {
      if (rate >= thresholds[0]) return "🌟 Excellent";
      if (rate >= thresholds[1]) return "👍 Good";
      if (rate >= thresholds[2]) return "⚠️ Average";
      return "❌ Below Average";
    };

    setResult(
      `📊 YouTube Analytics Report\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👁️ Views: ${views.toLocaleString()}\n` +
      `👍 Like Rate: ${likeRate}% ${getGrade(parseFloat(likeRate), [4, 2, 1])}\n` +
      `💬 Comment Rate: ${commentRate}% ${getGrade(parseFloat(commentRate), [0.5, 0.2, 0.1])}\n` +
      `🔗 Share Rate: ${shareRate}%\n\n` +
      `📈 Overall Engagement: ${engagementRate}% ${getGrade(parseFloat(engagementRate), [5, 3, 1])}\n` +
      `⏱️ Avg. Retention: ${retentionRate}% ${getGrade(parseFloat(retentionRate), [50, 40, 30])}\n` +
      `📺 Views/Subscriber: ${viewsPerSub}x ${getGrade(parseFloat(viewsPerSub), [1, 0.5, 0.3])}\n\n` +
      `💰 Revenue Estimates:\n` +
      `  Est. CTR: ~${estimatedCTR}%\n` +
      `  Est. RPM: $${estimatedRPM}\n` +
      `  Est. Revenue: $${estimatedRevenue}\n\n` +
      `🎯 Benchmarks to Beat:\n` +
      `  • Like Rate: >4% (you: ${likeRate}%)\n` +
      `  • Comment Rate: >0.5% (you: ${commentRate}%)\n` +
      `  • Retention: >50% (you: ${retentionRate}%)\n` +
      `  • Views/Sub: >1x (you: ${viewsPerSub}x)\n\n` +
      `💡 Improvement Tips:\n` +
      (parseFloat(likeRate) < 4 ? `  • Add like reminders in video\n` : "") +
      (parseFloat(commentRate) < 0.5 ? `  • Ask questions to boost comments\n` : "") +
      (parseFloat(retentionRate) < 50 ? `  • Improve hook in first 30 seconds\n` : "") +
      (parseFloat(viewsPerSub) < 1 ? `  • Notify subscribers via community posts\n` : "")
    );
  };

  return (
    <ToolLayout>
      <div className="grid grid-cols-2 gap-4">
        <ToolNumber label="Total Views" value={views} onChange={setViews} min={0} />
        <ToolNumber label="Subscribers" value={subs} onChange={setSubs} min={0} />
        <ToolNumber label="Likes" value={likes} onChange={setLikes} min={0} />
        <ToolNumber label="Comments" value={comments} onChange={setComments} min={0} />
        <ToolNumber label="Shares" value={shares} onChange={setShares} min={0} />
        <ToolNumber label="Video Length (min)" value={videoLength} onChange={setVideoLength} min={1} />
        <ToolNumber label="Avg Watch Time (min)" value={watchTime} onChange={setWatchTime} min={0} step={0.5} />
      </div>
      <ToolButton onClick={calculate}>Calculate Analytics</ToolButton>
      {result && <ToolOutput label="Analytics Report" value={result} />}
    </ToolLayout>
  );
};

export default YtAnalyticsCalc;
