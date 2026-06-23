# Preset: golang

A Go project (service, CLI, or library).

- **Package manager:** go modules
- **Install:** `go mod download`

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

## Notes

TDD with table tests. `go vet` + `gofmt` + `golangci-lint` are the typecheck/lint gates. Run
`go test -race` for anything concurrent.

**This preset is fully native — ignore the `templates/configs/*.ts` (Node-only).** If there's
a web UI to E2E, use a Go-native driver (`chromedp` / `rod`) or keep a separate Playwright
suite. Only `templates/configs/security-review.md` (language-agnostic) is shared.
