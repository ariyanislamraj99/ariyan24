import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const PersonSchemaGen = () => {
  const [name,setName]=useState(""); const [job,setJob]=useState(""); const [url,setUrl]=useState(""); const [image,setImage]=useState(""); const [social,setSocial]=useState(""); const [output,setOutput]=useState("");
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"Person","name":name,"jobTitle":job,"url":url,"image":image,"sameAs":social.split("\n").filter(Boolean)};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolInput label="Full Name" value={name} onChange={setName} placeholder="John Doe" />
    <ToolInput label="Job Title" value={job} onChange={setJob} placeholder="Software Engineer" />
    <ToolInput label="Website" value={url} onChange={setUrl} placeholder="https://..." />
    <ToolInput label="Photo URL" value={image} onChange={setImage} placeholder="https://..." />
    <ToolInput label="Social Profiles (one per line)" value={social} onChange={setSocial} multiline rows={3} />
    <ToolButton onClick={generate}>Generate Schema</ToolButton>
    <ToolOutput label="Person Schema" value={output} />
  </ToolLayout>;
};
export default PersonSchemaGen;
