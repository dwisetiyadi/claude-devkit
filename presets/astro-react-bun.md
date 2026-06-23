# Preset: astro-react-bun

Astro with React islands, on Bun (fast install + runtime).

- **Package manager:** bun
- **Install:** `bun install`

## Gates

| Gate      | Command              |
| --------- | -------------------- |
| typecheck | `bunx astro check`   |
| lint      | `bunx eslint . --max-warnings 0` |
| test      | `bunx vitest run`    |
| build     | `bunx astro build`   |

## QA

- **Functional / E2E:** Playwright (`templates/configs/playwright.config.ts`); `webServer`
  = `bun run build && bun run preview`.
- **Content-as-data:** copy `templates/configs/content-invariants.test.ts` (Vitest works under Bun).
- **Security:** `bun audit` _(or `npm audit --omit=dev` against the lockfile)_.

## .gitignore essentials

`node_modules`, `dist`, `.astro/`, `.env*` (keep `.env.example`), `test-results/`,
`playwright-report/`, `.last-run.json`.

## Data-invariant tests (DB-backed)

If this app uses a **database** (not just MDX), assert DB invariants too — with **Vitest**
against a **test database**: unique keys/slugs, required (non-null) columns, referential
integrity, i18n pairing (if any), referenced-asset existence. Tooling: Prisma / Drizzle /
Kysely / `pg` / Bun's `bun:sqlite`. **MDX content → `content-invariants.test.ts`; DB data → a
DB data-invariant test** — use either or both. `/devkit-init` asks the project-specific bits
(which DB, the env var holding the connection — local/secret, never committed, e.g.
`DATABASE_URL` — and which invariants), then scaffolds a starter test.

## Notes

Pin the Bun version (`.bun-version` / CI). Some Astro adapters assume Node — verify the
deploy target supports Bun, or build with Bun and serve the static `dist/` anywhere.
