/**
 * Price list — supplied by the owner 2026-08-21, in MXN.
 *
 * Two deliberate departures from the source flyer:
 *
 * 1. Product names drop "Orgánico" and "de Libre Pastoreo". The flyer titles
 *    every line that way, but Orchard holds no organic certification, and the
 *    whole point of the rebuild was to stop making that claim. The prices are
 *    the flyer's; the wording is defensible. See docs/CONTENT_AUDIT.md §2.
 *
 * 2. The flyer's payment section carries a named bank account and a 16-digit
 *    account number. That is NOT reproduced here or anywhere on the site — this
 *    repository is public. Payment details belong in the private conversation
 *    with each customer.
 */

export interface PriceRow {
  name: string;
  detail?: string;
  qty: string;
  /** MXN, collected at the farm. */
  pickup: number;
  /** MXN, delivered. null where delivery does not apply. */
  delivery: number | null;
}

export const eggPrices: PriceRow[] = [
  { name: 'Farm eggs, regular', detail: 'Bring your own basket or paper bag', qty: '12 eggs', pickup: 80, delivery: 110 },
  { name: 'Farm eggs, premium', detail: 'Bring your own basket or paper bag', qty: '12 eggs', pickup: 90, delivery: 120 },
  { name: 'Farm eggs, tray', detail: 'Bring your own basket or bucket', qty: '30 eggs', pickup: 175, delivery: 240 },
  { name: 'Farm eggs, tray — shared-post price', detail: 'Share one of our posts and bring your own basket', qty: '30 eggs', pickup: 155, delivery: 210 },
];

export const poultryPrices: PriceRow[] = [
  { name: 'Whole chicken', qty: 'per kg', pickup: 165, delivery: 215 },
  { name: 'Chicken breast, skin-on', qty: 'per kg', pickup: 250, delivery: 325 },
  { name: 'Chicken breast, skinless', qty: 'per kg', pickup: 295, delivery: 380 },
  { name: 'Leg and thigh', qty: 'per kg', pickup: 165, delivery: 215 },
  { name: 'Wings', qty: 'per kg', pickup: 135, delivery: 175 },
  { name: 'Stewing hen', qty: 'per kg', pickup: 185, delivery: 240 },
  { name: 'Chicken broth', detail: 'Slow-cooked for eight hours', qty: '1 litre', pickup: 85, delivery: 110 },
];

/** Priced on the flyer, but it is an experience rather than a product. */
export const eggExperience = {
  name: 'Collect your own eggs',
  qty: '30 eggs',
  pickup: 300,
  note: 'Adults, and children accompanied by an adult. By appointment.',
} as const;

export const offers: { title: string; body: string }[] = [
  {
    title: '10% off standing deliveries',
    body: 'Weekly deliveries paid a month in advance come with ten percent off.',
  },
  {
    title: '10% off for a referral',
    body: 'Send us someone new and, once they place their first order, your next order is ten percent off and there is a gift from the farm waiting for you.',
  },
];

export const priceNotes = {
  currency: 'All prices in Mexican pesos (MXN).',
  usd: 'Paying in US dollars is fine — ask us for the day’s rate.',
  updated: 'August 2026',
  payment: 'Bank transfer or cash. We send transfer details when you order.',
} as const;
