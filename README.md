# Orchard Los Cabos

The production website for Orchard Los Cabos — a poultry farm in the Mango Fields
area of San José del Cabo, Baja California Sur.

**Production:** https://www.orchardcabo.com/

This project is deliberately independent of any other platform: no shared runtime,
no CMS, no database, no authentication, no admin panel. It is a static site.

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Astro 5 (static output) | Ships HTML and almost no JS |
| Language | TypeScript (strict) | Business data is typed in `src/data/` |
| Styles | Hand-written CSS with custom properties | One design system, no framework weight |
| Type | Cormorant + Jost, self-hosted variable, Latin subset | 62 KB total; deliberately shares nothing with the Discovery Network system |
| Images | `astro:assets` `<Picture>` | AVIF + WebP + JPEG, responsive, no CLS |
| Hosting | GitHub Pages | Free, static, custom domain, no server to run |
| Analytics | GA4 via a delegated event layer | See `docs/ANALYTICS.md` |

Client-side JavaScript on a page: a small inline analytics script, a header
scroll-state toggle and a scroll-reveal observer. The mobile menu is a native
`<details>` element and ships no JS at all.

The reveal is gated behind a `.js` class on `<html>`, so content is never left
hidden if scripting fails. See `docs/BRAND.md` for the visual system and for why
this site must not resemble the Los Cabos Discovery Network.

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output into dist/
npm run preview    # serve the built output
```

## Quality gates

```bash
npm run check      # astro check (types + templates)
npm run qa         # layout overflow + console errors, 8 pages x 4 widths
npm run audit      # titles, descriptions, canonicals, headings, alt text, links
npm run events     # proves every analytics event fires with the right params
```

`qa`, `audit` and `events` drive the locally installed Google Chrome through
`puppeteer-core` and need a server running (`npm run preview`). Point them at
production with `QA_BASE=https://www.orchardcabo.com`.

## Project layout

```
src/
  components/   Header, Footer, Photo, CtaBand, Analytics, Logo, WhatsAppFab
  data/         site.ts (business facts), redirects.ts (legacy URL map)
  layouts/      Base.astro — SEO head, JSON-LD, analytics
  pages/        One file per route, plus [legacy].astro for redirect stubs
  styles/       global.css — the whole design system
public/         fonts, favicon, social image, CNAME
docs/           analytics, content audit, redirects, brand, deployment
scripts/        image prep + the QA harnesses
```

## Content rules that are not optional

Two rules came out of the August 2026 content audit and are load-bearing:

1. **No unverified claims.** Orchard is not certified organic, so the word
   "organic" does not describe the product anywhere on this site. Same for
   "free-range", "kosher-style", "100% natural", and any "the only farm that…"
   superlative. `docs/CONTENT_AUDIT.md` lists what was removed and what factual
   language replaced it.
2. **No published prices, and nothing client-specific.** Legacy prices were
   internally contradictory and their USD conversions were stale, so every
   commercial path routes to WhatsApp for current pricing instead. No client
   names, investment figures or private proposals belong in this repository —
   it is public.

Adding either back needs a deliberate decision by the owner, not a passing edit.
