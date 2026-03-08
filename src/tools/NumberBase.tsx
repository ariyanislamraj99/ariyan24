import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolSelect } from "./ToolComponents";
const NumberBase = () => { const [val,sV]=useState("255"); const [from,sF]=useState("10");
  const n=parseInt(val,Number(from));
  return <ToolLayout><ToolInput label="Number" value={val} onChange={sV} /><ToolSelect label="From Base" value={from} onChange={sF} options={[{value:"2",label:"Binary"},{value:"8",label:"Octal"},{value:"10",label:"Decimal"},{value:"16",label:"Hex"}]} />{!isNaN(n)&&<><ToolOutput label="Binary" value={n.toString(2)} /><ToolOutput label="Octal" value={n.toString(8)} /><ToolOutput label="Decimal" value={n.toString(10)} /><ToolOutput label="Hexadecimal" value={n.toString(16).toUpperCase()} /></>}</ToolLayout>; };
export default NumberBase;
