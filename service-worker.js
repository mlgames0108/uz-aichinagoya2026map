const SHELL='ain26-v8-shell-1';
const APP=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./vendor/maplibre-gl.js','./vendor/maplibre-gl.css','./map-style.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(SHELL).then(c=>c.addAll(APP)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>/^ain26-v[67]-/.test(k)&&k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 // Only the installed shell is cached. Do not replace missing scripts with HTML.
 e.respondWith(caches.open(SHELL).then(async c=>{const hit=await c.match(r);if(hit)return hit;try{return await fetch(r)}catch(err){if(r.mode==='navigate')return await c.match('./index.html');return Response.error()}}));
});
