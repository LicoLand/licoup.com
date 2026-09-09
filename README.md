# licoup.com

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
fonts and artwork. The homepage shares markup, interactions, and responsive design across Chinese and English. The product guides retain their English source content and use the same visual system. Use `?lang=zh` or `?lang=en` to select a language explicitly.
Language and motion choices are stored locally; the site has no analytics,
backend calls, or live agent connection. Conversation examples are illustrative.

Navigation, download links, product content, and FAQ work without JavaScript.
Scripted scene selection, language switching, and optional motion are progressive
enhancements. System reduced-motion settings and the page's pause control disable
optional motion.

Serve this directory with any static HTTP server for local preview. There is no
build step. [DESIGN.md](DESIGN.md) records the implemented visual system;
[PRODUCT.md](PRODUCT.md) is the website presentation brief and links to product
authorities. Asset origins and font licenses are recorded in
[assets/README.md](assets/README.md).

The reviewed Cloudflare BIND import is stored at
`dns/cloudflare-github-pages.txt`. Organization-verification tokens are added
directly in the DNS provider and are never committed. DNS and GitHub Pages
publication remain separate from local website development and verification.

## Public information architecture

The homepage body links directly to eight durable topics: the Human-Agent
Collaboration category, coding-agent interfaces, orchestration versus
collaboration, the product, use cases, architecture, security, and current
compatibility. Static value links, problem-led pathways, the primary category guide,
its reading list, and the compact guide directory connect the lively product
story to those deeper answers. Guide navigation preserves the same information
architecture. Their canonical URLs are indexed by `sitemap.xml` and `llms.txt`,
with crawler access described by `robots.txt`. These pages project product facts
from the LicoUp repository and protocol facts from Lico Arc. They do not replace
those authorities.

## Validation and delivery

Run `python3 tools/check_site.py` to verify canonical pages, metadata, internal
links, sitemap coverage, crawler configuration, and the license projection.
`CNAME` binds the site to `licoup.com`; GitHub Pages publishes the `main` branch.
This continuously delivered website has no independent product version; see
[the release profile](docs/releases/README.md). Search and answer-engine content
follows [the discoverability guide](docs/AI-DISCOVERABILITY.md).
