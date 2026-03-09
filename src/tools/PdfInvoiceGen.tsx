import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton } from "./ToolComponents";

const PdfInvoiceGen = () => {
  const [company, setCompany] = useState("");
  const [client, setClient] = useState("");
  const [items, setItems] = useState("Web Design - $500\nSEO Optimization - $300");
  const [invoiceNo, setInvoiceNo] = useState("INV-001");

  const generate = () => {
    const lines = items.split("\n").filter(Boolean);
    let total = 0;
    const rows = lines.map((line) => {
      const match = line.match(/\$[\d,.]+/);
      const amount = match ? parseFloat(match[0].replace(/[$,]/g, "")) : 0;
      total += amount;
      const desc = line.replace(/\s*-\s*\$[\d,.]+/, "").trim();
      return `<tr><td style="padding:8px;border-bottom:1px solid #eee">${desc}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${amount.toFixed(2)}</td></tr>`;
    });

    const html = `<!DOCTYPE html><html><head><title>Invoice ${invoiceNo}</title><style>body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;padding:20px;color:#333}h1{color:#1a1a2e;margin-bottom:5px}.header{display:flex;justify-content:space-between;margin-bottom:40px}.info{margin-bottom:30px}table{width:100%;border-collapse:collapse}.total{font-size:20px;font-weight:bold;text-align:right;margin-top:20px;padding:15px;background:#f8f9fa;border-radius:8px}@media print{body{margin:0}}</style></head><body><div class="header"><div><h1>${company || "Your Company"}</h1><p>Invoice ${invoiceNo}</p><p>Date: ${new Date().toLocaleDateString()}</p></div></div><div class="info"><strong>Bill To:</strong><br>${client || "Client Name"}</div><table><thead><tr><th style="text-align:left;padding:8px;border-bottom:2px solid #333">Description</th><th style="text-align:right;padding:8px;border-bottom:2px solid #333">Amount</th></tr></thead><tbody>${rows.join("")}</tbody></table><div class="total">Total: $${total.toFixed(2)}</div><p style="margin-top:40px;color:#666;font-size:12px">Thank you for your business!</p></body></html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (win) {
      win.onload = () => {
        setTimeout(() => win.print(), 500);
      };
    }
  };

  return (
    <ToolLayout>
      <ToolInput label="Company Name" value={company} onChange={setCompany} placeholder="Your Company" />
      <ToolInput label="Client Name" value={client} onChange={setClient} placeholder="Client Name" />
      <ToolInput label="Invoice Number" value={invoiceNo} onChange={setInvoiceNo} placeholder="INV-001" />
      <ToolInput label="Items (one per line: Description - $Amount)" value={items} onChange={setItems} multiline rows={5} placeholder="Web Design - $500" />
      <ToolButton onClick={generate}>Generate & Print PDF</ToolButton>
      <p className="text-xs text-muted-foreground">Opens a printable invoice — use "Print to PDF" in the dialog to save as PDF.</p>
    </ToolLayout>
  );
};

export default PdfInvoiceGen;
