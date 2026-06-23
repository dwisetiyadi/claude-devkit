# Preset: node-api-bun

An HTTP API service on the **Bun** runtime — no frontend.

- **Package manager:** bun
- **Install:** `bun install`
- **Frameworks:** **ElysiaJS** (Bun-native, recommended here — fast, end-to-end typed) or Hono.

## Gates

| Gate      | Command                                   |
| --------- | ----------------------------------------- |
| typecheck | `bunx tsc --noEmit`                       |
| lint      | `bunx eslint . --max-warnings 0`          |
| test      | `bun test` _(Bun's native runner; or `bunx vitest run`)_ |
| build     | `bun build ./src/index.ts --target bun --outdir dist` _(or run via `bun src/index.ts`)_ |

## QA

- **Functional:** integration tests — call Elysia's `app.handle(new Request(...))` directly, or
  `fetch` an in-process server. Cover routes, status, validation, authz. No browser.
- **Penetration:** highest-value surface — apply `templates/configs/security-review.md` on a
  cadence (input validation, authn/z, injection, secrets, rate limiting).
- **Load:** smoke a hot endpoint with `autocannon`/`k6`/`oha` if it's a real bottleneck.
- **Audit:** `bun audit` _(or `npm audit --omit=dev` against the lockfile)_.

## .gitignore essentials

`node_modules`, `dist`, `.env*` (keep `.env.example`), `coverage/`.

## Data-invariant tests (DB-backed)

If the API is backed by a **database**, assert DB invariants with **`bun test`** (or Vitest)
against a **test database**: unique keys, required (non-null) columns, referential integrity,
referenced-asset existence. Tooling: Prisma / Drizzle / Kysely / `pg` / Bun's `bun:sqlite`.
`/devkit-init` asks the project-specific bits (which DB, the env var holding the connection —
local/secret, never committed, e.g. `DATABASE_URL` — and which invariants), then scaffolds a
starter test.

## Notes

Pin the Bun version for CI parity. Elysia's end-to-end types make TDD pleasant — type the
schema, test the handler. Browser E2E templates do not apply (no UI).
