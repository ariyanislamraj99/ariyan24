import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton, ToolSelect } from "./ToolComponents";

const YtEndScreen = () => {
  const [type, setType] = useState("subscribe");
  const [channel, setChannel] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [output, setOutput] = useState("");

  const generate = () => {
    const scripts: Record<string, string> = {
      subscribe: `🎬 End Screen Script (Subscribe CTA):
─────────────────────────
"If you found this video helpful, make sure to hit that subscribe button and the bell icon so you never miss a new video from ${channel || "our channel"}! We post new content every week."

📋 End Screen Elements:
1. Subscribe button (centered)
2. Best for viewer video (left)
3. Latest upload (right)

⏱️ Show at: Last 20 seconds of video
🎯 Duration: 5-20 seconds`,

      playlist: `🎬 End Screen Script (Playlist CTA):
─────────────────────────
"Want to learn more? Check out this playlist where I cover everything about ${videoTitle || "this topic"} from start to finish. Click the video on screen to keep watching!"

📋 End Screen Elements:
1. Playlist link (featured)
2. Subscribe button
3. Related video suggestion

⏱️ Show at: Last 20 seconds
🎯 Best for: Series/tutorials`,

      video: `🎬 End Screen Script (Next Video CTA):
─────────────────────────
"If you enjoyed this, you're going to love this next video where I show you ${videoTitle || "even more tips"}. Click here to watch it now!"

📋 End Screen Elements:
1. Next video thumbnail (large, centered)
2. Subscribe button (corner)

⏱️ Show at: Last 15-20 seconds
🎯 Best for: Standalone videos`,

      website: `🎬 End Screen Script (Website CTA):
─────────────────────────
"For more resources and exclusive content, visit our website — the link is right here on screen. And don't forget to subscribe for more videos like this!"

📋 End Screen Elements:
1. Website link card
2. Subscribe button
3. Best for viewer video

⏱️ Show at: Last 20 seconds
🎯 Note: Requires YouTube Partner Program`,
    };

    setOutput(scripts[type] || "");
  };

  return (
    <ToolLayout>
      <ToolSelect
        label="End Screen Type"
        value={type}
        onChange={setType}
        options={[
          { value: "subscribe", label: "Subscribe CTA" },
          { value: "playlist", label: "Playlist CTA" },
          { value: "video", label: "Next Video CTA" },
          { value: "website", label: "Website CTA" },
        ]}
      />
      <ToolInput label="Channel Name" value={channel} onChange={setChannel} placeholder="Your Channel" />
      <ToolInput label="Related Topic/Video" value={videoTitle} onChange={setVideoTitle} placeholder="Topic or video title" />
      <ToolButton onClick={generate}>Generate End Screen Script</ToolButton>
      <ToolOutput label="End Screen Script" value={output} />
    </ToolLayout>
  );
};

export default YtEndScreen;
