# Enterprise Commerce Platform

Production-ready monorepo foundation for a full stack e-commerce platform built with pnpm workspaces and Turborepo.

## Workspace

- `apps/web` - Next.js 16 storefront shell with Tailwind CSS and Zustand
- `apps/api` - Express.js API with TypeScript, Zod validation, and clean architecture boundaries
- `packages/ui` - reusable UI primitives shared across applications
- `packages/eslint-config` - shared ESLint presets
- `packages/typescript-config` - shared TypeScript configuration

## Principles

- TypeScript-first implementation
- modular features and reusable components
- service and repository patterns for backend features
- no business logic in routes
- validation-first request boundaries
- workspace-wide lint, build, and type-check tasks

## Commands

Run all commands from the workspace root:

```bash
corepack pnpm install
corepack pnpm dev
corepack pnpm lint
corepack pnpm check-types
corepack pnpm build
```

## Current foundation

### Web

- enterprise storefront landing shell
- Tailwind CSS setup
- Zustand-powered capability filtering
- shared UI primitives from `@repo/ui`

### API

- versioned REST routing under `/api/v1`
- modular health feature with controller, service, repository, and validation
- centralized error and not-found middleware
- typed environment configuration
- graceful shutdown handling

## Next feature modules

- authentication with JWT, refresh tokens, and RBAC
- catalog, inventory, cart, checkout, and orders
- Prisma repositories for PostgreSQL
- Redis caching
- payment, storage, email, and notification adapters
- Jest, Supertest, and Playwright test coverage
