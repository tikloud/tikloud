# syntax=docker/dockerfile:1

FROM node:24-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat

# --- Install all workspace dependencies ---------------------------------------
FROM base AS deps
WORKDIR /app
RUN npm install -g npm@11.17.0
COPY package.json package-lock.json ./
COPY apps apps
COPY packages packages
RUN npm ci

# --- Build all apps -----------------------------------------------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/ .
COPY . .

ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

RUN npm run build

# --- Runner: dashboard --------------------------------------------------------
FROM base AS runner-dashboard
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/apps/dashboard/.next/standalone ./
COPY --from=builder /app/apps/dashboard/.next/static ./apps/dashboard/.next/static
COPY --from=builder /app/apps/dashboard/public ./apps/dashboard/public
USER nextjs
EXPOSE 3000
CMD ["node", "apps/dashboard/server.js"]

# --- Runner: landing-page -----------------------------------------------------
FROM base AS runner-landing-page
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3001
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/apps/landing-page/.next/standalone ./
COPY --from=builder /app/apps/landing-page/.next/static ./apps/landing-page/.next/static
COPY --from=builder /app/apps/landing-page/public ./apps/landing-page/public
USER nextjs
EXPOSE 3001
CMD ["node", "apps/landing-page/server.js"]

# --- Runner: docs -------------------------------------------------------------
FROM base AS runner-docs
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3002

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/apps/docs/.next/standalone ./
COPY --from=builder /app/apps/docs/.next/static ./apps/docs/.next/static
COPY --from=builder /app/apps/docs/public ./apps/docs/public
USER nextjs
EXPOSE 3002
CMD ["node", "apps/docs/server.js"]
