import { useState, useRef, useEffect, useCallback } from "react";
import { ToolLayout, ToolButton } from "./ToolComponents";
import { Upload, Type, Highlighter, Trash2, Download, ChevronLeft, ChevronRight, Move, RotateCw, Undo2 } from "lucide-react";

interface Annotation {
  id: string;
  type: "text" | "highlight" | "note";
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  color: string;
  page: number;
}

const PdfEditor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [tool, setTool] = useState<"select" | "text" | "highlight" | "note">("select");
  const [color, setColor] = useState("#FFFF00");
  const [textInput, setTextInput] = useState("");
  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [deletedPages, setDeletedPages] = useState<Set<number>>(new Set());
  const [history, setHistory] = useState<Annotation[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || f.type !== "application/pdf") return;
    setFile(f);
    setLoading(true);
    setAnnotations([]);
    setHistory([]);
    setDeletedPages(new Set());

    try {
      const arrayBuffer = await f.arrayBuffer();
      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const numPages = pdfDoc.getPageCount();

      // Render pages using canvas approach for preview
      const pageImages: string[] = [];
      for (let i = 0; i < numPages; i++) {
        const singleDoc = await PDFDocument.create();
        const [copiedPage] = await singleDoc.copyPages(pdfDoc, [i]);
        singleDoc.addPage(copiedPage);
        const pdfBytes = await singleDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        pageImages.push(url);
      }

      setPages(pageImages);
      setPageOrder(Array.from({ length: numPages }, (_, i) => i));
      setCurrentPage(0);
    } catch (err) {
      console.error("Failed to load PDF:", err);
    }
    setLoading(false);
  };

  const renderPage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || pages.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 1100;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw page number indicator
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`Page ${currentPage + 1} of ${pageOrder.filter(p => !deletedPages.has(p)).length}`, canvas.width / 2, 20);

    // Draw grid pattern as page background
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 0.5;
    for (let y = 40; y < canvas.height; y += 24) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(canvas.width - 40, y);
      ctx.stroke();
    }

    // Draw annotations for current page
    const pageAnnotations = annotations.filter(a => a.page === currentPage);
    pageAnnotations.forEach(ann => {
      if (ann.type === "highlight") {
        ctx.fillStyle = ann.color + "60";
        ctx.fillRect(ann.x, ann.y, ann.width, ann.height);
      } else if (ann.type === "text") {
        ctx.fillStyle = ann.color;
        ctx.font = "16px system-ui";
        ctx.textAlign = "left";
        ctx.fillText(ann.content, ann.x, ann.y);
      } else if (ann.type === "note") {
        ctx.fillStyle = ann.color + "30";
        ctx.strokeStyle = ann.color;
        ctx.lineWidth = 2;
        const noteWidth = Math.max(150, ann.width);
        const noteHeight = Math.max(60, ann.height);
        ctx.fillRect(ann.x, ann.y, noteWidth, noteHeight);
        ctx.strokeRect(ann.x, ann.y, noteWidth, noteHeight);
        ctx.fillStyle = "#1e293b";
        ctx.font = "12px system-ui";
        ctx.textAlign = "left";
        const words = ann.content.split(" ");
        let line = "";
        let lineY = ann.y + 18;
        words.forEach(word => {
          const test = line + word + " ";
          if (ctx.measureText(test).width > noteWidth - 12) {
            ctx.fillText(line, ann.x + 6, lineY);
            line = word + " ";
            lineY += 16;
          } else {
            line = test;
          }
        });
        ctx.fillText(line, ann.x + 6, lineY);
      }
    });
  }, [pages, currentPage, annotations, pageOrder, deletedPages]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === "select") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setIsDrawing(true);
    setDrawStart({ x, y });
  };

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool === "select") { setIsDrawing(false); return; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const endX = (e.clientX - rect.left) * scaleX;
    const endY = (e.clientY - rect.top) * scaleY;

    setHistory(prev => [...prev, [...annotations]]);

    const newAnnotation: Annotation = {
      id: crypto.randomUUID(),
      type: tool === "highlight" ? "highlight" : tool === "note" ? "note" : "text",
      x: Math.min(drawStart.x, endX),
      y: Math.min(drawStart.y, endY),
      width: Math.abs(endX - drawStart.x),
      height: Math.abs(endY - drawStart.y),
      content: tool === "text" ? (textInput || "Sample text") : (tool === "note" ? (textInput || "Note...") : ""),
      color,
      page: currentPage,
    };

    setAnnotations(prev => [...prev, newAnnotation]);
    setIsDrawing(false);
  };

  const undo = () => {
    if (history.length === 0) return;
    setAnnotations(history[history.length - 1]);
    setHistory(prev => prev.slice(0, -1));
  };

  const deletePage = () => {
    const activePages = pageOrder.filter(p => !deletedPages.has(p));
    if (activePages.length <= 1) return;
    setDeletedPages(prev => new Set([...prev, activePages[currentPage]]));
    if (currentPage >= activePages.length - 1) setCurrentPage(Math.max(0, currentPage - 1));
  };

  const movePage = (dir: -1 | 1) => {
    const activePages = pageOrder.filter(p => !deletedPages.has(p));
    const newIdx = currentPage + dir;
    if (newIdx < 0 || newIdx >= activePages.length) return;
    const newOrder = [...activePages];
    [newOrder[currentPage], newOrder[newIdx]] = [newOrder[newIdx], newOrder[currentPage]];
    // Rebuild full order with deleted pages
    const fullOrder = [...newOrder];
    deletedPages.forEach(p => fullOrder.push(p));
    setPageOrder(fullOrder);
    setCurrentPage(newIdx);
  };

  const activePages = pageOrder.filter(p => !deletedPages.has(p));

  const exportAnnotations = () => {
    const data = JSON.stringify({ annotations, pageOrder: activePages, totalPages: pages.length }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name || "pdf"}-annotations.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tools = [
    { id: "select" as const, icon: Move, label: "Select" },
    { id: "text" as const, icon: Type, label: "Text" },
    { id: "highlight" as const, icon: Highlighter, label: "Highlight" },
    { id: "note" as const, icon: Type, label: "Note" },
  ];

  return (
    <ToolLayout>
      {!file ? (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-glass-border/30 rounded-xl cursor-pointer hover:bg-muted/30 transition-colors">
          <Upload size={32} className="text-muted-foreground mb-2" />
          <span className="text-sm text-muted-foreground">Upload a PDF to start editing</span>
          <input type="file" accept=".pdf" className="hidden" onChange={handleFile} />
        </label>
      ) : loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-muted/30 border border-glass-border/20">
            {tools.map(t => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  tool === t.id ? "bg-primary text-primary-foreground" : "bg-muted/50 text-foreground hover:bg-muted"
                }`}
              >
                <t.icon size={14} />
                {t.label}
              </button>
            ))}
            <div className="w-px h-6 bg-glass-border/20 mx-1" />
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0" />
            {(tool === "text" || tool === "note") && (
              <input
                type="text"
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                placeholder={tool === "text" ? "Text content..." : "Note content..."}
                className="px-3 py-1.5 rounded-lg bg-muted/50 border border-glass-border/20 text-foreground text-xs flex-1 min-w-[120px]"
              />
            )}
            <div className="w-px h-6 bg-glass-border/20 mx-1" />
            <button onClick={undo} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground" title="Undo">
              <Undo2 size={14} />
            </button>
            <button onClick={deletePage} className="p-1.5 rounded-lg hover:bg-destructive/20 text-destructive" title="Delete page">
              <Trash2 size={14} />
            </button>
            <button onClick={() => movePage(-1)} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground" title="Move page left">
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => movePage(1)} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground" title="Move page right">
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Canvas */}
          <div className="relative rounded-xl overflow-hidden border border-glass-border/20 bg-muted/20">
            <canvas
              ref={canvasRef}
              className="w-full cursor-crosshair"
              style={{ maxHeight: "600px" }}
              onMouseDown={handleCanvasMouseDown}
              onMouseUp={handleCanvasMouseUp}
            />
          </div>

          {/* Page navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="p-2 rounded-lg bg-muted/50 hover:bg-muted disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-foreground">
                Page {currentPage + 1} / {activePages.length}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(activePages.length - 1, currentPage + 1))}
                disabled={currentPage >= activePages.length - 1}
                className="p-2 rounded-lg bg-muted/50 hover:bg-muted disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="flex gap-2">
              <ToolButton onClick={exportAnnotations} variant="secondary">Export Annotations</ToolButton>
              <ToolButton onClick={() => { setFile(null); setPages([]); setAnnotations([]); }}>
                New PDF
              </ToolButton>
            </div>
          </div>

          {/* Page thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {activePages.map((pageIdx, i) => (
              <button
                key={pageIdx}
                onClick={() => setCurrentPage(i)}
                className={`flex-shrink-0 w-16 h-20 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all ${
                  i === currentPage
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-glass-border/20 bg-muted/30 text-muted-foreground hover:border-primary/50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Annotation list */}
          {annotations.filter(a => a.page === currentPage).length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Annotations on this page:</label>
              {annotations.filter(a => a.page === currentPage).map(ann => (
                <div key={ann.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30 text-xs">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-medium capitalize">{ann.type}</span>
                  {ann.content && <span className="text-foreground truncate flex-1">{ann.content}</span>}
                  <button
                    onClick={() => setAnnotations(prev => prev.filter(a => a.id !== ann.id))}
                    className="p-1 hover:text-destructive"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </ToolLayout>
  );
};

export default PdfEditor;
