# Ti Kloud

Monorepo managing all applications for the Ti Kloud organization.

## Tech stack

- **Turborepo** — build orchestration across the monorepo
- **Next.js** — all web applications (App Router, React 19)
- **TailwindCSS** — v4, shared tokens via `@repo/ui`
- **Keycloak** — self-hosted OIDC auth (login, registration, logout)
- **Postgres** — accessed directly via the `pg` driver
- **React Hook Form** + **Zod** — form state and schema validation
- **TypeScript** — strict, shared configs

## Apps

| App          | Path                | Port | Purpose                |
| ------------ | ------------------- | ---- | ---------------------- |
| Dashboard    | `apps/dashboard`    | 3000 | Auth'd control center  |
| Landing page | `apps/landing-page` | 3001 | Public marketing site  |
| Docs         | `apps/docs`         | 3002 | Internal documentation |

## Packages

- `@repo/ui` — design system: Tailwind v4 theme tokens, `cn()`, UI primitives
- `@repo/auth` — Keycloak OIDC client: PKCE login/callback/logout, signed
  session cookie (`/server` for Node, `/edge` for the route guard)
- `@repo/db` — Postgres access via `pg` (`profiles`, `waitlist` queries)
- `@repo/validation` — shared Zod schemas (profile, waitlist)
- `@repo/eslint-config`, `@repo/typescript-config` — shared lint / TS configs

## Getting started

```sh
npm install
npm run dev            # runs every app (each on its own port)
npm run dev:landing    # landing page only
npm run dev:dashboard  # dashboard only
npm run dev:docs       # docs only
```

### Prerequisites

The dashboard authenticates against Keycloak and reads/writes Postgres, so
local development needs both running:

```sh
# Postgres (database "tikloud")
docker run --name tikloud-postgres -e POSTGRES_DB=tikloud \
  -e POSTGRES_USER=tikloud -e POSTGRES_PASSWORD=tikloud \
  -p 5432:5432 -d postgres:16

# Keycloak (then create the "tikloud" realm + client in the admin console,
# or import a realm export; local redirect URI http://localhost:3000/auth/callback)
docker run --name tikloud-keycloak -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin -e KC_HTTP_PORT=8080 \
  -p 8080:8080 -d quay.io/keycloak/keycloak:26.7.1 start-dev
```

Apply the schema to the `tikloud` database:

```sh
psql "postgresql://tikloud:tikloud@localhost:5432/tikloud" \
  -f packages/db/migrations/0001_init.sql
```

### Environment variables

Runtime credentials live in each app's `.env.local` (gitignored). See
`apps/<app>/.env.example` for the variable names:

- Dashboard — `KEYCLOAK_URL`, `KEYCLOAK_REALM`, `KEYCLOAK_CLIENT_ID`,
  `KEYCLOAK_CLIENT_SECRET`, `AUTH_SECRET`, `AUTH_URL`, `DATABASE_URL`
- Landing page — `DATABASE_URL`

All of these are server-side and read at **runtime** — nothing is baked into
production images.

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

| Image                  | Build target          | Port |
| ---------------------- | --------------------- | ---- |
| `tikloud/dashboard`    | `runner-dashboard`    | 3000 |
| `tikloud/landing-page` | `runner-landing-page` | 3001 |
| `tikloud/docs`         | `runner-docs`         | 3002 |

No build args are required — Keycloak and Postgres credentials are supplied as
runtime environment variables by the Helm chart (see `templates/deployment.yaml`):

```sh
docker build --target runner-dashboard -t tikloud/dashboard .

docker run -p 3000:3000 -e DATABASE_URL=... -e KEYCLOAK_URL=... \
  -e KEYCLOAK_REALM=tikloud -e KEYCLOAK_CLIENT_ID=dashboard \
  -e KEYCLOAK_CLIENT_SECRET=... -e AUTH_SECRET=... -e AUTH_URL=http://localhost:3000 \
  tikloud/dashboard
```

### CI

Pushes to `main` (and `v*` tags) trigger the **Docker CI** workflow
(`.github/workflows/docker-ci.yml`), which builds `linux/amd64` images and
publishes to GHCR:

- `ghcr.io/tikloud/dashboard` (`latest`, semver tags, `sha-*`)
- `ghcr.io/tikloud/landing-page`
- `ghcr.io/tikloud/docs`

No secrets are required at build time.

### Kubernetes

The Helm chart at the repo root deploys the apps plus Postgres and Keycloak,
provisions the Keycloak realm/client and the app schema automatically, and
injects the runtime credentials into the pods. See
`apps/docs/content/deployment/kubernetes.mdx` for details.
