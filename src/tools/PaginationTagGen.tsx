import { useState } from "react";
import { ToolLayout, ToolInput, ToolNumber, ToolButton, ToolOutput } from "./ToolComponents";
const PaginationTagGen = () => {
  const [baseUrl, setBaseUrl] = useState(""); const [current, setCurrent] = useState(1); const [total, setTotal] = useState(5); const [output, setOutput] = useState("");
  const generate = () => {
    const tags: string[] = [`<!-- Page ${current} of ${total} -->`];
    if (current > 1) tags.push(`<link rel="prev" href="${baseUrl}?page=${current-1}" />`);
    if (current < total) tags.push(`<link rel="next" href="${baseUrl}?page=${current+1}" />`);
    tags.push(`<link rel="canonical" href="${baseUrl}${current>1?`?page=${current}`:""}" />`);
    setOutput(tags.join("\n"));
  };
  return <ToolLayout>
    <ToolInput label="Base URL" value={baseUrl} onChange={setBaseUrl} placeholder="https://example.com/blog" />
    <ToolNumber label="Current Page" value={current} onChange={setCurrent} min={1} />
    <ToolNumber label="Total Pages" value={total} onChange={setTotal} min={1} />
    <ToolButton onClick={generate}>Generate Tags</ToolButton>
    <ToolOutput label="Pagination Tags" value={output} />
  </ToolLayout>;
};
export default PaginationTagGen;
