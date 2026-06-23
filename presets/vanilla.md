# Preset: vanilla

Plain HTML/CSS/JS (or a tiny bundler) — no framework.

- **Package manager:** npm (optional)
- **Install:** `npm install` (if a `package.json` exists)

## Gates

| Gate      | Command                                   |
| --------- | ----------------------------------------- |
| typecheck | `npx tsc --noEmit` _(only if using TS)_   |
| lint      | `npx eslint .` _(or `npx prettier --check .`)_ |
| test      | `npx vitest run` _(if any tests)_         |
| build     | _(n/a, or your bundler's build)_          |

## QA

- **Functional / E2E:** Playwright (`templates/configs/playwright.config.ts`) — set
  `webServer` to however you serve the static files (e.g. `npx serve` / `python3 -m http.server`).
- **Security:** if there are dependencies, `npm audit --omit=dev`.

## .gitignore essentials

`node_modules`, `dist`/build output, `.env*` (keep `.env.example`), `test-results/`,
`playwright-report/`.

## Notes

Minimal by design. Most value here is lint/format + a small E2E smoke of the rendered pages.
