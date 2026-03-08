import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton, ToolSelect } from "./ToolComponents";
const SchemaGenerator = () => {
  const [type, setType] = useState("Organization"); const [name, setName] = useState(""); const [url, setUrl] = useState(""); const [desc, setDesc] = useState(""); const [output, setOutput] = useState("");
  const gen = () => { const schema: any = { "@context": "https://schema.org", "@type": type, name, url, description: desc }; setOutput(JSON.stringify(schema, null, 2)); };
  return <ToolLayout><ToolSelect label="Schema Type" value={type} onChange={setType} options={[{value:"Organization",label:"Organization"},{value:"Person",label:"Person"},{value:"WebSite",label:"WebSite"},{value:"Article",label:"Article"}]} /><ToolInput label="Name" value={name} onChange={setName} placeholder="My Company" /><ToolInput label="URL" value={url} onChange={setUrl} placeholder="https://example.com" /><ToolInput label="Description" value={desc} onChange={setDesc} placeholder="Description..." /><ToolButton onClick={gen}>Generate Schema</ToolButton><ToolOutput label="JSON-LD" value={output} /></ToolLayout>;
};
export default SchemaGenerator;
