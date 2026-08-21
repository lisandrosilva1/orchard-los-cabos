# Deployment

Static build → GitHub Actions → GitHub Pages → `https://www.orchardcabo.com/`.

Push to `main` and `.github/workflows/deploy.yml` type-checks, builds and
deploys. There is no other deploy path and nothing is uploaded by hand.

## Canonical host

`https://www.orchardcabo.com/` — **www**, not the apex.

This preserves what the domain already does: the apex has 301-redirected to www
for as long as the Wix site has been live, so www holds whatever search equity
exists. `astro.config.mjs` sets `site` to the www origin, and every canonical,
`og:url` and sitemap entry follows from it. `public/CNAME` tells GitHub Pages the
same thing, which makes Pages 301 the apex to www automatically.

## DNS

### Before (Wix), captured 2026-08-21

| Type | Name | Value |
| --- | --- | --- |
| NS | `orchardcabo.com` | `ns10.wixdns.net`, `ns11.wixdns.net` |
| A | `orchardcabo.com` | `185.230.63.171`, `185.230.63.107`, `185.230.63.186` |
| CNAME | `www` | `cdn1.wixdns.net` |
| SOA | `orchardcabo.com` | `ns10.wixdns.net support.wix.com` |

**Verified absent: no MX, no TXT, no SPF, no DKIM, no DMARC, no CAA.**

```
dig @8.8.8.8 +short orchardcabo.com MX     # empty
dig @8.8.8.8 +short orchardcabo.com TXT    # empty
dig @8.8.8.8 +short _dmarc.orchardcabo.com TXT   # empty
```

No email is hosted on this domain — the business uses a Gmail address. So the
cutover carries **no risk to mail**, because there is no mail configuration on the
domain to break. That is a finding, not an assumption: re-run the three commands
above immediately before making the change and confirm they are still empty.

### After (GitHub Pages)

| Type | Name | Value | Action |
| --- | --- | --- | --- |
| A | `orchardcabo.com` | `185.199.108.153` | **replace** the three Wix A records |
| A | `orchardcabo.com` | `185.199.109.153` | add |
| A | `orchardcabo.com` | `185.199.110.153` | add |
| A | `orchardcabo.com` | `185.199.111.153` | add |
| AAAA | `orchardcabo.com` | `2606:50c0:8000::153` | add (optional but recommended) |
| AAAA | `orchardcabo.com` | `2606:50c0:8001::153` | add |
| AAAA | `orchardcabo.com` | `2606:50c0:8002::153` | add |
| AAAA | `orchardcabo.com` | `2606:50c0:8003::153` | add |
| CNAME | `www` | `lisandrosilva1.github.io` | **replace** `cdn1.wixdns.net` |
| NS | `orchardcabo.com` | unchanged | **do not touch** |

Nothing else changes. If any MX, SPF, DKIM, DMARC or verification TXT record has
appeared since this was captured, **leave every one of them exactly as it is** —
this change touches web hosting records only.

### Notes on doing it in Wix

Wix manages the nameservers, so the records are edited in
**Wix → Domains → orchardcabo.com → DNS Records (Advanced)**.

If Wix will not let the A/CNAME records be edited, it is because the domain is
still *connected to the Wix site*. Disconnect the site from the domain first
(Domains → the domain → Disconnect / "Assign to a different site"), which frees
the records, then apply the table above. Do not delete the domain, and do not
transfer it.

## Cutover: what was actually done

Applied 2026-08-21 via the Wix Domain DNS API (`PATCH /domains/v1/dns-zones/orchardcabo.com`),
after re-confirming that MX, TXT, CAA, DMARC and DKIM were all still empty.

```
DELETED   A      orchardcabo.com       185.230.63.107
DELETED   CNAME  www.orchardcabo.com   pointing.wixdns.net
ADDED     A      orchardcabo.com       185.199.108.153 185.199.109.153
                                       185.199.110.153 185.199.111.153
ADDED     CNAME  www.orchardcabo.com   lisandrosilva1.github.io
UNTOUCHED NS, SOA, and CNAME es.orchardcabo.com
```

Propagation was effectively immediate on Google, Cloudflare and Quad9. GitHub's
own domain check then reported `is_valid: true`, `is_served_by_pages: true` and
`has_mx_records_present: false` for both the apex and www.

> A stale **local** resolver cache will keep sending you to Wix long after the
> change is live. Verify with `dig @8.8.8.8`, not with your own machine's cache.

### Leftover: `es.orchardcabo.com`

The zone also contains `CNAME es.orchardcabo.com → cdn1.wixdns.net`, a Spanish
subdomain that predates this project. It was never in the Wix sitemap and today
returns a Wix "ConnectYourDomain Error" page. It was deliberately left untouched
— removing it is a one-line change whenever the owner wants it gone.

## Cutover order

1. Deploy to GitHub Pages and confirm the build is green.
2. Re-run the three `dig` commands above; confirm MX/TXT are still empty.
3. Apply the DNS changes.
4. Wait for propagation (Wix TTLs are ~30 min; allow up to a few hours).
5. In **repo → Settings → Pages**, confirm the custom domain reads
   `www.orchardcabo.com` and the DNS check passes.
6. Wait for GitHub to issue the Let's Encrypt certificate, then tick
   **Enforce HTTPS**. This is greyed out until the certificate exists — that is
   normal and can take up to an hour after DNS resolves.
7. Verify:

```bash
curl -sI https://www.orchardcabo.com/            # 200
curl -sI https://orchardcabo.com/                # 301 -> https://www.orchardcabo.com/
curl -sI http://www.orchardcabo.com/             # 301 -> https
curl -s https://www.orchardcabo.com/robots.txt
curl -s https://www.orchardcabo.com/sitemap.xml
QA_BASE=https://www.orchardcabo.com npm run audit
QA_BASE=https://www.orchardcabo.com npm run events
```

## Rollback

Restore the four DNS records in the "Before" table. The Wix site is not deleted
by any of this, so it comes back as soon as the records propagate.

## Search Console

Use a **Domain property** for `orchardcabo.com` (covers apex, www and both
protocols). Verification is a TXT record on the apex — **add it, do not replace
anything**, and keep it forever. Then submit
`https://www.orchardcabo.com/sitemap.xml`.

## Environment variables

| Name | Where | Purpose |
| --- | --- | --- |
| `PUBLIC_GA4_ID` | Repo → Settings → Variables → Actions | GA4 Measurement ID. Unset = no tag emitted, which is safe. |

There are no secrets in this repository and the build needs none.
