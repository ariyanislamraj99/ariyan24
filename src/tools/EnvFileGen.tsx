import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const EnvFileGen = () => {
  const [project, setProject] = useState("nodejs");
  const templates: Record<string,string> = {
    nodejs: `# Server\nNODE_ENV=development\nPORT=3000\n\n# Database\nDATABASE_URL=postgresql://user:password@localhost:5432/mydb\n\n# Auth\nJWT_SECRET=your-secret-key\nJWT_EXPIRES_IN=7d\n\n# API Keys\nAPI_KEY=\nAPI_SECRET=`,
    react: `# API\nVITE_API_URL=http://localhost:3000/api\nVITE_APP_NAME=My App\n\n# Auth\nVITE_AUTH_DOMAIN=\nVITE_AUTH_CLIENT_ID=\n\n# Analytics\nVITE_GA_ID=`,
    django: `# Django\nSECRET_KEY=your-secret-key\nDEBUG=True\nALLOWED_HOSTS=localhost,127.0.0.1\n\n# Database\nDATABASE_URL=postgresql://user:password@localhost:5432/mydb\n\n# Email\nEMAIL_HOST=smtp.gmail.com\nEMAIL_PORT=587\nEMAIL_USER=\nEMAIL_PASSWORD=`,
    nextjs: `# Database\nDATABASE_URL=\n\n# Auth (NextAuth)\nNEXTAUTH_SECRET=\nNEXTAUTH_URL=http://localhost:3000\n\n# OAuth\nGOOGLE_CLIENT_ID=\nGOOGLE_CLIENT_SECRET=\n\n# API\nNEXT_PUBLIC_API_URL=http://localhost:3000/api`,
  };
  return <ToolLayout>
    <div><label className="text-sm font-medium text-foreground block mb-1">Project Type</label><select value={project} onChange={e=>setProject(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm">{Object.keys(templates).map(k=><option key={k} value={k}>{k}</option>)}</select></div>
    <ToolOutput label=".env" value={templates[project]} />
    <ToolOutput label=".env.example (safe to commit)" value={templates[project].replace(/=.+$/gm,"=")} />
  </ToolLayout>;
};
export default EnvFileGen;