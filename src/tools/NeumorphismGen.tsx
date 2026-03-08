import { useState } from "react"; import { ToolLayout, ToolNumber, ToolOutput } from "./ToolComponents";
const NeumorphismGen = () => { const [size,sS]=useState(10);const [radius,sR]=useState(15);const [bg,sB]=useState("#e0e5ec");
  const css=`background: ${bg};\nborder-radius: ${radius}px;\nbox-shadow: ${size}px ${size}px ${size*2}px #a3b1c6, -${size}px -${size}px ${size*2}px #ffffff;`;
  return <ToolLayout><div className="flex justify-center py-8" style={{background:bg}}><div className="w-32 h-32 flex items-center justify-center text-sm" style={{background:bg,borderRadius:`${radius}px`,boxShadow:`${size}px ${size}px ${size*2}px #a3b1c6, -${size}px -${size}px ${size*2}px #ffffff`}}>Neumorphism</div></div><ToolNumber label="Shadow Size" value={size} onChange={sS} min={1} max={30} /><ToolNumber label="Radius" value={radius} onChange={sR} min={0} max={50} /><ToolOutput label="CSS" value={css} /></ToolLayout>; };
export default NeumorphismGen;
