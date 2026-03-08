import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const StringReplace = () => { const [t,sT]=useState(""); const [find,sF]=useState(""); const [rep,sR]=useState(""); const [o,sO]=useState("");
  return <ToolLayout><ToolInput label="Text" value={t} onChange={sT} multiline /><ToolInput label="Find" value={find} onChange={sF} /><ToolInput label="Replace with" value={rep} onChange={sR} /><ToolButton onClick={()=>sO(t.split(find).join(rep))}>Replace All</ToolButton><ToolOutput label="Result" value={o} /></ToolLayout>; };
export default StringReplace;
