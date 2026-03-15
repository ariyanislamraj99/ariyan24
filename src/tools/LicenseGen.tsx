import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const licenses: Record<string,string> = {
  MIT: `MIT License\n\nCopyright (c) [year] [fullname]\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.`,
  "Apache-2.0": `Apache License\nVersion 2.0, January 2004\nhttp://www.apache.org/licenses/\n\nCopyright [year] [fullname]\n\nLicensed under the Apache License, Version 2.0 (the "License");\nyou may not use this file except in compliance with the License.`,
  "GPL-3.0": `GNU GENERAL PUBLIC LICENSE\nVersion 3, 29 June 2007\n\nCopyright (C) [year] [fullname]\n\nThis program is free software: you can redistribute it and/or modify\nit under the terms of the GNU General Public License as published by\nthe Free Software Foundation, either version 3 of the License.`,
  "BSD-3-Clause": `BSD 3-Clause License\n\nCopyright (c) [year] [fullname]\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are met...`,
  ISC: `ISC License\n\nCopyright (c) [year] [fullname]\n\nPermission to use, copy, modify, and/or distribute this software for any\npurpose with or without fee is hereby granted, provided that the above\ncopyright notice and this permission notice appear in all copies.`,
};
const LicenseGen = () => {
  const [type, setType] = useState("MIT");
  const [name, setName] = useState("");
  const year = new Date().getFullYear();
  const output = licenses[type].replace(/\[year\]/g, String(year)).replace(/\[fullname\]/g, name || "Your Name");
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">License</label><select value={type} onChange={e=>setType(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm">{Object.keys(licenses).map(l=><option key={l}>{l}</option>)}</select></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Full Name</label><input value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <ToolOutput label="LICENSE" value={output} />
  </ToolLayout>;
};
export default LicenseGen;