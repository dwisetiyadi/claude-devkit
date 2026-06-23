# devkit — disciplined delivery toolkit (Claude Code plugin)

A reusable, exportable Claude Code plugin that carries a **tech-agnostic development
workflow** plus a project scaffolder. Install it once; get the same disciplined process
(and optional per-stack setup) in any project.

## What's inside

- **Skill `disciplined-delivery`** (always-on, tech-agnostic) — the core process:
  compose-per-task with an **approval gate** (radio → "no" → editable checklist), **TDD**
  (data invariants included), **QA scaled to risk** (functional E2E / periodic pen review /
  load only where warranted), **code review before every push**, a **content/editorial
  flow**, and the standing guardrails (confirm-before-push, no micro-commits, verify locally,
  secrets out of the repo).
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
