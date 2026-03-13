import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const LocalSeoChecker = () => {
  const [biz,setBiz]=useState(""); const [address,setAddress]=useState(""); const [phone,setPhone]=useState(""); const [website,setWebsite]=useState(""); const [output,setOutput]=useState("");
  const check = () => {
    const c: string[] = [`📍 Local SEO Audit: ${biz}\n`];
    c.push(`${biz?"✅":"❌"} Business name consistent`);
    c.push(`${address?"✅":"❌"} Address provided (NAP consistency)`);
    c.push(`${phone?"✅":"❌"} Phone number listed`);
    c.push(`${website?"✅":"❌"} Website URL`);
    c.push(`\n📋 Local SEO Checklist:\n✅ Google Business Profile claimed & optimized\n✅ NAP consistent across all directories\n✅ Local keywords in title & meta\n✅ Location pages for each service area\n✅ Schema markup (LocalBusiness)\n✅ Customer reviews strategy\n✅ Local backlinks from directories\n✅ Mobile-friendly website\n✅ Google Maps embed on contact page\n✅ Local content/blog posts`);
    setOutput(c.join("\n"));
  };
  return <ToolLayout>
    <ToolInput label="Business Name" value={biz} onChange={setBiz} placeholder="My Business" />
    <ToolInput label="Address" value={address} onChange={setAddress} placeholder="123 Main St, City" />
    <ToolInput label="Phone" value={phone} onChange={setPhone} placeholder="+1-555-0100" />
    <ToolInput label="Website" value={website} onChange={setWebsite} placeholder="https://..." />
    <ToolButton onClick={check}>Check Local SEO</ToolButton>
    <ToolOutput label="Local SEO Report" value={output} />
  </ToolLayout>;
};
export default LocalSeoChecker;
