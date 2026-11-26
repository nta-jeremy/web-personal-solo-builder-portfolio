# Code Standards

Project-specific engineering choices and quality bars. General process rules (naming, file size, commit discipline) are owned by the root `CLAUDE.md` / `AGENTS.md` and the local `.claude/rules/*` workspace files — follow those first.

Known drift: `AGENTS.md` references `./.Codex/rules/*`, which does not exist in the repo; the real rules live under `./.claude/rules/*`.

## Engineering choices

- **Static-first Astro.** Pages prerender to static HTML; React islands (`src/components/islands/`) only where client state or streaming is genuinely needed. Simple interactive UI uses a small vanilla script instead of an island — see `src/components/ui/ProjectFilter.astro` for the pattern.
- **TypeScript everywhere; zod at every API boundary.** Input is schema-validated before processing (`src/pages/api/chat.ts`, `src/pages/api/contact.ts`). Never parse request bodies by hand.
- **Theming flows from tokens.** Components reference `var(--token)` from `src/styles/design-tokens.css`; do not hardcode colors in new code.
- **Server infrastructure lives in `src/domains/<feature>/infrastructure/`.** API routes stay thin adapters; the logic (provider chain, rate limiting) is importable and unit-testable — see `src/domains/chat/`.
- **Single-owner config.** Site + i18n → `astro.config.mjs`; Pages runtime vars → `wrangler.toml`; env var names → `.env.example`; contact links → `src/config/social-links.ts`. Add to the owner, never duplicate a value elsewhere.

## Testing policy

| Layer | Command | Owner |
|---|---|---|
| Unit — chat providers, chain priority, history store | `pnpm test` (vitest) | `src/**/*.test.ts`, `tests/chat/` |
| Visual regression — desktop snapshots | `npx playwright test` | `tests/visual-regression.spec.ts`, `playwright.config.ts` |
| Type check + build gate | `pnpm check`, `pnpm build` | CI runs both before deploy (`.github/workflows/deploy.yml`) |

Gotcha: visual regression serves `dist/` — build first (`pnpm build`); the webServer config in `playwright.config.ts` expects the built site.

## Commits and quality bar

- Conventional commit format (`feat:`, `fix:`, `refactor:`, …) — see `git log` for the established prefixes.
- Tests before push; never ignore a failing test to pass CI (development-rules pointer).
- Never commit secrets or dotenv files.
- Keep the client bundle minimal: prefer zero-JS or vanilla solutions when they suffice; justify every island.
