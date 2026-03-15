import { useState } from "react";
import { ToolLayout, ToolOutput } from "./ToolComponents";
const ServiceWorkerGen = () => {
  const [cache, setCache] = useState("v1");
  const [files, setFiles] = useState("/,/index.html,/style.css,/app.js");
  const [strategy, setStrategy] = useState("cache-first");
  const sw = strategy === "cache-first" ?
`const CACHE_NAME = '${cache}';
const ASSETS = [${files.split(",").map(f=>`'${f.trim()}'`).join(",")}];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});` :
`const CACHE_NAME = '${cache}';

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});`;
  const reg = `// Register service worker\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker.register('/sw.js')\n    .then(reg => console.log('SW registered', reg))\n    .catch(err => console.error('SW failed', err));\n}`;
  return <ToolLayout>
    <div className="grid grid-cols-2 gap-4">
      <div><label className="text-sm font-medium text-foreground block mb-1">Cache Name</label><input value={cache} onChange={e=>setCache(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
      <div><label className="text-sm font-medium text-foreground block mb-1">Strategy</label><select value={strategy} onChange={e=>setStrategy(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm"><option value="cache-first">Cache First</option><option value="network-first">Network First</option></select></div>
    </div>
    <div><label className="text-sm font-medium text-foreground block mb-1">Files to Cache (comma-separated)</label><input value={files} onChange={e=>setFiles(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-glass-border/20 text-foreground text-sm" /></div>
    <ToolOutput label="sw.js" value={sw} />
    <ToolOutput label="Registration Code" value={reg} />
  </ToolLayout>;
};
export default ServiceWorkerGen;