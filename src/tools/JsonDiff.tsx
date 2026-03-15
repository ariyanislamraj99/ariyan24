import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const JsonDiff = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [output, setOutput] = useState("");
  const diff = () => {
    try {
      const objA = JSON.parse(a);
      const objB = JSON.parse(b);
      const diffs: string[] = [];
      const compare = (o1:any,o2:any,path:string) => {
        const keys = new Set([...Object.keys(o1||{}), ...Object.keys(o2||{})]);
        keys.forEach(k => {
          const p = path ? `${path}.${k}` : k;
          if (!(k in (o1||{}))) diffs.push(`+ ${p}: ${JSON.stringify(o2[k])}`);
          else if (!(k in (o2||{}))) diffs.push(`- ${p}: ${JSON.stringify(o1[k])}`);
          else if (typeof o1[k] === "object" && typeof o2[k] === "object") compare(o1[k],o2[k],p);
          else if (JSON.stringify(o1[k]) !== JSON.stringify(o2[k])) diffs.push(`~ ${p}: ${JSON.stringify(o1[k])} → ${JSON.stringify(o2[k])}`);
        });
      };
      compare(objA, objB, "");
      setOutput(diffs.length ? diffs.join("\n") : "✅ No differences found");
    } catch (e:any) { setOutput(`Error: ${e.message}`); }
  };
  return <ToolLayout><ToolInput label="JSON A" value={a} onChange={setA} multiline rows={5} placeholder='{"name":"John"}' /><ToolInput label="JSON B" value={b} onChange={setB} multiline rows={5} placeholder='{"name":"Jane"}' /><ToolButton onClick={diff}>Compare</ToolButton><ToolOutput label="Differences" value={output} /></ToolLayout>;
};
export default JsonDiff;