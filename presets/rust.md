# Preset: rust

A Rust project (service via axum/actix, CLI, or library).

- **Package manager:** Cargo
- **Install:** `cargo fetch`

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

## Notes

TDD with `cargo test` (unit `#[cfg(test)]` + `tests/` integration). Clippy `-D warnings` +
`cargo fmt --check` are the lint gates; the compiler's type system is the strongest gate.
