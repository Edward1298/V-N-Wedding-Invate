# Wedding Invitation Website

[![Vercel](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)](https://v-n-wedding-invate.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev/)

> **Live demo:** [v-n-wedding-invate.vercel.app](https://v-n-wedding-invate.vercel.app/)
>
> ⚠️ *The RSVP form is connected to a live database for an actual event. Please do not submit test entries.*

A single-page wedding invitation website with RSVP management, built for a real event. Features an interactive WebGL starfield background, scroll-triggered animations, and a password-protected admin dashboard for guest list management — all without a custom backend.

## Features

- **Image slider hero** with an animated countdown timer to the event date
- **Love story section** with scroll-triggered fade-in animations and photo gallery
- **Interactive trivia cards** — tap or click to flip and reveal fun facts about the couple
- **Event details** — venue cards with Waze and Google Maps links, dress code, weather, and gift registry information
- **RSVP form** — name, email, attendance confirmation, and optional message, submitted directly to Supabase with SweetAlert2 feedback modals
- **Admin dashboard** — password-protected guest list viewer with attendance statistics, filter controls, and delete confirmation
- **WebGL starfield background** — interactive particle system built with `ogl` that responds to mouse movement

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, React Router v7 |
| Animations | Framer Motion, CSS transitions |
| Backend | Supabase (serverless Postgres + Auth) |
| WebGL | ogl (lightweight WebGL library) |
| Styling | Plain CSS with CSS custom properties |
| Deploy | Vercel (SPA rewrite) |

## Architecture

```
src/
├── main.jsx                Entrypoint (StrictMode)
├── App.jsx                 BrowserRouter + ErrorBoundary
├── index.css               Design tokens (CSS custom properties)
├── pages/
│   ├── Home.jsx            Composes Hero → AboutUs → FunFacts → EventInfo → RSVP
│   └── admin/
│       ├── AdminLogin.jsx          Supabase email/password auth
│       └── AdminDashboard.jsx      Guest list CRUD + Galaxy background
├── components/
│   ├── Hero/               Image slider, countdown, embedded Navbar
│   ├── AboutUs/            Love story with Framer Motion animations
│   ├── FunFacts/           Flip-card trivia grid (7 cards)
│   ├── EventInfo/          Venue details, maps, dress code, gifts
│   ├── RSVP/               Form submission to Supabase guests table
│   ├── Navbar/             Embedded in each section for smooth-scroll navigation
│   ├── Galaxy/             WebGL starfield (ogl, not Three.js)
│   ├── ProtectedRoute/     Auth guard via Supabase onAuthStateChange
│   └── ErrorBoundary/      Class component, renders reload button on crash
└── lib/
    └── supabaseClient.js   Graceful client (null if env vars missing)
```

### Key Design Decisions

- **No custom backend** — Supabase handles auth, database, and API directly from the browser client
- **Plain CSS over Tailwind** — CSS custom properties provide a token-based design system without build-time class generation
- **ogl over Three.js** — the starfield is a single fullscreen shader; ogl is significantly lighter for this use case
- **Embedded Navbar pattern** — each page section renders its own `<Navbar />` for scroll-to-section navigation without a persistent top-level header
- **Error boundary** — catches rendering errors anywhere in the route tree and shows a reload button instead of a blank screen

## Getting Started

```bash
npm install
npm run dev
```

Create a `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint 9 flat config |

## Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Public invitation (all sections) | Public |
| `/admin` | Admin login | Public |
| `/admin/dashboard` | Guest list dashboard | Protected (Supabase session required) |

## Database

A single Supabase table `guests`:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `first_name` | text | Guest's first name |
| `last_name` | text | Guest's last name |
| `email` | text | Guest's email |
| `will_attend` | text | `"yes"` or `"no"` |
| `message` | text | Optional note from the guest |

## Deploy

Deployed on Vercel. All routes rewrite to `/` via SPA rewrite rule in `vercel.json`.
