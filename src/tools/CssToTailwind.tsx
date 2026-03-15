import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const cssMap: Record<string,string> = {"display:flex":"flex","display:grid":"grid","display:block":"block","display:inline-block":"inline-block","display:none":"hidden","position:relative":"relative","position:absolute":"absolute","position:fixed":"fixed","position:sticky":"sticky","text-align:center":"text-center","text-align:left":"text-left","text-align:right":"text-right","font-weight:bold":"font-bold","font-weight:600":"font-semibold","font-weight:normal":"font-normal","font-style:italic":"italic","text-decoration:underline":"underline","text-decoration:line-through":"line-through","overflow:hidden":"overflow-hidden","overflow:auto":"overflow-auto","cursor:pointer":"cursor-pointer","flex-direction:column":"flex-col","flex-direction:row":"flex-row","justify-content:center":"justify-center","justify-content:space-between":"justify-between","justify-content:flex-start":"justify-start","justify-content:flex-end":"justify-end","align-items:center":"items-center","align-items:flex-start":"items-start","align-items:flex-end":"items-end","flex-wrap:wrap":"flex-wrap"};
const CssToTailwind = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const convert = () => {
    const rules = input.replace(/[{}]/g,"").split(";").map(r=>r.trim()).filter(Boolean);
    const classes: string[] = [];
    rules.forEach(rule => {
      const [prop, val] = rule.split(":").map(s=>s.trim());
      if (!prop||!val) return;
      const key = `${prop}:${val}`;
      if (cssMap[key]) { classes.push(cssMap[key]); return; }
      const px = val.match(/^(\d+)px$/);
      if (px) {
        const n = parseInt(px[1]);
        const tw = Math.round(n/4);
        if (["margin","padding","gap","width","height","top","right","bottom","left"].includes(prop)) {
          const prefix = prop==="margin"?"m":prop==="padding"?"p":prop==="gap"?"gap":prop==="width"?"w":prop==="height"?"h":prop;
          classes.push(`${prefix}-${tw}`);
          return;
        }
        if (prop==="font-size") { classes.push(`text-[${n}px]`); return; }
        if (prop==="border-radius") { classes.push(`rounded-[${n}px]`); return; }
      }
      classes.push(`/* ${rule} */`);
    });
    setOutput(classes.join(" "));
  };
  return <ToolLayout><ToolInput label="CSS" value={input} onChange={setInput} multiline rows={6} placeholder="display: flex;\njustify-content: center;\npadding: 16px;\nmargin: 8px;" /><ToolButton onClick={convert}>Convert</ToolButton><ToolOutput label="Tailwind Classes" value={output} /></ToolLayout>;
};
export default CssToTailwind;