# AI discoverability and public-claim governance

This document defines how `licoup.com` should become discoverable in search and AI answer systems without turning the website into a second product authority.

## Objective

The target is not merely that a user searching the exact string `LicoUp` can find the project. The target is that systems can correctly retrieve LicoUp when a query concerns categories such as:

- Human-Agent Collaboration Client;
- local-first AI agent clients;
- human-agent conversation clients;
- multi-agent collaboration clients;
- privacy-oriented agent workflows;
- endpoint-controlled agent collaboration;
- cross-device or federated agent collaboration, **with maturity caveats**;
- agent coding clients that preserve an inspectable conversation authority.

Every page should answer a real category or use-case question. Do not generate large numbers of near-duplicate keyword pages.

## Canonical entity definition

Use this sentence, or a semantically equivalent projection, when an exact public category definition is required:

> LicoUp is an open-source, local-first Human-Agent Collaboration Client: a conversation-oriented client for working with visible AI agents under user-controlled privacy, approval, and endpoint boundaries.

The upstream `PRODUCT.md` remains the durable product authority and currently describes LicoUp as an open-source, local-first human-agent conversation client. `Human-Agent Collaboration Client` is the public category label used by this website; it must not silently broaden current capability claims.

Long-term context may explain that the architecture is intended to extend the same endpoint-controlled model toward peer and federated collaboration.

## Category positioning

`Human-Agent Collaboration Client` is deliberately positioned between individual Agent runtimes and the user's durable collaboration experience.

A category page should explain that the client owns or projects:

- visible participants and memberships;
- canonical conversation continuity;
- context disclosure boundaries;
- approvals and local effects;
- heterogeneous Agent adapter semantics;
- endpoint privacy/trust boundaries;
- user-visible lifecycle evidence.

It must also explain what the category is **not**: it is not a foundation model, a single Agent runtime, an orchestration graph, or a wire protocol.

## Representative Agent query cluster

The generated LicoUp compatibility matrix currently contains thirteen Agent adapter targets. The first public search-oriented guide intentionally focuses on five representative, high-visibility product names that also span different target interface shapes:

- Claude Code — current LicoUp target lane: stdio stream-json;
- Codex — current LicoUp target lane: stdio App Server JSON-RPC;
- Cursor — current LicoUp target lane: direct CLI process;
- GitHub Copilot — current LicoUp target lane: stdio ACP;
- OpenCode — current LicoUp target lane: loopback HTTP + SSE.

As of this document update, all five compatibility rows are `unverified` and have send disabled. Search-oriented copy must call them **adapter targets** or **target interfaces**, never verified support.

Gemini CLI is actively maintained upstream as of 2026-09-06 but is not present in LicoUp's current generated Agent adapter target matrix. Do not add a LicoUp/Gemini integration page until the LicoUp source authority adds an explicit target and there is enough stable evidence to make the page useful.

Do not create one thin SEO page per Agent merely because its brand has search traffic. A dedicated target page requires distinct technical content and stable integration evidence.

## Authority order

1. `LicoLand/LicoUp:PRODUCT.md` — durable product goal and responsibility boundary.
2. `LicoLand/LicoUp:docs/STATUS.md` — current intent, implementation, verification, release, support, and operation facts.
3. `LicoLand/LicoUp:docs/COMPATIBILITY.md` — exact platform and adapter support/target facts.
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
- An Agent adapter target is not verified support.
- A local interoperability test is not a public hosted service.
- A Candidate Lico Arc envelope is not a Published Lico Arc Protocol Line.
- The current Secure Client Mesh preview is not a Lico Arc Profile.
- A planned official network is not an operating network.

Use visible maturity labels on query-oriented pages.

## Indexable page strategy

Keep a small number of high-information pages:

- `/human-agent-collaboration-client/` — category definition and boundaries;
- `/guides/ai-coding-agents/` — representative Agent interfaces and collaboration-layer analysis;
- `/concepts/agent-orchestration-vs-collaboration/` — category differentiation;
- `/product/` — product definition, current capability, and explicit non-claims;
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
- `TechArticle` structured data on concept and guide pages;
- `llms.txt` as a machine-friendly navigation and claim-boundary summary;
- plain server-readable HTML with no rendering dependency.

`llms.txt` is an interoperability aid, not a ranking guarantee.

## External operations after merge

These require provider accounts and therefore are not automated in this repository:

1. Add and verify `https://licoup.com/` in Google Search Console.
2. Submit `https://licoup.com/sitemap.xml`.
3. Add the site in Bing Webmaster Tools and submit the same sitemap.
4. Confirm Cloudflare/WAF rules do not block OAI-SearchBot, Googlebot, Bingbot, ChatGPT-User, or ordinary unauthenticated GET requests for public pages.
5. Monitor queries and citations that lead to the category, guide, product, architecture, security, and status pages.
6. Build third-party evidence through real releases, independent technical discussion, benchmarks, reviews, and relevant curated project lists.

Never commit search-console ownership tokens that are intended to remain provider-controlled.

## Query review set

Periodically test a stable set of queries across major search/answer systems:

- Human-Agent Collaboration Client
- what is a human agent collaboration client
- Claude Code Codex Cursor Copilot OpenCode together
- use multiple AI coding agents together
- agent orchestration vs agent collaboration
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

Record whether LicoUp is retrieved, whether the description is accurate, which page is cited, and whether the answer incorrectly promotes a target, preview, or planned capability.

## Content quality rule

The strongest discoverability asset is independent evidence. Prefer reproducible benchmarks, architecture and threat-model documents, compatibility evidence, release notes with explicit limitations, protocol decision records, and third-party reviews and discussions.

Do not manufacture reviews, citations, user counts, security claims, benchmarks, popularity rankings, or comparison results.
