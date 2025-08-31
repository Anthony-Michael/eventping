### Security Policy

Principles

- Default deny and least privilege.
- Validate inputs and sanitize outputs.
- Never log secrets or PII unredacted.

Reporting

- Please open a private report via security@yourdomain.example (replace with real).

Operational Controls

- CI fails on high/critical advisories via `npm audit`.
- Use `src/lib/log.ts` to ensure redaction.
- Use `AppError` for explicit, typed errors.
