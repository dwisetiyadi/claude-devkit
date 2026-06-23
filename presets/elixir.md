# Preset: elixir

An Elixir project (Phoenix web/API, or a plain mix app).

- **Package manager:** mix (Hex)
- **Install:** `mix deps.get`

## Gates

| Gate      | Command                                          |
| --------- | ------------------------------------------------ |
| typecheck | `mix dialyzer` _(Dialyxir; optional but recommended)_ |
| lint      | `mix credo --strict` (+ `mix format --check-formatted`) |
| test      | `mix test`                                       |
| build     | `mix compile --warnings-as-errors`               |

## QA

- **Functional:** ExUnit tests; for Phoenix, **`Phoenix.ConnTest`** request tests (routes,
  status, validation, authz) and `LiveViewTest` for LiveView. Browser E2E via Wallaby if UI.
- **Penetration:** apply `templates/configs/security-review.md`; for Phoenix run **Sobelow**
  (`mix sobelow`) for framework-specific checks.
- **Audit:** `mix deps.audit` _(mix_audit)_.

## .gitignore essentials

`/_build`, `/deps`, `*.ez`, `/cover`, `.env*` (keep `.env.example`),
`erl_crash.dump`, Phoenix: `/priv/static/assets`.

## Fullstack frontend E2E

For Phoenix UIs: native **Wallaby** drives a browser; `LiveViewTest` covers LiveView without
one. Or reuse `templates/configs/playwright.config.ts` with `E2E_WEBSERVER='mix phx.server'`
and `PORT=4000` (needs Node + `@playwright/test`).

## Data-invariant tests

Treat persisted data as testable. With **ExUnit** against the **test repo**, assert: unique
constraints/slugs, non-null/required fields, referential integrity (FKs), i18n pairing (if any),
referenced asset paths exist — beyond changeset validations. Tooling: `Ecto` `Repo` queries.
`/devkit-init` asks the project-specific bits — **which DB** (the Ecto adapter), the **env var
holding its connection** (kept in local env / runtime config, never committed, e.g.
`DATABASE_URL`), and **which invariants** matter — then scaffolds a starter
`test/data_invariants_test.exs`.

## Notes

TDD with ExUnit. `mix format` + `mix credo` are the format/lint gates; `--warnings-as-errors`
makes compile a real gate. Changesets/contexts are where input validation belongs.
