# syntax=docker/dockerfile:1

# Build context must be the monorepo root (ecommerce-platform/), e.g.:
#   docker build -f apps/api/Dockerfile -t ecommerce-api .

FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /repo

FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm --filter api exec prisma generate
RUN pnpm --filter api run build
RUN pnpm --filter api deploy --prod /prod/api
# Regenerate the Prisma client inside the deployed (prod-deps-only) directory —
# `pnpm deploy` performs a fresh prod install, so a client generated earlier
# against the dev node_modules would not carry over.
RUN apps/api/node_modules/.bin/prisma generate --schema=/prod/api/prisma/schema.prisma

FROM node:20-alpine AS runner
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=app:app /prod/api ./
USER app
EXPOSE 5000
CMD ["node", "dist/server.js"]
