import { useState } from "react";
import { ToolLayout, ToolInput, ToolSelect, ToolButton, ToolOutput } from "./ToolComponents";
const SoftwareSchemaGen = () => {
  const [name,setName]=useState(""); const [os,setOs]=useState("Windows"); const [cat,setCat]=useState("WebApplication"); const [price,setPrice]=useState("0"); const [rating,setRating]=useState("4.5"); const [output,setOutput]=useState("");
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"SoftwareApplication","name":name,"operatingSystem":os,"applicationCategory":cat,"offers":{"@type":"Offer","price":price,"priceCurrency":"USD"},"aggregateRating":{"@type":"AggregateRating","ratingValue":rating,"ratingCount":"100"}};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolInput label="App Name" value={name} onChange={setName} placeholder="My App" />
    <ToolSelect label="OS" value={os} onChange={setOs} options={[{value:"Windows",label:"Windows"},{value:"macOS",label:"macOS"},{value:"Android",label:"Android"},{value:"iOS",label:"iOS"}]} />
    <ToolInput label="Category" value={cat} onChange={setCat} placeholder="WebApplication" />
    <ToolInput label="Price" value={price} onChange={setPrice} placeholder="0" />
    <ToolInput label="Rating" value={rating} onChange={setRating} placeholder="4.5" />
    <ToolButton onClick={generate}>Generate Schema</ToolButton>
    <ToolOutput label="Software Schema" value={output} />
  </ToolLayout>;
};
export default SoftwareSchemaGen;
