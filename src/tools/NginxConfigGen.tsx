import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const NginxConfigGen = () => {
  const [domain, setDomain] = useState("example.com");
  const [port, setPort] = useState(3000);
  const [ssl, setSsl] = useState(true);
  const [gzip, setGzip] = useState(true);
  let config = `server {\n  listen ${ssl?"443 ssl":"80"};\n  server_name ${domain};\n${ssl?`\n  ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;\n  ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;\n`:""}\n  location / {\n    proxy_pass http://localhost:${port};\n    proxy_http_version 1.1;\n    proxy_set_header Upgrade $http_upgrade;\n    proxy_set_header Connection 'upgrade';\n    proxy_set_header Host $host;\n    proxy_set_header X-Real-IP $remote_addr;\n    proxy_cache_bypass $http_upgrade;\n  }\n${gzip?"  \n  gzip on;\n  gzip_types text/plain text/css application/json application/javascript text/xml;\n  gzip_min_length 1000;\n":""}}`;
  if (ssl) config += `\n\nserver {\n  listen 80;\n  server_name ${domain};\n  return 301 https://$server_name$request_uri;\n}`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Domain</label><input value={domain} onChange={e=>setDomain(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">App Port</label><input type="number" value={port} onChange={e=>setPort(+e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <div className="flex gap-4">
      <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={ssl} onChange={e=>setSsl(e.target.checked)} />SSL</label>
      <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={gzip} onChange={e=>setGzip(e.target.checked)} />Gzip</label>
    </div>
    <ToolOutput label="nginx.conf" value={config} />
  </ToolLayout>;
};
export default NginxConfigGen;