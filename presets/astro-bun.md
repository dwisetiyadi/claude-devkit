# Preset: astro-bun

Astro (no React) on Bun.

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
- **Content-as-data:** copy `templates/configs/content-invariants.test.ts`.
- **Security:** `bun audit` _(or `npm audit --omit=dev`)_.

## .gitignore essentials

`node_modules`, `dist`, `.astro/`, `.env*` (keep `.env.example`), `test-results/`,
`playwright-report/`, `.last-run.json`.

## Notes

Leanest content-site preset. Verify the deploy target supports Bun, or just ship static `dist/`.
