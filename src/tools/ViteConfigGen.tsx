import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const ViteConfigGen = () => {
  const [framework, setFramework] = useState("react");
  const [port, setPort] = useState(5173);
  const [pwa, setPwa] = useState(false);
  const plugins = framework==="react"?"import react from '@vitejs/plugin-react'":framework==="vue"?"import vue from '@vitejs/plugin-vue'":"import { svelte } from '@sveltejs/vite-plugin-svelte'";
  const pluginName = framework==="react"?"react()":framework==="vue"?"vue()":"svelte()";
  const config = `import { defineConfig } from 'vite'\n${plugins}${pwa?"\nimport { VitePWA } from 'vite-plugin-pwa'":""}\nimport path from 'path'\n\nexport default defineConfig({\n  plugins: [\n    ${pluginName},${pwa?`\n    VitePWA({\n      registerType: 'autoUpdate',\n      manifest: {\n        name: 'My App',\n        short_name: 'App',\n        theme_color: '#6366f1',\n      },\n    }),`:""}\n  ],\n  resolve: {\n    alias: {\n      '@': path.resolve(__dirname, './src'),\n    },\n  },\n  server: {\n    port: ${port},\n    open: true,\n  },\n  build: {\n    outDir: 'dist',\n    sourcemap: true,\n  },\n})`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Framework</label><select value={framework} onChange={e=>setFramework(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm"><option value="react">React</option><option value="vue">Vue</option><option value="svelte">Svelte</option></select></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Port</label><input type="number" value={port} onChange={e=>setPort(+e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    </div>
    <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={pwa} onChange={e=>setPwa(e.target.checked)} />PWA Support</label>
    <ToolOutput label="vite.config.ts" value={config} />
  </ToolLayout>;
};
export default ViteConfigGen;