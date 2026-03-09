import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton, ToolNumber } from "./ToolComponents";

const PdfWatermarkGen = () => {
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(15);
  const [angle, setAngle] = useState(-45);
  const [output, setOutput] = useState("");

  const generate = () => {
    const css = `/* Watermark Overlay CSS */
.watermark-container {
  position: relative;
}

.watermark-container::after {
  content: "${text}";
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${angle}deg);
  font-size: 80px;
  font-weight: bold;
  color: rgba(0, 0, 0, ${opacity / 100});
  pointer-events: none;
  z-index: 9999;
  white-space: nowrap;
  user-select: none;
}

/* Print-friendly version */
@media print {
  .watermark-container::after {
    position: fixed;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}`;

    const html = `<!-- Printable Watermark Page -->
<div class="watermark-container" style="position:relative;min-height:100vh;padding:40px;">
  <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(${angle}deg);font-size:80px;font-weight:bold;color:rgba(0,0,0,${opacity / 100});pointer-events:none;z-index:9999;white-space:nowrap;">${text}</div>
  <!-- Your content here -->
</div>`;

    setOutput(`${css}\n\n${"=".repeat(50)}\n\n${html}`);
  };

  return (
    <ToolLayout>
      <ToolInput label="Watermark Text" value={text} onChange={setText} placeholder="CONFIDENTIAL" />
      <ToolNumber label="Opacity (%)" value={opacity} onChange={setOpacity} min={5} max={50} />
      <ToolNumber label="Rotation Angle (°)" value={angle} onChange={setAngle} min={-90} max={90} />
      <ToolButton onClick={generate}>Generate Watermark Code</ToolButton>
      <ToolOutput label="CSS + HTML Code" value={output} />
    </ToolLayout>
  );
};

export default PdfWatermarkGen;
