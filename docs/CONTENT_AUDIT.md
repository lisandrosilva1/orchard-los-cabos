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

### Second photography round (August 2026) — gap closed

The owner supplied ten further photographs, which changed what the site could be.
The design was rebuilt around them:

| Asset | Used as |
| --- | --- |
| `hero-basket-sea-of-cortez.jpg` | **Homepage hero.** A basket of Orchard eggs on marble above the Sea of Cortez at first light — farm, luxury and Los Cabos in one frame |
| `flock-golden-hour.jpg` | Full-bleed plate on the homepage; About page opener |
| `hands-holding-eggs.jpg` | Farm Experience opener; homepage tile |
| `hands-holding-farm-feed.jpg` | The feed section — visual proof of the "we mill our own feed" claim |
| `eggs-basket-villa-marble.jpg` | Hospitality opener |
| `eggs-ceramic-bowl-villa.jpg` | Hospitality feature |
| `carton-of-sage-eggs.jpg` | Farm Products opener; homepage egg feature |
| `hens-at-the-waterer.jpg` | Farm Experience feature |

Still no AI imagery, and none should ever be added.

**Not yet on the site (owner action):** the vacuum-sealed product photographs
(breasts, wings, whole birds with weight labels) and the plated quail dish would
strengthen Farm Products and Hospitality considerably. They were shared as chat
images but not as files, so they could not be processed. Drop them in a folder
and they can be added.

## 8. Cross-channel conflicts (raised and resolved 2026-08-21)

The Facebook page, the Google Business Profile and a current price list all
surfaced after launch. Each carried business facts, and they disagreed with each
other and with the site. Every one was put to the owner rather than guessed at.

| # | Fact | Was on the site | Resolved to | Status |
| --- | --- | --- | --- | --- |
| 1 | Pickup | "By appointment" | **Daily, 9am–5pm, at the farm** | ✅ Site updated. Matches Google and Facebook. |
| 2 | Delivery | "Across Los Cabos" | **Tuesdays only** | ✅ Site updated. Facebook still says Tue/Thu. |
| 3 | Email | `huizahesanjose@gmail.com` | Keep the Gmail | ✅ Facebook still shows a different address. |
| 4 | Phone | 624 217 0064 | **624 217 0064** | ✅ Google Business Profile still shows 624 119 8107 and needs correcting there. |
| 5 | Location | "Mango Fields area" | **Agua Verde, Buenos Aires, San José del Cabo** | ✅ Site now matches the Google listing exactly, including in the schema. |
| 6 | Product range | Whole poultry only | **Cuts, stewing hen and broth added** | ✅ Published with prices. |
| 7 | School price | Nothing published | **$550 MXN per student** | ✅ The old site said "$550 or $600"; the owner confirmed $550. |

The "Mango Fields" wording came from the Wix site and was simply wrong. Name,
address and phone now agree between the website and the Google Business Profile,
which is what local ranking actually rewards.

## 9. What is deliberately NOT published

**The bank account on the price list.** The owner's flyer carries a bank name, an
account holder's full name and a 16-digit account number, above a footer reading
`WWW.ORCHARDCABO.COM`. None of it is on the site or in this repository, which is
public. The site says transfer details are sent when an order is placed.

A published account number is the raw material for supplier-impersonation fraud:
the flyer gets forwarded, someone swaps the number, and the customer pays a
stranger believing they paid the farm. This was flagged to the owner for the
flyer itself, not just for the website.

**"Orgánico" and "de libre pastoreo" from the price list.** The flyer titles every
line that way. The prices published are exactly the flyer's; the product names are
not. See §2 — this is the same rule that governs the rest of the site, and it does
not get an exception because the words arrived on a different document.

**Any `aggregateRating`.** The Google listing shows 5.0, but the review count was
not verifiable without signing in. A star rating without a real count is a
fabricated signal.
