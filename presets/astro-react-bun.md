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

## Notes

Pin the Bun version (`.bun-version` / CI). Some Astro adapters assume Node — verify the
deploy target supports Bun, or build with Bun and serve the static `dist/` anywhere.
