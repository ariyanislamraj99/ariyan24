import { useState } from "react";
import { ToolLayout, ToolInput, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const ProductSchemaGen = () => {
  const [name,setName]=useState(""); const [desc,setDesc]=useState(""); const [price,setPrice]=useState(0); const [currency,setCurrency]=useState("USD"); const [brand,setBrand]=useState(""); const [image,setImage]=useState(""); const [output,setOutput]=useState("");
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"Product","name":name,"description":desc,"brand":{"@type":"Brand","name":brand},"image":image,"offers":{"@type":"Offer","price":price,"priceCurrency":currency,"availability":"https://schema.org/InStock"}};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolInput label="Product Name" value={name} onChange={setName} placeholder="Product Name" />
    <ToolInput label="Description" value={desc} onChange={setDesc} placeholder="Product description..." />
    <ToolInput label="Brand" value={brand} onChange={setBrand} placeholder="Brand Name" />
    <ToolNumber label="Price" value={price} onChange={setPrice} min={0} step={0.01} />
    <ToolInput label="Currency" value={currency} onChange={setCurrency} placeholder="USD" />
    <ToolInput label="Image URL" value={image} onChange={setImage} placeholder="https://..." />
    <ToolButton onClick={generate}>Generate Schema</ToolButton>
    <ToolOutput label="Product Schema" value={output} />
  </ToolLayout>;
};
export default ProductSchemaGen;
