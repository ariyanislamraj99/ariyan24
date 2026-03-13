import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const CourseSchemaGen = () => {
  const [name,setName]=useState(""); const [desc,setDesc]=useState(""); const [provider,setProvider]=useState(""); const [url,setUrl]=useState(""); const [output,setOutput]=useState("");
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"Course","name":name,"description":desc,"provider":{"@type":"Organization","name":provider},"url":url};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolInput label="Course Name" value={name} onChange={setName} placeholder="Web Development Bootcamp" />
    <ToolInput label="Description" value={desc} onChange={setDesc} placeholder="Learn web development..." />
    <ToolInput label="Provider" value={provider} onChange={setProvider} placeholder="Udemy" />
    <ToolInput label="Course URL" value={url} onChange={setUrl} placeholder="https://..." />
    <ToolButton onClick={generate}>Generate Schema</ToolButton>
    <ToolOutput label="Course Schema" value={output} />
  </ToolLayout>;
};
export default CourseSchemaGen;
