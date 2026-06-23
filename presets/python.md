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

## Notes

TDD with `pytest` (RED → GREEN → REFACTOR). Pin Python version (`.python-version`). Keep
`ruff` + `mypy` strict; they are the typecheck/lint gates.

**This preset is fully native — ignore the `templates/configs/*.ts` (Node-only).** If there's
a web UI to E2E, use **`pytest-playwright`** (Playwright's Python binding); the browser
preference (Chrome → Brave → other → bundled) still applies via Playwright's launch options.
Only `templates/configs/security-review.md` (language-agnostic) is shared.
