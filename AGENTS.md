# AGENTS.md

## Commands

```bash
npm run dev       # Vite dev server (HMR)
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint 9 flat config
```

No `test` or `typecheck` scripts exist. The project is plain JavaScript (not TypeScript).

## Architecture

```
src/
  main.jsx          → React 19 entrypoint (StrictMode)
  App.jsx            → BrowserRouter, 4 routes
  pages/
    Home.jsx         → Public page: Hero → AboutUs → FunFacts → EventInfo → RSVP
    admin/
      AdminLogin.jsx     → Supabase Auth (email/password)
      AdminDashboard.jsx → Guests table (CRUD), Galaxy background
  components/
    Hero/            → Image slider, countdown, Navbar
    Navbar/          → Sticky nav, scrolls to page sections
    AboutUs/         → Love story with fade-in animations
    FunFacts/        → Flip-card grid (7 cards, 4×2 layout)
    EventInfo/       → Church + Celebration details, Waze/GMaps links, Sinpe Movil QR
    RSVP/            → Form → Supabase `guests` table, SweetAlert2 modals
    Galaxy/          → WebGL starfield background using `ogl`
    ProtectedRoute/  → Auth guard (checks Supabase session)
  lib/
    supabaseClient.js → Supabase client (env vars)
```

**Stack:** React 19 + Vite 8 + React Router v7 (client-side) + Framer Motion + Supabase

**Styling:** Plain CSS per component, design tokens in `src/index.css`. No Tailwind, no CSS modules.

**Database:** Single Supabase table `guests` (id, first_name, last_name, email, will_attend, message). `will_attend` is `"yes"` or `"no"`.

**Deploy:** Vercel with SPA rewrite (`vercel.json`). All routes rewrite to `/`.

**Env vars:** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` (committed — see below).

## Known bugs & pitfalls

- **Navbar "Detalles" link is broken:** `Navbar.jsx` line ~23 calls `document.getElementById("event")`, but the section in `EventInfo.jsx` has `id="eventinfo"`. The scroll never fires.
- **Dead dependency:** `@react-three/fiber` is in `package.json` but never imported. The Galaxy background uses `ogl`, not R3F. Don't add R3F imports thinking it's in use.
- **`.env` is committed.** It contains only publishable keys, but it should be in `.gitignore` with an `.env.example` for reference.
- **No error handling** on `fetchGuests()` and `handleDelete()` in `AdminDashboard.jsx` — no `.catch()` blocks.
- **HTML lang is wrong:** `<html lang="en">` in `index.html` but all content is in Spanish.
- **SEO gaps:** No meta description, no OG tags in `index.html`.

## Conventions

- CSS uses a mix of `clamp()`, `rem`, `px`, `vw` — no strict unit system.
- Fonts: `Georgia` (system serif) + `Cormorant Garamond` (Google Fonts, loaded in `Hero.css`).
- ESLint ignores `dist/`, enforces React Hooks rules, and allows unused vars starting with uppercase or underscore.
- The `sections` array in `Navbar.jsx` is defined twice — once at module level (unused, dead) and once inside the component. Only the inside-array matters.
