import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const HtmlToMarkdown = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const convert = () => {
    let md = input
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n")
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n")
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n")
      .replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n")
      .replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n")
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
      .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
      .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
      .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
      .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)")
      .replace(/<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*?)["'][^>]*\/?>/gi, "![$2]($1)")
      .replace(/<img[^>]*src=["']([^"']+)["'][^>]*\/?>/gi, "![]($1)")
      .replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")
      .replace(/<pre[^>]*>(.*?)<\/pre>/gis, "```\n$1\n```\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<hr\s*\/?>/gi, "---\n")
      .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
      .replace(/<\/?(ul|ol|div|span|p|section|article|header|footer|nav|main|table|thead|tbody|tr|td|th)[^>]*>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    setOutput(md);
  };
  return <ToolLayout><ToolInput label="HTML Input" value={input} onChange={setInput} multiline rows={6} placeholder="<h1>Hello</h1><p>World</p>" /><ToolButton onClick={convert}>Convert to Markdown</ToolButton><ToolOutput label="Markdown Output" value={output} /></ToolLayout>;
};
export default HtmlToMarkdown;