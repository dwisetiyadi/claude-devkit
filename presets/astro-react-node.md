# Preset: astro-react-node

Astro (static/SSR) with React islands, on Node.

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
  = `npm run build && npm run preview`; `test:e2e` script = `playwright test`.
- **Content-as-data:** copy `templates/configs/content-invariants.test.ts` next to
  `src/content/` and adjust collections — guards slugs/pairing/asset paths.
- **Security:** `npm audit --omit=dev`; review `public/_headers` CSP if used.

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

Use `@astrojs/react`. Build-critical deps (`@tailwindcss/vite`, `sass`, etc.) belong in
`dependencies` (some hosts install without devDeps).
