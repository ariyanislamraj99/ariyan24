import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const SitemapValidator = () => { const [t,sT]=useState(""); const [o,sO]=useState("");
  const validate=()=>{ try { const parser=new DOMParser(); const doc=parser.parseFromString(t,"text/xml"); const error=doc.querySelector("parsererror"); if(error){ sO("❌ Invalid XML: "+error.textContent?.slice(0,200)); return; } const urls=doc.querySelectorAll("url"); sO(`✅ Valid XML\nURLs found: ${urls.length}\n\nLocations:\n${Array.from(urls).map(u=>u.querySelector("loc")?.textContent).filter(Boolean).join("\n")}`); } catch(e){ sO("❌ Parse error"); } };
  return <ToolLayout><ToolInput label="Sitemap XML" value={t} onChange={sT} multiline rows={8} /><ToolButton onClick={validate}>Validate</ToolButton><ToolOutput label="Result" value={o} /></ToolLayout>; };
export default SitemapValidator;
