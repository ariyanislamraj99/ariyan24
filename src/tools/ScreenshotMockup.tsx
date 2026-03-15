import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const ScreenshotMockup = () => {
  const [device, setDevice] = useState("macbook");
  const [img, setImg] = useState<string>("");
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { const r = new FileReader(); r.onload = () => setImg(r.result as string); r.readAsDataURL(file); }
  };
  const devices: Record<string,{w:number,h:number,r:number,p:number,bg:string}> = {
    macbook: {w:640,h:400,r:12,p:24,bg:"#1e1e2e"},
    iphone: {w:200,h:420,r:32,p:12,bg:"#000"},
    ipad: {w:380,h:520,r:20,p:16,bg:"#1a1a2e"},
    browser: {w:640,h:400,r:8,p:0,bg:"#2d2d3f"},
  };
  const d = devices[device];
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Device</label><select value={device} onChange={e=>setDevice(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm"><option value="macbook">MacBook</option><option value="iphone">iPhone</option><option value="ipad">iPad</option><option value="browser">Browser</option></select></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Screenshot</label><input type="file" accept="image/*" onChange={handleFile} className="w-full text-sm text-foreground file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer" /></div>
    </div>
    <div className="flex justify-center py-6">
      <div style={{background:d.bg,borderRadius:d.r,padding:d.p,width:d.w,position:"relative"}}>
        {device==="browser"&&<div style={{background:"#383850",padding:"8px 12px",borderRadius:`${d.r}px ${d.r}px 0 0`,display:"flex",alignItems:"center",gap:6}}><div style={{width:10,height:10,borderRadius:"50%",background:"#ff5f57"}}/><div style={{width:10,height:10,borderRadius:"50%",background:"#febc2e"}}/><div style={{width:10,height:10,borderRadius:"50%",background:"#28c840"}}/><div style={{flex:1,background:"#1e1e2e",borderRadius:4,height:20,marginLeft:8}}/></div>}
        {img ? <img src={img} alt="Screenshot" style={{width:"100%",height:d.h,objectFit:"cover",borderRadius:device==="browser"?`0 0 ${d.r}px ${d.r}px`:d.r-8,display:"block"}} /> : <div style={{width:"100%",height:d.h,background:"#2a2a3e",borderRadius:device==="browser"?`0 0 ${d.r}px ${d.r}px`:d.r-8,display:"flex",alignItems:"center",justifyContent:"center",color:"#666",fontSize:14}}>Upload a screenshot</div>}
      </div>
    </div>
  </ToolLayout>;
};
export default ScreenshotMockup;