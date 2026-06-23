# Preset: python

A Python project (library, CLI, or web API e.g. FastAPI/Django).

- **Package manager:** uv / poetry / pip
- **Install:** `uv sync` _(or `poetry install` / `pip install -e ".[dev]"`)_

## Gates

| Gate      | Command                          |
| --------- | -------------------------------- |
| typecheck | `mypy .` _(or `pyright`)_        |
| lint      | `ruff check .` (+ `ruff format --check .`) |
| test      | `pytest`                         |
| build     | `python -m build` _(libs; n/a for apps)_ |

## QA

- **Functional:** `pytest` integration tests; for web APIs use the framework's test client
  (FastAPI `TestClient`, Django test client) — routes, validation, authz.
- **Penetration:** apply the security-review template (input validation, authn/z, injection,
  secrets, headers) on a cadence; for web, check the framework's security middleware.
- **Security audit:** `pip-audit` _(or `uv pip audit`)_.

## .gitignore essentials

`__pycache__/`, `.venv/`, `*.pyc`, `.pytest_cache/`, `.mypy_cache/`, `.ruff_cache/`,
`dist/`, `.env*` (keep `.env.example`).

## Fullstack frontend E2E

If this project serves a frontend, validate it by reusing
`templates/configs/playwright.config.ts`: set `E2E_WEBSERVER` to your server command
(`uvicorn app:app` or `python manage.py runserver`) and `PORT=8000`. Native option:
**`pytest-playwright`** (no Node needed; browser preference Chrome → Brave → … → bundled applies).

## Data-invariant tests

Treat persisted data as testable. With **pytest** against a **test database**, assert: unique
keys/slugs, required (non-null) columns, referential integrity (FKs), i18n pairing (if any),
referenced asset/file paths exist. Tooling: SQLAlchemy/psycopg or the Django ORM.
`/devkit-init` asks the project-specific bits — **which DB**, the **env var holding its
connection** (kept in local env / secret store, never committed, e.g. `DATABASE_URL`), and
**which invariants** matter — then scaffolds a starter `tests/test_data_invariants.py`.

## Notes

TDD with `pytest` (RED → GREEN → REFACTOR). Pin Python version (`.python-version`). Keep
`ruff` + `mypy` strict; they are the typecheck/lint gates.

**This preset is fully native — ignore the `templates/configs/*.ts` (Node-only).** If there's
a web UI to E2E, use **`pytest-playwright`** (Playwright's Python binding); the browser
preference (Chrome → Brave → other → bundled) still applies via Playwright's launch options.
Only `templates/configs/security-review.md` (language-agnostic) is shared.
