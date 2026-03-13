import { useState } from "react";
import { ToolLayout, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const CrawlBudgetCalc = () => {
  const [pages, setPages] = useState(1000); const [crawlRate, setCrawlRate] = useState(100); const [output, setOutput] = useState("");
  const calc = () => {
    const days = Math.ceil(pages / crawlRate);
    const recrawl = days < 7 ? "Daily recrawl possible" : days < 30 ? "Weekly recrawl" : "Monthly or less frequent";
    setOutput(`🕷️ Crawl Budget Analysis\n\nTotal Pages: ${pages.toLocaleString()}\nDaily Crawl Rate: ${crawlRate} pages/day\nFull Crawl Time: ${days} days\nRecrawl Frequency: ${recrawl}\n\n💡 Optimization Tips:\n• Remove low-value pages from index\n• Fix crawl errors in Search Console\n• Improve server response time\n• Update XML sitemap regularly\n• Use robots.txt to block non-essential pages\n• Reduce redirect chains\n• Fix broken internal links`);
  };
  return <ToolLayout>
    <ToolNumber label="Total Pages" value={pages} onChange={setPages} min={1} />
    <ToolNumber label="Daily Crawl Rate" value={crawlRate} onChange={setCrawlRate} min={1} />
    <ToolButton onClick={calc}>Calculate</ToolButton>
    <ToolOutput label="Crawl Budget Analysis" value={output} />
  </ToolLayout>;
};
export default CrawlBudgetCalc;
