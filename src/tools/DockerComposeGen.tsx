import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const services = [{name:"web",image:"node:18-alpine",port:"3000:3000",volumes:"./:/app",command:"npm start"},{name:"db",image:"postgres:15",port:"5432:5432",env:["POSTGRES_DB=mydb","POSTGRES_USER=user","POSTGRES_PASSWORD=password"],volumes:"pgdata:/var/lib/postgresql/data"},{name:"redis",image:"redis:7-alpine",port:"6379:6379"}];
const DockerComposeGen = () => {
  const [selected, setSelected] = useState<string[]>(["web","db"]);
  const toggle = (s:string) => setSelected(p => p.includes(s)?p.filter(x=>x!==s):[...p,s]);
  const compose = `version: '3.8'\n\nservices:\n${selected.map(s => {
    const svc = services.find(x=>x.name===s)!;
    let yml = `  ${s}:\n    image: ${svc.image}\n    ports:\n      - "${svc.port}"\n`;
    if (svc.env) yml += `    environment:\n${(svc.env as string[]).map(e=>`      - ${e}`).join("\n")}\n`;
    if (svc.volumes) yml += `    volumes:\n      - ${svc.volumes}\n`;
    if (svc.command) yml += `    command: ${svc.command}\n`;
    if (s==="web"&&selected.includes("db")) yml += `    depends_on:\n      - db\n`;
    return yml;
  }).join("\n")}${selected.includes("db")?"\nvolumes:\n  pgdata:":""}`;
  return <ToolLayout>
    <div><label className="text-sm font-medium text-foreground block mb-1">Services</label><div className="flex flex-wrap gap-3">{services.map(s=><label key={s.name} className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={selected.includes(s.name)} onChange={()=>toggle(s.name)} />{s.name} ({s.image})</label>)}</div></div>
    <ToolOutput label="docker-compose.yml" value={compose} />
  </ToolLayout>;
};
export default DockerComposeGen;