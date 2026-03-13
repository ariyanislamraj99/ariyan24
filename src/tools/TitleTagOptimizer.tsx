import { useState } from "react";
import { ToolLayout, ToolInput } from "./ToolComponents";
const TitleTagOptimizer = () => {
  const [title, setTitle] = useState("");
  const len = title.length;
  const issues: string[] = [];
  if (len === 0) issues.push("Enter a title to analyze");
  if (len > 0 && len < 30) issues.push("⚠️ Title too short (aim for 50-60 chars)");
  if (len > 60) issues.push("⚠️ Title too long (max 60 chars, will be truncated)");
  if (len > 0 && !title.includes(" ")) issues.push("⚠️ Add spaces/keywords");
  if (len >= 30 && len <= 60) issues.push("✅ Good title length!");
  if (title === title.toUpperCase() && len > 0) issues.push("⚠️ Avoid ALL CAPS");
  if (title.includes("|") || title.includes("-")) issues.push("✅ Good separator usage");
  const score = Math.min(100, Math.max(0, len >= 30 && len <= 60 ? 80 : len > 0 ? 40 : 0) + (title.includes("|")||title.includes("-")?10:0) + (title !== title.toUpperCase()?10:0));
  return <ToolLayout>
    <ToolInput label="Page Title" value={title} onChange={setTitle} placeholder="Enter your page title..." />
    <div className="flex items-center gap-3">
      <div className="text-sm font-medium text-foreground">Score: {score}/100</div>
      <div className="flex-1 h-2 rounded-full bg-muted/50"><div className="h-full rounded-full transition-all" style={{width:`${score}%`,backgroundColor:score>70?'#22c55e':score>40?'#eab308':'#ef4444'}} /></div>
      <div className="text-xs text-muted-foreground">{len}/60 chars</div>
    </div>
    <div className="space-y-1">{issues.map((s,i)=><div key={i} className="text-sm text-foreground">{s}</div>)}</div>
  </ToolLayout>;
};
export default TitleTagOptimizer;
