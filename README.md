# Kara Weaves — Prototype

Exploratory frontend for the Kara Weaves textile customization platform. Monochrome, minimal UI intended for rapid UX iteration before API, database, and auth integration.

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Route | Purpose |
|-------|---------|
| `/` | Prototype index |
| `/prototype-1` | Textile customization (to be built) |

```bash
npm run build
npm run start
npm run lint
```

## Deploy to Vercel

1. Import the repository in [Vercel](https://vercel.com/new).
2. Keep the Next.js defaults (no environment variables required).
3. Deploy.

```bash
npx vercel
```

## Architecture

```
src/
├── app/           # Routes (App Router)
├── components/    # Reusable UI
├── data/          # Templates, palettes, loom profiles
├── types/         # TypeScript models
├── utils/         # Spec generation, constraints, rendering helpers
└── styles/        # Design tokens and shared CSS Modules
```

**Stack:** Next.js (App Router), React, TypeScript, CSS Modules.

**Not included yet:** backend, auth, database, Tailwind, analytics.

Add prototype routes under `src/app/`, link them from `src/app/page.tsx`, and grow shared logic in `components/`, `data/`, `types/`, and `utils/` as features land.
