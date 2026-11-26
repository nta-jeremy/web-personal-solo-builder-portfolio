# Project Overview (PDR)

Jeremy Nguyen's personal website — an AI-native portfolio for a Product Engineer, built around the Claude Desktop aesthetic: sidebar + artifact-style content area + a real assistant chat. The interface itself signals AI-native product thinking; it replaces the generic template portfolio.

- Live site: `https://jeremytech.io.vn` (owner of the value: `site` in `astro.config.mjs`)
- Owner identity and links: `src/config/social-links.ts`
- Historical intent record: `docs/idea/jeremy-personal-website-prd.md` (v1.0 PRD + UX spec + original milestones)

## Audiences

| Audience | What the site must do for them |
|---|---|
| Recruiters / headhunters | Assess background, real projects, and contact info fast |
| Tech / AI professionals | Evaluate expertise and thought leadership |
| Potential collaborators | Understand working style, domains, philosophy |
| Blog readers | Read technical insights in Vietnamese or English |

## Product intent

- Bilingual by URL: Vietnamese at the root, English under `/en/` — both first-class, SEO-addressable.
- The chat is a **grounded Q&A assistant about Jeremy**, not a general chatbot: it answers only from the fixed context in `src/data/jeremy.json` / `jeremy-vi.json`; injection attempts are blocked at the API.
- Everything else (blog, projects, about, contact) stays static and zero-JS wherever possible.

## Intent evolution (important)

The v1.0 PRD's core concept was "pure UI aesthetic, no AI backend". That non-goal was explicitly reversed: the site now ships a real streaming assistant with a multi-provider fallback chain (plans `260510-2301-ai-provider-fallback-chain` and `260511-0942-deploy-chat-ai-cloudflare`). The PRD remains the source for original UX intent and success targets — not for chat scope. Current boundaries: `docs/system-architecture.md`.

Positioning was also rebranded from "CTO" to **Product Engineer** (plan `260510-2045-rebrand-cto-to-product-engineer`).

## Non-goals (current)

- No accounts, authentication, CMS backend, or blog comments.
- Chat is not general-purpose: context-grounded only, rate-limited per IP.
- Contact form does not send email yet — submissions are logged server-side only (see `docs/project-roadmap.md`).
- No analytics at the moment (the PRD flagged Cloudflare Web Analytics as a possible later addition).

## Terminology

| Term | Meaning |
|---|---|
| Artifact area | Main content region, styled like a Claude artifact panel |
| Island | React component hydrated client-side inside an otherwise static Astro page |
| Stream text | Word-by-word reveal animation for headlines/greetings |
| Provider fallback chain | Ordered AI providers tried in sequence when one fails |
| Hidden post | Blog frontmatter flag that keeps the page but removes it from listings |

## Constraints

- Hosting: Cloudflare Pages free tier; static-first — server code only in the dynamic endpoints listed in `docs/system-architecture.md`.
- Performance targets from the PRD (Lighthouse ≥ 90, client JS < 200 KB) are the standing quality bar for new client code.
- Fonts are self-hosted via `@fontsource` — no runtime font CDN requests.
- Content publishing must stay file-based: a new blog post or project is a single markdown file, no code changes (schemas in `src/content.config.ts`).
