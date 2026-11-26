# Deployment Guide

One production environment: Cloudflare Pages project `web-personal-astro-jeremy-tech`, custom domain `https://jeremytech.io.vn`. No staging environment. Deployment is automatic on push to `main`.

## Deploy route

- **Owner of every deploy step**: `.github/workflows/deploy.yml` — on push/PR to `main` it installs with pnpm, runs the type check and build, verifies the worker bundle exists, then (pushes only) deploys `dist/` to Cloudflare Pages via wrangler-action. Read the workflow for exact steps; do not copy them elsewhere.
- **Runtime configuration owner**: `wrangler.toml` — Pages project name, compatibility flags, non-secret vars (AI provider priority and model names).
- Pull requests: build + check only, no deploy.

## Local development

- `pnpm install` → `pnpm dev` (scripts owned by `package.json`).
- `@astrojs/cloudflare` platformProxy is enabled (`astro.config.mjs`), so `/api/*` routes run locally and read environment variables from `.dev.vars` (gitignored; name inventory in `.env.example`).

## Credential retrieval routes

| Route | Record |
|---|---|
| Cloudflare deploy | GitHub repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` (repo Settings → Secrets and variables → Actions); consumed by the deploy job. Scope: deploy the Pages project. Verify: push to `main` → the GitHub Actions run stays green and the site updates. |
| AI provider keys (production) | Cloudflare Pages project settings — dashboard → the Pages project → environment variables/secrets. Names per `.env.example` and the env map in `src/pages/api/chat.ts`. At least one key required for chat; the active set = `AI_PROVIDER_PRIORITY` + present keys. Values never live in the repo. |
| AI provider keys (local) | `.dev.vars` in the repo root (gitignored). |

No other secrets exist today; the contact endpoint only logs submissions.

## Log routes

| Question | Route |
|---|---|
| Build / deploy failures | GitHub Actions run history (repo → Actions tab); the build job output owns build errors. |
| Runtime API errors, contact submissions | Cloudflare dashboard → Workers & Pages → the project → Functions logs. Contact submissions are `console.log`-ged server-side by `src/pages/api/contact.ts` (no email yet). Free-tier retention is short — filter early, expect recent-only history. |

## Rollback

Cloudflare Pages keeps every deployment: roll back by promoting a previous deployment from the project's deployment history in the dashboard. The custom domain then serves the previous build.
