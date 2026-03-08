import { useState } from "react"; import { ToolLayout, ToolNumber, ToolSelect, ToolOutput } from "./ToolComponents";
const units:Record<string,Record<string,number>>={length:{mm:0.001,cm:0.01,m:1,km:1000,in:0.0254,ft:0.3048,yd:0.9144,mi:1609.344},weight:{mg:0.001,g:1,kg:1000,oz:28.3495,lb:453.592,ton:907185}};
const UnitConverter = () => { const [cat,sC]=useState("length"); const [from,sF]=useState("m"); const [to,sTo]=useState("ft"); const [val,sV]=useState(1);
  const u=units[cat]; const result=val*(u[from]/u[to]);
  return <ToolLayout><ToolSelect label="Category" value={cat} onChange={c=>{sC(c);const k=Object.keys(units[c]);sF(k[0]);sTo(k[1]);}} options={Object.keys(units).map(k=>({value:k,label:k.charAt(0).toUpperCase()+k.slice(1)}))} /><ToolNumber label="Value" value={val} onChange={sV} /><div className="flex gap-4"><ToolSelect label="From" value={from} onChange={sF} options={Object.keys(u).map(k=>({value:k,label:k}))} /><ToolSelect label="To" value={to} onChange={sTo} options={Object.keys(u).map(k=>({value:k,label:k}))} /></div><ToolOutput label="Result" value={`${val} ${from} = ${result.toFixed(6)} ${to}`} /></ToolLayout>; };
export default UnitConverter;
