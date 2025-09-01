## EventPing Web (Vite + React + TS)

### How it works

- Vite serves a React app with strict TypeScript and Tailwind CSS.
- Routing via React Router: `/` (Home) and `/app` (protected shell placeholder).
- `src/lib/log.ts` provides structured logging with redaction; `src/lib/errors.ts` provides a single error shape and helpers.
- Global `ErrorBoundary` catches render errors and logs via the logger.
- Env variables exposed to the client must be prefixed with `PUBLIC_`.

Project structure

- `src/pages` – `Home.tsx`, `AppShell.tsx`, `_layout/AppLayout.tsx`
- `src/shared` – `Header.tsx`, `ErrorBoundary.tsx`
- `src/components` – shared UI components (add as needed)
- `src/hooks` – custom hooks
- `src/lib` – logging/errors (already present)
- `src/styles` – Tailwind entry CSS

### How to run

1. `npm ci`
2. Copy `.env.sample` to `.env` and adjust `PUBLIC_APP_URL` if needed
3. `npm run dev` – open the printed URL
4. `npm run web:build && npm run preview` – production build + preview

### How to test

- Unit tests: `npm test`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`

# EventPing
