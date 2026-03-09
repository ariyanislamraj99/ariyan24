import { useState } from "react";
import { ToolLayout, ToolOutput, ToolButton, ToolNumber } from "./ToolComponents";

const PdfPasswordGen = () => {
  const [length, setLength] = useState(16);
  const [output, setOutput] = useState("");

  const generate = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    const password = Array.from(array, (n) => charset[n % charset.length]).join("");

    const strength =
      length >= 20 ? "🟢 Very Strong" : length >= 14 ? "🟡 Strong" : length >= 10 ? "🟠 Medium" : "🔴 Weak";

    setOutput(
      `🔒 PDF Password:\n${password}\n\n📊 Strength: ${strength}\n📏 Length: ${length} characters\n\n💡 How to use:\n• Adobe Acrobat: File → Properties → Security\n• Preview (Mac): File → Export as PDF → Encrypt\n• LibreOffice: File → Export as PDF → Security tab\n• Online: Use smallpdf.com or ilovepdf.com`
    );
  };

  return (
    <ToolLayout>
      <ToolNumber label="Password Length" value={length} onChange={setLength} min={8} max={64} />
      <ToolButton onClick={generate}>Generate PDF Password</ToolButton>
      <ToolOutput label="Password" value={output} />
    </ToolLayout>
  );
};

export default PdfPasswordGen;
