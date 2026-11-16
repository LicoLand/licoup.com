# licoup.com

Updated: 2026-11-17

Public product website for LicoUp, a secure conversation experience shared by
people and agents. The current local-agent client is its first implementation
phase. Product facts remain owned by the
[LicoUp repository](https://github.com/LicoLand/LicoUp).

The download entry points to the Apple silicon macOS DMG in the public
[v0.1.2 GitHub Release](https://github.com/LicoLand/LicoUp/releases/tag/v0.1.2).
That release does not establish availability on other platforms, in the App
Store, or on an operating official network. Full Lico Arc endpoint integration
remains future work. The website brings the available download and current agent setup requirements
together in one compatibility overview at `/status/`. Homepage answers and
guides use that same summary, grounded in the current adapter implementation
and verification evidence.

## Website

The site is static HTML, CSS, and dependency-free JavaScript, with self-hosted
fonts and artwork. The homepage is the client: with JavaScript the whole page is
a working LicoUp-style messenger whose conversations carry the product content,
in Chinese and English (`?lang=zh` or `?lang=en` selects one explicitly, and the
choice is stored locally). Each conversation has its own address, such as
`/#features`. Its replies are scripted and its group conversation is a
labelled concept preview; the site has no analytics, backend calls, or live
agent connection. The product guides retain their English source content.

Without JavaScript the homepage is the same content as a plain document:
product summary, download links, agents, features, roadmap, guides, and FAQ.
That document is also what search engines index. System reduced-motion
settings disable optional motion.

GitHub Pages publishes `docs/` from the main branch; serve it locally with any
static HTTP server (`python3 -m http.server --directory docs`). There is no
build step. [DESIGN.md](DESIGN.md) records the implemented visual system;
[PRODUCT.md](PRODUCT.md) is the website presentation brief and links to product
authorities. Asset origins and font licenses are recorded in
[ASSETS.md](ASSETS.md).

The reviewed Cloudflare BIND import is stored at
`dns/cloudflare-github-pages.txt`. Organization-verification tokens are added
directly in the DNS provider and are never committed. DNS and GitHub Pages
publication remain separate from local website development and verification.

## Public information architecture

The homepage body links directly to eight durable topics: the Human-Agent
Collaboration category, coding-agent interfaces, orchestration versus
collaboration, the product, use cases, architecture, security, and current
compatibility. The guide grid, FAQ answers, and roadmap connect the product
story to those deeper answers. Guide navigation preserves the same information
architecture. Their canonical URLs are indexed by `sitemap.xml` and `llms.txt`,
with crawler access described by `robots.txt`. These pages project product facts
from the LicoUp repository and protocol facts from Lico Arc. They do not replace
those authorities.

## Validation and delivery

Run `python3 tools/check_site.py` to verify canonical pages, metadata, internal
links, sitemap coverage, crawler configuration, and the license projection.
`docs/CNAME` binds the site to `licoup.com`; GitHub Pages publishes `docs/` from
the `main` branch.
This continuously delivered website has no independent product version. Search
and answer-engine content follows the
[discoverability guide](AI-DISCOVERABILITY.md).
