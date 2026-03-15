import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const JwtGenerator = () => {
  const [payload, setPayload] = useState('{"sub":"1234","name":"John","iat":1234567890}');
  const [secret, setSecret] = useState("your-secret-key");
  const [output, setOutput] = useState("");
  const generate = () => {
    try {
      const header = btoa(JSON.stringify({alg:"HS256",typ:"JWT"})).replace(/=/g,"");
      const pay = btoa(payload).replace(/=/g,"");
      // Note: This is a demo - real HMAC-SHA256 requires crypto
      const sig = btoa(secret + header + pay).replace(/=/g,"").slice(0,43);
      const token = `${header}.${pay}.${sig}`;
      setOutput(`⚠️ Demo JWT (signature not cryptographically valid)\n\nToken:\n${token}\n\nHeader:\n${JSON.stringify({alg:"HS256",typ:"JWT"},null,2)}\n\nPayload:\n${JSON.stringify(JSON.parse(payload),null,2)}\n\n💡 For production JWT generation, use:\n- jsonwebtoken (Node.js)\n- PyJWT (Python)\n- https://jwt.io/`);
    } catch(e:any) { setOutput("Error: "+e.message); }
  };
  return <ToolLayout><ToolInput label="Payload (JSON)" value={payload} onChange={setPayload} multiline rows={4} /><ToolInput label="Secret Key" value={secret} onChange={setSecret} /><ToolButton onClick={generate}>Generate JWT</ToolButton><ToolOutput label="JWT Token" value={output} /></ToolLayout>;
};
export default JwtGenerator;