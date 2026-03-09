import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const checkItems = [
  { id: "title", label: "Title (50-70 chars, keyword-rich)", check: (v: string) => v.length >= 50 && v.length <= 70 },
  { id: "desc", label: "Description (2000+ chars)", check: (v: string) => v.length >= 2000 },
  { id: "tags", label: "Tags (10+ tags)", check: (v: string) => v.split(",").filter(t => t.trim()).length >= 10 },
  { id: "thumbnail", label: "Custom thumbnail prepared", check: () => true },
  { id: "endscreen", label: "End screen planned", check: () => true },
  { id: "cards", label: "Info cards prepared", check: () => true },
  { id: "captions", label: "Captions/subtitles ready", check: () => true },
  { id: "playlist", label: "Added to playlist", check: () => true },
  { id: "schedule", label: "Optimal time scheduled", check: () => true },
  { id: "community", label: "Community post planned", check: () => true },
];

const YtUploadChecklist = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState("");

  const toggle = (id: string) => setChecks(prev => ({ ...prev, [id]: !prev[id] }));

  const evaluate = () => {
    const titleOk = title.length >= 50 && title.length <= 70;
    const descOk = desc.length >= 500;
    const tagsOk = tags.split(",").filter(t => t.trim()).length >= 10;
    const manualChecks = Object.values(checks).filter(Boolean).length;
    const total = (titleOk ? 1 : 0) + (descOk ? 1 : 0) + (tagsOk ? 1 : 0) + manualChecks;
    const maxScore = 10;
    const score = Math.round((total / maxScore) * 100);

    setResult(
      `📋 Upload Readiness Score: ${score}%\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `✓ Title: ${titleOk ? "✅ Good" : "⚠️ " + (title.length < 50 ? "Too short" : "Too long")} (${title.length} chars)\n` +
      `✓ Description: ${descOk ? "✅ Good" : "⚠️ Add more content"} (${desc.length} chars)\n` +
      `✓ Tags: ${tagsOk ? "✅ Good" : "⚠️ Add more tags"} (${tags.split(",").filter(t => t.trim()).length} tags)\n\n` +
      `Manual Checklist: ${manualChecks}/7 completed\n\n` +
      (score >= 80 ? "🎉 Ready to upload!" : score >= 60 ? "⚠️ Almost ready - complete remaining items" : "❌ Not ready - complete more checklist items")
    );
  };

  return (
    <ToolLayout>
      <ToolInput label={`Video Title (${title.length}/70 chars)`} value={title} onChange={setTitle} placeholder="Your engaging video title here..." />
      <ToolInput label={`Description (${desc.length} chars)`} value={desc} onChange={setDesc} multiline rows={4} placeholder="Video description with keywords..." />
      <ToolInput label="Tags (comma-separated)" value={tags} onChange={setTags} placeholder="tag1, tag2, tag3..." />
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Pre-Upload Checklist:</label>
        {["thumbnail", "endscreen", "cards", "captions", "playlist", "schedule", "community"].map(id => (
          <label key={id} className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={checks[id] || false} onChange={() => toggle(id)} className="rounded" />
            <span className={checks[id] ? "text-foreground" : "text-muted-foreground"}>
              {checkItems.find(c => c.id === id)?.label}
            </span>
          </label>
        ))}
      </div>
      
      <ToolButton onClick={evaluate}>Check Readiness</ToolButton>
      {result && <ToolOutput label="Upload Readiness" value={result} />}
    </ToolLayout>
  );
};

export default YtUploadChecklist;
