# Preset: ruby-on-rails

A Ruby on Rails app (full-stack or API-only).

- **Package manager:** Bundler (+ Yarn/importmap for assets if full-stack)
- **Install:** `bundle install`

## Gates

| Gate      | Command                                              |
| --------- | ---------------------------------------------------- |
| typecheck | `bundle exec srb tc` _(Sorbet, optional; else skip)_ |
| lint      | `bundle exec rubocop`                                |
| test      | `bundle exec rspec` _(or `bin/rails test`)_          |
| build     | `bin/rails assets:precompile` _(full-stack; n/a for API-only)_ |

## QA

- **Functional:** **request specs** (`spec/requests`) / controller + system tests — routes,
  status, validation, authz. System tests can drive a browser via Capybara when there's UI.
- **Penetration:** apply `templates/configs/security-review.md`; run **Brakeman**
  (`bundle exec brakeman`) for Rails-specific static analysis.
- **Audit:** `bundle exec bundle-audit check --update`.

## .gitignore essentials

`/log`, `/tmp`, `/storage`, `.env*` (keep `.env.example`), `node_modules` (if Yarn),
`/public/assets`, `/coverage`.

## Fullstack frontend E2E

Rails is typically full-stack. Native: **Capybara system tests** (`spec/system`) drive a real
browser. Or reuse `templates/configs/playwright.config.ts` with `E2E_WEBSERVER='bin/rails server -e test'`
and `PORT=3000` (needs Node + `@playwright/test`).

## Data-invariant tests

Treat persisted data as testable. With **RSpec** against the **test database**, assert: unique
indexes/slugs, non-null/required columns, referential integrity (FKs), i18n pairing (if any),
referenced asset paths exist — beyond model validations. Tooling: ActiveRecord. `/devkit-init`
asks the project-specific bits — **which DB** (the adapter in `config/database.yml`), the **env
var / credential holding its connection** (kept in local env / Rails credentials, never
committed, e.g. `DATABASE_URL`), and **which invariants** matter — then scaffolds a starter
`spec/models/data_invariants_spec.rb`.

## Notes

TDD with RSpec (RED → GREEN → REFACTOR). RuboCop = lint gate; Brakeman + bundle-audit cover
the security review. Strong params + model validations are the first line for input safety.
