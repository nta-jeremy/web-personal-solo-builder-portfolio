# Design System Inspired by Claude (Anthropic)

## 1. Visual Theme & Atmosphere

Claude's interface is a literary salon reimagined as a product page — warm, unhurried, and quietly intellectual. The entire experience is built on a parchment-toned canvas (`#f5f4ed`) that deliberately evokes the feeling of high-quality paper rather than a digital surface. Where most AI product pages lean into cold, futuristic aesthetics, Claude's design radiates human warmth, as if the AI itself has good taste in interior design.

The signature move is the custom Anthropic Serif typeface — a medium-weight serif with generous proportions that gives every headline the gravitas of a book title. Combined with organic, hand-drawn-feeling illustrations in terracotta (`#c96442`), black, and muted green, the visual language says "thoughtful companion" rather than "powerful tool." The serif headlines breathe at tight-but-comfortable line-heights (1.10–1.30), creating a cadence that feels more like reading an essay than scanning a product page.

What makes Claude's design truly distinctive is its warm neutral palette. Every gray has a yellow-brown undertone (`#5e5d59`, `#87867f`, `#4d4c48`) — there are no cool blue-grays anywhere. Borders are cream-tinted (`#f0eee6`, `#e8e6dc`), shadows use warm transparent blacks, and even the darkest surfaces (`#141413`, `#30302e`) carry a barely perceptible olive warmth. This chromatic consistency creates a space that feels lived-in and trustworthy.

**Key Characteristics:**
- Warm parchment canvas (`#f5f4ed`) evoking premium paper, not screens
- Custom Anthropic type family: Serif for headlines, Sans for UI, Mono for code
- Terracotta brand accent (`#c96442`) — warm, earthy, deliberately un-tech
- Exclusively warm-toned neutrals — every gray has a yellow-brown undertone
- Organic, editorial illustrations replacing typical tech iconography
- Ring-based shadow system (`0px 0px 0px 1px`) creating border-like depth without visible borders
- Magazine-like pacing with generous section spacing and serif-driven hierarchy

---

## 2. Color Palette & Roles

### Primary

| Token | Hex | Usage |
|-------|-----|-------|
| Anthropic Near Black | `#141413` | Primary text, dark-theme surface |
| Terracotta Brand | `#c96442` | Core brand, primary CTAs |
| Coral Accent | `#d97757` | Text accents, links on dark surfaces |

### Secondary & Accent

| Token | Hex | Usage |
|-------|-----|-------|
| Error Crimson | `#b53333` | Error states |
| Focus Blue | `#3898ec` | Input focus rings (only cool color) |

### Surface & Background

| Token | Hex | Usage |
|-------|-----|-------|
| Parchment | `#f5f4ed` | Primary page background |
| Ivory | `#faf9f5` | Cards, elevated containers on Parchment |
| Pure White | `#ffffff` | Specific button surfaces, max-contrast elements |
| Warm Sand | `#e8e6dc` | Button backgrounds, prominent interactive surfaces |
| Dark Surface | `#30302e` | Dark-theme containers, nav borders |
| Deep Dark | `#141413` | Dark-theme page background |

### Neutrals & Text

| Token | Hex | Usage |
|-------|-----|-------|
| Charcoal Warm | `#4d4c48` | Button text on light warm surfaces |
| Olive Gray | `#5e5d59` | Secondary body text |
| Stone Gray | `#87867f` | Tertiary text, footnotes, metadata |
| Dark Warm | `#3d3d3a` | Dark text links, emphasized secondary text |
| Warm Silver | `#b0aea5` | Text on dark surfaces |

### Semantic & Accent

| Token | Hex | Usage |
|-------|-----|-------|
| Border Cream | `#f0eee6` | Standard light-theme border |
| Border Warm | `#e8e6dc` | Prominent borders, section dividers |
| Border Dark | `#30302e` | Standard border on dark surfaces |
| Ring Warm | `#d1cfc5` | Shadow ring for button hover/focus |
| Ring Subtle | `#dedc01` | Secondary ring for lighter interactive surfaces |
| Ring Deep | `#c2c0b6` | Deeper ring for active/pressed states |

### Gradient System

Claude's design is **gradient-free** in the traditional sense. Depth and visual richness come from the interplay of warm surface tones, organic illustrations, and light/dark section alternation. The warm palette itself creates a "gradient" effect as the eye moves through cream → sand → stone → charcoal → black sections.

---

## 3. Typography Rules

### Font Family

- **Headline**: `Anthropic Serif`, fallback: `Georgia`
- **Body / UI**: `Anthropic Sans`, fallback: `system-ui, Arial`
- **Code**: `Anthropic Mono`, fallback: `monospace, Arial`

> Note: These are custom typefaces. For external implementations, Georgia serves as the serif substitute and system-ui/Inter as the sans substitute.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | Anthropic Serif | 64px (4rem) | 500 | 1.10 | normal | Maximum impact, book-title presence |
| Section Heading | Anthropic Serif | 52px (3.25rem) | 500 | 1.20 | normal | Feature section anchors |
| Sub-heading Large | Anthropic Serif | 36–36.8px (~2.3rem) | 500 | 1.30 | normal | Secondary section markers |
| Sub-heading | Anthropic Serif | 32px (2rem) | 500 | 1.10 | normal | Card titles, feature names |
| Sub-heading Small | Anthropic Serif | 25–25.6px (~1.6rem) | 500 | 1.20 | normal | Smaller section titles |
| Feature Title | Anthropic Serif | 20.8px (1.3rem) | 500 | 1.20 | normal | Small feature headings |
| Body Serif | Anthropic Serif | 17px (1.06rem) | 400 | 1.60 | normal | Editorial body text passages |
| Body Large | Anthropic Sans | 20px (1.25rem) | 400 | 1.60 | normal | Intro paragraphs |
| Body / Nav | Anthropic Sans | 17px (1.06rem) | 400–500 | 1.00–1.60 | normal | Navigation links, UI text |
| Body Standard | Anthropic Sans | 16px (1rem) | 400–500 | 1.25–1.60 | normal | Standard body, button text |
| Body Small | Anthropic Sans | 15px (0.94rem) | 400–500 | 1.00–1.60 | normal | Compact body text |
| Caption | Anthropic Sans | 14px (0.88rem) | 400 | 1.43 | normal | Metadata, descriptions |
| Label | Anthropic Sans | 12px (0.75rem) | 400–500 | 1.25–1.60 | 0.12px | Badges, small labels |
| Overline | Anthropic Sans | 10px (0.63rem) | 400 | 1.60 | 0.5px | Uppercase overline labels |
| Micro | Anthropic Sans | 9.6px (0.6rem) | 400 | 1.60 | 0.096px | Smallest text |
| Code | Anthropic Mono | 15px (0.94rem) | 400 | 1.60 | -0.32px | Inline code, terminal |

### Principles

- **Serif for authority, sans for utility**: Anthropic Serif carries all headline content with medium weight (500), giving every heading the gravitas of a published title. Anthropic Sans handles all functional UI text — buttons, labels, navigation — with quiet efficiency.
- **Single weight for serifs**: All Anthropic Serif headings use weight 500 — no bold, no light. This creates a consistent "voice" across all headline sizes.
- **Relaxed body line-height**: Most body text uses 1.60 line-height — significantly more generous than typical tech sites (1.4–1.5). This creates a reading experience closer to a book than a dashboard.
- **Tight-but-not-compressed headings**: Line-heights of 1.10–1.30 for headings are tight but never claustrophobic.
- **Micro letter-spacing on labels**: Small sans text (12px and below) uses deliberate letter-spacing (0.12px–0.5px) to maintain readability at tiny sizes.

---

## 4. Component Stylings

### Buttons

**Warm Sand (Secondary)**
- Background: `#e8e6dc`
- Text: `#4d4c48`
- Padding: `0px 12px 0px 8px` (asymmetric — icon-first layout)
- Radius: `8px`
- Shadow: `#e8e6dc 0px 0px 0px 0px, #d1cfc5 0px 0px 0px 1px`

**White Surface**
- Background: `#ffffff`
- Text: `#141413`
- Padding: `8px 16px 8px 12px`
- Radius: `12px`
- Hover: shifts to secondary background color

**Dark Charcoal**
- Background: `#30302e`
- Text: `#faf9f5`
- Padding: `0px 12px 0px 8px`
- Radius: `8px`
- Shadow: `#30302e 0px 0px 0px 0px, ring 0px 0px 0px 1px`

**Brand Terracotta**
- Background: `#c96442`
- Text: `#faf9f5`
- Radius: `8–12px`
- Shadow: `#c96442 0px 0px 0px 0px, #c96442 0px 0px 0px 1px`
- The primary CTA — the only button with chromatic color

**Dark Primary**
- Background: `#141413`
- Text: `#b0aea5`
- Padding: `9.6px 16.8px`
- Radius: `12px`
- Border: `1px solid #30302e`

### Cards & Containers

- Background: `#faf9f5` or `#ffffff` on light; `#30302e` on dark
- Border: `1px solid #f0eee6` on light; `1px solid #30302e` on dark
- Radius: `8px` standard; `16px` featured; `32px` hero/embedded media
- Shadow: `rgba(0,0,0,0.05) 0px 4px 24px` for elevated content
- Ring shadow: `0px 0px 0px 1px` for interactive card states
- Section borders: `1px 0px 0px` (top-only) for list item separators

### Inputs & Forms

- Text: `#141413`
- Padding: `1.6px 12px` (very compact vertical)
- Focus: ring with Focus Blue (`#3898ec`) border-color — the only cool color moment
- Radius: `12px`

### Navigation

- Sticky top nav with warm background
- Logo: Claude wordmark in `#141413`
- Links: `#141413`, `#5e5d59`, `#3d3d3a`
- Nav border: `1px solid #30302e` (dark) or `1px solid #f0eee6` (light)
- CTA: Terracotta Brand button or White Surface button
- Hover: text shifts to foreground-primary, no decoration

### Image Treatment

- Product screenshots with generous border-radius (16–32px)
- Embedded video players with rounded corners
- Dark UI screenshots providing contrast against warm light canvas
- Organic, hand-drawn illustrations for conceptual sections

### Distinctive Components

**Model Comparison Cards**
- Opus / Sonnet / Haiku presented in a clean card grid
- Each model: bordered card with name, description, and capability badges
- `#e8e6dc` separation between items

**Organic Illustrations**
- Hand-drawn-feeling vector illustrations in terracotta, black, and muted green
- Abstract, conceptual rather than literal product diagrams
- The primary visual personality — no other AI company uses this style

**Dark/Light Section Alternation**
- Page alternates between Parchment light and Near Black dark sections
- Creates a reading rhythm like chapters in a book
- Each section feels like a distinct environment

---

## 5. Layout Principles

### Spacing System

- Base unit: `8px`
- Scale: `3px, 4px, 6px, 8px, 10px, 12px, 16px, 20px, 24px, 30px`
- Button padding: `0px 12px 0px 8px` (asymmetric) or `8px 16px` (balanced)
- Card internal padding: `24–32px`
- Section vertical spacing: `80–120px` between major sections

### Grid & Container

- Max container width: `~1200px`, centered
- Hero: centered editorial layout
- Feature sections: single-column or 2–3 column card grids
- Model comparison: clean 3-column grid
- Full-width dark sections breaking the container for emphasis

### Whitespace Philosophy

- **Editorial pacing**: Each section breathes like a magazine spread — generous top/bottom margins create natural reading pauses.
- **Serif-driven rhythm**: The serif headings establish a literary cadence that demands more whitespace than sans-serif designs.
- **Content island approach**: Sections alternate between light and dark environments, creating distinct "rooms" for each message.

### Border Radius Scale

| Level | Size | Usage |
|-------|------|-------|
| Sharp | 4px | Minimal inline elements |
| Subtly rounded | 6–7.5px | Small buttons, secondary interactive elements |
| Comfortably rounded | 8–8.5px | Standard buttons, cards, containers |
| Generously rounded | 12px | Primary buttons, input fields, nav elements |
| Very rounded | 16px | Featured containers, video players, tab lists |
| Highly rounded | 24px | Tag-like elements, highlighted containers |
| Maximum rounded | 32px | Hero containers, embedded media, large cards |

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, no border | Parchment background, inline text |
| Contained (Level 1) | `1px solid #f0eee6` (light) / `1px solid #30302e` (dark) | Standard cards, sections |
| Ring (Level 2) | `0px 0px 0px 1px` ring shadows using warm grays | Interactive cards, buttons, hover states |
| Whisper (Level 3) | `rgba(0,0,0,0.05) 0px 4px 24px` | Elevated feature cards, product screenshots |
| Inset (Level 4) | `inset 0px 0px 0px 1px` at 15% opacity | Active/pressed button states |

**Shadow Philosophy**: Claude communicates depth through **warm-toned ring shadows** rather than traditional drop shadows. The signature `0px 0px 0px 1px` pattern creates a border-like halo that's softer than an actual border. When drop shadows do appear, they're extremely soft (0.05 opacity, 24px blur) — barely visible lifts that suggest floating rather than casting.

### Decorative Depth

- **Light/Dark alternation**: The most dramatic depth effect — entire sections shift elevation by changing the ambient light level.
- **Warm ring halos**: Button and card interactions use ring shadows that match the warm palette — never cool-toned or generic gray.

---

## 7. Do's and Don'ts

### Do

- Use Parchment (`#f5f4ed`) as the primary light background — the warm cream tone IS the Claude personality
- Use Anthropic Serif at weight 500 for all headlines — the single-weight consistency is intentional
- Use Terracotta Brand (`#c96442`) only for primary CTAs and the highest-signal brand moments
- Keep all neutrals warm-toned — every gray should have a yellow-brown undertone
- Use ring shadows (`0px 0px 0px 1px`) for interactive element states instead of drop shadows
- Maintain the editorial serif/sans hierarchy — serif for content headlines, sans for UI
- Use generous body line-height (1.60) for a literary reading experience
- Alternate between light and dark sections to create chapter-like page rhythm
- Apply generous border-radius (12–32px) for a soft, approachable feel

### Don't

- Don't use cool blue-grays anywhere — the palette is exclusively warm-toned
- Don't use bold (700+) weight on Anthropic Serif — weight 500 is the ceiling for serifs
- Don't introduce saturated colors beyond Terracotta — the palette is deliberately muted
- Don't use sharp corners (< 6px radius) on buttons or cards — softness is core to the identity
- Don't apply heavy drop shadows — depth comes from ring shadows and background color shifts
- Don't use pure white (`#ffffff`) as a page background — Parchment or Ivory are always warmer
- Don't use geometric/tech-style illustrations — Claude's illustrations are organic and hand-drawn-feeling
- Don't reduce body line-height below 1.40 — the generous spacing supports the editorial personality
- Don't use monospace fonts for non-code content — Anthropic Mono is strictly for code
- Don't mix in sans-serif for headlines — the serif/sans split is the typographic identity

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Small Mobile | < 479px | Minimum layout, stacked everything, compact typography |
| Mobile | 479–640px | Single column, hamburger nav, reduced heading sizes |
| Large Mobile | 640–767px | Slightly wider content area |
| Tablet | 768–991px | 2-column grids begin, condensed nav |
| Desktop | 992px+ | Full multi-column layout, expanded nav, max hero typography (64px) |

### Touch Targets

- Buttons use generous padding (8–16px vertical minimum)
- Navigation links adequately spaced for thumb navigation
- Card surfaces serve as large touch targets
- Minimum recommended: 44×44px

### Collapsing Strategy

- **Navigation**: Full horizontal nav → hamburger on mobile
- **Feature sections**: Multi-column → stacked single column
- **Hero text**: 64px → 36px → ~25px progressive scaling
- **Model cards**: 3-column → stacked vertical
- **Section padding**: Reduces proportionally but maintains editorial rhythm
- **Illustrations**: Scale proportionally, maintain aspect ratios

### Image Behavior

- Product screenshots scale proportionally within rounded containers
- Illustrations maintain quality at all sizes
- Video embeds maintain 16:9 aspect ratio with rounded corners
- No art direction changes between breakpoints

---

## 9. Agent Prompt Guide

### Quick Color Reference

| Role | Token | Hex |
|------|-------|-----|
| Brand CTA | Terracotta Brand | `#c96442` |
| Page Background | Parchment | `#f5f4ed` |
| Card Surface | Ivory | `#faf9f5` |
| Primary Text | Anthropic Near Black | `#141413` |
| Secondary Text | Olive Gray | `#5e5d59` |
| Tertiary Text | Stone Gray | `#87867f` |
| Borders (light) | Border Cream | `#f0eee6` |
| Dark Surface | Dark Surface | `#30302e` |

### Example Component Prompts

**Hero Section**
> "Create a hero section on Parchment (#f5f4ed) with a headline at 64px Anthropic Serif weight 500, line-height 1.10. Use Anthropic Near Black (#141413) text. Add a subtitle in Olive Gray (#5e5d59) at 20px Anthropic Sans with 1.60 line-height. Place a Terracotta Brand (#c96442) CTA button with Ivory text, 12px radius."

**Feature Card**
> "Design a feature card on Ivory (#faf9f5) with a 1px solid Border Cream (#f0eee6) border and 8px radius. Title in Anthropic Serif at 25px weight 500, description in Olive Gray (#5e5d59) at 16px Anthropic Sans. Add a whisper shadow (rgba(0,0,0,0.05) 0px 4px 24px)."

**Dark Section**
> "Build a dark section on Anthropic Near Black (#141413) with Ivory (#faf9f5) headline text in Anthropic Serif at 52px weight 500. Use Warm Silver (#b0aea5) for body text. Borders in Dark Surface (#30302e)."

**Warm Sand Button**
> "Create a button in Warm Sand (#e8e6dc) with Charcoal Warm (#4d4c48) text, 8px radius, and a ring shadow (0px 0px 0px 1px #d1cfc5). Padding: 0px 12px 0px 8px."

**Model Comparison Grid**
> "Design a model comparison grid with three cards on Ivory surfaces. Each card gets a Border Warm (#e8e6dc) top border, model name in Anthropic Serif at 25px weight 500, and description in Olive Gray at 15px Anthropic Sans."

### Iteration Guide

1. Focus on ONE component at a time
2. Reference specific color names — "use Olive Gray (#5e5d59)" not "make it gray"
3. Always specify warm-toned variants — no cool grays
4. Describe serif vs sans usage explicitly — "Anthropic Serif for the heading, Anthropic Sans for the label"
5. For shadows, use "ring shadow (0px 0px 0px 1px)" or "whisper shadow" — never generic "drop shadow"
6. Specify the warm background — "on Parchment (#f5f4ed)" or "on Near Black (#141413)"
7. Keep illustrations organic and conceptual — describe "hand-drawn-feeling" style
