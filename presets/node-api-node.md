# Preset: node-api-node

An HTTP API service on the **Node** runtime — no frontend.

- **Package manager:** npm
- **Install:** `npm install`
- **Frameworks:** Express, Fastify, Hono, or **ElysiaJS** (Bun-first, but runs on Node via the
  `@elysiajs/node` adapter — for a pure-Node target prefer Hono/Fastify; use Elysia here only
  if you specifically want its API and accept the Node adapter).

## Gates

| Gate      | Command                                  |
| --------- | ---------------------------------------- |
| typecheck | `tsc --noEmit`                           |
| lint      | `eslint . --max-warnings 0`              |
| test      | `vitest run` _(or `node --test`)_        |
| build     | `tsc` _(or `tsup`/`esbuild`; n/a if run via `tsx`)_ |

## QA

- **Functional:** integration tests against the app (`supertest`/`fetch` to an in-process
  server) — routes, status codes, validation, authz. No browser.
- **Penetration:** highest-value surface — apply `templates/configs/security-review.md` on a
  cadence (input validation, authn/z, injection, secrets, rate limiting).
- **Load:** smoke a hot endpoint with `autocannon`/`k6` if it's a real bottleneck.
- **Audit:** `npm audit --omit=dev`.

## .gitignore essentials

`node_modules`, `dist`, `.env*` (keep `.env.example`), `coverage/`.

## Data-invariant tests (DB-backed)

If the API is backed by a **database**, assert DB invariants with **Vitest** against a **test
database**: unique keys, required (non-null) columns, referential integrity, referenced-asset
existence. Tooling: Prisma / Drizzle / Kysely / `pg`. `/devkit-init` asks the project-specific
bits (which DB, the env var holding the connection — local/secret, never committed, e.g.
`DATABASE_URL` — and which invariants), then scaffolds a starter test.

## Notes

Browser E2E templates do not apply (no UI). TDD the handlers/services; validate every input at
the edge; keep secrets in env and never log them.
