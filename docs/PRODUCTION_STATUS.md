# Production status

Last updated: 2026-08-21.

Statuses are deliberately separated. "Deployed" is not "live on the domain", and
"indexing requested" is not "indexed".

| Stage | Status | Evidence |
| --- | --- | --- |
| Code complete | ✅ VERIFIED | `astro check`: 0 errors, 0 warnings |
| Built | ✅ VERIFIED | 17 pages (8 real + 9 redirect stubs) |
| Deployed to GitHub Pages | ✅ VERIFIED | Actions run green; artifact serving |
| Custom domain set on Pages | ✅ VERIFIED | Pages API `cname: www.orchardcabo.com` |
| DNS pointed at GitHub | ❌ **BLOCKED — owner go-ahead** | Domain still resolves to Wix |
| HTTPS on custom domain | ❌ BLOCKED | GitHub cannot issue a certificate until DNS resolves to it |
| GA4 property | ✅ VERIFIED | `G-VH6X5MBFQS`, created 2026-08-21 |
| GA4 events reaching the property | ✅ VERIFIED | 16 live hits to `G-VH6X5MBFQS` with `cta_location`; preview host sends 0 |
| Search Console | ⚠️ REQUIRES ACTION | Needs the owner's Google account; do after DNS |
| Sitemap submitted | ⚠️ REQUIRES ACTION | Depends on Search Console |
| Indexing requested | ⚠️ REQUIRES ACTION | Depends on Search Console |
| Indexed | ❌ NOT YET | Nothing to claim until Google confirms |

## Verified on the deployed artifact (not just locally)

Run against GitHub Pages before DNS, by mapping the host in Chrome:

```bash
export QA_CHROME_ARGS='--host-resolver-rules=MAP www.orchardcabo.com 185.199.108.153'
QA_BASE="http://www.orchardcabo.com" npm run qa      # 0 overflow, 0 console errors
QA_BASE="http://www.orchardcabo.com" npm run audit   # 0 issues
QA_BASE="http://www.orchardcabo.com" npm run events  # all 8 events
```

Results on 2026-08-21:

- All six indexable pages return 200; every internal link 200.
- Unique title, meta description and canonical per page; exactly one `<h1>`;
  no heading-level jumps; alt text and explicit dimensions on every image.
- `/thank-you/` correctly `noindex, follow` and absent from the sitemap.
- Unknown paths return a real **404 status** with the branded 404 page.
- All 9 legacy paths 301 to their trailing-slash form, then carry a canonical
  and instant meta-refresh to the correct destination. No chains.
- Apex → www 301 is handled by GitHub Pages automatically.
- `robots.txt` and `sitemap.xml` serve correctly and reference the www origin.
- Zero console errors, zero failed requests, zero horizontal overflow at
  375 / 390 / 768 / 1440 px.
- Exactly one analytics tag on the page.

## Lighthouse (production build)

| Page | Perf | A11y | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home (desktop) | 100 | 100 | 100 | 100 |
| Farm Products | 100 | 100 | 100 | 100 |
| Farm Experience | 100 | 100 | 100 | 100 |
| Hospitality | 100 | 100 | 100 | 100 |
| About | 100 | 100 | 100 | 100 |
| Privacy | 100 | 100 | 100 | 100 |
| **Home (mobile)** | **99** | **100** | **100** | **100** |
| Farm Products (mobile) | 100 | 100 | 100 | 100 |

CLS 0 and TBT 0 ms everywhere. Desktop LCP 0.3–0.4 s; mobile LCP 2.2 s on the
home page under Lighthouse's throttled 4G, which is inside the "good" threshold.

Re-run these on the real domain once DNS and HTTPS are in place.

## The one remaining blocker

DNS still points at Wix. The exact record diff is in `DEPLOYMENT.md`. Nothing
else is waiting on anything.
