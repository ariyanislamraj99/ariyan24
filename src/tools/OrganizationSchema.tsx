import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const OrganizationSchema = () => {
  const [name,setName]=useState(""); const [url,setUrl]=useState(""); const [logo,setLogo]=useState(""); const [desc,setDesc]=useState(""); const [social,setSocial]=useState(""); const [output,setOutput]=useState("");
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"Organization","name":name,"url":url,"logo":logo,"description":desc,"sameAs":social.split("\n").filter(Boolean)};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolInput label="Organization Name" value={name} onChange={setName} placeholder="Acme Inc" />
    <ToolInput label="Website" value={url} onChange={setUrl} placeholder="https://..." />
    <ToolInput label="Logo URL" value={logo} onChange={setLogo} placeholder="https://..." />
    <ToolInput label="Description" value={desc} onChange={setDesc} placeholder="We are..." />
    <ToolInput label="Social Profiles (one per line)" value={social} onChange={setSocial} multiline rows={3} placeholder="https://twitter.com/acme\nhttps://linkedin.com/company/acme" />
    <ToolButton onClick={generate}>Generate Schema</ToolButton>
    <ToolOutput label="Organization Schema" value={output} />
  </ToolLayout>;
};
export default OrganizationSchema;
