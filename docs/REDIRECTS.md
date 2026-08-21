# Redirect map

Every URL in the legacy Wix `pages-sitemap.xml` (captured 2026-08-21) is
accounted for. The rule applied: **redirect to the page that answers the same
question**, never blanket-redirect to the homepage to avoid a 404.

| Legacy URL | Action | Destination | Reason |
| --- | --- | --- | --- |
| `/` | KEEP | `/` | Rebuilt |
| `/eggs` | 301 | `/farm-products/` | Egg product page → the eggs block |
| `/the-best-chicken-in-los-cabos` | 301 | `/farm-products/` | Whole-poultry product page → the poultry block |
| `/natural-balanced-feed` | 301 | `/farm-products/` | Feed is sold by the sack; kept as a product |
| `/chicken-manure-fertilizer` | 301 | `/farm-products/` | Fertiliser is sold by the bag; kept as a product |
| `/orchard-education` | 301 | `/farm-experience/` | School programme → the school programme |
| `/laying-hens-for-display` | 301 | `/hospitality/` | Was titled "for Villas or Hotel's Amenities" — B2B by its own description |
| `/baby-chicks-monthly-rental` | 301 | `/hospitality/` | Display/amenity offering for properties |
| `/technical-visit` | 301 | `/hospitality/` | "Hotel's/Farms Weekly Professional Technical Visit" — B2B consulting |
| `/all-in` | 301 | `/hospitality/` | See below |

**Totals:** 10 legacy URLs — 1 kept, 9 redirected, 0 archived, 0 orphaned.
No redirect chains: all four destinations are real pages, never themselves redirects.

## `/all-in`

`/all-in` held a client-specific commercial proposal with confidential figures
(see `docs/CONTENT_AUDIT.md` §5). The content is gone from the public site.

A redirect rather than a 410 is the right call because the *intent* behind the URL
survives: someone landing on it wanted a custom poultry programme for a hospitality
property, and `/hospitality/` sells exactly that — as a generic capability, with no
figures, no client and no timeline. A 410 would throw away a real commercial
signal; a redirect to the homepage would be misleading. Neither is better here.

## How the redirects work

GitHub Pages cannot issue server-side 301s for arbitrary paths, so
`src/pages/[legacy].astro` generates a stub at each legacy path containing:

- `<link rel="canonical">` pointing at the destination
- `<meta http-equiv="refresh" content="0; url=…">`
- `window.location.replace(…)`
- a visible fallback link

Google treats an instant meta refresh as a permanent redirect and consolidates
signals to the canonical target, so this behaves like a 301 for ranking purposes.

**Be honest about what this is:** the HTTP status is `200`, not `301`. For a
10-URL site with modest existing equity that is an acceptable trade for keeping
the architecture to "static files on a CDN". If true 301s are ever needed, put
Cloudflare in front of the domain and move these into redirect rules — the map in
`src/data/redirects.ts` is already the single source of truth and would drive it
directly.

Legacy paths had no trailing slash (`/eggs`). GitHub Pages serves
`/eggs/index.html` and 301s `/eggs` → `/eggs/`, so both forms resolve.

## Adding a redirect

Add an entry to `src/data/redirects.ts`. The stub page and this behaviour come
for free. Do not create a redirect whose destination is itself a redirect.
