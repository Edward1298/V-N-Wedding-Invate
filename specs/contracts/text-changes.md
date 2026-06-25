# Text Changes Contract

## Files to modify

| File | Change type |
|------|-------------|
| `index.html` | Text replacement (2 lines) |
| `src/components/AboutUs/AboutUs.jsx` | Text replacement (1 line) |
| `src/components/EventInfo/EventInfo.jsx` | Data restructure + JSX changes (dress code + payment section) |
| `src/components/EventInfo/EventInfo.css` | New CSS rules |

---

## 1. `index.html` — Fix wrong names

### Problem
The names "Vane" and "Nano" are incorrect. The correct names are **Vale** and **Nacho** (nicknames for Valeria and Ignacio).

### Lines to change

| Line | Current | Replace with |
|------|---------|--------------|
| 6 | `<meta name="description" content="Boda de Vane y Nano — Noviembre 14, 2026. Confirma tu asistencia." />` | `<meta name="description" content="Boda de Vale y Nacho — Noviembre 14, 2026. Confirma tu asistencia." />` |
| 11 | `<title>Vane & Nano — Wedding Invite</title>` | `<title>Vale & Nacho — Wedding Invite</title>` |

### Acceptance criteria
- No occurrence of "Vane" or "Nano" remains in any project file (excluding `node_modules`, `package-lock.json`, and build artifacts).

---

## 2. `src/components/AboutUs/AboutUs.jsx` — Bible verse replacement

### Location
Line 142 inside `<p className="finale-quote">`.

### Current text
```
"En cada etapa, el amor nunca ha faltado."
```

### New text
```
"Y por encima de todo esto, revestíos del amor, que es el vínculo de la perfección. Colosenses 3:14"
```

### Scope
Only the string content of the `<p>` element changes. No structural or CSS changes needed.

---

## 3. `src/components/EventInfo/EventInfo.jsx` — Dress code section

### Current JSX (lines 276–286)
```jsx
{/* Vestimenta */}
<div className="consideration-card">
  <div className="consideration-header">
    <span className="consideration-label">Código de vestimenta</span>
    <div className="consideration-icon"><IconDress /></div>
  </div>
  <p className="consideration-dress-main">Todo de Negro</p>
  <p className="consideration-dress-sub">
    Formal. Celebremos con elegancia y en sintonía con la noche.
  </p>
</div>
```

### New JSX
```jsx
{/* Vestimenta */}
<div className="consideration-card">
  <div className="consideration-header">
    <span className="consideration-label">Código de vestimenta</span>
    <div className="consideration-icon"><IconDress /></div>
  </div>
  <p className="consideration-dress-main">Todo de Negro</p>
  <p className="consideration-dress-sub">
    Vestimenta formal. Nos encantaría que nos acompañen vistiendo completamente de negro para crear una atmósfera elegante y en armonía con la celebración.
  </p>
  <p className="consideration-dress-sub">
    Para inspiración y referencias de estilo, encontrarán un tablero de Pinterest adjunto.
  </p>
  <a
    href="https://pin.it/2363u0AnP"
    target="_blank"
    rel="noopener noreferrer"
    className="consideration-pinterest-link"
  >
    Ver tablero de Pinterest
  </a>
</div>
```

### Behavior
- Clicking the Pinterest link opens `https://pin.it/2363u0AnP` in a new browser tab.
- `target="_blank"` + `rel="noopener noreferrer"` for security.

### CSS to add in `EventInfo.css`
```css
.consideration-pinterest-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  margin-top: 4px;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  text-decoration: none;
  font-family: 'Georgia', serif;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: all 0.25s ease;
  align-self: flex-start;
}

.consideration-pinterest-link:hover {
  background: var(--text-primary);
  color: var(--bg-primary);
  border-color: var(--text-primary);
}
```

---

## 4. `src/components/EventInfo/EventInfo.jsx` — Payment section (was Sinpe Móvil)

### Data change

**Remove** the `sinpeContacts` array and `handleCopy` function + `copiedIndex` state.

**Add** this new data structure:
```js
const bankAccounts = [
  {
    currency: "Dólares",
    name: "Jose Ignacio Ramirez Villanea",
    account: "962483897",
    iban: "CR88010200009624838973",
  },
  {
    currency: "Colones",
    name: "Raquel Valeria Camacho Sandí",
    account: "704780170",
    iban: "CR69010200007047801709",
  },
];
```

### JSX changes

**Remove:**
- `useState` import for `copiedIndex` (if no longer needed anywhere else — verify)
- `handleCopy` function
- `copiedIndex` state

**Replace** the section that renders `sinpeContacts.map(...)` with:

```jsx
{bankAccounts.map((acc, i) => (
  <div className="consideration-card sinpe-card" key={i}>
    <div className="consideration-header">
      <span className="consideration-label">Transferencia Bancaria</span>
      <div className="consideration-icon"><IconSinpe /></div>
    </div>

    <div className="sinpe-body">
      <span className="sinpe-currency-badge">{acc.currency}</span>
      <p className="sinpe-name">{acc.name}</p>
      <div className="sinpe-number-row">
        <span className="sinpe-account-label">Cuenta</span>
        <span className="sinpe-number">{acc.account}</span>
      </div>
      <div className="sinpe-number-row">
        <span className="sinpe-account-label">IBAN</span>
        <span className="sinpe-iban">{acc.iban}</span>
      </div>
    </div>
  </div>
))}
```

### CSS to add in `EventInfo.css`

```css
.sinpe-currency-badge {
  display: inline-block;
  font-family: 'Georgia', serif;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  padding: 6px 14px;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.sinpe-account-label {
  font-family: 'Georgia', serif;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-secondary);
  opacity: 0.5;
  min-width: 48px;
}

.sinpe-iban {
  font-family: monospace;
  font-size: 1rem;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  word-break: break-all;
}
```

### Cleanup

- Remove `.sinpe-copy-btn`, `.sinpe-copy-btn:hover`, `.sinpe-copy-btn.copied` CSS rules (no longer needed).
- Remove `.sinpe-bank` CSS rule if it exists (unused now).
- Keep `.sinpe-card`, `.sinpe-body`, `.sinpe-name`, `.sinpe-number-row`, `.sinpe-number` (reused).

---

## Execution order

1. `index.html` — Fix "Vane & Nano" → "Vale & Nacho"
2. `src/components/AboutUs/AboutUs.jsx` — Bible verse
3. `src/components/EventInfo/EventInfo.jsx` — Dress code + payment section
4. `src/components/EventInfo/EventInfo.css` — New styles

---

## Verification

```bash
npm run dev        # Check visually in browser
npm run build      # Confirm build succeeds
npm run lint       # Confirm no lint errors
```

Also grep to confirm no "Vane" or "Nano" remains:
```bash
rg -i "vane|nano" --include "*.jsx" --include "*.js" --include "*.css" --include "*.html" src/ index.html
# Should return no matches (excluding node_modules)
```
