# Jeremy Nguyen - Personal Website

A personal portfolio website built with Astro 5, featuring a Claude-inspired design system, bilingual support (EN/VI), and mobile-responsive layout.

## Features

- **Bilingual Support**: Toggle between English and Vietnamese
- **Theme System**: Light/Dark/System theme with localStorage persistence
- **Streaming Text**: Animated text reveals on homepage and blog posts
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
│   ├── layout/       # BaseLayout, Sidebar, ArtifactArea
│   ├── ui/           # Interactive components (React)
│   └── sections/     # Page sections
├── i18n/             # Translation files (EN/VI)
├── layouts/          # Astro layouts
├── pages/            # Page routes
└── styles/           # Global CSS

dist/                 # Build output
```

## Phases

| Phase | Status | Description |
|-------|--------|-------------|
| 01 | ✅ | Project Scaffolding + Astro Config |
| 02 | ✅ | Global CSS + Theme System |
| 03 | ✅ | BaseLayout + Sidebar + ArtifactArea |
| 04 | ⏳ | i18n System + LanguageToggle |
| 05 | ✅ | Homepage - StreamText + Prompts |
| 06 | ✅ | About, Projects, Contact Pages |
| 07 | ⏳ | Blog System (Content Collections) |
| 08 | ⏳ | Mobile Responsive Breakpoints |
| 09 | ⏳ | Cloudflare Pages Deploy |

## Deployment

Deploy to Cloudflare Pages:

1. Push code to GitHub
2. Create new project in Cloudflare Pages
3. Configure:
   - Build command: `npm run build`
   - Output directory: `dist/`
   - Node version: 18

## License

MIT License
# deploy-trigger
