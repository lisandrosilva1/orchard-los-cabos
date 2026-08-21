import type { APIRoute } from 'astro';
import { site } from '../data/site';

/** Indexable routes only: no /thank-you/ (noindex), no 404, no redirect stubs. */
const routes: { path: string; priority: string }[] = [
  { path: '/', priority: '1.0' },
  { path: '/farm-products/', priority: '0.9' },
  { path: '/farm-experience/', priority: '0.9' },
  { path: '/hospitality/', priority: '0.9' },
  { path: '/about/', priority: '0.6' },
  { path: '/privacy/', priority: '0.2' },
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${site.origin}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
