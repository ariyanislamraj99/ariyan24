import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const KeywordClustering = () => {
  const [input, setInput] = useState(""); const [output, setOutput] = useState("");
  const cluster = () => {
    const keywords = input.split("\n").map(k => k.trim()).filter(Boolean);
    const clusters: Record<string, string[]> = {};
    keywords.forEach(kw => {
      const words = kw.toLowerCase().split(" ");
      const root = words.length > 1 ? words.slice(0, Math.ceil(words.length / 2)).join(" ") : words[0];
      let found = false;
      for (const key of Object.keys(clusters)) {
        if (kw.toLowerCase().includes(key) || key.includes(words[0])) { clusters[key].push(kw); found = true; break; }
      }
      if (!found) clusters[root] = [kw];
    });
    setOutput(Object.entries(clusters).map(([k, v]) => `📁 Cluster: "${k}"\n${v.map(x => `  • ${x}`).join("\n")}`).join("\n\n"));
  };
  return <ToolLayout>
    <ToolInput label="Keywords (one per line)" value={input} onChange={setInput} placeholder="best running shoes\nrunning shoes review\nwomen running shoes\nbest hiking boots\nhiking boots review" multiline rows={8} />
    <ToolButton onClick={cluster}>Cluster Keywords</ToolButton>
    <ToolOutput label="Keyword Clusters" value={output} />
  </ToolLayout>;
};
export default KeywordClustering;
