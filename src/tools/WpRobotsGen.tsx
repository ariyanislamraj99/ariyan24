import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const WpRobotsGen = () => { const [url,sU]=useState(""); const out=`User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\nDisallow: /wp-includes/\nDisallow: /wp-content/plugins/\nDisallow: /readme.html\nDisallow: /xmlrpc.php\n\nSitemap: ${url||"https://example.com"}/sitemap.xml`;
  return <ToolLayout><ToolInput label="Site URL" value={url} onChange={sU} placeholder="https://example.com" /><ToolOutput label="robots.txt" value={out} /></ToolLayout>; };
export default WpRobotsGen;
