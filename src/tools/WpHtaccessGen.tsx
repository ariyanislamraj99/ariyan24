import { useState } from "react"; import { ToolLayout, ToolOutput } from "./ToolComponents";
const WpHtaccessGen = () => { const [opts,sO]=useState({gzip:true,cache:true,security:true});
  const toggle=(k:string)=>sO(p=>({...p,[k]:!(p as any)[k]}));
  let out="# WordPress .htaccess\n\n# BEGIN WordPress\n<IfModule mod_rewrite.c>\nRewriteEngine On\nRewriteBase /\nRewriteRule ^index\\.php$ - [L]\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . /index.php [L]\n</IfModule>\n# END WordPress\n";
  if(opts.gzip) out+="\n# Gzip\n<IfModule mod_deflate.c>\nAddOutputFilterByType DEFLATE text/html text/css application/javascript\n</IfModule>\n";
  if(opts.cache) out+="\n# Cache\n<IfModule mod_expires.c>\nExpiresActive On\nExpiresByType image/jpg \"access plus 1 year\"\nExpiresByType text/css \"access plus 1 month\"\n</IfModule>\n";
  if(opts.security) out+="\n# Security\n<Files wp-config.php>\nOrder Allow,Deny\nDeny from all\n</Files>\n";
  return <ToolLayout><div className="space-y-2">{Object.entries({gzip:"Enable Gzip",cache:"Browser Caching",security:"Security Rules"}).map(([k,l])=><label key={k} className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={(opts as any)[k]} onChange={()=>toggle(k)} />{l}</label>)}</div><ToolOutput label=".htaccess" value={out} /></ToolLayout>; };
export default WpHtaccessGen;
