import puppeteer from 'puppeteer-core';

/**
 * Proves two things against a real deployment:
 *   1. the GA4 tag loads ONLY on the production hostname
 *   2. clicking a CTA actually reaches Google Analytics with its parameters
 */
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PROD_ARGS = ['--host-resolver-rules=MAP www.orchardcabo.com 185.199.108.153'];

async function run(label, url, args, clickCtas) {
  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', ...args] });
  const p = await b.newPage();
  const events = [];
  let tagLoaded = false;
  p.on('request', (r) => {
    const u = r.url();
    if (/googletagmanager\.com\/gtag\/js/.test(u)) tagLoaded = true;
    if (!/google-analytics\.com\/g\/collect/.test(u)) return;
    const tid = new URLSearchParams((u.split('?')[1] || '')).get('tid');
    const body = r.postData() || '';
    const lines = body.split('\n').filter(Boolean);
    if (!lines.length) {
      const q = new URLSearchParams(u.split('?')[1] || '');
      if (q.get('en')) events.push({ tid, en: q.get('en'), cta: q.get('ep.cta_location') });
    }
    for (const line of lines) {
      const q = new URLSearchParams(line);
      if (q.get('en')) events.push({ tid, en: q.get('en'), cta: q.get('ep.cta_location'), product: q.get('ep.product') });
    }
  });
  await p.goto(url, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2500));
  if (clickCtas) {
    await p.evaluate(() => {
      document.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
      document.querySelectorAll('[data-evt]').forEach((el) => el.click());
    });
    await new Promise((r) => setTimeout(r, 6000));
  }
  console.log(`\n${label}`);
  console.log(`   gtag.js loaded : ${tagLoaded}`);
  console.log(`   hits to GA4    : ${events.length}`);
  const seen = new Map();
  events.forEach((e) => { const k = e.en + (e.cta ? ' @' + e.cta : ''); seen.set(k, (seen.get(k) || 0) + 1); });
  [...seen.keys()].slice(0, 12).forEach((k) => console.log(`      ${k}`));
  const tids = [...new Set(events.map((e) => e.tid))].filter(Boolean);
  if (tids.length) console.log(`   property       : ${tids.join(', ')}`);
  await b.close();
  return { tagLoaded, count: events.length };
}

const prod = await run('PRODUCTION host (www.orchardcabo.com -> GitHub Pages)', 'http://www.orchardcabo.com/farm-products/', PROD_ARGS, true);
const prev = await run('PREVIEW host (lisandrosilva1.github.io)', 'https://lisandrosilva1.github.io/orchard-preview/farm-products/', [], true);

console.log('\n' + (prod.tagLoaded && prod.count > 0 && !prev.tagLoaded && prev.count === 0
  ? 'PASS: GA4 collects on production only.'
  : 'FAIL: check the host gate.'));
