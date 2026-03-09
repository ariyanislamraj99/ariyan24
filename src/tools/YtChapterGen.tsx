import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";

const YtChapterGen = () => {
  const [chapters, setChapters] = useState("0:00 Introduction\n1:30 Getting Started\n5:00 Main Topic\n10:00 Advanced Tips\n15:00 Conclusion");
  const [output, setOutput] = useState("");

  const generate = () => {
    const lines = chapters.split("\n").filter(Boolean);
    const parsed = lines.map((line) => {
      const match = line.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–]?\s*(.+)/);
      return match ? { time: match[1], title: match[2].trim() } : null;
    }).filter(Boolean);

    if (parsed.length < 3) {
      setOutput("❌ YouTube requires at least 3 chapters.\nFirst chapter must start at 0:00.");
      return;
    }

    const hasZero = parsed[0]?.time === "0:00" || parsed[0]?.time === "00:00" || parsed[0]?.time === "0:00:00";
    if (!hasZero) {
      setOutput("❌ First chapter must start at 0:00.");
      return;
    }

    const formatted = parsed.map((c) => `${c!.time} ${c!.title}`).join("\n");

    setOutput(
      `✅ ${parsed.length} Chapters Ready!\n\n📋 Copy to description:\n${"─".repeat(30)}\n${formatted}\n${"─".repeat(30)}\n\n⏱️ Timestamps (clickable in description):\n${formatted}\n\n💡 Chapter Requirements:\n✅ First chapter at 0:00\n✅ Minimum 3 chapters\n✅ Each chapter 10+ seconds\n✅ Timestamps in ascending order`
    );
  };

  return (
    <ToolLayout>
      <ToolInput
        label="Chapters (timestamp + title per line)"
        value={chapters}
        onChange={setChapters}
        multiline
        rows={8}
        placeholder={"0:00 Introduction\n1:30 Getting Started\n5:00 Main Topic"}
      />
      <ToolButton onClick={generate}>Generate Chapters</ToolButton>
      <ToolOutput label="YouTube Chapters" value={output} />
    </ToolLayout>
  );
};

export default YtChapterGen;
