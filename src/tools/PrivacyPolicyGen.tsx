import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const PrivacyPolicyGen = () => {
  const [site, setSite] = useState("Example.com");
  const [email, setEmail] = useState("contact@example.com");
  const [analytics, setAnalytics] = useState(true);
  const [cookies, setCookies] = useState(true);
  const date = new Date().toISOString().split("T")[0];
  const policy = `# Privacy Policy\n\n**Last updated: ${date}**\n\n## Introduction\n\n${site} ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.\n\n## Information We Collect\n\n### Personal Information\nWe may collect personal information that you voluntarily provide, including:\n- Name and email address\n- Contact information\n- Any other information you choose to provide\n\n### Automatically Collected Information\n${analytics?"We use analytics tools to collect:\n- IP address\n- Browser type and version\n- Pages visited and time spent\n- Referring website\n":""}\n${cookies?"## Cookies\n\nWe use cookies and similar tracking technologies to track activity and improve our service. You can set your browser to refuse all cookies or to indicate when a cookie is being sent.\n":""}\n## How We Use Your Information\n\nWe use collected information to:\n- Provide and maintain our service\n- Notify you about changes\n- Provide customer support\n- Monitor usage of our service\n- Detect and prevent technical issues\n\n## Data Security\n\nWe use commercially acceptable means to protect your personal information, but no method of transmission over the Internet is 100% secure.\n\n## Third-Party Links\n\nOur service may contain links to third-party websites. We have no control over and assume no responsibility for their content or privacy policies.\n\n## Changes to This Policy\n\nWe may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.\n\n## Contact Us\n\nIf you have any questions about this Privacy Policy, please contact us at:\n📧 ${email}`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Website Name</label><input value={site} onChange={e=>setSite(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Contact Email</label><input value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <div className="flex gap-4">
      <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)} />Analytics</label>
      <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={cookies} onChange={e=>setCookies(e.target.checked)} />Cookies</label>
    </div>
    <ToolOutput label="Privacy Policy" value={policy} />
  </ToolLayout>;
};
export default PrivacyPolicyGen;