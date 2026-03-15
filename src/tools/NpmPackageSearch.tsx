import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const NpmPackageSearch = () => {
  const [pkg, setPkg] = useState("");
  const [output, setOutput] = useState("");
  const search = async () => {
    if (!pkg) return;
    try {
      const res = await fetch(`https://registry.npmjs.org/${pkg}`);
      if (!res.ok) { setOutput(`Package "${pkg}" not found.`); return; }
      const data = await res.json();
      const latest = data["dist-tags"]?.latest || "N/A";
      const desc = data.description || "No description";
      const license = data.license || "N/A";
      const homepage = data.homepage || "N/A";
      const repo = data.repository?.url || "N/A";
      const keywords = (data.keywords || []).join(", ") || "None";
      setOutput(`📦 ${data.name}\n\n📝 ${desc}\n\n🏷️ Latest: ${latest}\n📄 License: ${license}\n🏠 Homepage: ${homepage}\n📂 Repository: ${repo}\n🔑 Keywords: ${keywords}\n\n🔗 npm: https://www.npmjs.com/package/${pkg}\n📥 Install: npm install ${pkg}`);
    } catch { setOutput("Error fetching package info. Check the package name."); }
  };
  return <ToolLayout><ToolInput label="Package Name" value={pkg} onChange={setPkg} placeholder="react" /><ToolButton onClick={search}>Search</ToolButton><ToolOutput label="Package Info" value={output} /></ToolLayout>;
};
export default NpmPackageSearch;