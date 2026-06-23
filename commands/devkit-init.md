---
description: Scaffold a project's dev workflow — pick a tooling preset, an optional code-reviewer agent, and publish-ready setup.
argument-hint: "[preset] (optional; otherwise you'll be asked)"
---

# /devkit-init

Set up **disciplined-delivery** in the current project: resolve the four quality gates for the
chosen stack, drop in the QA config templates, optional hooks, an optional code-reviewer agent,
and optional publish-ready marketplace files.

Follow the **approval gate** from the `disciplined-delivery` skill (radio → if "No", a
multi-select checklist with recommended items tagged). Concretely:

## 1. Gather choices (ask, don't assume)

Ask the user (use `$ARGUMENTS` as the preset if provided):

1. **Tooling preset** (single-select) — one of:
   `vanilla`, `astro-react-node`, `astro-react-bun`, `astro-node`, `astro-bun`,
   `next-react-node`, `next-react-bun`, `node-api-node`, `node-api-bun`, `python`, `golang`,
   `ruby-on-rails`, `elixir`, `rust`. Read its descriptor from
   `${CLAUDE_PLUGIN_ROOT}/presets/<preset>.md`. (Works for **frontend, full-stack, and
   backend/API** projects — pick the one matching the runtime + framework.)
2. **Include the code-reviewer agent?** (yes/no) — recommended yes.
3. **Make it publish-ready (marketplace)?** (yes/no) — only if this project will itself be
   distributed as a plugin/template.
4. **Environments → branch + URL mapping.** Branch names vary, so ask for each env that exists:
   its **branch name** (dev e.g. `develop`, stg e.g. `staging`, prod e.g. `main`/`master`) and
   its **URL** (a localhost URL or a live domain). Some envs may be absent — skip those.

## 2. Show the plan + get approval

Summarize what will be written (files + the resolved gate commands) and get a **yes** before
writing anything (this is the approval gate). If the user edits the selection, honor it.

## 3. Scaffold

- Write **`devkit.config.json`** at the project root with the preset's resolved gate commands:
  ```json
  {
    "preset": "<preset>",
    "gates": { "typecheck": "...", "lint": "...", "test": "...", "build": "..." },
    "envs": {
      "dev":  { "branch": "develop", "url": "http://localhost:3000" },
      "stg":  { "branch": "staging", "url": "https://stg.example.com" },
      "prod": { "branch": "main",    "url": "https://example.com" }
    }
  }
  ```
  (copy gate commands from the preset descriptor — omit gates a stack lacks; fill `envs` from
  the mapping the user gave — omit envs that don't exist. The push flow reads `envs` to ask the
  target and to verify against the right URL.)
- For **web / full-stack** presets, copy `${CLAUDE_PLUGIN_ROOT}/templates/configs/playwright.config.ts`
  (browser-fallback E2E) and add a `test:e2e` script; for a non-JS backend serving a frontend,
  set `E2E_WEBSERVER` + `PORT` to that app's server (see its preset descriptor). For
  **content-driven (Astro/MDX)** presets, also copy the `content-invariants.test.ts` skeleton.
- For **DB-backed data-invariant tests** (**any** preset whose app uses a database — the non-JS
  ones AND JS/TS apps via Prisma/Drizzle/Kysely/pg; data-invariants are not just for MDX),
  **ASK the user** before scaffolding. Rule of thumb: **MDX content → `content-invariants`;
  database → a DB data-invariant test**; an app can have both. Ask:
  1. **Which data source / DB?** (e.g. PostgreSQL, MySQL, SQLite, …)
  2. **Which env var holds the connection?** (e.g. `DATABASE_URL`) — it must live in the local
     env / secret store and **never be committed**; confirm it's gitignored.
  3. **Which invariants matter?** (unique keys/slugs, required/non-null columns, referential
     integrity, i18n pairing, referenced-asset existence, …)
  Then scaffold a starter data-invariant test in the preset's **native** framework against a
  **test database** (see the preset descriptor for the file name + tooling). Never hardcode the
  connection — read it from the env var.
- Copy `${CLAUDE_PLUGIN_ROOT}/templates/configs/security-review.md` into the project's `docs/`.
- Offer the **hook templates** (`${CLAUDE_PLUGIN_ROOT}/templates/hooks/`): a SessionStart hook
  that loads the project's context file, and an optional Stop hook to save session context.
  Install into the project's local settings only with consent.
- If **code-reviewer** chosen: the agent ships with this plugin (`agents/code-reviewer.md`) and
  is available once the plugin is installed — no per-project copy needed. Note it in the summary.
- If **publish-ready** chosen: scaffold `.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json`
  for THIS project so it can be installed elsewhere (mirror this plugin's structure).

## 4. Verify

Run the resolved gates once (`typecheck`/`lint`/`test`/`build` as available) and report. Do NOT
commit or push — leave that to the user per the standing guardrails.

## Notes

- The preset descriptors hold the per-stack specifics (package manager, gate commands, test +
  E2E tooling, gitignore essentials). The `disciplined-delivery` skill holds the tech-agnostic
  process that applies regardless of preset.
- If a stack you need isn't listed, pick the closest preset and adapt its gate commands in
  `devkit.config.json`.
