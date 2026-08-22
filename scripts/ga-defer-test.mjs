import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
const p=await b.newPage();
const ev=[];
p.on('request',r=>{const u=r.url(); if(!/google-analytics\.com\/g\/collect/.test(u))return;
  const q0=new URLSearchParams(u.split('?')[1]||''); if(q0.get('en')) ev.push(q0.get('en')+'@'+(q0.get('ep.cta_location')||'-'));
  (r.postData()||'').split('\n').filter(Boolean).forEach(l=>{const q=new URLSearchParams(l); if(q.get('en')) ev.push(q.get('en')+'@'+(q.get('ep.cta_location')||'-'));});});

await p.goto('https://www.orchardcabo.com/farm-products/',{waitUntil:'networkidle2'});

// Worst case on purpose: click IMMEDIATELY, before the deferred tag can load.
const early=await p.evaluate(()=>{
  document.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
  const before = !!document.querySelector('script[src*="googletagmanager"]');
  document.querySelector('[data-evt="order_whatsapp_click"][data-cta="products_header"]').click();
  document.querySelector('[data-evt="hospitality_inquiry"]').click();
  return {tagPresentAtClickTime: before, queued: window.dataLayer.length};
});
console.log('  al momento del clic → tag cargado?', early.tagPresentAtClickTime, '| dataLayer:', early.queued);

await new Promise(r=>setTimeout(r,4000));
const mid=await p.evaluate(()=>!!document.querySelector('script[src*="googletagmanager"]'));
console.log('  4s después → tag cargado?', mid);
console.log('  hits hasta aquí:', ev.length);

// Navigation flushes gtag's batch queue.
await p.goto('https://www.orchardcabo.com/about/',{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,6000));

console.log('\n  EVENTOS RECIBIDOS POR GA4:');
[...new Set(ev)].forEach(e=>console.log('    '+e));
const clicks=ev.filter(e=>!e.startsWith('page_view'));
console.log('\n  clics registrados:', clicks.length, clicks.length>0?'✓ NO se pierden':'✗ SE PIERDEN');
await b.close();
