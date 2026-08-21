/**
 * Legacy Wix URL map. Every path below existed in the Wix pages-sitemap on
 * 2026-08-21 and is redirected to the most contextually relevant new page —
 * never blanket-redirected to the homepage.
 *
 * GitHub Pages cannot emit server-side 301s, so each entry builds a stub page
 * carrying `<link rel="canonical">` to the destination plus an instant meta
 * refresh. Google consolidates these the same way it consolidates a 301.
 * See docs/REDIRECTS.md for the reasoning per URL.
 */
export interface LegacyRedirect {
  /** Legacy path, no leading or trailing slash. */
  from: string;
  /** New destination path. */
  to: string;
  /** Why this destination, for the audit trail. */
  reason: string;
}

export const redirects: LegacyRedirect[] = [
  { from: 'eggs', to: '/farm-products/', reason: 'Egg product page — now a product block on Farm Products.' },
  { from: 'the-best-chicken-in-los-cabos', to: '/farm-products/', reason: 'Whole poultry product page — now a product block on Farm Products.' },
  { from: 'natural-balanced-feed', to: '/farm-products/', reason: 'Feed is sold by the sack — retained as a Farm Products line.' },
  { from: 'chicken-manure-fertilizer', to: '/farm-products/', reason: 'Composted fertiliser is sold by the bag — retained as a Farm Products line.' },
  { from: 'orchard-education', to: '/farm-experience/', reason: 'School/education programme — now the school programme on Farm Experience.' },
  { from: 'laying-hens-for-display', to: '/hospitality/', reason: 'Was explicitly "for Villas or Hotel amenities" — now the amenity-flocks programme.' },
  { from: 'baby-chicks-monthly-rental', to: '/hospitality/', reason: 'Display/amenity offering for properties — folded into amenity flocks.' },
  { from: 'technical-visit', to: '/hospitality/', reason: 'B2B flock consulting for hotels and farms — now a hospitality programme.' },
  { from: 'all-in', to: '/hospitality/', reason: 'Client-specific proposal removed from public view; the generic capability lives on as Custom poultry and farm programmes.' },
];
