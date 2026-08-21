# Brand notes

## Positioning

A distinctive local agricultural brand from Baja California Sur: premium, warm,
local, credible, editorial, quiet. Not a wellness startup, not a petting zoo, not
a western ranch, not a hotel website, not a Wix template.

The brand argument is **evidence over adjectives**. Orchard cannot say "certified";
it can say where the birds live, what they eat, who mills the feed, how fast the
eggs arrive, and that you may come and look. The homepage says this outright:
*"No certificates. Just the farm, and what we actually do on it."*

## Logo

The legacy site used an engraved-poultry badge — rooster, hen, duck and chick in a
laurel arch over "ORCHARD / PASTURED POULTRY / LOS CABOS / LOCAL · FRESH · NATURAL".
It was retired, for three reasons:

1. It carried claims (`PASTURED POULTRY`, `NATURAL`) that the claims audit removed
   from everywhere else. A logo is the one place a claim can never be qualified.
2. Its detail collapses below about 64px — unusable as a favicon or an avatar.
3. Its execution reads as AI-generated, which is precisely the impression the
   brand needs to avoid.

The mark is now a **typographic lockup**: `Orchard` in Fraunces over `LOS CABOS`
in letterspaced caps (`src/components/Logo.astro`). It works in the header, in the
footer, at 20px on mobile, in one colour, and on a dark ground.

The favicon is a simple egg form in eggshell on deep green — legible at 16px,
recognisable as both an egg and the "O".

## Colour

Sampled from the farm's own photographs, not chosen from a palette.

| Token | Value | Where it comes from |
| --- | --- | --- |
| `--paper` | `#f8f4ed` | Eggshell — the cream shells in the bowl |
| `--paper-deep` | `#efe8db` | Same, a shade deeper, for alternating bands |
| `--ink` | `#22201c` | Warm charcoal, never pure black |
| `--green-deep` | `#333c31` | Mango leaf in shade |
| `--clay` | `#9d5c39` | The deep brown eggs / dry Baja earth — the single accent |
| `--shell` | `#c3d2cb` | The pale blue-green araucana shells |

`--clay` is the only accent and is reserved for primary action. When everything is
quiet, one warm colour is enough to point at the thing that matters.

## Type

Two families, both justified:

- **Fraunces** (variable, Latin subset, 67 KB, self-hosted, preloaded) for
  display. An old-style serif with warmth and a little wonk — agricultural
  without being rustic pastiche.
- **System sans** (`ui-sans-serif`/`system-ui`) for body text. Zero network cost,
  zero CLS, renders instantly, and reads well at small sizes on every device.

Only one webfont is loaded, and only for headings. The `@font-face` carries
`ascent-override`/`descent-override` tuned against the Georgia fallback so the
swap does not shift layout.

## Layout and motion

Editorial: generous space, hairline rules, numbered indexes rather than card
grids, real photographs at large size, and text set to a comfortable measure.

Deliberately absent: sliders, carousels, glassmorphism, heavy rounded cards,
decorative gradients, icon sets, scroll animation. Motion is limited to hover
transitions and the menu, and `prefers-reduced-motion` disables it.

Where there is no honest photograph, the page uses type and space rather than
stock or AI imagery. That is a brand rule, not a temporary workaround.

## Voice

Plain, specific, unhurried, a little dry. Concrete nouns. No mission-statement
language, no exclamation marks, no "passion". Claims are only made where they can
be checked — the strongest thing this business can say is *come and look*.
