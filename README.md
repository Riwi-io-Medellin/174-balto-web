# Front End Pets

Next.js 16 app for a pets platform with:

- a public landing page
- an admin dashboard
- ASP.NET API integration for authentication and data
- Tailwind CSS for styling

The backend owns identity and auth. This frontend focuses on UI, routing, data fetching, and presentation.

## How it works

- `src/app/(marketing)` contains the public site.
- `src/app/(dashboard)` contains the admin area.
- `src/infrastructure/http` holds API clients and backend integration code.
- `src/features` groups UI and logic by business area.
- `src/shared` holds reusable utilities and shared code.

The app uses a shared root layout in `src/app/layout.tsx` and route groups to keep public and admin sections separated.

## Packages

### Runtime

- `next`
- `react`
- `react-dom`
- `axios`
- `@tanstack/react-query`
- `zod`
- `react-hook-form`
- `@hookform/resolvers`
- `clsx`
- `tailwind-merge`
- `lucide-react`

### Dev

- `typescript`
- `eslint`
- `eslint-config-next`
- `tailwindcss`
- `@tailwindcss/postcss`
- `@types/node`
- `@types/react`
- `@types/react-dom`

## Structure

```txt
src/
  app/
    (marketing)/
      layout.tsx
      page.tsx
    (dashboard)/
      layout.tsx
      dashboard/
        page.tsx
    globals.css
    layout.tsx
    providers.tsx
  features/
    auth/
    dashboard/
    marketing/
  infrastructure/
    http/
  shared/
    utils/
```

## Run it

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

## Notes

- Global Tailwind styles live in `src/app/globals.css`.
- The API base URL is read from `NEXT_PUBLIC_API_URL`.
- `src/app/providers.tsx` sets up React Query.
