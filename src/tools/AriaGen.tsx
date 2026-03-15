import { useState } from "react";
import { ToolLayout, ToolOutput, ToolSelect } from "./ToolComponents";
const roles: Record<string,{desc:string,attrs:string[]}> = {
  button: {desc:"Clickable button element",attrs:["aria-pressed","aria-expanded","aria-disabled","aria-label"]},
  dialog: {desc:"Modal dialog window",attrs:["aria-modal","aria-labelledby","aria-describedby"]},
  navigation: {desc:"Navigation landmark",attrs:["aria-label"]},
  tablist: {desc:"Tab container",attrs:["aria-orientation"]},
  tab: {desc:"Individual tab",attrs:["aria-selected","aria-controls"]},
  tabpanel: {desc:"Tab content panel",attrs:["aria-labelledby"]},
  alert: {desc:"Important message",attrs:["aria-live","aria-atomic"]},
  progressbar: {desc:"Progress indicator",attrs:["aria-valuenow","aria-valuemin","aria-valuemax","aria-label"]},
  tooltip: {desc:"Tooltip popup",attrs:["aria-describedby"]},
  menu: {desc:"Menu of options",attrs:["aria-label","aria-orientation"]},
  menuitem: {desc:"Menu item",attrs:["aria-disabled"]},
  switch: {desc:"Toggle switch",attrs:["aria-checked","aria-label"]},
  search: {desc:"Search landmark",attrs:["aria-label"]},
};
const AriaGen = () => {
  const [role, setRole] = useState("button");
  const r = roles[role];
  const example = `<div\n  role="${role}"\n  ${r.attrs.map(a=>`${a}=""`).join("\n  ")}\n>\n  Content\n</div>`;
  const ref = Object.entries(roles).map(([k,v])=>`${k}: ${v.desc}\n  Attrs: ${v.attrs.join(", ")}`).join("\n\n");
  return <ToolLayout>
    <ToolSelect label="ARIA Role" value={role} onChange={setRole} options={Object.keys(roles).map(r=>({value:r,label:r}))} />
    <p className="text-sm text-muted-foreground">{r.desc}</p>
    <ToolOutput label="Example" value={example} />
    <ToolOutput label="Available Attributes" value={r.attrs.join("\n")} />
  </ToolLayout>;
};
export default AriaGen;