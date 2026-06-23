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

## Notes

TDD with RSpec (RED → GREEN → REFACTOR). RuboCop = lint gate; Brakeman + bundle-audit cover
the security review. Strong params + model validations are the first line for input safety.
