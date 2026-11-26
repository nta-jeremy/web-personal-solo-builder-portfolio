# Documentation Index

Evergreen authority docs for this repository. The layout is fixed by `AGENTS.md` (classic preset). These files own the WHY and WHERE knowledge that code cannot express; code owns WHAT and HOW — every doc points to its executable owners instead of paraphrasing them.

## Authority route

| Document | Owns |
|---|---|
| [project-overview-pdr.md](./project-overview-pdr.md) | Product intent, audiences, non-goals, terminology, constraints |
| [code-standards.md](./code-standards.md) | Engineering choices, testing policy, quality bars |
| [codebase-summary.md](./codebase-summary.md) | Navigation: entry points, module boundaries, executable owners |
| [design-guidelines.md](./design-guidelines.md) | Design language, token policy, interface conventions |
| [deployment-guide.md](./deployment-guide.md) | Environments, deploy route, credential and log retrieval routes |
| [system-architecture.md](./system-architecture.md) | Current boundaries, decision ledger, variation seams |
| [project-roadmap.md](./project-roadmap.md) | Intended direction — intent, not shipped behavior |

All seven preset files exist; none skipped.

## Stateful areas (not authority)

- `docs/idea/` — historical PRD, design-system v1 rationale, content drafts, ideas/TODO record.
- `docs/design/` — design mockups and sample screens (stateful reference).
- `plans/` (repo root) — timestamped implementation plans and reports; local-only planning state (gitignored — only `plans/templates/` is tracked).

## Maintenance rule

When behavior changes, update the affected authority doc in the same change. Write nothing when there is nothing new to say — a no-op is a correct outcome.
