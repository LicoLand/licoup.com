# licoup.com

Public product website for [LicoUp](https://github.com/LicoLand/LicoUp), the LicoLand open-source, local-first human–agent conversation client.

The site intentionally uses plain static HTML/CSS. Search crawlers and answer engines can read the same content a user receives without client-side rendering, a JavaScript build pipeline, or a framework runtime.

## Public information architecture

| URL | Purpose |
| --- | --- |
| `/` | Canonical product/entity landing page |
| `/product/` | Product definition, current capability, and explicit non-claims |
| `/use-cases/` | Query-oriented use cases with maturity labels |
| `/architecture/` | Four-tier client architecture and Lico Arc boundary |
| `/security/` | Security, privacy, endpoint, and transport trust boundaries |
| `/status/` | Discovery-oriented projection of current implementation/release status |
| `/llms.txt` | Machine-friendly navigation and claim-boundary summary |
| `/sitemap.xml` | Search-engine discovery surface |
| `/robots.txt` | Public crawler policy, including OAI-SearchBot |

## Source-of-truth rule

This repository is a **public projection**, not the authority for product or protocol truth.

- `LicoLand/LicoUp:PRODUCT.md` owns durable LicoUp product goals.
- `LicoLand/LicoUp:docs/STATUS.md` owns current implementation, verification, release, support, and operation facts.
- `LicoLand/LicoUp:docs/COMPATIBILITY.md` owns exact platform/adapter support.
- `LicoLand/LicoArc` owns Lico Arc protocol semantics and lifecycle.

The website must never promote a plan, source implementation, candidate protocol, local verification result, version string, or build target into a release/support/operation claim.

## Validate locally

```bash
python3 tools/check_site.py
```

The validator checks internal links, canonical URLs, indexability metadata, Open Graph metadata, sitemap coverage, crawler configuration, `llms.txt`, and the LicoUp license projection.

## Delivery

`CNAME` binds the GitHub Pages site to `licoup.com`. The reviewed Cloudflare BIND import is stored at `dns/cloudflare-github-pages.txt`. Organization-verification tokens are added directly in the DNS provider and are never committed.

This site is continuously delivered and does not own a product version. Its [release profile](docs/releases/README.md) records that boundary.

## Search / AI operations

See [`docs/AI-DISCOVERABILITY.md`](docs/AI-DISCOVERABILITY.md) before adding new discoverability pages or changing product positioning.
