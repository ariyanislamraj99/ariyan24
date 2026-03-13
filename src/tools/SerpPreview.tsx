import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const SerpPreview = () => {
  const [title, setTitle] = useState(""); const [url, setUrl] = useState(""); const [desc, setDesc] = useState("");
  return <ToolLayout>
    <ToolInput label="Page Title (max 60 chars)" value={title} onChange={setTitle} placeholder="My Awesome Page - Brand" />
    <div className="text-xs text-muted-foreground text-right">{title.length}/60 {title.length > 60 ? "⚠️ Too long" : "✓"}</div>
    <ToolInput label="URL" value={url} onChange={setUrl} placeholder="https://example.com/page" />
    <ToolInput label="Meta Description (max 160 chars)" value={desc} onChange={setDesc} placeholder="A compelling description..." multiline rows={3} />
    <div className="text-xs text-muted-foreground text-right">{desc.length}/160 {desc.length > 160 ? "⚠️ Too long" : "✓"}</div>
    <div className="p-4 rounded-xl bg-white border border-glass-border/20">
      <div className="text-sm text-[#1a0dab] font-medium truncate">{title || "Page Title"}</div>
      <div className="text-xs text-[#006621] truncate">{url || "https://example.com"}</div>
      <div className="text-xs text-[#545454] line-clamp-2 mt-0.5">{desc || "Meta description will appear here..."}</div>
    </div>
  </ToolLayout>;
};
export default SerpPreview;
