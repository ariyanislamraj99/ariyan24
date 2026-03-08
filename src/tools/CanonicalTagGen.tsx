import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const CanonicalTagGen = () => { const [url,sU]=useState(""); return <ToolLayout><ToolInput label="Canonical URL" value={url} onChange={sU} placeholder="https://example.com/page" /><ToolOutput label="Canonical Tag" value={url?`<link rel="canonical" href="${url}" />`:""} /></ToolLayout>; };
export default CanonicalTagGen;
