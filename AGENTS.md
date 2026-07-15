# AGENTS.md

## Commands

```bash
npm run dev       # Vite dev server (HMR)
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint 9 flat config
```

No `test` or `typecheck` scripts exist. Plain JavaScript (not TypeScript).

## Architecture

- **Entrypoint:** `src/main.jsx` renders `<App />` in StrictMode
- **Router** (BrowserRouter): `/` → Home, `/admin` → AdminLogin, `/admin/login` redirects to `/admin`, `/admin/dashboard` → ProtectedRoute wrapping AdminDashboard, `*` redirects to `/`
- **Pages:** `Home.jsx` composes Hero → AboutUs → FunFacts → EventInfo → RSVP in order
- **Navbar** is embedded **inside** `EventInfo.jsx` and also rendered inside `Hero.jsx` — not a persistent top-level nav
- **Galaxy** background uses `ogl` (WebGL), not Three.js
- **ErrorBoundary** wraps all routes in `App.jsx`
- **Styling:** Plain CSS per component. Design tokens in `src/index.css` as CSS custom properties. No Tailwind, no CSS modules. `Cormorant Garamond` loaded via `@import` in `Hero.css`
- **Database:** Single Supabase table `guests` (`id`, `first_name`, `last_name`, `email`, `will_attend`, `message`). `will_attend` is `"yes"` or `"no"`
- **Auth:** Supabase email/password. `ProtectedRoute` checks `supabase.auth.onAuthStateChange`

## Deploy

Vercel with SPA rewrite (`vercel.json`). All routes rewrite to `/`.

## Env vars

`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` (`.env` is gitignored; copy `.env.example`).

## Conventions

- ESLint: ignores `dist/`, enforces React Hooks rules, allows unused vars starting with uppercase or underscore
- All content is in Spanish
- `supabaseClient.js` returns `null` gracefully if env vars are missing (with `console.warn`)
