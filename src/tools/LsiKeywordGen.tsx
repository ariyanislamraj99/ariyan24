import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const lsiMap: Record<string, string[]> = {
  "seo": ["search engine optimization","organic traffic","keyword research","backlinks","meta tags","serp","ranking","google algorithm","on-page seo","off-page seo"],
  "marketing": ["digital marketing","content strategy","brand awareness","lead generation","conversion rate","target audience","campaign","analytics","roi","engagement"],
  "web design": ["responsive design","user experience","ui/ux","wireframe","mockup","typography","color theory","layout","css","html"],
  "default": ["related terms","synonyms","semantic keywords","contextual words","topic relevance","search intent","content optimization","natural language","co-occurring terms"]
};
const LsiKeywordGen = () => {
  const [seed, setSeed] = useState(""); const [output, setOutput] = useState("");
  const generate = () => {
    const key = Object.keys(lsiMap).find(k => seed.toLowerCase().includes(k)) || "default";
    const base = lsiMap[key];
    const custom = [`${seed} tips`,`${seed} strategies`,`${seed} tools`,`${seed} best practices`,`${seed} examples`];
    setOutput([...base, ...custom].join("\n"));
  };
  return <ToolLayout>
    <ToolInput label="Primary Keyword" value={seed} onChange={setSeed} placeholder="e.g., content marketing" />
    <ToolButton onClick={generate}>Generate LSI Keywords</ToolButton>
    <ToolOutput label="LSI Keywords" value={output} />
  </ToolLayout>;
};
export default LsiKeywordGen;
