/**
 * Builds a click-through preview of the production output, servable from a
 * subpath (GitHub Pages project site), WITHOUT touching the source or the
 * production build. Rewrites root-absolute URLs to sit under PREFIX and marks
 * every page noindex so the preview can never compete with production.
 */
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'dist';
const OUT = process.env.PREVIEW_OUT || '/tmp/orchard-preview';
const PREFIX = process.env.PREVIEW_PREFIX || '/orchard-preview';

fs.rmSync(OUT, { recursive: true, force: true });
fs.cpSync(SRC, OUT, { recursive: true });

// GitHub Pages runs Jekyll by default, which skips directories starting with
// an underscore — that would 404 every /_astro/ asset.
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
// The preview must not claim the custom domain.
fs.rmSync(path.join(OUT, 'CNAME'), { force: true });

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

let html = 0, css = 0;
for (const file of walk(OUT)) {
  const ext = path.extname(file);
  if (ext === '.html') {
    let s = fs.readFileSync(file, 'utf8');
    // Attribute values that are root-absolute paths.
    s = s.replace(/(\s(?:href|src)=")\/(?!\/)/g, `$1${PREFIX}/`);
    // srcset lists: every comma-separated candidate.
    s = s.replace(/(\ssrcset=")([^"]+)"/g, (_m, a, list) =>
      `${a}${list.replace(/(^|,\s*)\/(?!\/)/g, `$1${PREFIX}/`)}"`);
    // The client-side redirect target in the legacy stubs.
    s = s.replace(/(content="0; url=)\/(?!\/)/g, `$1${PREFIX}/`);
    s = s.replace(/(window\.location\.replace\(")\/(?!\/)/g, `$1${PREFIX}/`);
    s = s.replace(/(const to = ")\/(?!\/)/g, `$1${PREFIX}/`);
    // Never let the preview be indexed.
    if (!/name="robots"/.test(s)) {
      s = s.replace(/<\/title>/, '</title><meta name="robots" content="noindex, nofollow" />');
    }
    fs.writeFileSync(file, s);
    html++;
  } else if (ext === '.css') {
    let s = fs.readFileSync(file, 'utf8');
    s = s.replace(/url\((['"]?)\/(?!\/)/g, `url($1${PREFIX}/`);
    fs.writeFileSync(file, s);
    css++;
  }
}
console.log(`preview built at ${OUT}  prefix=${PREFIX}  html=${html} css=${css}`);
