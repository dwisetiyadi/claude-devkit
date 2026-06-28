---
name: disciplined-delivery
description: Use when implementing ANY feature, fix, content, or change in a project. Composes the right workflow for the task (with an explicit approval gate), then enforces TDD, QA scaled to risk, and a code review before every push. Tech-agnostic — gate commands resolve from the project's own config/preset.
---

# Disciplined Delivery

A workflow discipline that works on any stack. The flow is a **toolbox, not a fixed
checklist**: analyze the task, propose a composed flow, get approval, then execute only the
approved steps. Keep the project's quality gates green; never push without explicit approval.

## The toolbox of steps

```
brainstorm → plan → isolate(worktree) → TDD → gates → QA(by risk) → code review → push → verify
```

- **brainstorm** — for a new/ambiguous feature: clarify purpose, constraints, success criteria.
- **plan** — for multi-step work: write a short plan (files, interfaces, tasks).
- **isolate** — a git worktree/branch when changes are risky or run in parallel.
- **TDD** — RED → GREEN → REFACTOR for any code with testable logic.
- **gates** — the project's four green gates before commit (see *Gates*).
- **QA** — functional / penetration / load, **scaled to risk** (see *QA by risk*).
- **code review** — before every push (see *Code review before push*).
- **push** — only on the user's explicit command.
- **verify** — after deploy, verify the live/running result for page/behavior-facing changes.

## Approval gate — propose the flow BEFORE executing (required)

Use this exact two-step mechanism at the start of a task:

1. **Radio (single-select) question** — state the recommended composed flow (ordered steps) in
   the question text; offer exactly **"Ya, jalankan"** and **"Tidak, saya pilih sendiri"**
   (or the project's language equivalent: "Yes, run it" / "No, I'll choose").
2. **Yes** → run the recommended flow as-is.
3. **No** → a second **multi-select** question listing **all** candidate steps **in order**,
   each recommended step tagged **"(Recommended)"** so the user edits/modifies your
   recommendation by ticking/unticking. Run only the ticked steps.

This gate decides *which steps run*. It is separate from — and in addition to — the explicit
approval still required before any push.

## Compose by task type

- **Logic / library / API feature**: brainstorm (if ambiguous) → plan (if multi-step) →
  **TDD** → gates → **E2E if it changes interactive behavior** → code review → push → verify.
- **Content / copy** (articles, docs-as-data): angle + intent/keyword → write (all locales) →
  **data-invariant tests** + build + **visual check** → **editorial review** (accuracy, voice,
  localization quality, internal links, meta) — this replaces code review → push → verify.
- **UI / visual**: design/shape → build → **screenshot/visual check** → E2E if interactive →
  code review → push → verify.
- **Docs-only** (README, notes): write → **lightweight check** (links/paths, build) → push.
  No TDD, no heavy code review.

## TDD (for code with logic)

Write the failing test first, run it to confirm it fails, write the minimal code to pass, then
refactor. Put tests next to the code. **Data is testable too**: if the project encodes data,
assert its invariants in tests (unique keys/slugs, required fields, referential integrity,
referenced asset paths exist, cross-locale pairing). This applies to **file-based data** (e.g.
content frontmatter, config) AND to **DB-backed data in full-stack apps of any language** — run
the same invariant checks in the project's native test framework against a **test database**,
with the connection read from an env var (kept in local env / secret store, never committed).
Only literal prose and visual quality are left to build + a visual check.

## Gates (run before every commit)

devkit does **not** ship a test runner or linter — it **maps** four gates to your stack's
**native** commands (the preset descriptors list them) and adds the workflow on top. So this
**complements** each ecosystem's built-in tooling (e.g. `go test`/`cargo test`/`mix test`/
`pytest`/`rails test`) rather than replacing it. Resolve the exact commands from
`devkit.config.json` (written by `/devkit-init`) or the project's scripts. Conventionally:

| Gate       | Typical command (resolve per stack)        |
| ---------- | ------------------------------------------ |
| typecheck  | `npm run typecheck` / `tsc` / `mypy` / `go vet` |
| lint       | `npm run lint` / `ruff` / `golangci-lint`  |
| test       | `npm test` / `pytest` / `go test ./...`    |
| build      | `npm run build` / `go build` / (n/a)       |

All four must be green before committing. After any fix for findings, re-run them **plus the QA
that applies** — see *Full regression after any fix* under *Standing guardrails*.

## QA by risk

Scale QA to the task and the project's surface — don't run every type on every feature. This
applies to **both frontend and backend/API** projects; pick the functional form that fits.

- **Functional** — automate the critical flows in the project's OWN language/tooling:
  - **Frontend / web UI** → browser E2E (navigation, auth, forms, rendering). Use Playwright;
    **browser preference**: first installed of **real Chrome → Brave → another Chrome-derived
    browser (Edge/Vivaldi/Opera/Chromium) → the runner's bundled Chromium** (resolve an
    executable path; allow an env override). Playwright has runners for **Node/TS, Python
    (`pytest-playwright`), Java, .NET** — use the one matching your stack.
  - **Backend / API service** → integration tests against the running app (request → response):
    status codes, validation, authz, error shapes. Node `supertest`/`fetch`, Python
    `TestClient`/`httpx`, Go `net/http/httptest`, Rails request specs, Elixir `Phoenix.ConnTest`,
    Rust `reqwest`/`actix-test`. No browser needed.
- **Penetration** — NOT per-feature. Periodic **security review** (input validation, authn/z,
  secrets, injection, headers/CSP, dependency audit). **Higher value for API/backends** — make
  it a regular pass there. Use `templates/configs/security-review.md` (language-agnostic).
- **Load** — only where there's a real dynamic bottleneck. **More relevant for API/backends**
  (hot endpoints) than for CDN-served static frontends (mostly N/A). Use a stack-appropriate
  tool (`autocannon`, `k6`, `go test -bench`, `wrk`) when warranted.

> The TypeScript templates in `templates/configs/` (`playwright.config.ts`,
> `content-invariants.test.ts`) are **Node/web-stack helpers** — ignore them for Python, Go,
> Ruby, Elixir, Rust projects and use that language's native test/E2E tooling instead. The
> `security-review.md` checklist is language-agnostic and applies everywhere.

## Code review before push

Before **every push**, run a code review (e.g. the bundled `code-reviewer` agent, or
`superpowers:requesting-code-review`) over the diff about to ship (`git diff <remote>..HEAD`
and/or the working diff). Fix Critical/Important findings, re-run the **full regression** (gates + applicable QA), then push.

**Scope:** review **code** (logic/tests/config). For **docs/content-only** diffs do a
lightweight check (accuracy, links, build) instead of a heavy review. Mixed → review the code
part. Pushing still requires the user's explicit command.

## Push targets & environments

Projects use up to three environments — **dev**, **stg**, **production** — but **branch names
vary**, so don't assume. Confirm the env → branch mapping with the user
(`{ dev: <branch>, stg: <branch>, prod: <branch> }`; some may be absent) and persist it in
`devkit.config.json` / the project's context file; reuse it, re-asking only if unknown.

On **every push** (after the code review, on the user's explicit go-ahead):
- Ask **which environment** via a radio prompt listing the mapped env branches **plus the
  current branch**. If the current branch is NOT one of the mapped env branches, **default to
  pushing the current branch**. Push only to the chosen target.
- Maintain a per-env **URL** (localhost or a live domain) for verification; if the target env's
  URL is unknown, **ask** it. After deploy, **verify against the chosen env's URL** — not always
  production.

Suggested `devkit.config.json` shape:
```json
{ "envs": { "dev": { "branch": "develop", "url": "http://localhost:3000" },
            "stg": { "branch": "staging", "url": "https://stg.example.com" },
            "prod": { "branch": "main", "url": "https://example.com" } } }
```

## Standing guardrails

- **Confirm before push** — never commit-to-remote without an explicit "yes"; the same goes
  for anything outward-facing (publishing, deploying, sending).
- **No frequent micro-commits** — iterate uncommitted; commit once the work is right.
- **Verify locally first** — visual/functional checks on the local build/preview before push.
- **Full regression after any fix** — after fixing findings from a code review, audit, QA, lint,
  or a bug, re-run the WHOLE regression (the four gates AND the QA that applies — e.g. E2E), not
  just the spot you changed. A fix can break something elsewhere; verifying only the fix misses
  it — that is the entire point of regression. Treat "fix → full regression → report" as one
  indivisible step; never declare green or propose a push until the complete suite re-runs clean.
  **Batched + risk-proportional (token-frugal):** fix ALL findings first, then run the regression
  ONCE, scoped to the change's blast radius — cheap gates (typecheck/lint/unit/build) freely, the
  expensive E2E once per fix-batch only if that surface was touched. Same discipline, no redundant
  re-runs.
- **Complete work, all surfaces** — never ship half-work. Apply AND validate every change across
  ALL surfaces it touches: every locale, light/dark, each breakpoint (desktop/tablet/mobile),
  and every paired file/page. Automated invariants miss cross-surface drift — check each surface.
- **Token-frugal verification** — the token sink is *reading* an image into context, not
  capturing/storing it, so capture & persist freely. To confirm "does X render / is the markup
  right," use a **structural/DOM check** (inspect the built output, query the DOM), not a
  screenshot. When a visual-quality judgment IS needed, **capture the full surface matrix** the
  change touches (every locale, light/dark, each viewport — coverage catches what caching can't),
  **read each surface once and keep that knowledge**, and **re-read only when a new capture
  supersedes it** (re-capture a surface only when its source changed: component / content-per-locale
  / style / data / build). **Persist captures to disk** (the record; the user can audit them);
  **re-capture in production only on the user's request**. One composite full-page shot beats many;
  offload big diffs / audit output to a subagent that returns just the conclusion. Don't re-read a
  file you just wrote — the tool layer tracks file state and an edit fails loudly on mismatch.
  **If the user says they see no change** (their eyes disagree with your belief it's done), treat it
  as a stale-knowledge signal — their report overrides your cached/structural assumption. Diagnose
  the likely cause (often a coverage gap: you checked one surface, they're on another), then **ask
  the user's approval before re-capturing** (re-capture costs tokens), and refresh on yes.
- **Scoring/audit tools are optional & reporting-only** — Lighthouse, accessibility / SEO / design
  audits, anything that emits a SCORE or grade, is NOT a gate and carries no obligation. Don't run
  it by default; **ask or just inform the user** so they run it occasionally. (Lighthouse, if the
  user wants it: once, last, only after the change is live — lab metrics are noisy; field/CrUX is
  the real signal.)
- **Model is the user's choice** — the workflow is model-agnostic; never hard-code or assume a
  model (don't force a heavy one). `/devkit-init` asks a preferred model and records it; the user
  can change it any time mid-session.
- **Version + CHANGELOG per change** — assess EVERY change's magnitude (very-minor / minor / major)
  and decide whether it warrants a version bump (semver: **patch** = fix/very-minor, **minor** =
  non-breaking feature, **major** = breaking change; trivial/no-impact changes need none). When you
  DO bump, **always add a `CHANGELOG.md` entry** (Keep a Changelog format) and tag the release
  commit (`git tag -a vX.Y.Z`). Don't let shipped work drift ahead of the version.
- **Secrets never in the repo** — only in env/secret stores; keep templates committed, values out.

## Requirements & companions

This skill is **self-contained** — no other plugin is required to use it (it bundles a
`code-reviewer` agent and describes every stage itself). Optional **companion plugins** enhance
it: **superpowers** (brainstorming / writing-plans / subagent-driven-development / TDD /
requesting-code-review / worktrees) and **impeccable** (UI/design). Per-project test tools
(Playwright, pytest, the language toolchains) are the target project's own dev dependencies —
`/devkit-init` wires them in. (Claude Code has no manifest dependency field, so these are
documented here rather than auto-installed.)

## Project memory

If the platform supports per-project memory, record durable preferences/decisions there (who
the user is, confirmed workflow choices, non-obvious gotchas) so they survive across sessions.
This skill carries the *defaults*; project memory carries the *specifics*.

**No duplicates** — when something is already recorded, UPDATE the existing entry rather than
creating a new one, and have other docs **reference** it instead of copying. Before recording,
check whether an existing entry already covers it. Avoids drift and wasted tokens.
