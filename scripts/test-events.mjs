import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE=process.env.QA_BASE||'http://localhost:4330';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
const p=await b.newPage();
await p.setViewport({width:1280,height:900});

// Stop navigation/new tabs so clicks only produce analytics.
await p.setRequestInterception(true);
p.on('request',r=>{ const u=r.url(); if(u.startsWith('http://localhost:4330')||u.startsWith('data:')) r.continue(); else r.abort(); });

const results=[];
for(const path of ['/','/farm-products/','/farm-experience/','/hospitality/']){
  await p.goto(BASE+path,{waitUntil:'networkidle0'});
  await p.evaluate(()=>{ window.__ev=[]; const t=window.orchardTrack; window.orchardTrack=(n,pr)=>{window.__ev.push({n,pr}); return t(n,pr);};
    // neutralise navigation so the page stays put
    document.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
  });
  const targets=await p.$$eval('[data-evt]',els=>els.map((e,i)=>({i,evt:e.dataset.evt,cta:e.dataset.cta||null})));
  for(const t of targets){ await p.evaluate(i=>document.querySelectorAll('[data-evt]')[i].click(),t.i); }
  // implicit tel/mailto
  const implicit=await p.$$eval('a[href^="tel:"],a[href^="mailto:"]',els=>els.length);
  for(let i=0;i<implicit;i++){ await p.evaluate(i=>document.querySelectorAll('a[href^="tel:"],a[href^="mailto:"]')[i].click(),i); }
  const dl=await p.evaluate(()=>window.dataLayer.filter(x=>x&&x.event).map(x=>({...x})));
  results.push({path,fired:dl.map(e=>e.event),params:dl.slice(0,3)});
}
for(const r of results){
  const counts={}; r.fired.forEach(n=>counts[n]=(counts[n]||0)+1);
  console.log(`\n${r.path}`);
  Object.entries(counts).forEach(([k,v])=>console.log(`   ${k} x${v}`));
  r.params.forEach(x=>console.log('   sample:', JSON.stringify(x)));
}
const all=new Set(results.flatMap(r=>r.fired));
console.log('\nDISTINCT EVENTS:', [...all].sort().join(', '));
// product_view via scroll
await p.goto(BASE+'/farm-products/',{waitUntil:'networkidle0'});
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,90));}});
await new Promise(r=>setTimeout(r,700));
const pv=await p.evaluate(()=>window.dataLayer.filter(x=>x&&x.event==='product_view').map(x=>x.product));
console.log('product_view products:', pv.join(', ')||'(none)');
await b.close();
