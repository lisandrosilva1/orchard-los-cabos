import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
const p=await b.newPage();
p.on('console',m=>{ if(/analytics/i.test(m.text())) console.log('  console:',m.text()); });
await p.goto('https://www.orchardcabo.com/farm-products/',{waitUntil:'networkidle2'});
await new Promise(r=>setTimeout(r,3000));
const d=await p.evaluate(()=>{
  const dump=()=>window.dataLayer.map(x=>{
    try{ if(x && typeof x.length==='number' && x[0]) return 'ARG:'+x[0]+':'+String(x[1]).slice(0,24);
         return 'OBJ:'+JSON.stringify(x).slice(0,60); }catch(e){return '?';}
  });
  const before=dump();
  const el=document.querySelector('[data-evt="order_whatsapp_click"][data-cta="products_header"]');
  const info={found:!!el, track:typeof window.orchardTrack, gtag:typeof window.gtag};
  document.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
  el.click();
  return {info, before, after:dump()};
});
console.log('  entorno:', JSON.stringify(d.info));
console.log('  dataLayer ANTES  ('+d.before.length+'):'); d.before.forEach(x=>console.log('    '+x));
console.log('  dataLayer DESPUÉS('+d.after.length+'):'); d.after.forEach(x=>console.log('    '+x));
await b.close();
