# Analytics

## Status

The legacy Wix site carried **no analytics tag of any kind** — no GA4, no GTM, no
Universal Analytics. There is no historical data to migrate; measurement starts
from the 2026-08-21 property.

| Item | Status |
| --- | --- |
| GA4 property | ✅ **Orchard Los Cabos** |
| Measurement ID | ✅ `G-VH6X5MBFQS` |
| Wired into the build | ✅ repo variable `PUBLIC_GA4_ID` |
| Tag on the deployed site | ✅ loads once, production host only |
| Events reaching the property | ✅ verified live — `npm run ga-check` |
| Key events marked as conversions | ⚠️ owner action, see below |

## How the ID gets in

The Measurement ID lives in the repository variable `PUBLIC_GA4_ID`
(**Settings → Secrets and variables → Actions → Variables**), which the deploy
workflow passes to the build. It is not a secret — it ships in the page — but
keeping it out of the source means a fork or a preview never inherits it.

Locally, put it in a git-ignored `.env` file.

## The production-host gate

The tag is injected at runtime and only when the hostname is `orchardcabo.com`
or a subdomain of it:

```js
var onProdHost =
  location.hostname === analyticsHost || location.hostname.endsWith('.' + analyticsHost);
var gaActive = Boolean(gaId) && isProd && onProdHost;
```

This exists because the review preview is a byte-for-byte copy of the production
build served from `github.io`. Without the gate it would report itself as
orchardcabo traffic and corrupt the property from day one. Local builds and forks
are covered by the same check. Wherever the tag is inactive, events still go to
`window.dataLayer`, so the test harnesses work everywhere.

Verify both halves at once:

```bash
npm run ga-check
```

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
| `instagram_click` | Instagram link in the footer | `cta_location` |
| `facebook_click` | Facebook link in the footer | `cta_location` |
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
