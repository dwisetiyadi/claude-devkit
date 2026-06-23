# Preset: next-react-node

Next.js (App Router) + React, on Node.

- **Package manager:** npm
- **Install:** `npm install`

## Gates

| Gate      | Command                          |
| --------- | -------------------------------- |
| typecheck | `tsc --noEmit`                   |
| lint      | `next lint` _(or `eslint .`)_    |
| test      | `vitest run` _(or `jest`)_       |
| build     | `next build`                     |

## QA

- **Functional / E2E:** Playwright (`templates/configs/playwright.config.ts`); `webServer`
  = `npm run build && npm run start` (Next serves on the configured port — align `PORT`).
- **Security:** `npm audit --omit=dev`; review middleware/route handlers + headers
  (`next.config` headers / CSP) per the security-review template; validate Server Action
  and Route Handler inputs.

## .gitignore essentials

`node_modules`, `.next/`, `out/`, `.env*` (keep `.env.example`), `coverage/`,
`test-results/`, `playwright-report/`, `.last-run.json`.

## Data-invariant tests (DB-backed)

Next apps are usually DB-backed — assert DB invariants with **Vitest** against a **test
database**: unique keys/slugs, required (non-null) columns, referential integrity, i18n
pairing (if any), referenced-asset existence. Tooling: Prisma / Drizzle / Kysely / `pg`.
(If you also author MDX content, the `content-invariants.test.ts` pattern applies to that.)
`/devkit-init` asks the project-specific bits (which DB, the env var holding the connection —
local/secret, never committed, e.g. `DATABASE_URL` — and which invariants), then scaffolds a
starter test.

## Notes

API routes / Server Actions are real server code — TDD their logic and review them for the
security checklist (authz, input validation), not just the UI.
