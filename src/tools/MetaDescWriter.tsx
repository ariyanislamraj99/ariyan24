import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const templates = [
  "Discover {topic} with our comprehensive guide. Learn {benefit} and {action} today!",
  "Looking for {topic}? Get {benefit} with our expert {action}. Start now!",
  "{action} your {topic} with our proven methods. {benefit} guaranteed!",
  "The ultimate guide to {topic}. {benefit} in minutes. {action} for free!",
];
const MetaDescWriter = () => {
  const [topic, setTopic] = useState(""); const [benefit, setBenefit] = useState(""); const [action, setAction] = useState(""); const [output, setOutput] = useState("");
  const generate = () => {
    const results = templates.map(t => t.replace(/\{topic\}/g, topic||"your topic").replace(/\{benefit\}/g, benefit||"great results").replace(/\{action\}/g, action||"get started"));
    setOutput(results.join("\n\n"));
  };
  return <ToolLayout>
    <ToolInput label="Topic/Subject" value={topic} onChange={setTopic} placeholder="e.g., web design" />
    <ToolInput label="Key Benefit" value={benefit} onChange={setBenefit} placeholder="e.g., better conversions" />
    <ToolInput label="Call to Action" value={action} onChange={setAction} placeholder="e.g., try it free" />
    <ToolButton onClick={generate}>Generate Descriptions</ToolButton>
    <ToolOutput label="Generated Descriptions" value={output} />
  </ToolLayout>;
};
export default MetaDescWriter;
