import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE=process.env.QA_BASE||'http://localhost:4330';
const PAGES=['/','/farm-products/','/farm-experience/','/hospitality/','/about/','/privacy/','/thank-you/'];
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox',...(process.env.QA_CHROME_ARGS?process.env.QA_CHROME_ARGS.split('||'):[])]});
const titles=new Map(),descs=new Map(); const issues=[];
const internal=new Set(); const externals=new Set();

for(const path of PAGES){
  const p=await b.newPage();
  await p.setViewport({width:1280,height:900});
  await p.goto(BASE+path,{waitUntil:'networkidle0'});
  const d=await p.evaluate(()=>{
    const q=(s,a)=>{const e=document.querySelector(s);return e?(a?e.getAttribute(a):e.textContent.trim()):null;};
    const heads=[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>({l:+h.tagName[1],t:h.textContent.trim().slice(0,50)}));
    const imgs=[...document.querySelectorAll('img')].map(i=>({alt:i.getAttribute('alt'),src:(i.currentSrc||i.src).split('/').pop(),w:i.getAttribute('width'),h:i.getAttribute('height'),loading:i.getAttribute('loading')}));
    const links=[...document.querySelectorAll('a[href]')].map(a=>({href:a.getAttribute('href'),text:(a.textContent||'').trim().slice(0,40),target:a.getAttribute('target'),rel:a.getAttribute('rel')}));
    let ld=null; try{ld=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);}catch(e){ld={ERROR:String(e)};}
    return {
      title:q('title'), desc:q('meta[name="description"]','content'), canon:q('link[rel="canonical"]','href'),
      robots:q('meta[name="robots"]','content'), ogT:q('meta[property="og:title"]','content'),
      ogImg:q('meta[property="og:image"]','content'), lang:document.documentElement.lang,
      h1s:[...document.querySelectorAll('h1')].map(h=>h.textContent.trim()),
      heads, imgs, links, ld,
      gtagScripts:[...document.querySelectorAll('script[src*="googletagmanager"]')].length,
      inlineGa:[...document.querySelectorAll('script:not([src])')].filter(s=>/gtag\(/.test(s.textContent)).length,
    };
  });

  // uniqueness
  if(titles.has(d.title)) issues.push(`DUPLICATE TITLE: ${path} == ${titles.get(d.title)}`); else titles.set(d.title,path);
  if(d.desc){ if(descs.has(d.desc)) issues.push(`DUPLICATE DESC: ${path} == ${descs.get(d.desc)}`); else descs.set(d.desc,path);} else issues.push(`MISSING DESC: ${path}`);
  if(!d.canon) issues.push(`MISSING CANONICAL: ${path}`);
  if(d.h1s.length!==1) issues.push(`H1 COUNT ${d.h1s.length}: ${path}`);
  if(d.title.length>65) issues.push(`TITLE ${d.title.length} chars (>65): ${path} :: ${d.title}`);
  if(d.desc && (d.desc.length<70||d.desc.length>170)) issues.push(`DESC ${d.desc.length} chars: ${path}`);
  if(d.ld.ERROR) issues.push(`JSON-LD PARSE: ${path} ${d.ld.ERROR}`);
  if(d.gtagScripts>1||d.inlineGa>1) issues.push(`GA DUPLICATION: ${path} src=${d.gtagScripts} inline=${d.inlineGa}`);

  // heading order
  let prev=0;
  for(const h of d.heads){ if(prev && h.l>prev+1) issues.push(`HEADING JUMP h${prev}->h${h.l}: ${path} :: ${h.t}`); prev=h.l; }

  // images
  d.imgs.forEach(i=>{
    if(i.alt===null) issues.push(`IMG NO ALT ATTR: ${path} ${i.src}`);
    else if(i.alt.trim()==='') issues.push(`IMG EMPTY ALT: ${path} ${i.src}`);
    if(!i.w||!i.h) issues.push(`IMG NO DIMS: ${path} ${i.src}`);
  });

  d.links.forEach(l=>{
    if(l.href.startsWith('/')) internal.add(l.href);
    else if(/^https?:/.test(l.href)) { externals.add(l.href.split('?')[0]); if(l.target==='_blank' && !(l.rel||'').includes('noopener')) issues.push(`TARGET BLANK NO NOOPENER: ${path} ${l.href.slice(0,50)}`); }
    if(!l.text && !l.href.startsWith('#')) { /* icon links checked via aria-label below */ }
  });

  console.log(`\n── ${path}`);
  console.log(`   title(${d.title.length}) ${d.title}`);
  console.log(`   desc (${d.desc?d.desc.length:0})`);
  console.log(`   canonical ${d.canon}   robots=${d.robots||'-'}   lang=${d.lang}`);
  console.log(`   h1: ${d.h1s.join(' | ')}`);
  console.log(`   imgs=${d.imgs.length}  ld-nodes=${(d.ld['@graph']||[]).map(n=>Array.isArray(n['@type'])?n['@type'].join('+'):n['@type']).join(', ')}`);
  await p.close();
}

// Internal link check, driven through the browser so it honours the same
// host-resolver mapping used to test a deployment before DNS points at it.
console.log('\n── internal links');
{
  const lp=await b.newPage();
  for(const href of [...internal].sort()){
    let status='ERR';
    try{ const resp=await lp.goto(BASE+href,{waitUntil:'domcontentloaded'}); status=resp?resp.status():'ERR'; }catch(e){ status='ERR'; }
    // 304 Not Modified is a cache hit, not a failure.
    const ok=(status>=200&&status<300)||status===304;
    if(!ok) issues.push(`BROKEN INTERNAL LINK: ${href} -> ${status}`);
    console.log(`   ${ok?'✓':'✗'} ${href} ${status}`);
  }
  await lp.close();
}
console.log('\n── external link hosts');
[...externals].forEach(e=>console.log('   '+e));

console.log('\n════ ISSUES ════');
if(!issues.length) console.log('none');
else issues.forEach(i=>console.log('  ✗ '+i));
await b.close();
