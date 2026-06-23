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

## Notes

Drop `@astrojs/react` and React deps. Use Astro components + small vanilla scripts for any
interactivity; keeps the bundle lean.
