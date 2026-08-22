# Production status

Last updated: 2026-08-21.

**Live at https://www.orchardcabo.com/** — boutique design shipped 2026-08-21.

Statuses are deliberately separated. "Deployed" is not "live on the domain", and
"indexing requested" is not "indexed".

| Stage | Status | Evidence |
| --- | --- | --- |
| Code complete | ✅ VERIFIED | `astro check`: 0 errors, 0 warnings |
| Built | ✅ VERIFIED | 17 pages (8 real + 9 redirect stubs) |
| Deployed to GitHub Pages | ✅ VERIFIED | Actions green on every push |
| DNS pointed at GitHub | ✅ VERIFIED | Applied 2026-08-21; matches on 8.8.8.8 / 1.1.1.1 / 9.9.9.9 |
| Custom domain live | ✅ VERIFIED | `https://www.orchardcabo.com/` returns 200 with the new site |
| HTTPS certificate | ✅ VERIFIED | Let's Encrypt, `CN=www.orchardcabo.com`, issued 2026-08-21, expires 2026-11-19; covers apex too |
| HTTPS enforced | ✅ VERIFIED | `https_enforced: true`; http → 301 → https |
| Canonical host | ✅ VERIFIED | apex (http+https) and `http://www` all 301 to `https://www.` |
| Legacy redirects | ✅ VERIFIED | All 9 resolve over HTTPS to the right destination |
| GA4 property | ✅ VERIFIED | `G-VH6X5MBFQS` |
| GA4 events in production | ✅ VERIFIED | 16 live hits with `cta_location`; preview host sends 0 |
| Search Console | ✅ VERIFIED | Domain property, DNS TXT verification |
| Sitemap submitted | ✅ VERIFIED | Accepted 2026-08-21; Google already cites it as the discovery source |
| Indexing requested | ✅ VERIFIED | `/`, `/farm-products/`, `/farm-experience/`, `/hospitality/` |
| Indexed | ⏳ NOT YET | Only `/` was already in the index (as the old Wix page). New pages are "discovered, not yet indexed" — normal on day one. Nothing to claim until Google confirms. |

## A note on the HSTS window

Wix served `strict-transport-security: max-age=31556952` on this domain. Between
the DNS change and GitHub issuing the certificate (~50 minutes), returning
visitors whose browsers had that policy cached could not reach the site over
HTTP and hit a certificate error over HTTPS. New visitors were unaffected. This
is unavoidable when moving hosts away from a provider that set long-lived HSTS,
and it resolved itself the moment the certificate landed.

GitHub's certificate took ~50 minutes and only started provisioning after the
custom domain was removed and re-added through the API — the documented remedy.
The domain check reported `is_valid: true` and `is_https_eligible: true` the
whole time, so the delay was on GitHub's side, not a misconfiguration.

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

## Lighthouse

Measured on the production build. Network latency to the GitHub Pages edge moved
a lot during testing (TTFB swung between 190ms and 1.9s from the measuring
machine), and the performance score follows TTFB almost exactly. The table below
is the same deployed build served locally, which isolates the code from that:

| Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home (desktop) | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 ms |
| Home (mobile) | 99 | 100 | 100 | 100 | 2.0 s | 0 | 0 ms |
| Farm Products (mobile) | 100 | 100 | 100 | 100 | 1.4 s | 0 | 0 ms |

Over the live domain the median across three runs was 96 mobile / 81 desktop,
with the low outliers all explained by TTFB spikes. **When judging performance,
read LCP *render delay*, CLS and TBT** — those are the site's own numbers and
they were 39–66 ms, 0.003 and 0 ms consistently.

**For comparison, the Wix site this replaced**: performance 80, accessibility 88,
best practices 96, LCP 4.3 s, time-to-interactive 9.5 s.

### The GA4 performance trap

Shipping the redesign appeared to drop mobile performance from 95 to 80 with LCP
at 4.1 s. It was not the redesign. The review preview runs identical markup and
CSS but its host gate keeps GA4 off, and it scored 100 with LCP 1.8 s — which
isolated the cause in one measurement.

The LCP image was downloading in 26 ms and then waiting **3468 ms to paint**:
gtag.js is ~166 KB and its parse work held the main thread while the full-bleed
hero waited. The tag now loads on the first user gesture, or on idle after load,
whichever comes first. Render delay dropped to 39–66 ms.

This costs no data. `gtag('js'|'config'|'event')` only pushes onto
`window.dataLayer`, and gtag.js drains that queue when it arrives — verified live
at 21 hits including every CTA. Note that GA4 batches on its own timer, so an
event can legitimately reach the property several seconds after the click; a test
that waits less than about ten seconds will report a false negative.

## The one remaining blocker

DNS still points at Wix. The exact record diff is in `DEPLOYMENT.md`. Nothing
else is waiting on anything.
