import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE=process.env.QA_BASE||'http://localhost:4330';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox',...(process.env.QA_CHROME_ARGS?process.env.QA_CHROME_ARGS.split('||'):[])]});
const jobs=JSON.parse(process.argv[2]);
for(const j of jobs){
  const p=await b.newPage();
  await p.setViewport({width:j.w,height:j.h||900,deviceScaleFactor:1});
  await p.goto(BASE+j.path,{waitUntil:'networkidle0'});
  if(j.click){ await p.click(j.click); await new Promise(r=>setTimeout(r,400)); }
  if(j.full){ // scroll through so IntersectionObserver reveals fire before capture
    await p.evaluate(async()=>{const H=document.body.scrollHeight;for(let y=0;y<H;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}window.scrollTo(0,0);});
    await new Promise(r=>setTimeout(r,900));
  }
  await p.screenshot({path:`/tmp/shots/${j.name}.png`,fullPage:!!j.full});
  console.log(j.name);
  await p.close();
}
await b.close();
