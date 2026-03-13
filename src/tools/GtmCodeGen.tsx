import { useState } from "react";
import { ToolLayout, ToolInput, ToolButton, ToolOutput } from "./ToolComponents";
const GtmCodeGen = () => {
  const [id, setId] = useState(""); const [output, setOutput] = useState("");
  const generate = () => {
    const gtmId = id || "GTM-XXXXXXX";
    setOutput(`<!-- Google Tag Manager (HEAD) -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','${gtmId}');</script>\n<!-- End Google Tag Manager -->\n\n<!-- Google Tag Manager (BODY - place after opening <body> tag) -->\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"\nheight="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n<!-- End Google Tag Manager (noscript) -->`);
  };
  return <ToolLayout>
    <ToolInput label="GTM Container ID" value={id} onChange={setId} placeholder="GTM-XXXXXXX" />
    <ToolButton onClick={generate}>Generate Code</ToolButton>
    <ToolOutput label="GTM Code Snippets" value={output} />
  </ToolLayout>;
};
export default GtmCodeGen;
