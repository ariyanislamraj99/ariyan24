import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const ApacheConfigGen = () => {
  const [domain, setDomain] = useState("example.com");
  const [docRoot, setDocRoot] = useState("/var/www/html");
  const [ssl, setSsl] = useState(true);
  let config = `<VirtualHost *:${ssl?"443":"80"}>\n  ServerName ${domain}\n  ServerAlias www.${domain}\n  DocumentRoot ${docRoot}\n${ssl?`\n  SSLEngine on\n  SSLCertificateFile /etc/letsencrypt/live/${domain}/fullchain.pem\n  SSLCertificateKeyFile /etc/letsencrypt/live/${domain}/privkey.pem\n`:""}\n  <Directory ${docRoot}>\n    AllowOverride All\n    Require all granted\n  </Directory>\n\n  ErrorLog \${APACHE_LOG_DIR}/${domain}-error.log\n  CustomLog \${APACHE_LOG_DIR}/${domain}-access.log combined\n</VirtualHost>`;
  if (ssl) config += `\n\n<VirtualHost *:80>\n  ServerName ${domain}\n  Redirect permanent / https://${domain}/\n</VirtualHost>`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Domain</label><input value={domain} onChange={e=>setDomain(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Document Root</label><input value={docRoot} onChange={e=>setDocRoot(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={ssl} onChange={e=>setSsl(e.target.checked)} />SSL (Let's Encrypt)</label>
    <ToolOutput label="Apache VirtualHost" value={config} />
  </ToolLayout>;
};
export default ApacheConfigGen;