import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const UtmBuilder = () => { const [url,sU]=useState(""); const [src,sS]=useState(""); const [med,sM]=useState(""); const [camp,sC]=useState("");
  const built=url?`${url}${url.includes("?")?"&":"?"}utm_source=${encodeURIComponent(src)}&utm_medium=${encodeURIComponent(med)}&utm_campaign=${encodeURIComponent(camp)}`:"";
  return <ToolLayout><ToolInput label="URL" value={url} onChange={sU} placeholder="https://example.com" /><ToolInput label="Source" value={src} onChange={sS} placeholder="google" /><ToolInput label="Medium" value={med} onChange={sM} placeholder="cpc" /><ToolInput label="Campaign" value={camp} onChange={sC} placeholder="spring_sale" /><ToolOutput label="UTM Link" value={built} /></ToolLayout>; };
export default UtmBuilder;
