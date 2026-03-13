import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const LocalBusinessSchema = () => {
  const [name,setName]=useState(""); const [type,setType]=useState("LocalBusiness"); const [address,setAddress]=useState(""); const [city,setCity]=useState(""); const [phone,setPhone]=useState(""); const [url,setUrl]=useState(""); const [output,setOutput]=useState("");
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":type,"name":name,"address":{"@type":"PostalAddress","streetAddress":address,"addressLocality":city},"telephone":phone,"url":url};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolInput label="Business Name" value={name} onChange={setName} placeholder="My Business" />
    <ToolInput label="Business Type" value={type} onChange={setType} placeholder="Restaurant, Store, etc." />
    <ToolInput label="Street Address" value={address} onChange={setAddress} placeholder="123 Main St" />
    <ToolInput label="City" value={city} onChange={setCity} placeholder="New York" />
    <ToolInput label="Phone" value={phone} onChange={setPhone} placeholder="+1-555-0100" />
    <ToolInput label="Website URL" value={url} onChange={setUrl} placeholder="https://..." />
    <ToolButton onClick={generate}>Generate Schema</ToolButton>
    <ToolOutput label="Local Business Schema" value={output} />
  </ToolLayout>;
};
export default LocalBusinessSchema;
