# U34 — Validation and error responses

**Phase 4**

## Where you are

Routes work for happy paths. Real APIs must reject bad input **clearly**.

## What you will be able to do

- Validate simple POST JSON bodies.
- Return `400` with a structured error message.
- Use `express.json()` middleware.
- Separate “client mistake” from “server bug.”

## What you need already

- **U33**, **U30**

## Time and energy

**80–120 minutes.**

## Why this exists

Silent acceptance of garbage data creates corrupt systems. Good APIs fail loudly and helpfully for clients.

## Plain-language teaching

### Validation

**Validation** means checking that input meets rules before using it.

Example rules for creating a note:

- Body must be JSON object
- `title` must be a non-empty string
- optional `body` string

### Parse JSON bodies in Express

```javascript
const express = require("express");
const app = express();
app.use(express.json());
```

Then `req.body` holds the parsed object for JSON POSTs.

If body is invalid JSON, Express may respond with an error — still handle your field rules.

### POST example with validation

```javascript
app.post("/notes", function (req, res) {
  const title = req.body && req.body.title;
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      error: "title is required and must be a non-empty string"
    });
  }
  // ... create note ...
  return res.status(201).json({ id: 1, title: title.trim() });
});
```

### Status choices

| Situation | Status |
|-----------|--------|
| Bad input | `400` |
| Not found | `404` |
| Created | `201` |
| Success read | `200` |
| Unexpected throw | `500` (and log server-side) |

### Error body shape

Pick a consistent shape, e.g. `{ "error": "message" }`. Consistency helps clients and tests.

### Never trust the client

Clients lie by mistake or malice. Validate every external input.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Validation | Checking input rules | Not the same as auth |
| `400 Bad Request` | Client sent unusable data | |
| `201 Created` | New resource made | |
| Middleware `express.json` | Parse JSON bodies | |

## Worked example

POST `{}` → 400.  
POST `{"title":"Hi"}` → 201 with note.

## Common errors

### Error: Forgetting `express.json()`

`req.body` is undefined; validation always fails strangely.

### Error: Returning 200 on validation failure

Clients and tests should see 400.

### Error: Crashing on missing fields

Check before reading nested properties deeply.

## Checkpoints

1. What is validation?
2. Why 400 vs 500?
3. Role of express.json?
4. Why consistent error shape?

## Practice

### P1 — POST /notes with title validation

### P2 — curl examples for good and bad bodies

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full schema libraries (Joi/Zod) — optional later
- Auth

## Next unit

**U35 — Simple persistence (in-memory)**
