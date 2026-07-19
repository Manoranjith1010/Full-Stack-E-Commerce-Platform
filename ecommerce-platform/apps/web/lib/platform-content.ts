export type CapabilityCategory = "frontend" | "backend" | "ops";

export const deliveryPrinciples = [
  "Business logic isolated in services and repositories.",
  "Workspace tooling standardized with pnpm and Turborepo.",
  "Reusable UI and feature composition across modules.",
  "Validation-first API boundaries with explicit error handling.",
] as const;

export const platformMetrics = [
  {
    label: "Architecture",
    value: "Clean",
    description:
      "Presentation, application, and infrastructure concerns stay separated for reliable feature growth.",
  },
  {
    label: "Workspace",
    value: "pnpm + Turbo",
    description:
      "Fast monorepo task orchestration with dependency-aware builds, type checks, and linting.",
  },
  {
    label: "API standard",
    value: "REST + Zod",
    description:
      "Typed request validation and predictable response contracts create production-safe service boundaries.",
  },
] as const;

export const architectureLayers = [
  {
    subtitle: "Presentation",
    title: "Framework adapters",
    description:
      "Next.js pages and Express routes stay thin, delegating behavior to focused services.",
    items: [
      "Route handlers only coordinate transport concerns.",
      "Reusable UI package prevents duplicated interface code.",
      "Validation middleware protects application boundaries.",
    ],
  },
  {
    subtitle: "Application",
    title: "Use-case services",
    description:
      "Every feature owns explicit orchestration logic that can evolve independently from controllers and data sources.",
    items: [
      "Async service methods encapsulate business flows.",
      "Request and response contracts remain explicit.",
      "Feature modules are designed for extension, not rewrites.",
    ],
  },
  {
    subtitle: "Infrastructure",
    title: "Repositories and tooling",
    description:
      "Repositories isolate implementation details while workspace tools enforce consistency across apps.",
    items: [
      "Repository classes hide external dependencies.",
      "Typed environment configuration reduces runtime drift.",
      "Shared linting and type settings keep standards aligned.",
    ],
  },
] as const;

export const capabilityCategories = [
  "frontend",
  "backend",
  "ops",
] as const satisfies readonly CapabilityCategory[];

export const capabilityCards = [
  {
    category: "frontend",
    title: "Storefront shell",
    description:
      "A reusable Next.js landing shell that is ready for catalog, cart, account, and checkout features.",
    items: [
      "Tailwind-based design primitives for rapid UI delivery.",
      "Zustand state slices ready for feature-specific expansion.",
      "Shared UI package for buttons, badges, and cards.",
    ],
  },
  {
    category: "frontend",
    title: "Feature composition",
    description:
      "Presentation modules can be built as isolated capabilities without coupling page code to business rules.",
    items: [
      "Composable components under the web application.",
      "Metadata and layout configured for production defaults.",
      "Ready for server and client component collaboration.",
    ],
  },
  {
    category: "backend",
    title: "Modular API foundation",
    description:
      "Express modules now follow a service-and-repository pattern instead of colocating logic in routes.",
    items: [
      "Centralized error handling and not-found middleware.",
      "Zod-powered request validation middleware.",
      "Versioned API routing with a health feature module.",
    ],
  },
  {
    category: "backend",
    title: "Operational contracts",
    description:
      "The API exposes predictable JSON contracts for monitoring and future integrations.",
    items: [
      "Typed success and error response builders.",
      "Environment validation on process start.",
      "Graceful shutdown behavior for production hosting.",
    ],
  },
  {
    category: "ops",
    title: "Workspace governance",
    description:
      "Monorepo scripts and task outputs are aligned so build, lint, and type-check flows can run consistently.",
    items: [
      "Dependency-aware Turbo task orchestration.",
      "Shared ESLint configuration for browser and Node apps.",
      "TypeScript standards reused across the workspace.",
    ],
  },
  {
    category: "ops",
    title: "Delivery readiness",
    description:
      "The platform is now ready for CI, containerization, data access, and authentication modules to be layered in.",
    items: [
      "Structure supports Prisma and Redis integration.",
      "Authentication can plug into service boundaries cleanly.",
      "Feature teams can extend modules without changing the core shell.",
    ],
  },
] as const;

export const deliveryStages = [
  {
    title: "Commerce core",
    description:
      "Add catalog, inventory, cart, wishlist, and pricing modules behind the existing service boundaries.",
    items: [
      "Prisma repositories for product and inventory aggregates.",
      "Redis-backed caching for high-traffic catalog reads.",
      "Reusable DTO validation and response mapping.",
    ],
  },
  {
    title: "Identity and checkout",
    description:
      "Implement JWT auth, refresh token rotation, RBAC, addresses, and payment orchestration.",
    items: [
      "Authentication services isolated from route handlers.",
      "Checkout flows composed from cart, order, and payment services.",
      "Email and webhook integrations through infrastructure adapters.",
    ],
  },
  {
    title: "Operations and quality",
    description:
      "Expand the workspace with test suites, CI pipelines, observability, and deployment automation.",
    items: [
      "Jest, Supertest, and Playwright coverage per application.",
      "Docker and GitHub Actions integration by workspace target.",
      "Monitoring-ready operational endpoints and structured logs.",
    ],
  },
] as const;
