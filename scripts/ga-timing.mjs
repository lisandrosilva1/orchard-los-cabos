import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
const p=await b.newPage();
const t0=Date.now(); const marks=[];
p.on('request',r=>{const u=r.url();
  if(/googletagmanager\.com\/gtag\/js/.test(u)) marks.push(['script solicitado',Date.now()-t0]);
  if(/google-analytics\.com\/g\/collect/.test(u)){
    const q=new URLSearchParams(u.split('?')[1]||'');
    const body=(r.postData()||'').split('\n').filter(Boolean).map(l=>new URLSearchParams(l).get('en')).filter(Boolean);
    marks.push(['collect ['+(q.get('en')||body.join(','))+']',Date.now()-t0]);
  }});
await p.goto('https://www.orchardcabo.com/farm-products/',{waitUntil:'domcontentloaded'});
await p.evaluate(()=>{document.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));});
// Click as early as possible.
await p.evaluate(()=>document.querySelector('[data-evt="order_whatsapp_click"][data-cta="products_header"]').click());
marks.push(['clic disparado',Date.now()-t0]);
for(const w of [2000,3000,5000,5000]){
  await new Promise(r=>setTimeout(r,w));
  const init=await p.evaluate(()=>window.dataLayer.some(x=>x&&x.event==='gtm.load'));
  marks.push([`t=${Date.now()-t0}ms gtag inicializado: ${init}`,Date.now()-t0]);
}
console.log('  LÍNEA DE TIEMPO:');
marks.forEach(m=>console.log('   '+String(m[1]).padStart(6)+'ms  '+m[0]));
await b.close();
