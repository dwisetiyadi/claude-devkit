# Preset: astro-node

Astro (no React) on Node — content/marketing sites, minimal interactivity.

- **Package manager:** npm
- **Install:** `npm install`

## Gates

| Gate      | Command           |
| --------- | ----------------- |
| typecheck | `astro check`     |
| lint      | `eslint . --max-warnings 0` |
| test      | `vitest run`      |
| build     | `astro build`     |

## QA

- **Functional / E2E:** Playwright (`templates/configs/playwright.config.ts`); `webServer`
  = `npm run build && npm run preview`.
- **Content-as-data:** copy `templates/configs/content-invariants.test.ts` and adjust collections.
- **Security:** `npm audit --omit=dev`; review CSP/headers if used.

## .gitignore essentials

`node_modules`, `dist`, `.astro/`, `.env*` (keep `.env.example`), `coverage/`,
`test-results/`, `playwright-report/`, `.last-run.json`.

## Data-invariant tests (DB-backed)

If this app uses a **database** (not just MDX), assert DB invariants too — with **Vitest**
against a **test database**: unique keys/slugs, required (non-null) columns, referential
integrity, i18n pairing (if any), referenced-asset existence. Tooling: Prisma / Drizzle /
Kysely / `pg`. **MDX content → `content-invariants.test.ts`; DB data → a DB data-invariant
test** — use either or both. `/devkit-init` asks the project-specific bits (which DB, the env
var holding the connection — local/secret, never committed, e.g. `DATABASE_URL` — and which
invariants), then scaffolds a starter test.

## Notes

Drop `@astrojs/react` and React deps. Use Astro components + small vanilla scripts for any
interactivity; keeps the bundle lean.
