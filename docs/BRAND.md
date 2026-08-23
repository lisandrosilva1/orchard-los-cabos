# Brand notes

## Positioning

A boutique farm in Baja California Sur that supplies the best tables in
Los Cabos and opens its gate to families. Premium, warm, quiet, tactile — and
unmistakably a *farm*, not a lifestyle label.

The brand argument is **evidence over adjectives**. Orchard cannot say
"certified"; it can say where the birds live, what they eat, who mills the feed,
how fast the eggs arrive, and that you may come and look. The homepage says it
outright: *"No certificates. Just the farm, and what we actually do on it."*

## Why this does not look like Los Cabos Discovery Network

Orchard and the Discovery Network are separate businesses and must read as
separate brands. The first build of this site converged, by accident, on very
nearly the Discovery system — the same Fraunces display face, the same warm
bone/sand neutrals, even the same `#6b6459` muted grey and the same 78rem shell.
Side by side they looked like one company.

The visual layer was rebuilt to share nothing:

| | Discovery Network | Orchard |
| --- | --- | --- |
| Ground | Light — bone `#fcfaf6`, sand `#f2ece1` | **Dark — forest ink `#0e120e`** |
| Display face | Fraunces | **Cormorant** |
| UI face | Inter | **Jost** (geometric) |
| Accent | Sea green, used sparingly | **Ember `#bf7238`**, clay, sage |
| Structure | Calm symmetric grid, hairline rules, numbered index lists | **Full-bleed photographic plates, oversized display type over image, offset pairs** |
| Feel | Editorial magazine, restrained, light | **Cinematic, immersive, dark, tactile** |

The rule going forward: **if a change would make Orchard look more like
Discovery, it is the wrong change.**

## Colour

Sampled from the farm's own photographs.

| Token | Value | Where it comes from |
| --- | --- | --- |
| `--night` | `#0e120e` | Deep shade under the mango trees — the primary ground |
| `--night-2` | `#151a14` | Elevated dark: footer, cards, CTA band |
| `--ivory` | `#f4efe3` | Eggshell — the light relief bands and primary button fill |
| `--ivory-2` | `#e9e2d0` | A deeper eggshell for alternating light bands |
| `--ember` | `#bf7238` | Russet marans shells / dry Baja earth — the single accent |
| `--sage` | `#a9bba0` | Araucana shell green |
| `--sky` | `#bccfd6` | Araucana shell blue |
| `--clay` | `#d3ab92` | Warm shell tan, used for numerals over photography |

`--ember` is AA on the dark ground but only 3.2:1 on ivory, so the `.light` and
`.light-2` scopes **redefine `--ember` to `#8f5124`**. Every descendant inherits
the accessible value without any component needing to know about it. If you add
a light section, add the class — do not hand-pick a colour.

The primary button is **ivory on dark**, not a coloured fill. On a dark,
photographic page the quietest possible button is also the highest contrast.

## Type

Two self-hosted variable faces, Latin subset only, 62 KB combined:

- **Cormorant** (35 KB) — display. A high-contrast Garamond descendant. Set
  light (300) and large; it is built for display sizes and looks thin and
  under-powered if used small. Never below ~1.2rem.
- **Jost** (26 KB) — UI and body. A geometric sans in the Futura lineage. Wide
  tracking (0.19–0.28em) and uppercase for eyebrows, buttons and nav; normal
  tracking for body copy.

Only Cormorant is preloaded — it renders the LCP heading. Jost loads at normal
priority so it does not compete on the critical path. Both carry
`ascent-override`/`descent-override` tuned to their fallbacks so the swap moves
nothing (CLS is 0 on every page).

## Layout language

- **Stage** — full-viewport photograph, two-axis scrim, display type bottom-left.
- **Plate** — full-bleed photograph with a single statement over it.
- **Duo** — offset image and copy, alternating side.
- **Tiles** — three tall photographs with the section name laid over each.
- **Light bands** — ivory relief where long reading happens.

Photography is structural, not decorative. Text sits *on* images, not beside
placeholder boxes.

Deliberately absent: sliders, carousels, glassmorphism, rounded cards,
decorative gradients, icon sets, drop shadows as ornament.

## Motion

One gentle rise-and-fade on scroll, and a slow scale on tile hover. Both are
gated behind a `.js` class set on `<html>`, so if scripting or the observer
fails the content is simply visible — never stuck invisible. `prefers-reduced-motion`
disables all of it.

## Voice

Plain, specific, unhurried, a little dry. Concrete nouns. No mission-statement
language, no exclamation marks, no "passion". Claims only where they can be
checked — the strongest thing this business can say is *come and look*.
