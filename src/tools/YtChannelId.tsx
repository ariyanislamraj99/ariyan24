import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const YtChannelId = () => { const [url,sU]=useState(""); const m=url.match(/channel\/([a-zA-Z0-9_-]+)/)||url.match(/@([a-zA-Z0-9_-]+)/); const id=m?m[1]:"Enter a YouTube channel URL"; return <ToolLayout><ToolInput label="Channel URL" value={url} onChange={sU} placeholder="https://youtube.com/channel/UC... or @handle" /><ToolOutput label="Channel ID / Handle" value={id} /></ToolLayout>; };
export default YtChannelId;
