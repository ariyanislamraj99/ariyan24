import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const StructuredDataTest = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const validate = () => {
    try {
      const data = JSON.parse(input);
      const issues: string[] = [];
      const warnings: string[] = [];
      if (!data["@context"]) issues.push("Missing @context (should be 'https://schema.org')");
      else if (!data["@context"].includes("schema.org")) warnings.push("@context should reference schema.org");
      if (!data["@type"]) issues.push("Missing @type");
      if (data["@type"] === "Article") {
        if (!data.headline) issues.push("Article: Missing 'headline'");
        if (!data.author) warnings.push("Article: Missing 'author'");
        if (!data.datePublished) warnings.push("Article: Missing 'datePublished'");
      }
      if (data["@type"] === "Product") {
        if (!data.name) issues.push("Product: Missing 'name'");
        if (!data.offers) warnings.push("Product: Missing 'offers'");
      }
      const result = [
        `Type: ${data["@type"] || "Unknown"}`,
        `Context: ${data["@context"] || "Missing"}`,
        "",
        issues.length ? `❌ Errors (${issues.length}):\n${issues.map(i=>"  - "+i).join("\n")}` : "✅ No errors found",
        warnings.length ? `\n⚠️ Warnings (${warnings.length}):\n${warnings.map(w=>"  - "+w).join("\n")}` : "",
        "\n💡 For full validation, use:\nhttps://search.google.com/test/rich-results"
      ].join("\n");
      setOutput(result);
    } catch(e:any) { setOutput("❌ Invalid JSON: "+e.message); }
  };
  return <ToolLayout><ToolInput label="JSON-LD" value={input} onChange={setInput} multiline rows={8} placeholder='{"@context":"https://schema.org","@type":"Article","headline":"..."}' /><ToolButton onClick={validate}>Validate</ToolButton><ToolOutput label="Result" value={output} /></ToolLayout>;
};
export default StructuredDataTest;