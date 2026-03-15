import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const ReadmeGen = () => {
  const [name, setName] = useState("My Project");
  const [desc, setDesc] = useState("A brief description");
  const [tech, setTech] = useState("React, TypeScript, Tailwind");
  const [author, setAuthor] = useState("");
  const [license, setLicense] = useState("MIT");
  const md = `# ${name}\n\n${desc}\n\n## 🚀 Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## 🛠️ Tech Stack\n\n${tech.split(",").map(t=>`- ${t.trim()}`).join("\n")}\n\n## 📦 Installation\n\n\`\`\`bash\ngit clone https://github.com/${author||"username"}/${name.toLowerCase().replace(/\s+/g,"-")}.git\ncd ${name.toLowerCase().replace(/\s+/g,"-")}\nnpm install\nnpm run dev\n\`\`\`\n\n## 📝 Usage\n\n\`\`\`bash\nnpm run dev     # Start development server\nnpm run build   # Build for production\nnpm run test    # Run tests\n\`\`\`\n\n## 🤝 Contributing\n\n1. Fork the repository\n2. Create your feature branch (\`git checkout -b feature/amazing\`)\n3. Commit changes (\`git commit -m 'Add amazing feature'\`)\n4. Push to branch (\`git push origin feature/amazing\`)\n5. Open a Pull Request\n\n## 📄 License\n\n${license} License - see [LICENSE](LICENSE) for details.\n\n${author?`## 👤 Author\n\n**${author}**`:""}\n\n---\n⭐ Star this repo if you find it helpful!`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Project Name</label><input value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Author</label><input value={author} onChange={e=>setAuthor(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Description</label><input value={desc} onChange={e=>setDesc(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Tech Stack (comma-separated)</label><input value={tech} onChange={e=>setTech(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <ToolOutput label="README.md" value={md} />
  </ToolLayout>;
};
export default ReadmeGen;