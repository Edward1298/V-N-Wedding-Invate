# VyN Wedding Invite

Boda entre Vale y Nacho — Noviembre 14, 2026.

Wedding invitation website with RSVP, event details, love story, fun facts, and an admin dashboard for guest management.

## Tech Stack

React 19 · Vite 8 · React Router v7 · Framer Motion · Supabase · ogl (WebGL)

## Getting Started

```bash
npm install
npm run dev
```

Create a `.env` file with:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint 9 flat config |

## Routes

| Path | Page |
|------|------|
| `/` | Public invitation (Hero, About Us, Fun Facts, Event Info, RSVP) |
| `/admin` | Admin login |
| `/admin/dashboard` | Guest list dashboard (protected) |

## Database

Supabase table `guests`: `id`, `first_name`, `last_name`, `email`, `will_attend`, `message`.

## Deploy

Vercel with SPA rewrite (`vercel.json`). All routes rewrite to `/`.
