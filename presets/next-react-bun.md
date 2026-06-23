# Preset: next-react-bun

Next.js + React, on Bun.

- **Package manager:** bun
- **Install:** `bun install`

## Gates

| Gate      | Command                       |
| --------- | ----------------------------- |
| typecheck | `bunx tsc --noEmit`           |
| lint      | `bunx next lint`              |
| test      | `bunx vitest run`             |
| build     | `bunx next build`             |

## QA

- **Functional / E2E:** Playwright (`templates/configs/playwright.config.ts`); `webServer`
  = `bun run build && bun run start`.
- **Security:** `bun audit` _(or `npm audit --omit=dev`)_; validate Route Handler / Server
  Action inputs; review headers/CSP.

## .gitignore essentials

`node_modules`, `.next/`, `out/`, `.env*` (keep `.env.example`),
`test-results/`, `playwright-report/`, `.last-run.json`.

## Notes

Confirm the Next version + deploy target run cleanly on Bun; some Next features still assume
Node. Pin the Bun version for CI parity.
