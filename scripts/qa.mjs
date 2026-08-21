import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = process.env.QA_BASE || 'http://localhost:4330';
const PAGES = ['/', '/farm-products/', '/farm-experience/', '/hospitality/', '/about/', '/privacy/', '/thank-you/', '/404.html'];
const WIDTHS = [375, 390, 768, 1440];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', ...(process.env.QA_CHROME_ARGS ? process.env.QA_CHROME_ARGS.split('||') : [])] });
let problems = 0;

for (const path of PAGES) {
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => {
    // Analytics beacons are fire-and-forget: Chrome routinely reports them as
    // failed when the page is torn down mid-flight. Not a site defect.
    if (/google-analytics\.com|googletagmanager\.com/.test(r.url())) return;
    errors.push('reqfail: ' + r.url().slice(0, 90));
  });

  for (const w of WIDTHS) {
    await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
    await page.goto(BASE + path, { waitUntil: 'networkidle0' });
    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const vw = de.clientWidth;
      const wide = [];
      document.querySelectorAll('body *').forEach((el) => {
        // Intentionally off-canvas, or inside a collapsed <details> panel.
        if (el.closest('.skip') || el.closest('details:not([open])')) return;
        const b = el.getBoundingClientRect();
        if (b.width === 0 || b.height === 0) return;
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none') return;
        const right = b.right + scrollX;
        if (right > vw + 1.5 || b.left + scrollX < -1.5) {
          wide.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className || '').toString().slice(0, 30),
            txt: (el.textContent || '').trim().slice(0, 30),
            left: Math.round(b.left), right: Math.round(right), w: Math.round(b.width),
          });
        }
      });
      return { vw, scrollW: de.scrollWidth, bodyScrollW: document.body.scrollWidth, wide: wide.slice(0, 6) };
    });
    const overflow = r.scrollW > r.vw + 1 || r.wide.length > 0;
    if (overflow) {
      problems++;
      console.log(`\n✗ OVERFLOW ${path} @${w}px  scrollW=${r.scrollW} vw=${r.vw}`);
      r.wide.forEach((x) => console.log(`    <${x.tag} class="${x.cls}"> w=${x.w} right=${x.right} :: "${x.txt}"`));
    }
  }
  if (errors.length) { problems++; console.log(`\n✗ CONSOLE ${path}`); errors.slice(0, 5).forEach((e) => console.log('    ' + e)); }
  await page.close();
}
console.log(problems === 0 ? '\n✓ no overflow / console problems' : `\n${problems} problem group(s)`);
await browser.close();
