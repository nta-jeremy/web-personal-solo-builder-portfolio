# Design Guidelines

The design language: a warm, editorial, "paper" aesthetic inspired by the Claude (Anthropic) interface — deliberately un-tech. Full rationale, palette roles, and the detailed do/don't reference live in `docs/idea/design-system-v1.md` (stateful rationale doc). This file records the conventions that guide new UI work and where the executable owners live.

## Invariants (judgment rules code cannot enforce)

- **Warm-toned neutrals only.** Every gray carries a yellow-brown undertone; no cool blue-grays anywhere.
- **Serif for authority, sans for utility.** Headlines use the serif face (`.serif` class, Source Serif 4) at medium weight (500–600, never bold). UI text uses Inter. JetBrains Mono is strictly for code.
- **One warm accent, used sparingly** — primary CTAs and the highest-signal brand moments only.
- **Depth from ring shadows and background shifts**, not heavy drop shadows. Interactive states use the ring pattern, not glow.
- **Soft corners everywhere** (roughly the 8–32px scale); sharp corners break the identity.
- **Generous body line-height (≈1.6)** for a literary reading rhythm; light/dark section alternation paces the page like chapters.
- **Dark mode is a first-class state** expressed through the token set, not an inversion afterthought.

## Where the owners live

| Concern | Owner |
|---|---|
| Token values (single source of truth) | `src/styles/design-tokens.css` |
| Fonts (self-hosted `@fontsource` imports) and base styles | `src/styles/global.css` |
| Theme resolution + FOUC prevention (`data-theme` on `<html>`, `localStorage` + `prefers-color-scheme`) | inline script in `src/layouts/BaseLayout.astro` |
| Rationale and palette roles (v1 reference) | `docs/idea/design-system-v1.md` |
| HTML mockup and sample screens | `docs/design/` |

## Token policy

- Reference `var(--token)` in components; never hardcode hex values in new code.
- Tokens currently implement a "warm sand" palette that intentionally drifted from the exact parchment/terracotta hex values in design-system-v1.md. When the two disagree, **the tokens file wins**; v1 remains the rationale reference, not the value reference.

## Mobile conventions

- Sidebar collapses on mobile; navigation moves to the header + bottom tab bar (`src/components/ui/MobileNav.astro`, `src/components/islands/MobileHeader.tsx`).
- Chat stays reachable at all times (mobile chat island).
- Touch targets at comfortable minimum size (≈44px); editorial rhythm is preserved at reduced spacing, not abandoned.
