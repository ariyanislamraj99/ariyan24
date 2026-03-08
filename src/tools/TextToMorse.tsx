import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput, ToolButton } from "./ToolComponents";
const morseMap:Record<string,string>={"a":".-","b":"-...","c":"-.-.","d":"-..","e":".","f":"..-.","g":"--.","h":"....","i":"..","j":".---","k":"-.-","l":".-..","m":"--","n":"-.","o":"---","p":".--.","q":"--.-","r":".-.","s":"...","t":"-","u":"..-","v":"...-","w":".--","x":"-..-","y":"-.--","z":"--..","0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----.","."  :".-.-.-",","  :"--..--","?":"..--..","!":"-.-.--"," ":"/"};
const revMap=Object.fromEntries(Object.entries(morseMap).map(([k,v])=>[v,k]));
const TextToMorse = () => { const [t,sT]=useState(""); const [o,sO]=useState("");
  return <ToolLayout><ToolInput label="Text" value={t} onChange={sT} /><div className="flex gap-2"><ToolButton onClick={()=>sO(t.toLowerCase().split("").map(c=>morseMap[c]||c).join(" "))}>To Morse</ToolButton><ToolButton onClick={()=>sO(t.split(" ").map(c=>revMap[c]||c).join(""))} variant="secondary">From Morse</ToolButton></div><ToolOutput label="Result" value={o} /></ToolLayout>; };
export default TextToMorse;
