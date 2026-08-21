/**
 * Single source of truth for business facts, contact details and navigation.
 *
 * Every value here was verified against the live orchardcabo.com site during the
 * August 2026 audit. Nothing in this file is invented. See docs/CONTENT_AUDIT.md
 * for provenance and for the claims that were deliberately removed.
 */

export const site = {
  name: 'Orchard Los Cabos',
  shortName: 'Orchard',
  /** Canonical origin. The apex 301s here in production. */
  origin: 'https://www.orchardcabo.com',
  locale: 'en',
  description:
    'A working farm in San José del Cabo producing farm-fresh eggs and poultry, with farm visits for families and schools and recurring supply for hotels, restaurants and villas.',
} as const;

/** Verified from the live site: tel: link and mailto: link (Aug 2026 audit). */
export const contact = {
  /** E.164. Los Cabos landline/mobile area code 624. */
  phoneE164: '+526242170064',
  phoneDisplay: '624 217 0064',
  /** wa.me expects digits only, country code first, no plus. */
  whatsappDigits: '526242170064',
  email: 'huizahesanjose@gmail.com',
  city: 'San José del Cabo',
  region: 'Baja California Sur',
  regionCode: 'BCS',
  country: 'Mexico',
  countryCode: 'MX',
  /** Area-level. See docs/CONTENT_AUDIT.md §8 for the open naming question. */
  areaDescription: 'Mango Fields area, San José del Cabo',
  nearLandmark: 'minutes from Los Cabos International Airport (SJD)',
  postalCode: '23436',
} as const;

/**
 * Trading hours, confirmed by the owner on 2026-08-21.
 *
 * Note this supersedes the old "by appointment only" line: the farm is open for
 * pickup every day. Farm *visits* (the guided experience) are still booked.
 */
export const hours = {
  pickupDays: 'Daily',
  pickupOpen: '09:00',
  pickupClose: '16:00',
  pickupLabel: 'Every day, 9am–4pm',
  deliveryLabel: 'Every Tuesday',
  deliveryDay: 'Tuesday',
} as const;

/**
 * The farm's Google Business Profile. The `cid` form is the canonical, stable
 * permalink for a listing — unlike a /maps/place/ URL, it survives renames and
 * carries no session parameters.
 */
export const maps = {
  url: 'https://maps.google.com/?cid=15984330469735309506',
  latitude: 23.13483,
  longitude: -109.7065779,
  plusCode: '47MV+W9 San José del Cabo',
} as const;

/** Prefilled WhatsApp deep link. `text` is encoded at call time. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${contact.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

/**
 * Social accounts. Only verified, live accounts belong here — a dead link in
 * the footer is worse than no link. Both were confirmed live on 2026-08-21:
 * Instagram (302 followers, bio links back to orchardcabo.com) and the Facebook
 * business page (94 followers, listed as "Página · Mercado de productores",
 * carrying the same 624 217 0064 number as this site).
 *
 * The Facebook URL is the page's own canonical, resolved from the /share/ link
 * the owner supplied. Share links carry tracking parameters and can expire, so
 * they are never what gets published.
 */
export const social = {
  instagram: 'https://www.instagram.com/naturaorchardcabo/',
  instagramHandle: '@naturaorchardcabo',
  facebook: 'https://www.facebook.com/people/Orchard-Los-Cabos/61560310995162/' as string | null,
} as const;

/** Live social profiles, for schema.org sameAs and the footer. */
export const socialLinks: { label: string; href: string; evt: string }[] = [
  ...(social.instagram ? [{ label: 'Instagram', href: social.instagram, evt: 'instagram_click' }] : []),
  ...(social.facebook ? [{ label: 'Facebook', href: social.facebook, evt: 'facebook_click' }] : []),
];

export const nav = [
  { href: '/farm-products/', label: 'Farm Products' },
  { href: '/farm-experience/', label: 'Farm Experience' },
  { href: '/hospitality/', label: 'Hospitality' },
  { href: '/about/', label: 'About' },
] as const;

/**
 * Facts we can defend. Each maps to something the business actually does and
 * that was stated on the previous site. No certifications, no nutrition claims,
 * no superlatives.
 */
export const facts = [
  {
    title: 'Raised in San José del Cabo',
    body: 'The birds live outdoors under decades-old mango trees on our farm in the Mango Fields area — shade, airflow and room to move.',
  },
  {
    title: 'Feed milled on the farm',
    body: 'We formulate and mill our own feed: corn, wheat bran, soybean meal, scratch grains, and herbs and spices including ginger, turmeric, garlic, onion and oregano.',
  },
  {
    title: 'Raised without added hormones',
    body: 'No hormones are added at any point, and no artificial additives or preservatives go into the feed we make.',
  },
  {
    title: 'Collected by hand',
    body: 'Eggs are gathered and sorted by hand, which is why the shells arrive in their natural range of browns, creams and pale blue-greens.',
  },
  {
    title: 'A short local supply chain',
    body: 'From the nesting box to your kitchen is a single short trip across Los Cabos — no distributor, no warehouse, no long haul.',
  },
  {
    title: 'You can come and see it',
    body: 'The farm is open to families and school groups by appointment. Very few food producers can say that, and we think it matters.',
  },
] as const;
