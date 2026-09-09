# AI discoverability and public-claim governance

This document defines how `licoup.com` should become discoverable in search and AI answer systems without turning the website into a second product authority.

## Objective

The target is not merely that a user searching the exact string `LicoUp` can find the project. The target is that systems can correctly retrieve LicoUp when a query concerns categories such as:

- Agent Collaboration;
- Human-Agent Collaboration;
- Human-Agent Collaboration Client;
- Multi-Agent Collaboration;
- local-first AI agent clients;
- privacy-oriented agent workflows;
- endpoint-controlled agent collaboration;
- cross-device or federated agent collaboration;
- agent coding clients that preserve an inspectable conversation authority.

Every page should answer a real category or use-case question. Do not generate large numbers of near-duplicate keyword pages.

## Canonical entity definition

Use this sentence, or a semantically equivalent projection, when an exact public category definition is required:

> LicoUp is an open-source, local-first Human-Agent Collaboration Client for agent collaboration across visible AI agents through one coherent conversation experience.

The upstream `PRODUCT.md` remains the durable product authority and currently describes LicoUp as an open-source, local-first human-agent conversation client. `Human-Agent Collaboration Client` is the public category label used by this website.

Long-term context may explain how the architecture extends the same endpoint-controlled collaboration model toward peer, multi-device, and federated collaboration.

## Category positioning

Treat the category relationship as a semantic hierarchy rather than competing keywords:

```text
Agent Collaboration
├── Human-Agent Collaboration
│   └── Human-Agent Collaboration Client
├── Multi-Agent Collaboration
└── Agent-to-Agent Collaboration
```

`Agent Collaboration` is the broad space of coordinated work involving AI agents.

`Human-Agent Collaboration` is the human-centered part of that space, where the person remains a visible participant with durable conversation state, explicit context, approvals, and authority over local effects.

`Multi-Agent Collaboration` overlaps naturally when several AI agents participate in the same broader workflow or conversation.

The category page should explain that a Human-Agent Collaboration Client owns or projects:

- visible participants and memberships;
- canonical conversation continuity;
- context disclosure boundaries;
- approvals and local effects;
- heterogeneous Agent adapter semantics;
- endpoint privacy/trust boundaries;
- user-visible lifecycle evidence.

Models, agent runtimes, orchestration systems, and protocols should be presented as composable layers around this user-facing collaboration layer.

## Representative Agent query cluster

The LicoUp adapter registry contains thirteen built-in conversation adapters. The first public search-oriented guide intentionally focuses on five representative, high-visibility product names that also span different target interface shapes:

- Claude Code — current LicoUp connection: stdio stream-json;
- Codex — current LicoUp connection: stdio App Server JSON-RPC;
- Cursor — current LicoUp connection: direct CLI process;
- GitHub Copilot — current LicoUp connection: stdio ACP;
- OpenCode — current LicoUp connection: loopback HTTP + SSE.

Actual compatibility depends on the installed runtime, its version, interface, and authentication setup. DeepSeek Harness additionally requires a ready check before sending. The generated compatibility matrix records verification evidence; an unverified inventory state must not be presented as a blanket runtime disablement. The current user-facing overview belongs at `/status/`.

Do not create one thin SEO page per Agent merely because its brand has search traffic. A dedicated target page requires distinct technical content and enough stable integration material to make the page independently useful.

## Authority order

1. `LicoLand/LicoUp:PRODUCT.md` — durable product goal and responsibility boundary.
2. Public `LicoLand/LicoUp` GitHub Releases — published artifacts and their exact version/platform availability. Source status does not override an observed public release.
3. `LicoLand/LicoUp` adapter registry, runtime discovery, dispatch, and current verification evidence — actual adapter connections and usage conditions.
4. `LicoLand/LicoUp:docs/COMPATIBILITY.md` — generated verification projection; read it in the context of the adapter implementation. Source status prose is a summary and must be reconciled when it diverges from that implementation.
5. `LicoLand/LicoUp:docs/architecture/*` — technical architecture projection.
6. `LicoLand/LicoArc` — protocol semantics, construction, lifecycle, and federation-governance authority.
7. `licoup.com` — search-friendly public projection of the authorities above.

If an upstream authority changes, update the site projection. Do not redefine the upstream fact here.

## Current compatibility presentation

Present one practical compatibility view at `/status/`: the available download, agent interfaces, and the conditions required to use them. Homepage answers, guides, and machine-readable summaries must agree with that view. Visitors should not have to reconcile release notes, source status, and generated inventories themselves.

Resolve source discrepancies against the current adapter implementation and the evidence that establishes compatibility. A default inventory state must not be mistaken for a completed runtime check. Only describe an integration as verified when the relevant evidence exists.

During research, keep implementation, verification, release, support, and operation facts distinct so one cannot imply another. Translate those facts into a single user-facing result instead of exposing separate maturity checklists. Keep broader category and use-case pages focused on useful explanations.

## Indexable page strategy

Keep a small number of high-information pages:

- `/human-agent-collaboration-client/` — Human-Agent Collaboration and Agent Collaboration category relationship;
- `/guides/ai-coding-agents/` — representative Agent interfaces and collaboration-layer analysis;
- `/concepts/agent-orchestration-vs-collaboration/` — category differentiation;
- `/product/` — product definition and current foundation;
- `/use-cases/` — user problems and fit;
- `/architecture/` — inspectable technical differentiation;
- `/security/` — privacy and trust boundary;
- `/status/` — current compatibility and setup requirements.

Add a new indexable page only when it contains distinct, durable information that a searcher could reasonably ask for. Prefer primary measurements, architecture evidence, security analyses, compatibility evidence, or concrete use cases over generic marketing copy.

## Homepage discovery path

The homepage is the natural landing surface for organic discovery by both broad
individual visitors and developers. Its visible, crawlable body moves from a
three-line Agent Collaboration statement through three complementary kinds of
entry:

- a static value strip linking conversation continuity to `/product/`, chosen
  context to `/security/`, and human decisions to
  `/human-agent-collaboration-client/`;
- open problem-led rows linking a creative starting problem to
  `/use-cases/#creative-work`, interface differences to
  `/guides/ai-coding-agents/#quick-read`, and context visibility to
  `/security/`;
- a pale-lilac category guide and adjacent reading list linking the Human-Agent
  Collaboration definition, coding-agent guide, orchestration comparison, and
  architecture, followed by direct links to product, use cases, security, and
  current status.

This structure lets a visitor recognize a problem, see an illustrative
experience, continue into a substantive answer, and find the current release.
The homepage and its deeper pages use semantic headings, ordinary links, and
server-readable HTML so their relationship remains understandable without
client-side rendering. Keep the set small and information-rich; do not split
these topics into thin keyword variants.

## Technical discovery surfaces

The repository maintains:

- `robots.txt` with public crawling enabled and explicit OAI-SearchBot access;
- `sitemap.xml` with all canonical indexable pages;
- canonical URL and Open Graph metadata on each indexable page;
- Schema.org `WebSite`, `Organization`, and `SoftwareApplication` data on the homepage;
- `TechArticle` structured data on concept and guide pages;
- `llms.txt` as a machine-friendly navigation and category summary;
- plain server-readable HTML with no rendering dependency.

`llms.txt`, semantic markup, crawlable body copy, and internal links are
interoperability and retrieval aids. None guarantees search ranking, indexing,
answer-engine citation, or traffic.

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

- agent collaboration
- AI agent collaboration
- multi-agent collaboration
- Human-Agent Collaboration
- Human-Agent Collaboration Client
- what is a human agent collaboration client
- agent collaboration client
- Claude Code Codex Cursor Copilot OpenCode together
- use multiple AI coding agents together
- agent orchestration vs agent collaboration
- open source local-first AI agent client
- multi-agent conversation client
- privacy-first AI agent collaboration
- agent client with local conversation history
- coordinate AI coding agents in one conversation
- endpoint-controlled AI agent collaboration
- cross-device agent collaboration tools
- federated agent collaboration protocol
- alternatives to centralized agent collaboration platforms

Record whether LicoUp is retrieved, whether the description is accurate, which page is cited, and which query family led to the result.

## Content quality rule

The strongest discoverability asset is independent evidence. Prefer reproducible benchmarks, architecture and threat-model documents, compatibility evidence, release notes, protocol decision records, and third-party reviews and discussions.

Do not manufacture reviews, citations, user counts, security claims, benchmarks, popularity rankings, or comparison results.
