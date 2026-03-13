import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const prefixes = ["best","top","how to","what is","why","where to find","cheap","free","affordable","professional"];
const suffixes = ["for beginners","near me","online","2024","tips","guide","review","tutorial","examples","vs"];
const LongTailKeywordGen = () => {
  const [seed, setSeed] = useState(""); const [output, setOutput] = useState("");
  const generate = () => {
    if (!seed) return;
    const results: string[] = [];
    prefixes.forEach(p => results.push(`${p} ${seed}`));
    suffixes.forEach(s => results.push(`${seed} ${s}`));
    const questions = ["how to","what is the best","where can I get","why should I use","when to use"];
    questions.forEach(q => results.push(`${q} ${seed}`));
    setOutput(results.join("\n"));
  };
  return <ToolLayout>
    <ToolInput label="Seed Keyword" value={seed} onChange={setSeed} placeholder="e.g., running shoes" />
    <ToolButton onClick={generate}>Generate Long-Tail Keywords</ToolButton>
    <ToolOutput label={`Generated Keywords (${output?output.split("\n").length:0})`} value={output} />
  </ToolLayout>;
};
export default LongTailKeywordGen;
