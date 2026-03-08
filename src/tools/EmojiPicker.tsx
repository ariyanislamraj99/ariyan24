import { useState } from "react"; import { ToolLayout } from "./ToolComponents";
const emojis=["😀","😂","🥰","😎","🤔","👍","👏","🔥","❤️","⭐","🎉","🚀","💡","✅","❌","⚡","🎯","💻","📱","🌍","🎨","📸","🎵","📝","🔗","📊","🏆","💪","🙏","👀","🤝","💯","🌟","✨","🔑","🛡️","⚙️","📦","🧪","🎮"];
const EmojiPicker = () => { const [copied,sC]=useState("");
  const copy=(e:string)=>{navigator.clipboard.writeText(e);sC(e);setTimeout(()=>sC(""),1500)};
  return <ToolLayout><p className="text-sm text-muted-foreground">Click to copy</p><div className="grid grid-cols-8 sm:grid-cols-10 gap-2">{emojis.map(e=><button key={e} onClick={()=>copy(e)} className={`text-2xl p-2 rounded-lg hover:bg-muted transition-colors ${copied===e?"bg-primary/20":"bg-muted/30"}`}>{e}</button>)}</div>{copied&&<p className="text-sm text-primary">Copied {copied}!</p>}</ToolLayout>; };
export default EmojiPicker;
