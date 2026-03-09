import { useState } from "react";
import { ToolLayout, ToolButton, ToolOutput } from "./ToolComponents";
import { Upload } from "lucide-react";

const PdfImageExtractor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");

  const extract = () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const raw = reader.result as string;
      
      // Count image objects in PDF
      const xObjectMatches = raw.match(/\/Subtype\s*\/Image/g);
      const imageCount = xObjectMatches ? xObjectMatches.length : 0;
      
      // Detect image types
      const jpegCount = (raw.match(/\/DCTDecode/g) || []).length;
      const pngCount = (raw.match(/\/FlateDecode[\s\S]*?\/Subtype\s*\/Image/g) || []).length;
      const jbig2Count = (raw.match(/\/JBIG2Decode/g) || []).length;
      const ccittCount = (raw.match(/\/CCITTFaxDecode/g) || []).length;

      // Extract image dimensions
      const dimensions: string[] = [];
      const dimRegex = /\/Width\s+(\d+)[\s\S]*?\/Height\s+(\d+)/g;
      let match;
      while ((match = dimRegex.exec(raw)) !== null) {
        dimensions.push(`${match[1]}×${match[2]}px`);
      }

      // Detect color spaces
      const colorSpaces: string[] = [];
      if (raw.includes("/DeviceRGB")) colorSpaces.push("RGB");
      if (raw.includes("/DeviceCMYK")) colorSpaces.push("CMYK");
      if (raw.includes("/DeviceGray")) colorSpaces.push("Grayscale");

      const totalSize = file.size;
      const estimatedImageSize = Math.round(totalSize * 0.7); // rough estimate

      setResult(
        `🖼️ Image Analysis for: ${file.name}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `Total images found: ${imageCount}\n\n` +
        `📊 Image Types:\n` +
        `  JPEG/DCT: ${jpegCount}\n` +
        `  PNG/Flate: ${pngCount}\n` +
        `  JBIG2: ${jbig2Count}\n` +
        `  CCITT/Fax: ${ccittCount}\n\n` +
        `📐 Dimensions Found:\n` +
        (dimensions.length > 0 ? dimensions.slice(0, 20).map((d, i) => `  Image ${i + 1}: ${d}`).join("\n") : "  No dimension data found") +
        `\n\n🎨 Color Spaces: ${colorSpaces.length > 0 ? colorSpaces.join(", ") : "Unknown"}\n\n` +
        `💾 File Size: ${(totalSize / 1024).toFixed(1)} KB\n` +
        `📦 Est. Image Data: ~${(estimatedImageSize / 1024).toFixed(1)} KB (${((estimatedImageSize / totalSize) * 100).toFixed(0)}% of file)\n\n` +
        `ℹ️ Note: Browser-based extraction cannot fully decode embedded images.\nUse a desktop tool like pdfimages for full extraction.`
      );
    };
    reader.readAsBinaryString(file);
  };

  return (
    <ToolLayout>
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Upload PDF</label>
        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-glass-border/30 rounded-xl cursor-pointer hover:bg-muted/30 transition-colors">
          <Upload size={20} className="text-muted-foreground mb-1" />
          <span className="text-xs text-muted-foreground">{file ? file.name : "Choose PDF file"}</span>
          <input type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>
      </div>
      <ToolButton onClick={extract}>Analyze Images</ToolButton>
      {result && <ToolOutput label="Image Analysis" value={result} />}
    </ToolLayout>
  );
};

export default PdfImageExtractor;
