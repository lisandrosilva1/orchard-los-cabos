# Analytics

## Status

The legacy Wix site carried **no analytics tag of any kind** — no GA4, no GTM, no
Universal Analytics. There is therefore no historical data and no property to
reuse. Creating the GA4 property needs the owner's Google account, so it is a
manual step; everything on the site side is already built and tested.

| Item | Status |
| --- | --- |
| Event layer implemented | ✅ built and verified |
| Events proven to fire with correct params | ✅ `npm run events` |
| GA4 property + web stream | ⚠️ **owner action** — see below |
| Measurement ID wired into the build | ⚠️ waiting on the ID |

## Turning measurement on

1. In Google Analytics, create a property named **Orchard Los Cabos**
   (Mexico / `America/Mazatlan` / MXN) with a **Web** data stream for
   `https://www.orchardcabo.com`. Copy the `G-XXXXXXXXXX` Measurement ID.
2. In GitHub: **Settings → Secrets and variables → Actions → Variables →
   New repository variable**, named `PUBLIC_GA4_ID`, value `G-XXXXXXXXXX`.
3. Re-run the **Build and deploy** workflow (or push any commit).

Nothing else changes. Until that variable is set the tag is simply not emitted —
the site stays clean rather than shipping a broken tag.

Locally, `PUBLIC_GA4_ID` can go in a `.env` file (git-ignored).

## How the event layer works

One inline script in `<head>` (`src/components/Analytics.astro`) does all of it:

- **Explicit events** — any link or button carrying `data-evt="event_name"`
  fires that event on click. `data-cta`, `data-service` and `data-product`
  become parameters.
- **Implicit events** — `tel:` links fire `phone_click`, `mailto:` links fire
  `email_click`, `wa.me` links fire `order_whatsapp_click`, Instagram links fire
  `instagram_click`, and Google Maps links fire `directions_click`, even with no
  attributes on them. Adding a contact link anywhere makes it measurable
  automatically.
- **`product_view`** — an IntersectionObserver fires once per product block when
  it becomes 50% visible.

No component ships its own analytics code, and there is exactly one tag on the
page. `npm run audit` fails the build if a second one ever appears.

When no Measurement ID is configured, events are pushed to `window.dataLayer`
instead, so the layer stays fully testable before the property exists. In `dev`
they are also logged to the console.

## Events

| Event | Fires when | Key parameters |
| --- | --- | --- |
| `order_whatsapp_click` | Any WhatsApp order CTA | `cta_location`, `product` |
| `farm_visit_click` | Any "visit the farm" CTA | `cta_location` |
| `school_visit_inquiry` | School-group enquiry CTAs | `cta_location` |
| `hospitality_inquiry` | Any B2B / hospitality CTA | `cta_location`, `service` |
| `phone_click` | `tel:` link | `cta_location` |
| `email_click` | `mailto:` link | `cta_location` |
| `directions_click` | "Get directions" | `cta_location` |
| `product_view` | Product block 50% visible | `product` |
| `instagram_click` | Instagram link | *(no Instagram link exists yet — wired and ready)* |
| `form_start` / `form_submit` | **Not implemented — there is no form** | — |

Every event also carries `page_path` and `language`.

> **On forms:** the site deliberately has none. Every enquiry opens WhatsApp,
> the phone dialler or email. That removes a third-party form backend, a spam
> surface and a privacy disclosure, and matches how the business actually
> answers. If a form is added later, `form_start` / `form_submit` should be
> wired with the same `data-evt` mechanism.

### `cta_location` values

`header`, `mobile_menu`, `hero`, `home_feature`, `home_experience`,
`home_hospitality`, `home_location`, `products_header`, `products_how`,
`products_cross`, `product_block`, `experience_header`, `experience_family`,
`experience_school`, `hospitality_header`, `hospitality_start`,
`programme_block`, `cta_band_*`, `footer`, `floating`, `thank_you`.

This is what makes the data worth having: it answers *which* WhatsApp button
earns the conversation, not just how many.

## Key events (conversions)

Mark these as key events in GA4 (Admin → Events):

1. `order_whatsapp_click` — the primary commercial action
2. `hospitality_inquiry` — highest-value B2B lead
3. `school_visit_inquiry` — highest-value group booking
4. `farm_visit_click`
5. `phone_click`

## Testing

```bash
npm run preview                 # in one shell
npm run events                  # in another
```

It prints every event fired per page with its parameters. Against production:

```bash
QA_BASE=https://www.orchardcabo.com npm run events
```

In GA4 itself, use **Admin → DebugView** with the GA Debugger extension, or
**Reports → Realtime**, and click through: hero Order, a product's "Request
availability", a hospitality "Enquire", the footer phone number.

## Internal traffic

Add a GA4 internal-traffic filter (Admin → Data Streams → Configure tag settings
→ Define internal traffic) for the farm's own IP, and set the filter to **Active**
— not "Testing". A filter left in Testing does nothing.

## UTM conventions

Keep them lowercase and boring:

| Parameter | Use |
| --- | --- |
| `utm_source` | The referring property, e.g. `loscabosdiscoverynetwork`, `instagram`, `qr-carton` |
| `utm_medium` | `referral`, `social`, `print`, `email` |
| `utm_campaign` | Lowercase-hyphenated, e.g. `hotel-supply-2026`, `school-season` |
| `utm_content` | Which specific link, e.g. `footer-badge`, `sidebar-card` |

**Los Cabos Discovery Network:** Orchard is the first business featured on the
network, and the footer carries a discreet "Featured by Los Cabos Discovery
Network" line. Attribution is measured on **inbound** links — the network should
link to Orchard as:

```
https://www.orchardcabo.com/?utm_source=loscabosdiscoverynetwork&utm_medium=referral&utm_campaign=network-directory&utm_content=orchard-listing
```

That keeps the referral measurable without any cross-domain tracking, shared
code, or technical dependency between the two sites — which is the point.
