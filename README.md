# devkit — disciplined delivery toolkit (Claude Code plugin)

A reusable, exportable Claude Code plugin that carries a **tech-agnostic development
workflow** plus a project scaffolder. Install it once; get the same disciplined process
(and optional per-stack setup) in any project.

> 📌 **Flow diagram — coming soon.** A visual end-to-end illustration of the workflow will be
> embedded here to complement the text (tracked in [`TODO.md`](TODO.md)).

## What's inside

- **Skill `disciplined-delivery`** (always-on, tech-agnostic) — the core process:
  compose-per-task with an **approval gate** (radio → "no" → editable checklist), **TDD**
  (data invariants included), **QA scaled to risk** (functional E2E / periodic pen review /
  load only where warranted), **code review before every push**, a **content/editorial
  flow**, and the standing guardrails (confirm-before-push, no micro-commits, verify locally,
  **full regression after any fix** (batched + risk-proportional), **complete work across all
  surfaces**, **token-frugal verification** (structural checks before screenshots), **scoring/audit
  tools optional & reporting-only**, **model is the user's choice**, secrets out of the repo).
- **Command `/devkit-init`** — scaffolds a project: pick a **tooling preset**, an optional
  **code-reviewer agent**, and optional **publish-ready** marketplace files; writes
  `devkit.config.json` (the resolved four gates) and drops the QA config templates.
- **Agent `code-reviewer`** — reviews the diff before push (Critical/Important/Minor + verdict).
- **Templates** — `playwright.config.ts` (browser-fallback E2E: Chrome → Brave →
  other Chrome-derived → bundled Chromium), a `content-invariants.test.ts` skeleton, a
  `security-review.md` checklist, and SessionStart/Stop **hook** templates.
- **Presets** (14) — frontend, full-stack, and **backend/API**:
  `vanilla`, `astro-react-node`, `astro-react-bun`, `astro-node`, `astro-bun`,
  `next-react-node`, `next-react-bun`, `node-api-node`, `node-api-bun` (Express/Fastify/Hono/
  **ElysiaJS**), `python`, `golang`, `ruby-on-rails`, `elixir`, `rust`.

The **process** is tech-agnostic and applies everywhere (frontend AND backend); the
**presets/templates** carry the per-stack specifics (gate commands, test/E2E tooling,
gitignore). The TypeScript config templates are Node/web helpers — non-JS stacks use their
native tooling (the security-review checklist is language-agnostic). For an unlisted stack,
pick the closest preset and adjust `devkit.config.json`.

**It complements your toolchain, it doesn't replace it.** devkit ships no test runner/linter —
it maps the gates to your stack's NATIVE commands (`go test`, `cargo test`, `mix test`,
`pytest`, `rails test`, `vitest`, …) and adds what no language toolchain provides: the
workflow discipline + the data/content-invariant patterns. Each non-JS preset spells out
*Native vs devkit*. **Data-invariants are adaptive** — file-based (MDX → `content-invariants`)
or DB-backed (any stack → assert DB invariants in the native test framework against a test DB,
connection from a local env var); `/devkit-init` asks the specifics.

## Install

```text
/plugin marketplace add <git-url-or-owner/repo-of-this-plugin>
/plugin install devkit@dwisetiyadi-devkit
```

Then in any project:

```text
/devkit-init          # pick preset + optional agent + publish-ready, then scaffold
```

The `disciplined-delivery` skill activates automatically when you implement a feature/change.

## Requirements & recommended companions

Claude Code plugins have no manifest-level dependency field, so devkit can't auto-install other
plugins. What it actually needs:

**Per-project tools** — installed into the *target project* by `/devkit-init`, not by devkit:
- Web E2E → Node + **`@playwright/test`** (or `pytest-playwright` for Python); `/devkit-init`
  adds it to the project's dev dependencies for web presets.
- Each stack's native toolchain for the gates (`go`, `cargo`, `mix`, `bundle`, `pytest`,
  `vitest`, …) — the project's own dev tooling.

**Recommended companion plugins** — optional; **devkit works without them**:
- **superpowers** — deepens the workflow (brainstorming, writing-plans,
  subagent-driven-development, test-driven-development, requesting-code-review,
  using-git-worktrees). devkit is self-contained — it bundles its own `code-reviewer` agent and
  describes every stage itself; superpowers' `requesting-code-review` is only an alternative.
- **impeccable** — for UI/visual/design work.

Install companions the usual way (`/plugin install <name>@<marketplace>`); none is required.

## Structure

```text
.claude-plugin/
  plugin.json          # plugin manifest
  marketplace.json     # marketplace entry (publish-ready)
skills/disciplined-delivery/SKILL.md
commands/devkit-init.md
agents/code-reviewer.md
templates/
  hooks/               # SessionStart/Stop hook templates + README
  configs/             # playwright.config.ts, content-invariants.test.ts, security-review.md
presets/               # one descriptor per stack
```

## Philosophy

Match effort to the task and its risk — the workflow is a toolbox, not a fixed checklist.
Propose the composed flow, get approval, run only what's needed, keep the gates green, and
never push without an explicit "yes".
