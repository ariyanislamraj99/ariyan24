import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const RegexTester = () => { const [pattern,sP]=useState(""); const [flags,sF]=useState("g"); const [text,sT]=useState(""); let result=""; try { const re=new RegExp(pattern,flags); const matches=text.match(re); result=matches?`${matches.length} matches:\n${matches.join("\n")}`:"No matches"; } catch(e:any) { result=`Error: ${e.message}`; }
  return <ToolLayout><ToolInput label="Regex Pattern" value={pattern} onChange={sP} placeholder="\\w+" /><ToolInput label="Flags" value={flags} onChange={sF} placeholder="g" /><ToolInput label="Test String" value={text} onChange={sT} multiline /><ToolOutput label="Matches" value={result} /></ToolLayout>; };
export default RegexTester;
