import { useState } from "react"; import { ToolLayout, ToolInput, ToolOutput } from "./ToolComponents";
const toRoman=(n:number):string=>{const v=[[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]] as [number,string][];let r="";v.forEach(([val,sym])=>{while(n>=val){r+=sym;n-=val}});return r};
const RomanNumeral = () => { const [val,sV]=useState("42"); const n=parseInt(val); return <ToolLayout><ToolInput label="Number" value={val} onChange={sV} placeholder="42" />{!isNaN(n)&&n>0&&n<4000&&<ToolOutput label="Roman Numeral" value={toRoman(n)} />}</ToolLayout>; };
export default RomanNumeral;
