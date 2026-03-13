import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const EventSchemaGen = () => {
  const [name,setName]=useState(""); const [start,setStart]=useState(""); const [end,setEnd]=useState(""); const [location,setLocation]=useState(""); const [desc,setDesc]=useState(""); const [url,setUrl]=useState(""); const [output,setOutput]=useState("");
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"Event","name":name,"description":desc,"startDate":start,"endDate":end,"location":{"@type":"Place","name":location},"url":url};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolInput label="Event Name" value={name} onChange={setName} placeholder="Tech Conference 2024" />
    <ToolInput label="Description" value={desc} onChange={setDesc} placeholder="Annual technology conference..." />
    <ToolInput label="Start Date (ISO)" value={start} onChange={setStart} placeholder="2024-06-15T09:00" />
    <ToolInput label="End Date (ISO)" value={end} onChange={setEnd} placeholder="2024-06-17T17:00" />
    <ToolInput label="Location" value={location} onChange={setLocation} placeholder="Convention Center" />
    <ToolInput label="Event URL" value={url} onChange={setUrl} placeholder="https://event.example.com" />
    <ToolButton onClick={generate}>Generate Schema</ToolButton>
    <ToolOutput label="Event Schema" value={output} />
  </ToolLayout>;
};
export default EventSchemaGen;
