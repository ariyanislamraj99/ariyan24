import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput, ToolSelect } from "./ToolComponents";

const templates: Record<string, (d: any) => string> = {
  tutorial: (d) =>
    `🎯 ${d.title || "Video Title"}\n\n` +
    `In this video, I'll show you ${d.topic || "[topic]"} step by step.\n\n` +
    `⏰ Timestamps:\n00:00 Introduction\n01:00 Getting Started\n03:00 Main Content\n08:00 Tips & Tricks\n10:00 Conclusion\n\n` +
    `📌 Key Takeaways:\n• ${d.keyword1 || "Key point 1"}\n• ${d.keyword2 || "Key point 2"}\n• ${d.keyword3 || "Key point 3"}\n\n` +
    `🔗 Resources Mentioned:\n• ${d.link1 || "https://example.com"}\n\n` +
    `📱 Follow Me:\n• Twitter: ${d.twitter || "@handle"}\n• Instagram: ${d.instagram || "@handle"}\n• Website: ${d.website || "https://yoursite.com"}\n\n` +
    `#${(d.topic || "topic").replace(/\s+/g, "")} #tutorial #howto`,

  review: (d) =>
    `📦 ${d.title || "Product Review"}\n\n` +
    `Today I'm reviewing ${d.topic || "[product]"} — is it worth the hype?\n\n` +
    `⏰ Timestamps:\n00:00 Unboxing\n02:00 First Impressions\n05:00 Testing\n08:00 Pros & Cons\n10:00 Final Verdict\n\n` +
    `✅ Pros:\n• ${d.keyword1 || "Pro 1"}\n• ${d.keyword2 || "Pro 2"}\n\n` +
    `❌ Cons:\n• ${d.keyword3 || "Con 1"}\n\n` +
    `🛒 Where to Buy:\n• ${d.link1 || "Link here"}\n\n` +
    `📱 Follow Me:\n• Twitter: ${d.twitter || "@handle"}\n• Website: ${d.website || "https://yoursite.com"}\n\n` +
    `#review #${(d.topic || "product").replace(/\s+/g, "")} #honest`,

  vlog: (d) =>
    `📹 ${d.title || "Vlog Title"}\n\n` +
    `Join me as I ${d.topic || "[describe your day/adventure]"}!\n\n` +
    `⏰ Highlights:\n00:00 Start of the Day\n03:00 Main Event\n07:00 Something Cool\n09:00 Wrapping Up\n\n` +
    `📍 Location: ${d.keyword1 || "Location"}\n🎵 Music: ${d.keyword2 || "Artist - Song"}\n📸 Camera: ${d.keyword3 || "Camera model"}\n\n` +
    `📱 Follow Me:\n• Instagram: ${d.instagram || "@handle"}\n• TikTok: ${d.twitter || "@handle"}\n\n` +
    `#vlog #dailyvlog #${(d.topic || "vlog").replace(/\s+/g, "")}`,

  listicle: (d) =>
    `📋 ${d.title || "Top [N] Things"}\n\n` +
    `Here are the best ${d.topic || "[items]"} you need to know about!\n\n` +
    `⏰ The List:\n00:00 Introduction\n01:00 #1 ${d.keyword1 || "Item 1"}\n03:00 #2 ${d.keyword2 || "Item 2"}\n05:00 #3 ${d.keyword3 || "Item 3"}\n07:00 Honorable Mentions\n08:00 Final Thoughts\n\n` +
    `🔗 Links:\n• ${d.link1 || "https://example.com"}\n\n` +
    `📱 Follow Me:\n• Twitter: ${d.twitter || "@handle"}\n• Website: ${d.website || "https://yoursite.com"}\n\n` +
    `#top #best #${(d.topic || "list").replace(/\s+/g, "")}`,
};

const YtDescriptionBuilder = () => {
  const [template, setTemplate] = useState("tutorial");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [keyword1, setKeyword1] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [keyword3, setKeyword3] = useState("");
  const [link1, setLink1] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    const fn = templates[template];
    if (!fn) return;
    setResult(fn({ title, topic, keyword1, keyword2, keyword3, link1, twitter, instagram, website }));
  };

  return (
    <ToolLayout>
      <ToolSelect label="Template Type" value={template} onChange={setTemplate} options={[
        { value: "tutorial", label: "Tutorial / How-To" },
        { value: "review", label: "Product Review" },
        { value: "vlog", label: "Vlog" },
        { value: "listicle", label: "Listicle / Top N" },
      ]} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ToolInput label="Video Title" value={title} onChange={setTitle} placeholder="My Awesome Video" />
        <ToolInput label="Topic/Subject" value={topic} onChange={setTopic} placeholder="e.g., React hooks" />
        <ToolInput label="Key Point 1" value={keyword1} onChange={setKeyword1} placeholder="First key point" />
        <ToolInput label="Key Point 2" value={keyword2} onChange={setKeyword2} placeholder="Second key point" />
        <ToolInput label="Key Point 3" value={keyword3} onChange={setKeyword3} placeholder="Third key point" />
        <ToolInput label="Resource Link" value={link1} onChange={setLink1} placeholder="https://..." />
        <ToolInput label="Twitter/X Handle" value={twitter} onChange={setTwitter} placeholder="@handle" />
        <ToolInput label="Instagram Handle" value={instagram} onChange={setInstagram} placeholder="@handle" />
        <ToolInput label="Website URL" value={website} onChange={setWebsite} placeholder="https://yoursite.com" />
      </div>
      <ToolButton onClick={generate}>Generate Description</ToolButton>
      {result && <ToolOutput label="Generated Description" value={result} />}
    </ToolLayout>
  );
};

export default YtDescriptionBuilder;
