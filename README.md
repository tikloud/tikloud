# Ti Kloud

Monorepo managing all applications for the Ti Kloud organization.

## Tech stack

- **Turborepo** — build orchestration across the monorepo
- **Next.js** — all web applications (App Router, React 19)
- **TailwindCSS** — v4, shared tokens via `@repo/ui`
- **Supabase** — auth, database, and storage (Postgres)
- **React Hook Form** + **Zod** — form state and schema validation
- **TypeScript** — strict, shared configs

## Apps

| App | Path | Port | Purpose |
| --- | --- | --- | --- |
| Dashboard | `apps/dashboard` | 3000 | Auth'd control center |
| Landing page | `apps/landing-page` | 3001 | Public marketing site |
| Docs | `apps/docs` | 3002 | Internal documentation |

## Packages

- `@repo/ui` — design system: Tailwind v4 theme tokens, `cn()`, UI primitives
- `@repo/supabase` — Supabase client factory (server / browser / middleware)
- `@repo/validation` — shared Zod schemas (auth, waitlist, profile)
- `@repo/eslint-config`, `@repo/typescript-config` — shared lint / TS configs

## Getting started

```sh
npm install
npm run dev            # runs every app (each on its own port)
npm run dev:landing    # landing page only
npm run dev:dashboard  # dashboard only
```

### Environment variables

Supabase credentials live in each app's `.env.local` (gitignored). See
`apps/<app>/.env.example` for the variable names:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Database schema is versioned as SQL under `supabase/migrations/` — apply via
the Supabase SQL editor or the Supabase CLI.

## Commands

```sh
npm run build        # build all apps and packages
npm run lint         # eslint across the monorepo
npm run check-types  # tsc --noEmit across the monorepo
npm run format       # prettier write
```

## Docker

Each app has a Docker image built from the root `Dockerfile` via a build target,
using Next.js standalone output for lean production images.

| Image | Build target | Port |
| --- | --- | --- |
| `tikloud/dashboard` | `runner-dashboard` | 3000 |
| `tikloud/landing-page` | `runner-landing-page` | 3001 |
| `tikloud/docs` | `runner-docs` | 3002 |

`NEXT_PUBLIC_*` variables are inlined at **build time**, so pass them as build
args when the app uses Supabase. Supplying empty or missing values bakes empty
strings into the image and breaks the Supabase auth middleware — the dashboard
and landing page images **require** both args:

```sh
docker build \
  --target runner-dashboard \
  -t tikloud/dashboard \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=... \
  --build-arg NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=... \
  .

docker run -p 3000:3000 tikloud/dashboard
```

Run all three together with compose. Put `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in a root `.env` (or export them) and:

```sh
docker compose up --build
```

`docs` has no Supabase dependency and needs no build args.

### CI

Pushes to `main` (and `v*` tags) trigger the `Build and push Docker images`
workflow (`.github/workflows/build-images.yml`), which builds `linux/amd64` +
`linux/arm64` and publishes to GHCR:

- `ghcr.io/tikloud/tikloud/dashboard` (`latest`, semver tags, `sha-*`)
- `ghcr.io/tikloud/tikloud/landing-page`
- `ghcr.io/tikloud/tikloud/docs`

The dashboard and landing-page builds require the `NEXT_PUBLIC_SUPABASE_URL`
and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` repo secrets (Settings → Secrets
and variables → Actions); the workflow fails if they are unset.
