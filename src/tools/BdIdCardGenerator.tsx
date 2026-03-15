import { useState, useRef } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";

const BdIdCardGenerator = () => {
  const [form, setForm] = useState({
    nameEn: "JOHN DOE",
    nameBn: "জন ডো",
    fatherEn: "FATHER NAME",
    fatherBn: "পিতার নাম",
    motherEn: "MOTHER NAME",
    motherBn: "মাতার নাম",
    dob: "01 Jan 1990",
    nid: "1234567890",
    address: "Dhaka, Bangladesh",
    bloodGroup: "O+",
  });
  const [photo, setPhoto] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const r = new FileReader();
      r.onload = () => setPhoto(r.result as string);
      r.readAsDataURL(file);
    }
  };

  const downloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 860;
    canvas.height = 540;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 860, 0);
    grad.addColorStop(0, "#006a4e");
    grad.addColorStop(1, "#004d38");
    ctx.fillStyle = grad;
    ctx.roundRect(0, 0, 860, 540, 16);
    ctx.fill();

    // Inner white card
    ctx.fillStyle = "#ffffff";
    ctx.roundRect(10, 10, 840, 520, 12);
    ctx.fill();

    // Top green band
    ctx.fillStyle = "#006a4e";
    ctx.fillRect(10, 10, 840, 60);

    // Header text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("গণপ্রজাতন্ত্রী বাংলাদেশ সরকার", 430, 32);
    ctx.font = "bold 18px Arial";
    ctx.fillText("PEOPLE'S REPUBLIC OF BANGLADESH", 430, 55);

    // NID label
    ctx.fillStyle = "#006a4e";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("জাতীয় পরিচয় পত্র / NATIONAL ID CARD", 430, 95);

    // Red separator
    ctx.fillStyle = "#f42a41";
    ctx.fillRect(100, 102, 660, 3);

    // Photo area
    ctx.fillStyle = "#f0f0f0";
    ctx.strokeStyle = "#006a4e";
    ctx.lineWidth = 2;
    ctx.fillRect(40, 120, 180, 210);
    ctx.strokeRect(40, 120, 180, 210);

    if (photo) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 40, 120, 180, 210);
        finishDraw(ctx, canvas);
      };
      img.src = photo;
    } else {
      ctx.fillStyle = "#999";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Photo", 130, 230);
      finishDraw(ctx, canvas);
    }
  };

  const finishDraw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const x = 250;
    ctx.textAlign = "left";

    // Labels and values
    const fields = [
      ["নাম / Name:", form.nameBn + " / " + form.nameEn],
      ["পিতা / Father:", form.fatherBn + " / " + form.fatherEn],
      ["মাতা / Mother:", form.motherBn + " / " + form.motherEn],
      ["জন্ম তারিখ / DOB:", form.dob],
      ["NID No:", form.nid],
      ["ঠিকানা / Address:", form.address],
      ["রক্তের গ্রুপ / Blood:", form.bloodGroup],
    ];

    let y = 140;
    fields.forEach(([label, value]) => {
      ctx.fillStyle = "#666";
      ctx.font = "12px Arial";
      ctx.fillText(label, x, y);
      ctx.fillStyle = "#1a1a1a";
      ctx.font = "bold 15px Arial";
      ctx.fillText(value, x, y + 18);
      y += 42;
    });

    // BD Flag colors bar at bottom
    ctx.fillStyle = "#006a4e";
    ctx.fillRect(10, 490, 560, 40);
    ctx.fillStyle = "#f42a41";
    ctx.beginPath();
    ctx.arc(730, 510, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#006a4e";
    ctx.fillRect(700, 490, 150, 40);

    // Signature line
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 365);
    ctx.lineTo(220, 365);
    ctx.stroke();
    ctx.fillStyle = "#666";
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    ctx.fillText("স্বাক্ষর / Signature", 130, 380);

    // Download
    const link = document.createElement("a");
    link.download = `BD_NID_${form.nid}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Name (English)</label>
          <input value={form.nameEn} onChange={e => upd("nameEn", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">নাম (বাংলা)</label>
          <input value={form.nameBn} onChange={e => upd("nameBn", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Father (English)</label>
          <input value={form.fatherEn} onChange={e => upd("fatherEn", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">পিতা (বাংলা)</label>
          <input value={form.fatherBn} onChange={e => upd("fatherBn", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Mother (English)</label>
          <input value={form.motherEn} onChange={e => upd("motherEn", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">মাতা (বাংলা)</label>
          <input value={form.motherBn} onChange={e => upd("motherBn", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Date of Birth</label>
          <input value={form.dob} onChange={e => upd("dob", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">NID Number</label>
          <input value={form.nid} onChange={e => upd("nid", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Address</label>
          <input value={form.address} onChange={e => upd("address", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Blood Group</label>
          <select value={form.bloodGroup} onChange={e => upd("bloodGroup", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm">
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(b => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground block mb-1">Photo</label>
        <input type="file" accept="image/*" onChange={handlePhoto} className="w-full text-sm text-foreground file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer" />
      </div>

      {/* Preview Card */}
      <div className="rounded-2xl overflow-hidden border-2 border-[#006a4e] p-1" style={{ background: "linear-gradient(135deg, #006a4e, #004d38)" }}>
        <div className="bg-white rounded-xl p-4">
          <div className="bg-[#006a4e] rounded-t-lg px-4 py-2 text-center text-white">
            <p className="text-xs">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</p>
            <p className="text-sm font-bold">PEOPLE'S REPUBLIC OF BANGLADESH</p>
          </div>
          <div className="text-center py-2">
            <p className="text-sm font-bold text-[#006a4e]">জাতীয় পরিচয় পত্র / NATIONAL ID CARD</p>
            <div className="h-0.5 bg-[#f42a41] mx-8 mt-1" />
          </div>
          <div className="flex gap-4 mt-2">
            <div className="w-28 h-32 bg-muted/30 border-2 border-[#006a4e] rounded flex-shrink-0 overflow-hidden">
              {photo ? <img src={photo} alt="Photo" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Photo</div>}
            </div>
            <div className="text-xs space-y-1 flex-1">
              <p><span className="text-muted-foreground">নাম:</span> <strong>{form.nameBn}</strong></p>
              <p><span className="text-muted-foreground">Name:</span> <strong>{form.nameEn}</strong></p>
              <p><span className="text-muted-foreground">পিতা:</span> {form.fatherBn}</p>
              <p><span className="text-muted-foreground">মাতা:</span> {form.motherBn}</p>
              <p><span className="text-muted-foreground">DOB:</span> {form.dob}</p>
              <p><span className="text-muted-foreground">NID:</span> <strong>{form.nid}</strong></p>
              <p><span className="text-muted-foreground">Blood:</span> {form.bloodGroup}</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">{form.address}</div>
        </div>
      </div>

      <button onClick={downloadCard} className="w-full px-6 py-3 rounded-xl text-sm font-medium gradient-bg text-primary-foreground hover:opacity-90 shadow-lg">
        📥 Download NID Card as PNG
      </button>
      <canvas ref={canvasRef} className="hidden" />
    </ToolLayout>
  );
};

export default BdIdCardGenerator;