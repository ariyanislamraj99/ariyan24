import { useState } from "react";
import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const mimes: Record<string,string> = {html:"text/html",htm:"text/html",css:"text/css",js:"application/javascript",json:"application/json",xml:"application/xml",txt:"text/plain",csv:"text/csv",md:"text/markdown",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",svg:"image/svg+xml",webp:"image/webp",ico:"image/x-icon",bmp:"image/bmp",mp4:"video/mp4",webm:"video/webm",mp3:"audio/mpeg",wav:"audio/wav",ogg:"audio/ogg",pdf:"application/pdf",zip:"application/zip",gz:"application/gzip",tar:"application/x-tar",rar:"application/vnd.rar",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",ppt:"application/vnd.ms-powerpoint",woff:"font/woff",woff2:"font/woff2",ttf:"font/ttf",otf:"font/otf",eot:"application/vnd.ms-fontobject"};
const MimeTypeLookup = () => {
  const [ext, setExt] = useState("");
  const [output, setOutput] = useState("");
  const lookup = () => {
    const e = ext.replace(/^\./,"").toLowerCase();
    if (mimes[e]) setOutput(`Extension: .${e}\nMIME Type: ${mimes[e]}`);
    else {
      const results = Object.entries(mimes).filter(([k,v]) => k.includes(e) || v.includes(e));
      setOutput(results.length ? results.map(([k,v])=>`.${k} → ${v}`).join("\n") : "No MIME type found");
    }
  };
  return <ToolLayout><ToolInput label="File Extension" value={ext} onChange={setExt} placeholder=".png or json" /><ToolButton onClick={lookup}>Lookup</ToolButton><ToolOutput label="MIME Type" value={output} /></ToolLayout>;
};
export default MimeTypeLookup;