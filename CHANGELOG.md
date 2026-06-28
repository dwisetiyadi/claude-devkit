# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.11] - 2026-06-28

### Added
- "Version + CHANGELOG per change" guardrail: assess every change's magnitude, bump per semver when warranted, and always add a CHANGELOG entry + tag on a bump.

## [0.1.10] - 2026-06-28

### Changed
- When the user says nothing changed, ask before re-capturing instead of capturing again.

## [0.1.9] - 2026-06-28

### Changed
- Don't re-read files just written.
- Avoid creating duplicate records.

## [0.1.8] - 2026-06-28

### Added
- Capture-once visual rule: keep captured knowledge until a new capture replaces it.

## [0.1.7] - 2026-06-28

### Added
- Token-frugal verification.
- Optional scoring tools.
- Model choice.

## [0.1.6] - 2026-06-28

### Added
- `full-regression-after-fix` guardrail.
- `complete-work-all-surfaces` guardrail.

## [0.1.5] - 2026-06-24

### Changed
- Clarified dependencies: per-project tools vs. optional companions.

## [0.1.4] - 2026-06-24

### Added
- Manifest metadata: author/owner email, repository, category, and tags.

## [0.1.3] - 2026-06-24

### Added
- Push-target and environments rule.

## [0.1.2] - 2026-06-24

### Added
- Adaptive data-invariants for JavaScript/TypeScript.

### Changed
- Native-vs-devkit framing in the docs.

## [0.1.1] - 2026-06-24

### Added
- Fullstack frontend E2E support for non-JS presets (Python, Go, Rails, Elixir, Rust) reusing Playwright or native runners.
- Per-language data-invariant tests asserting DB invariants (unique keys, non-null, referential integrity, i18n pairing, asset existence) against a test database.
- `/devkit-init` now asks the project-specific bits (which DB, the connection env var, which invariants) and scaffolds a starter test.

## [0.1.0] - 2026-06-24

### Added
- Initial release: a tech-agnostic, disciplined-delivery Claude Code plugin.
- Compose-per-task dev-workflow skill with an approval gate, TDD (incl. data-invariants), QA scaled to risk for frontend and backend/API, code review before push, and a content/editorial flow.
- `/devkit-init` scaffolder, a code-reviewer agent, and config/hook templates.
- 14 stack presets: vanilla; astro-react-{node,bun}; astro-{node,bun}; next-react-{node,bun}; node-api-{node,bun} (Express/Fastify/Hono/ElysiaJS); python; golang; ruby-on-rails; elixir; rust.
