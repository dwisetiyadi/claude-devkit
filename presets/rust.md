# Preset: rust

A Rust project (service via axum/actix, CLI, or library).

- **Package manager:** Cargo
- **Install:** `cargo fetch`

## Native vs devkit (complement, not replacement)

Cargo is very complete — devkit does NOT replace it; it maps the gates to Cargo's native
commands and adds the cross-language process on top.

- **Native (use as-is):** `cargo test`, `cargo fmt`, `cargo clippy`, `cargo build`,
  `cargo bench` — built into Cargo; the compiler/type system is your strongest gate.
  (`cargo audit`, `cargo deny` are standard add-ons.)
- **devkit adds:** the disciplined-delivery workflow (compose-per-task + approval gate +
  QA-by-risk + code-review-before-push), the **data-invariant** discipline, and the
  language-agnostic security-review checklist.

## Gates

| Gate      | Command                                   |
| --------- | ----------------------------------------- |
| typecheck | `cargo check --all-targets`               |
| lint      | `cargo clippy --all-targets -- -D warnings` (+ `cargo fmt --check`) |
| test      | `cargo test`                              |
| build     | `cargo build --release`                   |

## QA

- **Functional:** integration tests in `tests/`; for web services hit the app with `reqwest`
  or the framework's test harness (`axum::test`, `actix_web::test`) — routes, status,
  validation, authz.
- **Penetration:** apply `templates/configs/security-review.md`; prefer safe patterns, avoid
  `unsafe` without justification.
- **Audit:** `cargo audit` (+ `cargo deny check` for licenses/bans).
- **Load:** if a hot path warrants it, `cargo bench` (Criterion) or an HTTP load tool.

## .gitignore essentials

`/target`, `*.rs.bk`, `.env*` (keep `.env.example`), `Cargo.lock` _(commit for bins, ignore for libs)_.

## Fullstack frontend E2E

If this project serves a frontend (e.g. axum/actix templates or an embedded SPA), validate it by
reusing `templates/configs/playwright.config.ts`: set `E2E_WEBSERVER='cargo run'` and `PORT=8080`
(needs Node + `@playwright/test`; Rust has no official browser binding).

## Data-invariant tests

Treat persisted data as testable. With **`cargo test`** against a **test database**, assert:
unique keys/slugs, non-null/required columns, referential integrity (FKs), i18n pairing (if any),
referenced asset paths exist. Tooling: `sqlx` (compile-time-checked queries) or `diesel`.
`/devkit-init` asks the project-specific bits — **which DB**, the **env var holding its
connection** (kept in local env / secret store, never committed, e.g. `DATABASE_URL`), and
**which invariants** matter — then scaffolds a starter `tests/data_invariants.rs`.

## Notes

TDD with `cargo test` (unit `#[cfg(test)]` + `tests/` integration). Clippy `-D warnings` +
`cargo fmt --check` are the lint gates; the compiler's type system is the strongest gate.
