# devkit — creator / maintainer TODO

Tasks for the project's **creator** and maintainer.

## Docs

- [ ] **Create a flow illustration/diagram of the devkit workflow** and embed it in
      `README.md` (replace the placeholder there). It should give plugin users a deeper,
      visual explanation of how the pieces fit together end-to-end:

      compose-per-task → **approval gate** (radio → "no" → editable checklist)
        → TDD (incl. data/content-invariants)
        → 4 gates (typecheck · lint · test · build)
        → QA by risk (functional E2E · periodic pen review · load where warranted)
        → code review (before push)
        → choose env/branch (dev/stg/prod mapping + per-env URL)
        → push (explicit approval)
        → verify-live (against the chosen env's URL)

      Suggested: a horizontal flow with the **approval gate** and **code-review/push**
      decision points highlighted; a small side note that the flow is composed per task
      (not every step runs every time). Export as SVG/PNG under `assets/` and reference it
      from the README intro.
