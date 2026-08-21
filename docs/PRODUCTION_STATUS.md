# Production status

Last updated: 2026-08-21.

**Live at https://www.orchardcabo.com/**

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

## Lighthouse (measured on https://www.orchardcabo.com)

| Page | Perf | A11y | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Home (desktop) | 100 | 100 | 100 | 100 | 0.5 s | 0.012 |
| Home (mobile) | 95 | 100 | 100 | 100 | 2.1 s | 0 |
| Farm Products (mobile) | 99 | 100 | 100 | 100 | 1.2 s | 0 |

All four categories clear the ≥95 target on the live domain. Mobile home sits at
95 rather than the 99 measured before GA4 was wired in — that four-point drop is
the analytics tag, and it is a deliberate trade.

**For comparison, the Wix site it replaced**, measured on the same connection
before the cutover: performance 80, accessibility 88, best practices 96, LCP
4.3 s, time-to-interactive 9.5 s.

Beware when re-running: passing `--host-resolver-rules` through Lighthouse's
`--chrome-flags` silently breaks, because Lighthouse splits that string on
spaces and the rule contains them. Launch Chrome yourself with the flag quoted
and point Lighthouse at it with `--port`, or you will end up auditing whatever
your local DNS cache resolves to.

## The one remaining blocker

DNS still points at Wix. The exact record diff is in `DEPLOYMENT.md`. Nothing
else is waiting on anything.
