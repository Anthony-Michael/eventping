### Coding Standards

Principles

- Prefer clarity over cleverness. Keep functions small with single responsibility.
- Security first: validate inputs, least privilege, explicit error cases.
- Human-readable: each file begins with a concise header docstring.

TypeScript

- Strict mode, no implicit any, avoid broad unknown casts.
- Export explicit types and function signatures for public APIs.

Errors and Logging

- Create errors via `src/lib/errors.ts`. Return `Result<T>` or throw `AppError`.
- Log through `src/lib/log.ts` which redacts emails and phone numbers.

Testing

- Add focused unit tests per utility/module. Keep tests independent and fast.

Style

- ESLint + Prettier. Run format on save. No noisy comments.
