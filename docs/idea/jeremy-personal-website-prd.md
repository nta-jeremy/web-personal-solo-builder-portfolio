# Jeremy Nguyen — Personal Website
## Product Requirements Document

> **Version:** 1.0 · April 2026
> **Prepared by:** Claude (Anthropic)
> **Status:** Gate 3 — Awaiting Implementation Approval

| Field | Value |
|---|---|
| Document Type | PRD + UX Spec + Technical Plan |
| Status | Gate 3 — Awaiting Implementation Approval |
| Framework | Astro 4 (Static) |
| Deploy Target | Cloudflare Pages (Free Tier) |
| Languages | English + Vietnamese (Single URL toggle) |
| AI Backend | None — Pure UI Aesthetic (Fake AI) |

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Scope & Constraints](#2-scope--constraints)
3. [UX Specification](#3-ux-specification)
4. [Technical Plan](#4-technical-plan)
5. [Implementation Milestones](#5-implementation-milestones)
6. [Verification Plan](#6-verification-plan)
7. [Page Routes](#7-page-routes)
8. [Gate Status](#8-gate-status)

---

## 1. Product Overview

### 1.1 Problem Statement

Traditional portfolio websites are static, generic, and forgettable. Jeremy's personal website must stand apart by delivering an AI-native experience — one that immediately signals his identity as a Product Engineer and builder in the AI space.

The site adopts the Claude Desktop UI aesthetic as its design language: sidebar navigation, artifact-style content rendering, streaming text effects, and suggested prompt chips. Visitors interact with the site the way they would interact with an AI assistant — through familiar, purposeful UX patterns.

### 1.2 Target Audience

| Audience | Intent |
|---|---|
| Tech / AI professionals | Evaluate Jeremy's expertise and thought leadership |
| Recruiters & headhunters | Assess background, projects, and contact info |
| Potential collaborators | Understand Jeremy's work style and interests |
| Blog readers | Consume technical insights and personal essays |

### 1.3 Core Concept

The website does **not** use a real AI backend. There are no API calls, no LLM inference at runtime. The "AI" is entirely aesthetic: streaming text animations, chat input decorations, and suggested prompt chips that act as navigation shortcuts. All content is pre-built at compile time as a fully static site.

### 1.4 Success Metrics

- Lighthouse Performance score ≥ 90
- Lighthouse Accessibility score ≥ 90
- Total JS bundle shipped to browser < 200 KB
- New blog post publishable by creating a single `.mdx` file — no code changes required
- Site deploys successfully to Cloudflare Pages on every git push to `main`
- Mobile layout renders correctly at 375px and 768px breakpoints
- Language toggle persists across page navigation and browser refresh
- Theme toggle (dark / light / system) persists across sessions

---

## 2. Scope & Constraints

### 2.1 In Scope

- Astro 4 static site with zero server-side rendering
- Claude Desktop–inspired UI: sidebar + artifact main area
- System auto dark/light theme with manual toggle — CSS custom properties
- Bilingual content: English + Vietnamese via single-URL client-side toggle
- 4 sections: About, Projects, Blog, Contact
- Streaming text CSS animation on homepage greeting and blog post load
- Suggested prompt chips on homepage (navigation shortcuts)
- Blog powered by Astro Content Collections (MDX)
- Contact form via Web3Forms (free, no backend required)
- Mobile responsive: sidebar collapses to bottom tab bar on mobile
- Cloudflare Pages deployment with custom domain support

### 2.2 Out of Scope

- Real AI / LLM API calls at runtime
- Authentication or user accounts
- CMS backend or admin panel
- Comment system on blog posts
- Analytics (Cloudflare Web Analytics can be added later — free)
- Multi-language URL routing (`/en/`, `/vi/` prefixes)
- Search functionality

### 2.3 Technical Constraints

| Constraint | Detail |
|---|---|
| Hosting | Cloudflare Pages — Free Tier (unlimited bandwidth, 500 builds/month) |
| Output | Static HTML only — no server functions, no edge workers |
| JS Budget | < 200 KB shipped to browser (React islands only) |
| Fonts | System font stack or max 1 Google Font (performance) |
| Forms | Web3Forms free tier (no backend required) |
| Build Command | `npm run build` |
| Output Directory | `dist/` |
| Node Version | 18+ |

---

## 3. Technical Plan

### 3.1 Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Astro 4 | Static output, island architecture, Content Collections, Cloudflare-native |
| UI Components | React islands | Only interactive components hydrate — rest is zero-JS static HTML |
| Styling | Tailwind CSS + CSS custom properties | Design tokens for theme system, utility classes for layout |
| Animations | CSS animations | No heavy library — performant, no layout jank |
| Blog | Astro Content Collections (MDX) | Type-safe, file-based, supports frontmatter schema validation |
| i18n | Client-side JSON toggle | Single URL, localStorage persistence, React Context distribution |
| Forms | Web3Forms | Free tier, no backend, spam protection included |
| Deploy | Cloudflare Pages | Free, edge CDN, auto-deploy on git push, custom domain |

### 3.2 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.astro
│   │   ├── ArtifactArea.astro
│   │   └── ChatInputBar.astro
│   ├── ui/
│   │   ├── ArtifactBlock.astro
│   │   ├── StreamText.tsx        ← React island
│   │   ├── SuggestedPrompts.tsx  ← React island
│   │   ├── LanguageToggle.tsx    ← React island
│   │   └── ThemeToggle.tsx       ← React island
│   └── sections/
│       ├── About.astro
│       ├── Projects.astro
│       ├── Blog.astro
│       └── Contact.tsx           ← React island (form state)
├── content/
│   └── blog/
│       └── hello-world.mdx
├── i18n/
│   ├── en.json                   ← All UI strings in English
│   └── vi.json                   ← All UI strings in Vietnamese
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── projects.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── contact.astro
├── styles/
│   └── global.css                ← CSS custom properties, themes
└── lib/
    └── i18n.ts                   ← useTranslation hook
```

### 3.3 Key Technical Decisions

#### React Islands — Only Interactive Components

| Component | Why React | Hydration Directive |
|---|---|---|
| `StreamText` | useState + useEffect timing for word-by-word reveal | `client:load` |
| `SuggestedPrompts` | Click handler + router navigation | `client:load` |
| `LanguageToggle` | localStorage + re-render all i18n strings | `client:load` |
| `ThemeToggle` | localStorage + CSS class toggle on `<html>` | `client:load` |
| `Contact` | Form state, validation, async Web3Forms submit | `client:load` |

#### i18n — Single URL Content Toggle

Locale preference stored in `localStorage`, defaulting to browser's `navigator.language`. A React Context (`LocaleProvider`) wraps all island components, providing the current locale and a toggle function. The `useTranslation` hook resolves dot-notation keys from the active locale's JSON file.

```typescript
// src/lib/i18n.ts
import en from '../i18n/en.json'
import vi from '../i18n/vi.json'

const locales = { en, vi } as const
export type Locale = keyof typeof locales

export function useTranslation(locale: Locale) {
  return (key: string): string =>
    key.split('.').reduce((obj: any, k) => obj?.[k], locales[locale]) ?? key
}
```

#### Theme System — CSS Custom Properties

Theme is controlled entirely via a `data-theme` attribute on the `<html>` element. No CSS-in-JS, no runtime style injection. `ThemeToggle` reads and writes this attribute plus `localStorage`. System preference detection via `prefers-color-scheme` media query.

```css
/* src/styles/global.css — Claude Design System tokens */
:root {
  /* Backgrounds */
  --bg-primary:    #f5f4ed;   /* Parchment */
  --bg-secondary:  #faf9f5;   /* Ivory */
  --bg-surface:    #faf9f5;   /* Card surface */

  /* Text */
  --text-primary:  #141413;   /* Anthropic Near Black */
  --text-muted:    #5e5d59;   /* Olive Gray */
  --text-subtle:   #87867f;   /* Stone Gray */

  /* Brand */
  --accent:        #c96442;   /* Terracotta Brand */
  --accent-hover:  #d97757;   /* Coral Accent */

  /* Borders */
  --border:        #f0eee6;   /* Border Cream */
  --border-warm:   #e8e6dc;   /* Border Warm */

  /* Rings / shadows */
  --ring:          #d1cfc5;   /* Ring Warm */
  --ring-deep:     #c2c0b6;   /* Ring Deep */

  /* Interactive */
  --focus:         #3898ec;   /* Focus Blue — accessibility only */
}

[data-theme="dark"] {
  --bg-primary:    #141413;   /* Deep Dark */
  --bg-secondary:  #1c1c1b;   /* Near-black surface */
  --bg-surface:    #30302e;   /* Dark Surface */

  --text-primary:  #faf9f5;   /* Ivory */
  --text-muted:    #b0aea5;   /* Warm Silver */
  --text-subtle:   #87867f;   /* Stone Gray */

  --accent:        #d97757;   /* Coral Accent (lighter on dark) */
  --accent-hover:  #c96442;   /* Terracotta Brand */

  --border:        #30302e;   /* Border Dark */
  --border-warm:   #3d3d3a;

  --ring:          #4d4c48;
  --ring-deep:     #3d3d3a;

  --focus:         #3898ec;
}
```

#### StreamText — CSS Animation, No setTimeout Chains

Each word is wrapped in a `<span>` with an `animation-delay` calculated from its index. Pure CSS keyframes handle the `opacity` + `translateY` reveal. No `setInterval` or `setTimeout` chains — this approach is GPU-composited and causes zero layout reflow.

#### Blog i18n — Frontmatter Flag

Each MDX post declares its language support in frontmatter. Posts with `lang: both` render a language toggle in the post header. Posts with `lang: en` or `lang: vi` show content in that language only with no toggle.

```yaml
---
title:     "Hello World"
titleVi:   "Xin chào Thế giới"
date:       2026-04-17
excerpt:   "My first post"
excerptVi: "Bài viết đầu tiên"
tags:      ["intro", "meta"]
lang:       both   # "en" | "vi" | "both"
---
```

### 4.4 Deployment Configuration

| Setting | Value |
|---|---|
| Astro output | `static` |
| Cloudflare adapter | Not needed — static output deploys as-is |
| Build command | `npm run build` |
| Output directory | `dist/` |
| Node version | 18 |
| Auto-deploy trigger | Push to `main` branch |
| Custom domain | Configured in Cloudflare Pages dashboard |

---

## 5. Implementation Milestones

| # | Task | Deliverable |
|---|---|---|
| 1 | Project scaffold + Astro config | Astro project runs locally on `localhost:4321` |
| 2 | Global CSS + theme system | Dark/light toggle works, persists on refresh |
| 3 | BaseLayout + Sidebar + ArtifactArea | Shell UI complete — navigation renders correctly |
| 4 | i18n system + LanguageToggle | EN/VI switch works, all strings change, persists on refresh |
| 5 | Homepage: StreamText + SuggestedPrompts | Landing page complete with streaming animation |
| 6 | About, Projects, Contact pages | All static sections render with correct layout |
| 7 | Blog system (list + post + MDX) | Blog list and post pages render, new `.mdx` file auto-appears |
| 8 | Mobile responsive breakpoints | Sidebar collapses, bottom nav works at 375px and 768px |
| 9 | Cloudflare Pages deploy | Live public URL accessible, custom domain ready to configure |

---

## 6. Verification Plan

| Milestone | Verification Method | Expected Result |
|---|---|---|
| Theme system | Toggle dark/light, hard refresh browser | Theme persists across refresh |
| i18n toggle | Switch EN↔VI, navigate to another page, refresh | Language persists, all strings change |
| StreamText | Load homepage, observe text animation | Words reveal sequentially, no jank or flicker |
| Blog: new post | Create new `.mdx` file, run build, check `/blog` | Post appears in list without code changes |
| Mobile 375px | Chrome DevTools → iPhone SE viewport | Sidebar hidden, bottom nav visible, no overflow |
| Mobile 768px | Chrome DevTools → iPad viewport | Layout adapts, no broken elements |
| Contact form | Submit form with test data | Web3Forms receives submission, success state renders |
| Build | `npm run build` — zero errors | `dist/` directory generated cleanly |
| Deploy | Push to `main`, check Cloudflare Pages | Build passes, site live at public URL |
| Lighthouse | Chrome DevTools Lighthouse audit on live URL | Performance ≥ 90, Accessibility ≥ 90 |

---

## 7. Page Routes

| Route | Description |
|---|---|
| `/` | Homepage — greeting, suggested prompts, chat input bar |
| `/about` | Bio, career timeline, skills/stack |
| `/projects` | Project cards with filter by tag |
| `/blog` | Blog post list with excerpts and tags |
| `/blog/[slug]` | Full blog post — MDX rendered with streaming effect |
| `/contact` | Conversational contact form via Web3Forms |

---

## 8. Gate Status

| Gate | Description | Status |
|---|---|---|
| Gate 1 | Scope / PRD — scope, non-goals, success metrics, constraints | ✅ Approved |
| Gate 2 | UX Spec — layout, screen inventory, components, microcopy | ✅ Approved |
| Gate 3 | Technical Plan — architecture, stack, milestones, verification | ⏳ Awaiting Approval |
| Gate 4 | QC Test Plan — test matrix, acceptance criteria, retest steps | 🔒 Pending (post-build) |

Gate 3 approval confirms the technical plan is accepted and implementation may begin. All decisions documented in this PRD serve as the single source of truth for scope, architecture, and verification criteria.
