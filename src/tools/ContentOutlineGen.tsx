import { useState } from "react";
import { ToolLayout, ToolInput, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const ContentOutlineGen = () => {
  const [topic, setTopic] = useState(""); const [sections, setSections] = useState(6); const [output, setOutput] = useState("");
  const generate = () => {
    const templates = ["Introduction to","Understanding","How to Use","Benefits of","Best Practices for","Common Mistakes with","Advanced Tips for","Tools for","Case Studies:","Future of","FAQ about","Conclusion:"];
    const outline = [`# ${topic||"Your Topic"}\n`];
    for (let i = 0; i < Math.min(sections, templates.length); i++) {
      outline.push(`## ${i+1}. ${templates[i]} ${topic||"Topic"}`);
      outline.push(`   - Key point 1\n   - Key point 2\n   - Key point 3\n`);
    }
    setOutput(outline.join("\n"));
  };
  return <ToolLayout>
    <ToolInput label="Topic" value={topic} onChange={setTopic} placeholder="e.g., Email Marketing" />
    <ToolNumber label="Number of Sections" value={sections} onChange={setSections} min={3} max={12} />
    <ToolButton onClick={generate}>Generate Outline</ToolButton>
    <ToolOutput label="Content Outline" value={output} />
  </ToolLayout>;
};
export default ContentOutlineGen;
