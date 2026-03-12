# Maya AI Web App

Vite + React dashboard for monitoring and managing community-reported issues.

## Features
- Public landing page (`/`)
- Admin dashboard (`/dashboard`)
- Map view (`/map`)
- Issue list (`/issues`)
- Issue details (`/issues/:id`)
- Analytics (`/analytics`)
- Live data from the backend API

## Tech Stack
- React + TypeScript
- Vite
- React Router
- Tailwind CSS

## Prerequisites
- Node.js 18+
- npm (or bun)

## Setup
From `web/`:

```bash
npm install
```

Create env file:
```bash
cp .env.example .env
```

Set:
- `VITE_API_BASE_URL` (default backend currently used: `https://scroll-backend-latest.onrender.com`)

## Run
Development:
```bash
npm run dev
```

Build:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

Typecheck:
```bash
npm run lint
```

## API Integration
API client is in:
- `src/lib/api.ts`

It calls:
- `GET /stats`
- `GET /feed`
- `GET /issues`
- `GET /issue/{id}`
- `PATCH /issue/{id}`

## Project Structure
```text
web/
  src/
    components/
      Header.tsx
      Sidebar.tsx
    pages/
      Landing.tsx
      Dashboard.tsx
      MapView.tsx
      IssueList.tsx
      IssueDetails.tsx
      Analytics.tsx
    lib/api.ts
```

## Notes
- Keep `.env` files out of git.
- If backend URL changes, update `VITE_API_BASE_URL`.
