Full-Stack E-Commerce Platform
A Turborepo monorepo for an e-commerce platform, with an Express + Prisma API
and a Next.js frontend. This project is under active development — see
Project Status below for what's actually built vs. planned.
Stack
API (apps/api): Express, TypeScript, Prisma 7, PostgreSQL, JWT auth, bcrypt
Web (apps/web): Next.js 16, React 19, TypeScript
Tooling: Turborepo, pnpm workspaces, ESLint, Prettier
Project Status
Backend (apps/api)
Module
Status
auth
✅ Implemented — register, login, refresh, logout (JWT + hashed refresh tokens)
products
✅ Implemented — list, get by id, get by slug
cart
❌ Not started
categories
❌ Not started
orders
❌ Not started
payments
❌ Not started
reviews
❌ Not started
users
❌ Not started
The Prisma schema (apps/api/prisma/schema.prisma) already models the full
domain — users, addresses, categories, brands, products, variants, inventory,
cart, wishlist, orders, order items, payments, reviews, coupons — ahead of the
API routes that expose it. Building out a new module means adding a
*.routes.ts / *.controller.ts / *.service.ts / *.repository.ts set
following the pattern in modules/products.
Frontend (apps/web)
Currently the default Next.js starter page — no product listing, cart,
checkout, or auth UI has been built yet, and it isn't wired up to the API.
Getting Started
Prerequisites
Node.js >= 18
pnpm 9
A PostgreSQL database (local or hosted, e.g. Neon/Supabase/Railway)
Setup
Bash
Create apps/api/.env (see apps/api/.env.example):
Bash
Important: ACCESS_TOKEN_SECRET currently falls back to a hardcoded
dev value if unset. Always set a real secret, especially outside local dev.
Run migrations and generate the Prisma client:
Bash
Running locally
From the repo root, run everything via Turborepo:
Bash
Or run each app individually:
Bash
Other useful commands
Bash
API Overview
Base path: /api/v1 (see apps/api/src/app.ts / routes/index.ts)
Auth — /api/v1/auth
POST /register
POST /login
POST /refresh
POST /logout
Products — /api/v1/products
GET / — list products
GET /:id — get product by id
GET /slug/:slug — get product by slug
Known Issues / Things to Fix Before Production
cors() is currently configured with no options in app.ts, meaning it
accepts requests from any origin. Restrict this to your deployed frontend
origin before going live.
No CI (tests/lint) currently runs automatically — no .github/workflows yet.
No automated tests exist for any module yet.
Contributing / Next Steps
Priority order for anyone picking this up:
Wire the frontend to the auth and products APIs (real login/product pages).
Implement cart module (schema already supports it).
Implement orders and payments.
Implement categories, reviews, users (profile management).
Add tests and CI.
License
Not yet specified.