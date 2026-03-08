import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const YtVideoId = () => { const [url,sU]=useState(""); const m=url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/); const id=m?m[1]:"Enter a YouTube URL"; return <ToolLayout><ToolInput label="YouTube URL" value={url} onChange={sU} placeholder="https://youtube.com/watch?v=..." /><ToolOutput label="Video ID" value={id} /></ToolLayout>; };
export default YtVideoId;
