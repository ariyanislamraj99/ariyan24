import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const TermsOfServiceGen = () => {
  const [site, setSite] = useState("Example.com");
  const [email, setEmail] = useState("contact@example.com");
  const date = new Date().toISOString().split("T")[0];
  const tos = `# Terms of Service\n\n**Last updated: ${date}**\n\n## 1. Agreement to Terms\n\nBy accessing ${site}, you agree to be bound by these Terms of Service and all applicable laws and regulations.\n\n## 2. Use License\n\nPermission is granted to temporarily access the materials on ${site} for personal, non-commercial use only.\n\n## 3. Disclaimer\n\nThe materials on ${site} are provided on an 'as is' basis. ${site} makes no warranties, expressed or implied, and hereby disclaims all warranties.\n\n## 4. Limitations\n\nIn no event shall ${site} be liable for any damages arising out of the use or inability to use the materials on ${site}.\n\n## 5. Accuracy of Materials\n\nThe materials appearing on ${site} could include technical, typographical, or photographic errors. ${site} does not warrant that any of the materials are accurate, complete, or current.\n\n## 6. Links\n\n${site} has not reviewed all sites linked to its website and is not responsible for the contents of any linked site.\n\n## 7. Modifications\n\n${site} may revise these Terms of Service at any time without notice. By using this website you agree to be bound by the current version.\n\n## 8. Governing Law\n\nThese terms shall be governed by and construed in accordance with applicable laws.\n\n## Contact\n\n📧 ${email}`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Website Name</label><input value={site} onChange={e=>setSite(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Email</label><input value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <ToolOutput label="Terms of Service" value={tos} />
  </ToolLayout>;
};
export default TermsOfServiceGen;