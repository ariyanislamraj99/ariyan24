import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const VideoSchemaGen = () => {
  const [name,setName]=useState(""); const [desc,setDesc]=useState(""); const [thumb,setThumb]=useState(""); const [upload,setUpload]=useState(""); const [duration,setDuration]=useState("PT5M"); const [url,setUrl]=useState(""); const [output,setOutput]=useState("");
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"VideoObject","name":name,"description":desc,"thumbnailUrl":thumb,"uploadDate":upload,"duration":duration,"contentUrl":url};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolInput label="Video Title" value={name} onChange={setName} placeholder="How to..." />
    <ToolInput label="Description" value={desc} onChange={setDesc} placeholder="Video description..." />
    <ToolInput label="Thumbnail URL" value={thumb} onChange={setThumb} placeholder="https://..." />
    <ToolInput label="Upload Date" value={upload} onChange={setUpload} placeholder="2024-01-15" />
    <ToolInput label="Duration (ISO)" value={duration} onChange={setDuration} placeholder="PT5M30S" />
    <ToolInput label="Video URL" value={url} onChange={setUrl} placeholder="https://youtube.com/watch?v=..." />
    <ToolButton onClick={generate}>Generate Schema</ToolButton>
    <ToolOutput label="Video Schema" value={output} />
  </ToolLayout>;
};
export default VideoSchemaGen;
