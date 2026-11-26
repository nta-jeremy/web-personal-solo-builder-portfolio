# Codebase Summary

Navigation only: entry points, module boundaries, and executable owners. For WHY see the other docs; for WHAT/HOW read the files.

## Entry points

| Path | Role |
|---|---|
| `astro.config.mjs` | Site URL, i18n locales (vi default unprefixed, en `/en/`), output mode, integrations |
| `src/pages/` | Vietnamese routes at the root; English mirror under `src/pages/en/`; API under `src/pages/api/`; OG images under `src/pages/og/`; RSS per locale |
| `src/layouts/BaseLayout.astro` | Page shell: sidebar, chat bar, mobile header/nav, theme FOUC init, SEO props, hreflang |
| `src/content.config.ts` | Zod schemas for the `blog` and `projects` collections — single owner of frontmatter contracts |

## Module boundaries

| Directory | Boundary |
|---|---|
| `src/components/islands/` | React interactive components (chat UI, language/theme toggles, stream text) |
| `src/components/sections/` | Astro page sections (home, about, blog list, contact) |
| `src/components/ui/` | Astro UI primitives (Sidebar, cards, ProjectFilter, PagefindSearch, MobileNav) |
| `src/components/seo/` | `BaseHead`, `JsonLd` |
| `src/domains/chat/infrastructure/` | Server-side chat: AI provider chain + rate limiting, kept out of the API route |
| `src/domains/chat/presentation/` | Structured assistant message rendering (chat markdown parsing, message content) |
| `src/hooks/` | React hooks; `use-chat-history.ts` owns chat persistence |
| `src/data/` | Chat grounding context (`jeremy*.json`) + about/career content JSON |
| `src/i18n/` | `en.json` / `vi.json` string tables + `utils.ts` (dot-key lookup, locale from URL) |
| `src/config/` | `social-links.ts` — single source of contact links and sameAs schema input |
| `src/styles/` | `design-tokens.css` (token owner), `global.css` (fonts, base styles) |

## Executable owners

| Claim / area | Owner to read or modify |
|---|---|
| Frontmatter contracts (blog, projects) | `src/content.config.ts` |
| Social links, site URL | `src/config/social-links.ts` |
| Chat request pipeline | `src/pages/api/chat.ts` |
| AI provider chain | `src/domains/chat/infrastructure/ai-provider-adapter.ts` |
| Rate limiting | `src/domains/chat/infrastructure/rate-limit-adapter.ts` |
| Chat history store | `src/hooks/use-chat-history.ts` |
| Head / meta / OG props | `src/components/seo/BaseHead.astro` |
| Design token values | `src/styles/design-tokens.css` |
| Deploy pipeline | `.github/workflows/deploy.yml` |

## Publishing content

- **Blog post**: markdown file under `src/content/blog/` — fields per `src/content.config.ts`; `draft` / `hidden` flags keep a page out of listings without deleting it.
- **Project**: markdown file under `src/content/projects/` — `status` drives visibility, `featured` promotes, `categories` / `tags` feed the listing filter.
