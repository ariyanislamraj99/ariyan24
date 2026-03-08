import { useState } from "react"; import { ToolLayout, ToolOutput, ToolButton } from "./ToolComponents";
const genSalt=()=>{const c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/~`";return Array.from({length:64},()=>c[Math.floor(Math.random()*c.length)]).join("")};
const keys=["AUTH_KEY","SECURE_AUTH_KEY","LOGGED_IN_KEY","NONCE_KEY","AUTH_SALT","SECURE_AUTH_SALT","LOGGED_IN_SALT","NONCE_SALT"];
const WpSaltGen = () => { const [o,sO]=useState("");
  const gen=()=>sO(keys.map(k=>`define('${k}', '${genSalt()}');`).join("\n"));
  return <ToolLayout><ToolButton onClick={gen}>Generate Salt Keys</ToolButton><ToolOutput label="wp-config.php Salt Keys" value={o} /></ToolLayout>; };
export default WpSaltGen;
