### Contributing to EventPing

Thank you for contributing! This repo prioritizes clarity, security, and human-readability.

- Use TypeScript strictly. Keep functions short and cohesive (single responsibility).
- All files start with a brief header docstring: purpose, inputs/outputs, assumptions, side effects.
- Use the error helpers in `src/lib/errors.ts` and logger in `src/lib/log.ts`.

Workflow

- **Branch**: feature/fix/chore prefixes.
- **Commits**: Conventional Commits (e.g., `feat(api): add webhook receiver`).
- **Before commit**: `npm run typecheck && npm run lint && npm test` (hooks enforce this).
- **PRs**: Explain the problem, the solution, risks, and alternatives.

Local Setup

- `npm ci`
- `npm run typecheck`, `npm run lint`, `npm test`

Security

- Never log secrets or PII unredacted. Use `log` which auto-redacts emails/phones.
- Minimize privileges and validate inputs at boundaries.
