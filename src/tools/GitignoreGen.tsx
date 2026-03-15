import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const presets: Record<string,string[]> = {
  Node: ["node_modules/","dist/","build/",".env",".env.local","*.log","npm-debug.log*","coverage/",".nyc_output/"],
  React: ["node_modules/","build/","dist/",".env.local",".env*.local","*.log","coverage/",".DS_Store"],
  Python: ["__pycache__/","*.py[cod]","*.egg-info/","dist/","build/","venv/",".env","*.sqlite3",".mypy_cache/"],
  Java: ["target/","*.class","*.jar","*.war",".gradle/","build/",".idea/","*.iml"],
  General: [".DS_Store","Thumbs.db","*.log",".env","*.swp","*.swo","*~",".vscode/",".idea/"],
};
const GitignoreGen = () => {
  const [selected, setSelected] = useState<string[]>(["Node","General"]);
  const toggle = (s:string) => setSelected(p => p.includes(s)?p.filter(x=>x!==s):[...p,s]);
  const output = selected.map(s => `# ${s}\n${presets[s].join("\n")}`).join("\n\n");
  return <ToolLayout>
    <div><label className="text-sm font-medium text-foreground block mb-1">Presets</label><div className="flex flex-wrap gap-3">{Object.keys(presets).map(k=><label key={k} className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={selected.includes(k)} onChange={()=>toggle(k)} />{k}</label>)}</div></div>
    <ToolOutput label=".gitignore" value={output} />
  </ToolLayout>;
};
export default GitignoreGen;