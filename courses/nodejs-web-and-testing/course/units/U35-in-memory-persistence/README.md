# U35 — Simple persistence (in-memory first)

**Phase 4**

## Where you are

You can validate creates. Now data should **survive across requests** while the process runs — start with **memory**, not a database.

## What you will be able to do

- Store resources in an array/object in memory.
- Implement list + get + create for notes (or similar).
- Explain what is lost on process restart.
- Know when a DB becomes necessary (preview).

## What you need already

- **U34**, **U08**

## Time and energy

**80–120 minutes.**

## Why this exists

Databases add ops complexity. In-memory teaches **resource lifecycle** first.

## Plain-language teaching

### Persistence levels

| Level | Survives |
|-------|----------|
| Local variable in one request | Only that request |
| Module-level array in server process | Until process exits |
| File on disk | Until deleted |
| Database | Designed long-term storage |

We use **module-level memory**.

### Example store

```javascript
let nextId = 1;
const notes = [];

function createNote(title, body) {
  const note = { id: nextId, title: title, body: body || "" };
  nextId = nextId + 1;
  notes.push(note);
  return note;
}

function listNotes() {
  return notes.slice();
}

function getNote(id) {
  for (let i = 0; i < notes.length; i = i + 1) {
    if (notes[i].id === id) return notes[i];
  }
  return null;
}
```

Wire to routes:

- `GET /notes` → list
- `GET /notes/:id` → one or 404  
  Express: `app.get("/notes/:id", ...)` and `req.params.id` (string! convert with `Number`)
- `POST /notes` → create

### Restart clears memory

Stop server → data gone. That is expected for this unit. Mention it in your README mindset.

### Why not DB yet

You need clean HTTP + validation + modules first. DB is another dependency and failure mode.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| In-memory | Stored in RAM of process | Not “remember forever” |
| Resource | Entity like a note | |
| `req.params` | Path parameters | Strings |
| CRUD | Create/Read/Update/Delete | We may skip update/delete |

## Worked example

POST three notes, GET list length 3, GET id 2 returns that note, GET id 99 → 404.

## Common errors

### Error: `req.params.id` compared as string to number id

`"1" === 1` is false. Use `Number(req.params.id)` and check `Number.isNaN`.

### Error: Mutating and returning internal array carelessly

Returning `notes` directly lets callers mutate store. Prefer copy for list if you want safety (`slice`).

## Checkpoints

1. What survives process restart with in-memory store?
2. Why convert path ids?
3. Difference between GET list and GET one?
4. When consider a database?

## Practice

### P1 — full notes API in memory

### P2 — prove restart clears data

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- SQL/NoSQL setup
- Auth multi-user isolation

## Next unit

**U36 — Project structure for a small API**
