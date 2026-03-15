import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const OauthUrlBuilder = () => {
  const [provider, setProvider] = useState("google");
  const [clientId, setClientId] = useState("");
  const [redirect, setRedirect] = useState("");
  const [scopes, setScopes] = useState("");
  const [output, setOutput] = useState("");
  const providers: Record<string,string> = {google:"https://accounts.google.com/o/oauth2/v2/auth",github:"https://github.com/login/oauth/authorize",facebook:"https://www.facebook.com/v18.0/dialog/oauth",twitter:"https://twitter.com/i/oauth2/authorize",discord:"https://discord.com/api/oauth2/authorize",microsoft:"https://login.microsoftonline.com/common/oauth2/v2.0/authorize"};
  const build = () => {
    const base = providers[provider] || providers.google;
    const params = new URLSearchParams({client_id:clientId||"YOUR_CLIENT_ID",redirect_uri:redirect||"https://example.com/callback",response_type:"code",scope:scopes||"openid email profile",state:Math.random().toString(36).slice(2)});
    setOutput(`OAuth Authorization URL:\n\n${base}?${params.toString()}\n\n# Parameters:\n- client_id: ${clientId||"YOUR_CLIENT_ID"}\n- redirect_uri: ${redirect||"https://example.com/callback"}\n- response_type: code\n- scope: ${scopes||"openid email profile"}\n- state: (random string for CSRF protection)`);
  };
  return <ToolLayout>
    <div><label className="text-sm font-medium text-foreground block mb-1">Provider</label><select value={provider} onChange={e=>setProvider(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm">{Object.keys(providers).map(p=><option key={p}>{p}</option>)}</select></div>
    <ToolInput label="Client ID" value={clientId} onChange={setClientId} placeholder="your-client-id" />
    <ToolInput label="Redirect URI" value={redirect} onChange={setRedirect} placeholder="https://example.com/callback" />
    <ToolInput label="Scopes" value={scopes} onChange={setScopes} placeholder="openid email profile" />
    <ToolButton onClick={build}>Build URL</ToolButton>
    <ToolOutput label="OAuth URL" value={output} />
  </ToolLayout>;
};
export default OauthUrlBuilder;