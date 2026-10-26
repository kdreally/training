# U61 — Serving static frontend + API together

**Phase 7**

## Where you are

`fetch` works best when the **page and API share an origin**. Express can serve **static files** (HTML/CSS/JS) and **JSON routes** from one process.

## What you will be able to do

- Create a `public/` (or `frontend/`) folder for static assets.
- Use `express.static` with understanding.
- Call API with relative paths from the page.
- Run one `npm start` that serves UI + API.
- Explain static middleware vs API routes order.

## What you need already

- **U33–U36**, **U60**

## Time and energy

**70–100 minutes.**

## Why this exists

Two terminals, two ports, and CORS is a common beginner trap. One server is calmer for learning and for Playwright later.

## Plain-language teaching

### Static files

**Static** means: for a request path, send a file as-is (HTML, CSS, image, JS) without your route logic inventing the body.

### Folder layout

```text
notes-app/
  package.json
  src/
    app.js
    server.js
    routes/
    services/
  public/
    index.html
    styles.css
    app.js      # browser JS (name carefully vs server files)
```

Browser JS in `public/app.js` is **not** Node server code. Different file, different runtime.

### `express.static`

```javascript
const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());

// API first (clear paths)
app.get("/api/health", function (req, res) {
  res.json({ ok: true });
});
app.use("/api/notes", notesRouter);

// Then static files
app.use(express.static(path.join(__dirname, "..", "public")));

module.exports = app;
```

`express.static(folder)` maps URL paths to files in that folder:

- `/` → `public/index.html` (typically)
- `/styles.css` → `public/styles.css`

### Relative fetch

From the page at `http://localhost:3000/`:

```javascript
await fetch("/api/notes");
```

Same host and port → same origin → no CORS drama for simple GETs/POSTs.

### Order matters

If a static file catches a path before your API, you get the wrong response. Prefer **distinct API prefixes** (`/api/...`) and register API routes **before** or carefully alongside static.

### What the learner runs

```bash
npm install
npm start
```

Open `http://localhost:3000/` — UI loads. Network tab shows `/api/...` calls.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Static middleware | Serves files from a folder | Not “no JavaScript” |
| `public/` | Common name for browser assets | Convention, not magic |
| Asset | File the browser loads | |
| Mount path | URL prefix for middleware | |

## Worked example

Move U60 frontend into `public/`, point fetch to `/api/notes`, confirm one port serves all.

## Common errors

### Error: Static path wrong (`__dirname` off by one folder)

404 for `index.html`. Log `path.join` result; check layout.

### Error: Naming collision

Server `app.js` vs `public/app.js` — be explicit in requires and script `src`.

### Error: API route `/notes` and static file confusion

Use `/api/notes` prefix.

### Error: Opening `public/index.html` via file explorer still

Use the server URL.

## Checkpoints

1. What does `express.static` do?
2. Why `/api` prefix?
3. Why relative fetch works now?
4. What does one `npm start` buy you?

## Practice

### P1 — wire static + health + notes

### P2 — cold run: install, start, click through UI

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- CDN deploy
- Webpack/Vite bundlers (optional later)
- SSR frameworks

## Next unit

**U62 — UI structure, a11y basics, stable test hooks**
