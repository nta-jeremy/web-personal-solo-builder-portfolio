# Project Roadmap

Intended direction — intent, not shipped behavior. Shipped history lives in `git log` and the timestamped `plans/` folders.

## In flight

None currently.

## Planned / open items

- **Logo & favicon rebrand** from the Figma asset set — web logo, favicon, OG image, structured data. Source record: `docs/idea/2026-05-08-ideas-todo.md` (the only explicitly open item there).
- **Contact email delivery** — the endpoint currently logs only (TODO in `src/pages/api/contact.ts`); choose and integrate a service (Resend / SendGrid suggested in code).
- **Analytics (optional)** — the PRD flagged Cloudflare Web Analytics as a possible later addition; `.env.example` reserves an optional `ANALYTICS_ID`.

## Delivered (pointer only)

Projects visibility & tag/category filtering — schema `status`/`categories`/`tags`, shared `ProjectFilter` component, bilingual empty state (`plans/260515-0947-projects-visibility-tags`). Structured AI chat responses — markdown-rendered assistant messages (`src/domains/chat/presentation/`). About-page storytelling refresh. Foundation & recruiter experience, blog reader experience, AI provider chain + chat deploy, chat history (persistence → sessionStorage → ClientRouter-safe), content rebuild with real data, hidden-posts mechanism, SEO/OG overhaul — see `plans/` (local-only) and `git log` for the record.

## Planning convention

New work is planned as timestamped folders under `plans/` (local-only planning state, gitignored — only `plans/templates/` is tracked; reports in `plans/reports/`). When roadmap intent changes, update this file's open-items list in the same change.
