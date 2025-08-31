### Architecture Overview

Goals

- Clarity over cleverness; short, cohesive functions.
- Security first; least privilege; explicit errors.
- Human-readable; understand each file's purpose in under 60 seconds.

Layers (initial)

- `src/lib/` foundational utilities: logging, errors, validation (future).
- Application domains grow under `src/` as features land.

Error Handling

- Use `AppError` and `Result<T>` from `src/lib/errors.ts`.
- Public boundaries return `Result` or throw `AppError` only.

Logging

- Use `src/lib/log.ts`. All messages are structured and redact emails/phones.

Testing

- Unit tests via Vitest in `tests/`.

TypeScript

- Strict mode everywhere. Prefer narrow types and pure functions.
