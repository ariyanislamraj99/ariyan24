import { useState } from "react"; import { ToolLayout, ToolNumber, ToolOutput } from "./ToolComponents";
const PxToRem = () => { const [px,sP]=useState(16); const [base,sB]=useState(16); return <ToolLayout><ToolNumber label="Pixels" value={px} onChange={sP} /><ToolNumber label="Base Font Size (px)" value={base} onChange={sB} min={1} /><ToolOutput label="REM" value={`${(px/base).toFixed(4)}rem`} /><ToolOutput label="EM" value={`${(px/base).toFixed(4)}em`} /></ToolLayout>; };
export default PxToRem;
