import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolNumber } from "./ToolComponents";
const YtTimestampLink = () => { const [url,sU]=useState(""); const [h,sH]=useState(0); const [m,sM]=useState(0); const [s,sS]=useState(0);
  const total=h*3600+m*60+s; const out=url?`${url.split("&t=")[0]}&t=${total}s`:"";
  return <ToolLayout><ToolInput label="YouTube URL" value={url} onChange={sU} placeholder="https://youtube.com/watch?v=..." /><div className="flex gap-4"><ToolNumber label="Hours" value={h} onChange={sH} min={0} /><ToolNumber label="Minutes" value={m} onChange={sM} min={0} max={59} /><ToolNumber label="Seconds" value={s} onChange={sS} min={0} max={59} /></div><ToolOutput label="Timestamp Link" value={out} /></ToolLayout>; };
export default YtTimestampLink;
