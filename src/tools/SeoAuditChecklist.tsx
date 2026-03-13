import { useState } from "react";
import { ToolLayout, ToolButton, ToolOutput } from "./ToolComponents";
const items = [
  {cat:"Technical",items:["SSL certificate installed","XML sitemap submitted","Robots.txt configured","Canonical tags set","Mobile-friendly design","Page speed optimized","Structured data added","404 pages handled","301 redirects configured","HTTPS enforced"]},
  {cat:"On-Page",items:["Title tags optimized (50-60 chars)","Meta descriptions written (150-160 chars)","H1 tags on every page","Image alt text added","Internal linking structure","URL structure clean","Keyword in first paragraph","Content length adequate (1000+ words)","Schema markup added","Breadcrumbs implemented"]},
  {cat:"Content",items:["Target keyword defined","Content matches search intent","Readability score checked","No duplicate content","Fresh/updated content","Media (images/videos) included","FAQ section added","Call-to-action present"]},
  {cat:"Off-Page",items:["Google Business Profile set up","Social media profiles linked","Backlink strategy planned","Brand mentions monitored","Local citations consistent"]},
];
const SeoAuditChecklist = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set()); const [output, setOutput] = useState("");
  const toggle = (item:string) => { const s = new Set(checked); s.has(item)?s.delete(item):s.add(item); setChecked(s); };
  const exportChecklist = () => {
    const total = items.reduce((a,c)=>a+c.items.length,0);
    setOutput(`SEO Audit Results: ${checked.size}/${total} (${((checked.size/total)*100).toFixed(0)}%)\n\n${items.map(c=>`${c.cat}:\n${c.items.map(i=>`  ${checked.has(i)?"✅":"❌"} ${i}`).join("\n")}`).join("\n\n")}`);
  };
  return <ToolLayout>
    {items.map(cat => <div key={cat.cat}>
      <div className="text-sm font-semibold text-foreground mb-2">{cat.cat}</div>
      {cat.items.map(item => <label key={item} className="flex items-center gap-2 text-sm text-foreground py-1 cursor-pointer">
        <input type="checkbox" checked={checked.has(item)} onChange={()=>toggle(item)} className="rounded" />{item}
      </label>)}
    </div>)}
    <ToolButton onClick={exportChecklist}>Export Results</ToolButton>
    <ToolOutput label="Audit Summary" value={output} />
  </ToolLayout>;
};
export default SeoAuditChecklist;
