# Jeremy Nguyen - Personal Website

A personal portfolio website built with Astro 5, featuring a Claude-inspired design system, bilingual support (EN/VI), and mobile-responsive layout.

## Features

- **Bilingual Support**: Vietnamese (default, root) and English under `/en/`, with hreflang pairs
- **Theme System**: Light/Dark/System theme with localStorage persistence
- **Streaming Text**: Animated text reveals on homepage and blog posts
- **AI Chat Assistant**: Grounded bilingual Q&A — streaming, structured (markdown) responses, multi-provider fallback
- **Mobile Responsive**: Collapsible sidebar with bottom tab bar on mobile
- **Static Build**: Optimized for Cloudflare Pages deployment

## Tech Stack

- **Framework**: Astro 5 (Static Site Generation)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **UI Components**: React Islands (for interactivity)
- **Deploy**: Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321` to view the site.

### Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── islands/       # React islands (chat, toggles, stream text)
│   ├── sections/      # Page sections
│   ├── seo/           # BaseHead, JsonLd
│   └── ui/            # Astro UI primitives (Sidebar, cards, ProjectFilter)
├── config/            # Social links, site constants
├── content/           # Blog + projects content collections
├── data/              # Chat grounding context + about/career data
├── domains/           # Server-side chat (infrastructure + presentation)
├── hooks/             # React hooks (chat history)
├── i18n/              # Translation files (EN/VI)
├── layouts/           # BaseLayout
├── pages/             # Routes (vi at root, en/ mirror, api/, og/)
└── styles/            # Design tokens + global CSS

dist/                 # Build output
```

## Phases

| Phase | Status | Description |
|-------|--------|-------------|
| 01 | ✅ | Project Scaffolding + Astro Config |
| 02 | ✅ | Global CSS + Theme System |
| 03 | ✅ | BaseLayout + Sidebar + ArtifactArea |
| 04 | ✅ | i18n System (URL-based vi/en) |
| 05 | ✅ | Homepage - StreamText + Prompts |
| 06 | ✅ | About, Projects, Contact Pages |
| 07 | ✅ | Blog System (Content Collections) |
| 08 | ✅ | Mobile Responsive Breakpoints |
| 09 | ✅ | Cloudflare Pages Deploy |

## Documentation

Project docs live in [`docs/README.md`](./docs/README.md) — start at the index.

## Deployment

Deploys are automated: every push to `main` runs the GitHub Actions workflow (type check → build → deploy to Cloudflare Pages). Manual setup, if starting from scratch:

1. Push code to GitHub
2. Create new project in Cloudflare Pages
3. Configure:
   - Build command: `npm run build`
   - Output directory: `dist/`
   - Node version: 18

## License

MIT License
# deploy-trigger
