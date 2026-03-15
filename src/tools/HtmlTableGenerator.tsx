import { useState } from "react";
import { ToolLayout, ToolOutput, ToolButton } from "./ToolComponents";
const HtmlTableGenerator = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [headers, setHeaders] = useState(true);
  const [output, setOutput] = useState("");
  const generate = () => {
    let html = '<table border="1" cellpadding="8" cellspacing="0">\n';
    if (headers) {
      html += "  <thead>\n    <tr>\n";
      for (let c = 1; c <= cols; c++) html += `      <th>Header ${c}</th>\n`;
      html += "    </tr>\n  </thead>\n";
    }
    html += "  <tbody>\n";
    for (let r = 1; r <= rows; r++) {
      html += "    <tr>\n";
      for (let c = 1; c <= cols; c++) html += `      <td>Row ${r}, Col ${c}</td>\n`;
      html += "    </tr>\n";
    }
    html += "  </tbody>\n</table>";
    setOutput(html);
  };
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Rows</label><input type="number" value={rows} onChange={e=>setRows(+e.target.value)} min={1} max={50} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Columns</label><input type="number" value={cols} onChange={e=>setCols(+e.target.value)} min={1} max={20} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={headers} onChange={e=>setHeaders(e.target.checked)} />Include header row</label>
    <ToolButton onClick={generate}>Generate Table</ToolButton>
    <ToolOutput label="HTML Table" value={output} />
  </ToolLayout>;
};
export default HtmlTableGenerator;