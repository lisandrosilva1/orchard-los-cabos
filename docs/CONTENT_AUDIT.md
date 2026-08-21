# Content audit — legacy orchardcabo.com (Wix)

Audited 2026-08-21 against the live Wix site and its `pages-sitemap.xml`
(10 URLs, `lastmod` 2026-07-01). This is the provenance record for everything on
the new site, and the reasoning for what was removed.

## 1. What the old site was

| Signal | Finding |
| --- | --- |
| Indexable pages | 10 |
| Pages with a meta description | **1 of 10** (homepage only) |
| That description | Spanish, keyword-stuffed: "Organic Eggs Los Cabos, Organic Chicken Los Cabos, Huevo orgánico Los Cabos" |
| Analytics | **None.** No GA4, no GTM, no UA tag anywhere |
| WhatsApp | Icon present in the design, **linked to nothing** |
| Social links | Only `facebook.com/WixEspanol` — a leftover Wix template default, not Orchard's |
| Real photography | 4 usable original photographs, all of eggs |
| Contact | `tel:6242170064`, `mailto:huizahesanjose@gmail.com` |

The two most consequential findings: the business had **no measurement at all**,
and its primary conversion channel (WhatsApp) **was not clickable**.

## 2. Claims removed

Orchard holds no organic certification that could be verified, so certification-
dependent and superlative language was removed from branding, titles, headings,
metadata, body copy, schema and social metadata.

| Legacy wording | Where it appeared | Action | Replaced with |
| --- | --- | --- | --- |
| "Organic" (eggs, chicken, brand) | Title tag, meta description, H1s, nav, product copy | **Removed** | "Farm-fresh", "raised in Los Cabos", "collected fresh" |
| "Huevo orgánico" | Meta description | **Removed** | Site is English-first; no organic claim |
| "Free-range" | Eggs, chicken pages | **Removed** | "The birds live outdoors under decades-old mango trees" — descriptive and checkable |
| "Hormone-free" / "no hormones ever" | Eggs, chicken, feed | **Softened** | "Raised without added hormones" — accurate and defensible |
| "Kosher-style processing" / "ethical slaughter (kosher-style)" | Chicken, All In | **Removed** | Implies religious certification the farm does not hold |
| "100% Natural" | Feed page | **Removed** | Ingredients are listed instead, which is stronger |
| "The only poultry farm in Los Cabos that produces 100% of its own feed" | Chicken page | **Removed** | "We formulate and mill our own feed" — the true part, without the unprovable superlative |
| "nutritional value that mass-produced eggs simply can't match" | Eggs page | **Removed** | Unsupported nutritional claim |
| "Organic Chicken Manure Fertilizer" | Fertiliser page | **Renamed** | "Composted chicken manure" |
| "Ideal for … chemical-free agriculture" | Fertiliser page | **Removed** | Unverifiable |

The About page states plainly that Orchard is not certified organic and why the
word was removed. That is deliberate: it converts a liability into the brand's
strongest differentiator ("No certificates. Just the farm, and what we actually
do on it.").

**Still to check (owner):** the physical egg-carton label photographed on the site
reads "100% NATURAL", "HORMONE-FREE", "100% LOCAL". The website no longer makes
those claims, but the packaging still does. Worth reviewing on the next print run.

## 3. Claims kept, because they are defensible

Each of these came from the old site's own description of the operation:

- Located in the Mango Fields area of San José del Cabo, minutes from SJD airport
- Birds raised outdoors under decades-old mango trees
- Feed formulated and milled on the farm — corn, wheat bran, soybean meal,
  scratch grains, ginger, turmeric, garlic, onion, oregano
- No added hormones; no artificial additives or preservatives in the feed
- Eggs collected by hand; natural shell-colour variation
- Poultry vacuum-sealed
- Delivery across Los Cabos
- Farm open to families and school groups by appointment
- School programme: ~3h15, built for 15–30 students, minimum 15, 8 days notice,
  50% deposit

## 4. Pricing — why none is published

| Source page | Legacy figure | Problem |
| --- | --- | --- |
| Chicken | "per whole chicken (2–2.5 kg): $199 MXN … + tax **per kg**" | Contradicts itself: per bird or per kg? |
| Chicken (hen) | "per hen (2–3 kg): $289 MXN + tax **per kg**" | Same contradiction |
| Education | "$550 MXN por alumno **o** $600 pesos" | Two different prices for one product |
| Eggs, feed, fertiliser, hens, chicks | Various | Internally consistent, but every USD conversion implies roughly 18 MXN/USD — a stale rate |

Publishing any of it would mean publishing a guess. Every commercial path now
routes to WhatsApp with "request today's pricing", which is also how the business
actually operates. The full extracted legacy price list was delivered to the owner
separately; it is **not** in this public repository.

## 5. The `/all-in` page

`/all-in` was publicly indexed and contained a **named, client-specific commercial
proposal**: a build-and-operate poultry programme for a named Los Cabos hospitality
business, including capital investment and monthly operating figures, projected
output, an implementation timeline and a closing pitch.

That is confidential commercial material and it was reachable by anyone, including
that client's competitors. It has been removed from the public site.

- The page is **not** reproduced anywhere in this repository (public).
- `/all-in` now redirects to `/hospitality/` — the intent genuinely matches, since
  the underlying capability is a custom poultry programme for a hospitality property.
- The capability survives publicly as **"Custom poultry and farm programmes"** on
  `/hospitality/`: no figures, no client, no timeline, and an explicit note that
  such programmes are scoped privately and can be discussed under NDA.

## 6. Secondary services — disposition

| Legacy service | Decision | Where it lives now |
| --- | --- | --- |
| Ornamental birds / laying hens for display | Hospitality subsection | `/hospitality/` → Display and amenity flocks |
| Baby chick monthly rental | Hospitality subsection, inquiry-only | `/hospitality/` → folded into amenity flocks |
| Natural balanced feed | Product | `/farm-products/` → Farm-milled poultry feed |
| Chicken manure fertiliser | Product | `/farm-products/` → Composted chicken manure |
| Technical visits / consulting | Hospitality subsection | `/hospitality/` → Technical visits and flock consulting |
| Custom farm implementation (ex-All In) | Hospitality subsection, generic | `/hospitality/` → Custom poultry and farm programmes |

None of these are in primary navigation. All remain reachable and sellable.

## 7. Imagery

| Asset | Verdict |
| --- | --- |
| Eggs in a wooden bowl under the trees (5712×4284) | **Kept** — hero and About |
| Egg tray held in hand, blue-green + brown (3023×3260) | **Kept** — featured product |
| Wooden crate with Orchard label and twine (1653×1284) | **Kept** — hospitality |
| Kraft carton with label on grass (4032×3024) | **Kept** — farm experience |
| Raw vacuum-sealed chicken on a weighing scale | **Dropped** — unappetising, poor lighting; not fit for the brand |
| Engraved-poultry logo badge | **Dropped** — AI-generated look, illegible small, and its strapline claimed "PASTURED POULTRY / NATURAL". See `docs/BRAND.md` |
| Breed reference collage | **Dropped** — a screenshot collage of third-party photos, at least one carrying another site's watermark. Copyright risk |
| WhatsApp icon PNG | **Replaced** with an inline SVG |

**Photography gap (owner action):** every usable Orchard photograph is of eggs.
There are no real photographs of the birds, the farm, the mango trees, the mill,
the people, or a visit in progress. The site is designed to work without them —
typography and space carry the pages that have no image — but real photographs of
those subjects would materially improve it. No AI imagery was generated to fill
the gap, and none should be. A suggested shot list is in the handoff report.

## 8. Open conflicts across the business's own channels (2026-08-21)

The Facebook page and the Google Business Profile were found after launch. Both
carry business facts, and they do not fully agree with each other or with the
site. The owner confirmed items 1–3; items 4–5 are **unresolved** and are
deliberately not guessed at on the site.

| # | Fact | Website | Facebook page | Google Business Profile | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Pickup | ~~By appointment~~ → **Daily 9am–4pm at the farm** | "Recoge diario 9–5" | "Cierra a las 5 p.m." | ✅ Owner: **9am–4pm daily, farm only**. Site updated. Facebook and Google still say 5pm. |
| 2 | Delivery | ~~"Across Los Cabos"~~ → **Every Tuesday** | "Entregas mar/jue" | — | ✅ Owner: **Tuesdays**. Site updated. Facebook still says Tue/Thu. |
| 3 | Email | `huizahesanjose@gmail.com` | `razzielhall@live.com.mx` | — | ✅ Owner: use the Gmail. Facebook differs. |
| 4 | **Phone** | 624 217 0064 | 624 217 0064 | **624 119 8107** | ❌ **UNRESOLVED.** Two different numbers. The site keeps 624 217 0064 (two sources agree, and it is the WhatsApp number the owner confirmed). |
| 5 | **Location name** | "Mango Fields area" | "cerca del Palenque de San Bernabé"; "Villa Bonita, Costa Dorada, San Carlos" | "Agua Verde, Buenos Aires, 23436" | ❌ **UNRESOLVED.** The site keeps the Mango Fields wording, which came from the old Wix copy. |
| 6 | Product range | Whole poultry | "Pollo local **y cortes**", frozen same day | — | ⏳ Owner is sending a full price list; chicken cuts are not yet on the site. |

**Why this matters beyond tidiness:** Google weighs name/address/phone
consistency across a business's listings for local ranking. Two different phone
numbers and two different location descriptions across three properties actively
work against `farm fresh eggs Los Cabos`-type queries. Resolving items 4 and 5
is the single highest-value local-SEO action left.

The verified Google Business Profile data **is** now used: the exact coordinates
(23.13483, -109.7065779), the postal code and the listing permalink all appear in
the LocalBusiness schema, and "Open in Google Maps" points at the real listing.

No `aggregateRating` was added. The listing shows 5.0 but the review count was
not visible without signing in, and a rating without a verifiable count is
exactly the kind of fabricated signal this project refuses to publish.
