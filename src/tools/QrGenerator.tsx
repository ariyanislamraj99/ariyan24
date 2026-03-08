import { useState, useRef, useEffect } from "react";
import { ToolLayout, ToolInput, ToolButton } from "./ToolComponents";
const QrGenerator = () => {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const generate = () => { if (text) setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`); };
  return <ToolLayout><ToolInput label="Text or URL" value={text} onChange={setText} placeholder="https://example.com" /><ToolButton onClick={generate}>Generate QR Code</ToolButton>{qrUrl && <div className="flex justify-center"><img src={qrUrl} alt="QR Code" className="rounded-xl border border-glass-border/20" /></div>}</ToolLayout>;
};
export default QrGenerator;
