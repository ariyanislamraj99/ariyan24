import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const SeoTitleCase = () => {
  const [input, setInput] = useState("");
  const minor = new Set(["a","an","the","and","but","or","for","nor","on","at","to","by","in","of","up","as","is","it"]);
  const titleCase = input.split(" ").map((w,i)=> i===0||!minor.has(w.toLowerCase()) ? w.charAt(0).toUpperCase()+w.slice(1).toLowerCase() : w.toLowerCase()).join(" ");
  return <ToolLayout>
    <ToolInput label="Title Text" value={input} onChange={setInput} placeholder="enter your title here" />
    <ToolOutput label="SEO Title Case" value={titleCase} />
    <div className="text-xs text-muted-foreground">{titleCase.length}/60 chars {titleCase.length>60?"⚠️ Too long":"✓"}</div>
  </ToolLayout>;
};
export default SeoTitleCase;
