# U36 — Project structure for a small API

**Phase 4**

## Where you are

Features work in one file until they hurt. Structure is **communication** to future you and to tests.

## What you will be able to do

- Split app into folders/files with clear roles.
- Separate route wiring from domain logic.
- Provide `npm start` entry.
- Write a short project README for humans.

## What you need already

- **U16**, **U35**

## Time and energy

**70–100 minutes.**

## Why this exists

Phase 5 tests import your logic. Dumping everything in `server.js` fights testing.

## Plain-language teaching

### Suggested layout (small API)

```text
notes-api/
  package.json
  README.md
  src/
    server.js          # listen only / start
    app.js             # express app exported (no listen) — great for tests later
    routes/
      notes.js
    services/
      notesStore.js    # in-memory logic
    util/
      http.js          # optional helpers
```

### Why export `app` without listening

Tests can load `app` and inject fake requests without opening a real port (Phase 5).  
`server.js` calls `app.listen`.

Example `app.js`:

```javascript
const express = require("express");
const notesRouter = require("./routes/notes");

const app = express();
app.use(express.json());
app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/notes", notesRouter);
app.use((req, res) => res.status(404).json({ error: "not found" }));

module.exports = app;
```

`server.js`:

```javascript
const app = require("./app");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("listening " + PORT));
```

### Rules of thumb

- **routes** — HTTP in/out
- **services/store** — data & rules without knowing Express deeply
- **server** — process entry

### README for humans

Include: what it is, how to install, how to start, example curls, what data persists.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Entry point | File you start | |
| Router | Group of routes | |
| Separation of concerns | Different jobs in different places | |
| `process.env.PORT` | Port from environment | Optional |

## Worked example

Move U35 notes API into the layout above.

## Common errors

### Error: Circular requires

A requires B requires A. Simplify imports; keep store free of routes.

### Error: Listening inside every module

Only entry should listen.

## Checkpoints

1. Why separate app.js from server.js?
2. What belongs in services vs routes?
3. What goes in README?
4. How does structure help testing?

## Practice

### P1 — restructure notes API

### P2 — write README

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Monorepos
- TypeScript project references
- Full clean architecture dogma

## Next unit

**U37 — What testing means; manual checks**
