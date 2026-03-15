import { useState } from "react";
import { ToolLayout, ToolOutput, ToolInput, ToolButton } from "./ToolComponents";
const ChangelogGen = () => {
  const [version, setVersion] = useState("1.0.0");
  const [added, setAdded] = useState("Initial release");
  const [changed, setChanged] = useState("");
  const [fixed, setFixed] = useState("");
  const date = new Date().toISOString().split("T")[0];
  let md = `# Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).\n\n## [${version}] - ${date}\n`;
  if (added) md += `\n### Added\n${added.split("\n").map(l=>`- ${l.trim()}`).join("\n")}\n`;
  if (changed) md += `\n### Changed\n${changed.split("\n").map(l=>`- ${l.trim()}`).join("\n")}\n`;
  if (fixed) md += `\n### Fixed\n${fixed.split("\n").map(l=>`- ${l.trim()}`).join("\n")}\n`;
  return <ToolLayout>
    <ToolInput label="Version" value={version} onChange={setVersion} placeholder="1.0.0" />
    <ToolInput label="Added (one per line)" value={added} onChange={setAdded} multiline rows={3} />
    <ToolInput label="Changed (one per line)" value={changed} onChange={setChanged} multiline rows={3} />
    <ToolInput label="Fixed (one per line)" value={fixed} onChange={setFixed} multiline rows={3} />
    <ToolOutput label="CHANGELOG.md" value={md} />
  </ToolLayout>;
};
export default ChangelogGen;