import { useState } from "react";
import { ToolLayout, ToolInput, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const ReviewSchemaGen = () => {
  const [itemName,setItemName]=useState(""); const [author,setAuthor]=useState(""); const [rating,setRating]=useState(5); const [body,setBody]=useState(""); const [output,setOutput]=useState("");
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":"Review","itemReviewed":{"@type":"Thing","name":itemName},"author":{"@type":"Person","name":author},"reviewRating":{"@type":"Rating","ratingValue":rating,"bestRating":5},"reviewBody":body};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolInput label="Item Name" value={itemName} onChange={setItemName} placeholder="Product or Service Name" />
    <ToolInput label="Reviewer Name" value={author} onChange={setAuthor} placeholder="John Doe" />
    <ToolNumber label="Rating (1-5)" value={rating} onChange={setRating} min={1} max={5} />
    <ToolInput label="Review Text" value={body} onChange={setBody} multiline rows={3} placeholder="Great product..." />
    <ToolButton onClick={generate}>Generate Schema</ToolButton>
    <ToolOutput label="Review Schema" value={output} />
  </ToolLayout>;
};
export default ReviewSchemaGen;
