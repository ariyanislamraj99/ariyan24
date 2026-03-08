import { useState } from "react"; import { ToolLayout, ToolNumber, ToolSelect, ToolOutput } from "./ToolComponents";
const units=["Bytes","KB","MB","GB","TB","PB"]; const factors=[1,1024,1048576,1073741824,1099511627776,1125899906842624];
const DataStorage = () => { const [val,sV]=useState(1); const [from,sF]=useState("2");
  return <ToolLayout><ToolNumber label="Value" value={val} onChange={sV} /><ToolSelect label="Unit" value={from} onChange={sF} options={units.map((u,i)=>({value:String(i),label:u}))} />{units.map((u,i)=><ToolOutput key={u} label={u} value={`${(val*factors[Number(from)]/factors[i]).toFixed(4)} ${u}`} />)}</ToolLayout>; };
export default DataStorage;
