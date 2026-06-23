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

## Notes

API routes / Server Actions are real server code — TDD their logic and review them for the
security checklist (authz, input validation), not just the UI.
