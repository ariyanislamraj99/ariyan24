import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const cssProps: Record<string,string> = {"margin":"m","padding":"p","margin-top":"mt","margin-bottom":"mb","margin-left":"ml","margin-right":"mr","padding-top":"pt","padding-bottom":"pb","padding-left":"pl","padding-right":"pr","width":"w","height":"h","min-width":"min-w","max-width":"max-w","min-height":"min-h","max-height":"max-h","font-size":"text","font-weight":"font","line-height":"leading","letter-spacing":"tracking","text-align":"text","display":"","position":"","top":"top","right":"right","bottom":"bottom","left":"left","z-index":"z","overflow":"overflow","opacity":"opacity","border-radius":"rounded","border-width":"border","gap":"gap","flex-direction":"flex","justify-content":"justify","align-items":"items"};
const TailwindToCss = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const convert = () => {
    const classes = input.trim().split(/\s+/);
    const results: string[] = [];
    classes.forEach(c => {
      if (c.startsWith("text-")) results.push(`/* ${c} */ font-size or color class`);
      else if (c.startsWith("bg-")) results.push(`/* ${c} */ background-color class`);
      else if (c.startsWith("p-")) results.push(`padding: ${parseInt(c.slice(2))*4}px; /* ${c} */`);
      else if (c.startsWith("m-")) results.push(`margin: ${parseInt(c.slice(2))*4}px; /* ${c} */`);
      else if (c.startsWith("w-")) results.push(`width: ${parseInt(c.slice(2))*4}px; /* ${c} */`);
      else if (c.startsWith("h-")) results.push(`height: ${parseInt(c.slice(2))*4}px; /* ${c} */`);
      else if (c.startsWith("rounded")) results.push(`border-radius: varies; /* ${c} */`);
      else if (c === "flex") results.push("display: flex;");
      else if (c === "grid") results.push("display: grid;");
      else if (c === "hidden") results.push("display: none;");
      else if (c === "block") results.push("display: block;");
      else if (c === "relative") results.push("position: relative;");
      else if (c === "absolute") results.push("position: absolute;");
      else if (c === "fixed") results.push("position: fixed;");
      else if (c.startsWith("gap-")) results.push(`gap: ${parseInt(c.slice(4))*4}px;`);
      else if (c.startsWith("z-")) results.push(`z-index: ${c.slice(2)};`);
      else results.push(`/* ${c} - check Tailwind docs */`);
    });
    setOutput(`.element {\n  ${results.join("\n  ")}\n}`);
  };
  return <ToolLayout><ToolInput label="Tailwind Classes" value={input} onChange={setInput} placeholder="flex items-center gap-4 p-6 bg-white rounded-lg" /><ToolButton onClick={convert}>Convert to CSS</ToolButton><ToolOutput label="CSS" value={output} /></ToolLayout>;
};
export default TailwindToCss;