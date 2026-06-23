# Security Review Checklist (template)

A **periodic, risk-based** security pass — run on a cadence / before a major release, **not
per-feature**. Tailor to the project's actual surface; delete sections that don't apply.

## 1. Dynamic endpoints / server code

- [ ] **Input validation** before use (types, lengths, formats); safe, stable error responses
      that don't leak internals/stack traces.
- [ ] **Authn / authz** enforced on every protected path; no missing checks on new routes.
- [ ] No **injection** (SQL/command/template), no unsafe deserialization, no SSRF/open-redirect.
- [ ] Anti-abuse on public write endpoints (captcha/turnstile, rate limiting).

## 2. Secrets & configuration

- [ ] Secrets only in env/secret stores — **never committed or bundled** into client output.
- [ ] Client-exposed vars clearly separated from server secrets (correct prefix/scoping).
- [ ] `.env*`, local secret files gitignored; only templates committed.

## 3. Headers / transport (web)

- [ ] CSP allows **only** origins actually used; re-tighten when adding third-party scripts.
- [ ] `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` set.
- [ ] HTTPS everywhere; no mixed content. `security.txt` (RFC 9116) current if published.

## 4. Dependencies

- [ ] Audit dependencies (`npm audit --omit=dev` / `pip-audit` / `govulncheck`); triage
      **production** findings first; keep build-critical deps current.

## 5. Platform / infra (out-of-repo)

- [ ] Bot protection, WAF/rate limits, DNS/email auth (SPF/DKIM/DMARC) as applicable.

## 6. Output hygiene

- [ ] No secrets/internal URLs leaked in build output or content.
- [ ] External links opening new tabs use safe `rel`.

## Run

```bash
# pick the auditor for your stack:
npm audit --omit=dev        # Node
pip-audit                   # Python
govulncheck ./...           # Go
# then manually re-read the dynamic endpoint(s) + headers/CSP against §1 and §3.
```

_Penetration testing belongs here (periodic), not as a per-feature step. Load testing is
usually only warranted where there's a real dynamic bottleneck._
