# Fixes & Improvements Guide

This document catalogs areas of improvement found in the current codebase, ordered by severity. Each entry includes the problem, its impact, and the recommended fix.

---

## Critical

### 1. Navbar "Detalles" link throws TypeError and crashes the app

**File:** `src/components/Navbar/Navbar.jsx:15` + `src/components/EventInfo/EventInfo.jsx:170`

**Problem:** The navbar links to `document.getElementById("event")`, but the EventInfo section renders with `id="eventinfo"`. `getElementById` returns `null`, and `null.scrollIntoView()` throws `TypeError: Cannot read properties of null`. The scroll function also has no null guard for any section ID.

**Fix:**
```js
// Navbar.jsx line 15 — fix the ID
{ id: "eventinfo", label: "Detalles" }

// Navbar.jsx lines 20-24 — add null guard
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
```

---

### 2. `.env` still tracked by Git despite being in `.gitignore`

**File:** `.env` + `.gitignore:16`

**Problem:** `.gitignore` now includes `.env`, but the file was committed before the rule was added. Git continues to track it. The Supabase anon key (though publishable) shouldn't live in version control.

**Fix:**
```bash
git rm --cached .env
git commit -m "chore: untrack .env from git"
```
`.env.example` already exists as a reference.

---

### 3. Hero image slider has no accessible alt text

**File:** `src/components/Hero/Hero.jsx:108-114`

**Problem:** All three slider images render as `<div>` with CSS `background-image`. No `role="img"`, no `aria-label`. Screen readers perceive them as empty elements. These are the primary visual content on the page.

**Fix:**
```jsx
<div
  className={`hero-bg ${isActive ? "active" : ""}`}
  style={{ backgroundImage: `url(${img})` }}
  role="img"
  aria-label={`Foto de la pareja ${index + 1}`}
/>
```

---

### 4. `setPrev` called inside `setCurrent` updater — fragile React pattern

**File:** `src/components/Hero/Hero.jsx:58`

**Problem:** `setPrev` is called as a side effect inside the `setCurrent` updater callback. React docs warn against side effects in updater functions. Can cause the slide transition animation to skip intermittently.

**Fix:**
```js
// Before (line 58)
setCurrent((c) => { setPrev(c); return (c + 1) % images.length; });

// After
setPrev(current);
setCurrent((current + 1) % images.length);
```

---

## High

### 5. AdminLogin — missing try/catch leaves spinner hung forever

**File:** `src/pages/admin/AdminLogin.jsx:25-41`

**Problem:** If `supabase.auth.signInWithPassword` throws (network failure, timeout), `setLoading(false)` never fires. The button stays stuck on "Ingresando..." with no feedback. Only the returned `{ error }` object is checked — thrown exceptions are unhandled.

**Fix:**
```js
const handleLogin = async (e) => {
  e.preventDefault();
  if (!email || !password) return;
  setLoading(true);
  setError("");
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Credenciales inválidas. Intenta de nuevo.");
    } else {
      navigate("/admin/dashboard");
    }
  } catch {
    setError("Error de conexión. Intenta de nuevo.");
  } finally {
    setLoading(false);
  }
};
```

---

### 6. AdminDashboard — no error handling on fetch, delete, or logout

**File:** `src/pages/admin/AdminDashboard.jsx:22-37`

**Problem:** Same try/catch pattern missing across three async operations:
- `fetchGuests`: On failure, "Cargando..." persists forever.
- `handleDelete`: Fails silently — confirmation modal closes, row stays.
- `handleLogout`: Navigates to `/admin` even if signOut fails (stale session).

**Fix:** Wrap each in `try/catch` with SweetAlert2 feedback for failures and `finally` blocks for loading states.

---

### 7. RSVP form — missing try/catch on Supabase insert

**File:** `src/components/RSVP/RSVP.jsx:20-64`

**Problem:** Same pattern as #5 and #6. Network error during insert = permanent "Enviando..." button with no error modal. `setLoading(false)` must be in a `finally` block.

**Fix:** Move `setLoading(false)` into a `finally` block and wrap the `supabase.from("guests").insert()` call in `try/catch`.

---

### 8. Navbar uses `<span>` for navigation — not keyboard accessible

**File:** `src/components/Navbar/Navbar.jsx:28-37`

**Problem:** Navigation items are `<span>` with `onClick`. They are not focusable (no `tabIndex`), not activatable via keyboard (no `onKeyDown`), and not announced as interactive by screen readers (no `role`).

**Fix:** Use `<button>` elements with `onClick` and `onKeyDown`:
```jsx
<button
  onClick={() => scrollTo(section.id)}
  className="nav-link"
>
  {section.label}
</button>
```
Style `.nav-link` to match the existing appearance (reset button border, background, font).

---

### 9. FunFacts flip cards — no keyboard accessibility

**File:** `src/components/FunFacts/FunFacts.jsx:131-151`

**Problem:** Cards flip only on click/hover. No `tabIndex`, `onKeyDown`, `role="button"`, or `aria-expanded`. Keyboard users cannot flip any card.

**Fix:**
```jsx
<div
  className="card-inner"
  tabIndex={0}
  role="button"
  aria-expanded={isFlipped}
  aria-label={isFlipped ? `${fact.question} - ${fact.answer}` : fact.question}
  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCard(); }}}
  onClick={toggleCard}
>
```

---

### 10. RSVP form — no email format validation

**File:** `src/components/RSVP/RSVP.jsx:16-18`

**Problem:** `isFormValid` only checks `email.trim()` is non-empty. `type="email"` HTML5 validation is bypassable and inconsistent across browsers.

**Fix:**
```js
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isFormValid = useMemo(() => {
  return (
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    isValidEmail(email.trim())
  );
}, [firstName, lastName, email]);
```

---

### 11. supabaseClient — no guard for missing env vars

**File:** `src/lib/supabaseClient.js:1-6`

**Problem:** If `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` are undefined, the client is created with `undefined` and fails at runtime with an obscure error like "URL is required".

**Fix:**
```js
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan variables de entorno de Supabase. Revisa tu archivo .env."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## Medium

### 12. Navbar — dead module-level `sections` array

**File:** `src/components/Navbar/Navbar.jsx:2-8`

**Problem:** The `sections` array is defined at module scope but shadowed by a same-named array inside the `Navbar` function (lines 11-17). The outer array is dead code.

**Fix:** Delete lines 2-8.

---

### 13. FunFacts — dead `handleCardClick` function

**File:** `src/components/FunFacts/FunFacts.jsx:94-96`

**Problem:** `handleCardClick` is defined at module scope but never called. Cards use an inline `onClick` that duplicates the same logic.

**Fix:** Delete lines 94-96.

---

### 14. Dead dependencies — `@react-three/fiber` and `three`

**File:** `package.json:13,21`

**Problem:** Neither package is imported anywhere. The Galaxy component uses `ogl`. These add ~600KB+ to `node_modules` and increase install time.

**Fix:**
```bash
npm uninstall @react-three/fiber three
```

---

### 15. Wrong HTML `lang` — content is Spanish

**File:** `index.html:2`

**Problem:** `<html lang="en">` — all content is in Spanish. Screen readers use the wrong pronunciation rules. SEO for Spanish searches is penalized.

**Fix:** Change to `<html lang="es">`.

---

### 16. Missing SEO meta tags

**File:** `index.html:1-12`

**Problem:** No `<meta name="description">`, no Open Graph tags (`og:title`, `og:description`, `og:image`), title is generic "Wedding Invite". Social shares have no preview.

**Fix:** Add inside `<head>`:
```html
<meta name="description" content="Boda de Vane y Nano — Noviembre 14, 2026. Confirma tu asistencia." />
<meta property="og:title" content="VyN Wedding Invite" />
<meta property="og:description" content="Acompáñanos en nuestro día especial. RSVP aquí." />
<meta property="og:image" content="/Hero1.jpeg" />
<meta property="og:type" content="website" />
<title>Vane & Nano — Wedding Invite</title>
```

---

### 17. No Error Boundary — any render crash whites out the app

**File:** `src/App.jsx`

**Problem:** No `<ErrorBoundary>` wraps `<Routes>`. Any component render error (e.g., the Navbar null crash) unmounts the entire React tree to a blank white page.

**Fix:** Create `src/components/ErrorBoundary/ErrorBoundary.jsx` with `componentDidCatch` / `getDerivedStateFromError` rendering a fallback UI, and wrap `<Routes>` with it in `App.jsx`.

---

### 18. No 404 page — unknown routes redirect silently

**File:** `src/App.jsx:23`

**Problem:** `<Route path="*" element={<Navigate to="/" replace />} />` silently redirects bad URLs to home with no feedback.

**Fix:** Replace with a dedicated `NotFound` component or at minimum keep the redirect but note this is intentional for an SPA.

---

### 19. EventInfo — wrong Roman numeral for the year (2026)

**File:** `src/components/EventInfo/EventInfo.jsx:190`

**Problem:** `"14 · XI · MMX XIV"` — `MMX` = 2010, `XIV` = 14. The year 2026 is **MMXXVI** in Roman numerals.

**Fix:** Change to `"14 · XI · MMXXVI"`.

---

### 20. EventInfo — clipboard copy has no error handling

**File:** `src/components/EventInfo/EventInfo.jsx:162-166`

**Problem:** `navigator.clipboard.writeText()` requires HTTPS. On `http://localhost` or non-HTTPS deploy, it throws `DOMException`. The button still shows "¡Copiado! ✓" despite the failure.

**Fix:**
```js
try {
  await navigator.clipboard.writeText(clean);
  setCopiedIndex(index);
} catch {
  // Fall back to selecting text for manual copy
  alert("No se pudo copiar. El número es: " + clean);
}
```

---

### 21. Galaxy — direct DOM manipulation bypasses React lifecycle

**File:** `src/components/Galaxy/Galaxy.jsx:284,310`

**Problem:** `ctn.appendChild(gl.canvas)` appends directly to the DOM. The cleanup `ctn.removeChild(gl.canvas)` assumes the canvas is still a child — if React unmounted the container first, it throws.

**Fix:**
```js
// Cleanup
if (ctn && ctn.contains(gl.canvas)) {
  ctn.removeChild(gl.canvas);
}
```

---

### 22. Galaxy — no resize debounce

**File:** `src/components/Galaxy/Galaxy.jsx:217-228`

**Problem:** The resize handler runs on every single resize event. Dragging a window edge fires hundreds of calls per second, causing unnecessary GPU work.

**Fix:** Debounce with ~100ms:
```js
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    // ... update uniforms
  }, 100);
});
```

---

### 23. ProtectedRoute — redundant session fetch on mount

**File:** `src/components/ProtectedRoute/ProtectedRoute.jsx:8-25`

**Problem:** Both `getSession()` and `onAuthStateChange` fire on initial load, calling `setSession` twice in quick succession. Causes an unnecessary extra render.

**Fix:** Remove the `getSession()` call — `onAuthStateChange` fires with the initial session automatically.

---

### 24. Global `h1, h2` styles conflict with components

**File:** `src/index.css:38-41`

**Problem:** The rule `h1, h2 { color: var(--accent); margin-bottom: 20px; }` applies globally. Any new heading added anywhere inherits these styles, causing unexpected layouts.

**Fix:** Scope these styles to the sections that need them (e.g., `.hero h1, .hero h2`) or remove the global rule and style headings per component.

---

## Low

### 25. EventInfo — `phone.replace("-", "")` only replaces first dash

**File:** `src/components/EventInfo/EventInfo.jsx:163`

**Problem:** `String.replace` with a string argument only replaces the first occurrence.

**Fix:** Use `phone.replaceAll("-", "")` or `phone.replace(/-/g, "")`.

---

### 26. EventInfo — dead `contact.bank` conditional

**File:** `src/components/EventInfo/EventInfo.jsx:309-311`

**Problem:** `{contact.bank && ...}` never renders — no `bank` property exists on either `sinpeContacts` entry.

**Fix:** Either add `bank` properties or remove the conditional.

---

### 27. RSVP — unnecessary `useMemo` for simple boolean

**File:** `src/components/RSVP/RSVP.jsx:16-18`

**Problem:** `useMemo` overhead likely exceeds the cost of a simple 4-value boolean check.

**Fix:** Remove `useMemo`:
```js
const isFormValid =
  firstName.trim() !== "" &&
  lastName.trim() !== "" &&
  email.trim() !== "";
```

---

### 28. AdminLogin — inputs are uncontrolled but have `onChange` handlers

**File:** `src/pages/admin/AdminLogin.jsx:59-72`

**Problem:** Email and password inputs have `onChange` but no `value` prop. They're technically uncontrolled (DOM tracks the value) while React state is also kept in sync. Works correctly but is inconsistent with the RSVP form's controlled pattern.

**Fix:** Add `value` props (`value={email}`, `value={password}`) or remove `onChange` and use `useRef` + `FormData`.

---

### 29. `@types/react` and `@types/react-dom` — unused in JS project

**File:** `package.json:25-26`

**Problem:** The project is plain JavaScript. These `@types` packages provide IntelliSense but are never used by the build. Harmless clutter.

**Fix:** Remove if IntelliSense is not needed:
```bash
npm uninstall @types/react @types/react-dom
```

---

### 30. Various files — trailing whitespace and inconsistent indentation

**Files:** `AdminLogin.css:21`, `AdminDashboard.css:196-205`, `index.css:50-53`, `Navbar.jsx:4`

**Problem:** Minor formatting inconsistencies across files.

**Fix:** Run a formatter (Prettier) across the project:
```bash
npx prettier --write "src/**/*.{js,jsx,css}" "*.{js,json,md}"
```

---

### 31. No heading margin reset

**File:** `src/index.css`

**Problem:** Only `body` has `margin: 0`. Browsers apply default margins to `h1`-`h6`, causing inconsistent spacing when component CSS doesn't explicitly set heading margins.

**Fix:** Add to the global reset:
```css
h1, h2, h3, h4, h5, h6 { margin: 0; }
```

---

## Summary

| Priority | Count | Impact |
|----------|-------|--------|
| Critical | 4 | Crashes, Git security, a11y, React anti-pattern |
| High | 7 | Missing error handling ×3, a11y ×2, validation, missing env guard |
| Medium | 13 | Dead code ×3, SEO/a11y, wrong content, fragile patterns |
| Low | 7 | Formatting, minor dead code, style cleanup |

The single most impactful fix is **#1 (Navbar crash)** — a guaranteed runtime error. The most pervasive pattern is the missing `try/catch/finally` in **#5, #6, #7** — every async operation in the app shares the same flaw.
