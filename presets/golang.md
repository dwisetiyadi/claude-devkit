# Preset: golang

A Go project (service, CLI, or library).

- **Package manager:** go modules
- **Install:** `go mod download`

## Native vs devkit (complement, not replacement)

Go's toolchain already covers most gates natively — devkit does NOT replace it; it maps the
gates to your native commands and adds the cross-language process on top.

- **Native (use as-is):** `go test`, `go vet`, `gofmt`, `go build` — all built into the `go`
  toolchain. (`golangci-lint`, `govulncheck` are standard add-ons.)
- **devkit adds:** the disciplined-delivery workflow (compose-per-task + approval gate +
  QA-by-risk + code-review-before-push), the **data-invariant** discipline, and the
  language-agnostic security-review checklist.

## Gates

| Gate      | Command                              |
| --------- | ------------------------------------ |
| typecheck | `go vet ./...` (+ `gofmt -l .` clean) |
| lint      | `golangci-lint run`                  |
| test      | `go test ./...` (`-race` for concurrency) |
| build     | `go build ./...`                     |

## QA

- **Functional:** table-driven `go test` + `net/http/httptest` for handlers — routes,
  status, validation, authz.
- **Penetration:** apply the security-review template on a cadence (input validation, authn/z,
  injection, secrets, headers).
- **Load:** if a hot path warrants it, `go test -bench` or a load tool; otherwise N/A.
- **Security audit:** `govulncheck ./...`.

## .gitignore essentials

compiled binaries, `*.test`, `*.out`, `vendor/` _(if not committed)_, `.env*` (keep `.env.example`).

## Fullstack frontend E2E

If this project serves a frontend, validate it by reusing
`templates/configs/playwright.config.ts`: set `E2E_WEBSERVER` to `go run ./...` and `PORT=8080`
(needs Node + `@playwright/test` as a dev tool). Native alternatives: `chromedp` / `rod`.

## Data-invariant tests

Treat persisted data as testable. With **`go test`** against a **test database**, assert: unique
keys/slugs, required (non-null) columns, referential integrity (FKs), i18n pairing (if any),
referenced asset/file paths exist. Tooling: `database/sql` / `sqlx` / GORM. `/devkit-init` asks
the project-specific bits — **which DB**, the **env var holding its connection** (kept in local
env / secret store, never committed, e.g. `DATABASE_URL`), and **which invariants** matter —
then scaffolds a starter `data_invariants_test.go`.

## Notes

TDD with table tests. `go vet` + `gofmt` + `golangci-lint` are the typecheck/lint gates. Run
`go test -race` for anything concurrent.

**This preset is fully native — ignore the `templates/configs/*.ts` (Node-only).** If there's
a web UI to E2E, use a Go-native driver (`chromedp` / `rod`) or keep a separate Playwright
suite. Only `templates/configs/security-review.md` (language-agnostic) is shared.
