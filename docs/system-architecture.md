# System Architecture

Current boundaries and the decisions behind them. WHAT/HOW lives in code; this file is the WHY + WHERE layer.

## Boundaries

**Rendering.** Astro 5, `output: 'static'` with the Cloudflare adapter: every page prerenders to static HTML. Only three dynamic route families opt out (`export const prerender = false`) and run as Pages Functions: `src/pages/api/chat.ts`, `src/pages/api/contact.ts`, and the per-locale OG image endpoints `src/pages/og/[...route].ts` / `src/pages/en/og/[...route].ts`. Client interactivity is React islands (`src/components/islands/`) or small vanilla scripts.

**i18n.** URL-addressed, not a runtime toggle: Vietnamese at the root, English under `/en/` (mirrored page tree in `src/pages/en/`; config in `astro.config.mjs`). UI strings in `src/i18n/en.json` / `vi.json`, dot-key lookup in `src/i18n/utils.ts`. `BaseLayout` emits hreflang pairs and canonical alternates; Astro i18n falls back en → vi (rewrite).

**Chat pipeline.** Islands → `POST /api/chat` → sanitize + prompt-injection blocklist + zod validation + per-IP rate limit (10 req/min, in-memory — per-isolate on the edge, hence best-effort) → context built from `src/data/jeremy.json` / `jeremy-vi.json` → provider fallback chain → SSE `text/event-stream` with JSON-framed chunks; client-side, `src/domains/chat/presentation/` parses the stream and renders assistant messages as structured markdown. Errors degrade to a bilingual apology message, never a broken stream.

**Chat history.** Client-side, session-scoped store (`src/hooks/use-chat-history.ts`): `sessionStorage`, 50-message cap default, one shared store instance for the desktop and mobile widgets, preserved across Astro ClientRouter page swaps; a `beforeunload` warning fires while a conversation is open.

**Content.** Two collections — blog and projects — with zod schemas (`src/content.config.ts`). Visibility is data-driven: blog `draft`/`hidden` flags, project `status`/`featured`; pages filter at build time. The shared listing filter is `src/components/ui/ProjectFilter.astro`.

**SEO.** `BaseHead` + `JsonLd` (`src/components/seo/`), per-route OG images (server endpoint), sitemap, per-locale RSS.

## Decision ledger

| Decision | Why |
|---|---|
| Static-first; functions only for the three dynamic endpoints | Performance + free-tier fit; pages stay zero-JS wherever possible |
| Real AI chat (reverses the PRD's "pure UI" non-goal) | The AI-native interface is the product story; grounding + blocklist keep it safe. Plans: `260510-2301-ai-provider-fallback-chain`, `260511-0942-deploy-chat-ai-cloudflare` |
| Multi-provider fallback chain, priority from env | Free/unstable provider tiers; one outage must not kill chat. Priority var in `wrangler.toml` |
| SSE streaming, not WebSocket | Works on Pages Functions with a simpler client |
| URL-prefixed i18n (replaces the PRD's single-URL toggle) | Shareable, indexable locale URLs + hreflang; accepted cost: a duplicated page tree |
| `sessionStorage` chat history (after localStorage experiments) | Session-scoped conversations avoid stale persisted data |
| In-memory rate limiting (no KV / Durable Object) | Simplest solution with zero extra bindings; accepted trade-off: per-isolate, best-effort — adequate for a personal site |
| Contact endpoint logs only | Placeholder until an email service is chosen (see `docs/project-roadmap.md`) |

## Variation seam: AI providers

Providers differ, but the seam is stable: every provider implements the `AIProvider` interface (async iterable of string chunks) in `src/domains/chat/infrastructure/ai-provider-adapter.ts`. The API route knows only the interface; priority is resolved from env at runtime. Adding a provider = implement the interface + accept an env key + list it in the priority var — no route changes. Rejected alternatives: per-vendor routing inside the page route (couples deploy config to code); a single provider (single point of failure). The seam is guarded by `tests/chat/` (chain, priority, per-provider parsing).

## Variation seam: locales

Invariant across vi/en: mirrored page trees + shared JSON string tables + token-based styling. The seam is the duplicated `src/pages/en/` tree — any new route or route change must be applied to both trees and to both `src/i18n/*.json` files. Accepted trade-off: duplication in exchange for URL-addressable, SEO-clean locale content.
