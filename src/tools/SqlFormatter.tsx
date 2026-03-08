import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const SqlFormatter = () => { const [sql,sS]=useState(""); const [o,sO]=useState("");
  const format=()=>{ const keywords=["SELECT","FROM","WHERE","AND","OR","JOIN","LEFT","RIGHT","INNER","ON","GROUP BY","ORDER BY","HAVING","LIMIT","INSERT","INTO","VALUES","UPDATE","SET","DELETE","CREATE","TABLE","ALTER","DROP","INDEX","UNION","AS","DISTINCT","COUNT","SUM","AVG","MAX","MIN","BETWEEN","IN","NOT","NULL","IS","LIKE","EXISTS","CASE","WHEN","THEN","ELSE","END"]; let r=sql; keywords.forEach(k=>{r=r.replace(new RegExp(`\\b${k}\\b`,"gi"),`\n${k.toUpperCase()}`)}); sO(r.trim()); };
  return <ToolLayout><ToolInput label="SQL Query" value={sql} onChange={sS} multiline rows={5} placeholder="SELECT * FROM users WHERE id = 1" /><ToolButton onClick={format}>Format SQL</ToolButton><ToolOutput label="Formatted" value={o} /></ToolLayout>; };
export default SqlFormatter;
