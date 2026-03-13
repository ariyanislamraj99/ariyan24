import { useState } from "react";
import { ToolLayout, ToolInput, ToolSelect, ToolButton, ToolOutput } from "./ToolComponents";
const ArticleSchemaGen = () => {
  const [type,setType]=useState("Article"); const [headline,setHeadline]=useState(""); const [author,setAuthor]=useState(""); const [published,setPublished]=useState(""); const [image,setImage]=useState(""); const [publisher,setPublisher]=useState(""); const [output,setOutput]=useState("");
  const generate = () => {
    const schema = {"@context":"https://schema.org","@type":type,"headline":headline,"author":{"@type":"Person","name":author},"datePublished":published,"image":image,"publisher":{"@type":"Organization","name":publisher}};
    setOutput(`<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`);
  };
  return <ToolLayout>
    <ToolSelect label="Article Type" value={type} onChange={setType} options={[{value:"Article",label:"Article"},{value:"NewsArticle",label:"News Article"},{value:"BlogPosting",label:"Blog Post"}]} />
    <ToolInput label="Headline" value={headline} onChange={setHeadline} placeholder="Article headline..." />
    <ToolInput label="Author" value={author} onChange={setAuthor} placeholder="Author name" />
    <ToolInput label="Published Date" value={published} onChange={setPublished} placeholder="2024-01-15" />
    <ToolInput label="Image URL" value={image} onChange={setImage} placeholder="https://..." />
    <ToolInput label="Publisher" value={publisher} onChange={setPublisher} placeholder="Publisher name" />
    <ToolButton onClick={generate}>Generate Schema</ToolButton>
    <ToolOutput label="Article Schema" value={output} />
  </ToolLayout>;
};
export default ArticleSchemaGen;
