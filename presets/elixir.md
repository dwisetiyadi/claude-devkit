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

## Notes

TDD with ExUnit. `mix format` + `mix credo` are the format/lint gates; `--warnings-as-errors`
makes compile a real gate. Changesets/contexts are where input validation belongs.
