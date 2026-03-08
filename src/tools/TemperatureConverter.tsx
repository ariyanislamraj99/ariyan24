import { useState } from "react"; import { ToolLayout, ToolNumber, ToolOutput } from "./ToolComponents";
const TemperatureConverter = () => { const [c,sC]=useState(0); return <ToolLayout><ToolNumber label="Celsius" value={c} onChange={sC} /><ToolOutput label="Fahrenheit" value={`${((c*9/5)+32).toFixed(2)}°F`} /><ToolOutput label="Kelvin" value={`${(c+273.15).toFixed(2)}K`} /></ToolLayout>; };
export default TemperatureConverter;
