# AI discoverability and public-claim governance

This document defines how `licoup.com` should become discoverable in search and AI answer systems without turning the website into a second product authority.

## Objective

The target is not merely that a user searching the exact string `LicoUp` can find the project. The target is that systems can correctly retrieve LicoUp when a query concerns categories such as:

- local-first AI agent clients;
- human-agent conversation clients;
- multi-agent collaboration clients;
- privacy-oriented agent workflows;
- endpoint-controlled agent collaboration;
- cross-device or federated agent collaboration, **with maturity caveats**;
- agent coding clients that preserve an inspectable conversation authority.

Every page should answer a real category or use-case question. Do not generate large numbers of near-duplicate keyword pages.

## Canonical entity definition

Use this sentence, or a semantically equivalent projection, when an exact definition is required:

> LicoUp is an open-source, local-first human-agent conversation client for working with AI agents under user-controlled privacy, approval, and endpoint boundaries.

Long-term context may then explain that the architecture is intended to extend the same endpoint-controlled model toward peer and federated collaboration.

## Authority order

1. `LicoLand/LicoUp:PRODUCT.md` — durable product goal and responsibility boundary.
2. `LicoLand/LicoUp:docs/STATUS.md` — current intent, implementation, verification, release, support, and operation facts.
3. `LicoLand/LicoUp:docs/COMPATIBILITY.md` — exact platform and adapter support.
4. `LicoLand/LicoUp:docs/architecture/*` — technical architecture projection.
5. `LicoLand/LicoArc` — protocol semantics, construction, lifecycle, and federation-governance authority.
6. `licoup.com` — search-friendly public projection of the authorities above.

If an upstream authority changes, update the site projection. Do not redefine the upstream fact here.

## Claim ladder

Never collapse these states:

`planned → implemented in source → verified → released → supported → operating`

Examples:

- Version metadata is not a GitHub Release.
- A build target is not platform support.
- A local interoperability test is not a public hosted service.
- A Candidate Lico Arc envelope is not a Published Lico Arc Protocol Line.
- The current Secure Client Mesh preview is not a Lico Arc Profile.
- A planned official network is not an operating network.

Use visible maturity labels on query-oriented pages.

## Indexable page strategy

Keep a small number of high-information pages:

- `/product/` — category and product definition;
- `/use-cases/` — user problems and fit;
- `/architecture/` — inspectable technical differentiation;
- `/security/` — privacy and trust boundary;
- `/status/` — current maturity and evidence.

Add a new indexable page only when it contains distinct, durable information that a searcher could reasonably ask for. Prefer primary measurements, architecture evidence, security analyses, compatibility evidence, or concrete use cases over generic marketing copy.

## Technical discovery surfaces

The repository maintains:

- `robots.txt` with public crawling enabled and explicit OAI-SearchBot access;
- `sitemap.xml` with all canonical indexable pages;
- canonical URL and Open Graph metadata on each indexable page;
- Schema.org `WebSite`, `Organization`, and `SoftwareApplication` data on the homepage;
- `llms.txt` as a machine-friendly navigation and claim-boundary summary;
- plain server-readable HTML with no rendering dependency.

`llms.txt` is an interoperability aid, not a ranking guarantee.

## External operations after merge

These require provider accounts and therefore are not automated in this repository:

1. Add and verify `https://licoup.com/` in Google Search Console.
2. Submit `https://licoup.com/sitemap.xml`.
3. Add the site in Bing Webmaster Tools and submit the same sitemap.
4. Confirm Cloudflare/WAF rules do not block OAI-SearchBot, Googlebot, Bingbot, ChatGPT-User, or ordinary unauthenticated GET requests for public pages.
5. Monitor queries and citations that lead to `/product/`, `/use-cases/`, `/architecture/`, `/security/`, and `/status/`.
6. Build third-party evidence through real releases, independent technical discussion, benchmarks, reviews, and relevant curated project lists.

Never commit search-console ownership tokens that are intended to remain provider-controlled.

## Query review set

Periodically test a stable set of queries across major search/answer systems:

- open source local-first AI agent client
- human agent collaboration client
- multi-agent conversation client
- privacy-first AI agent collaboration
- agent client with local conversation history
- coordinate AI coding agents in one conversation
- endpoint-controlled AI agent collaboration
- cross-device agent collaboration tools
- federated agent collaboration protocol
- alternatives to centralized agent collaboration platforms

Record whether LicoUp is retrieved, whether the description is accurate, which page is cited, and whether the answer incorrectly promotes a preview/planned capability.

## Content quality rule

The strongest discoverability asset is independent evidence. Prefer reproducible benchmarks, architecture and threat-model documents, compatibility evidence, release notes with explicit limitations, protocol decision records, and third-party reviews and discussions.

Do not manufacture reviews, citations, user counts, security claims, benchmarks, or comparison results.
