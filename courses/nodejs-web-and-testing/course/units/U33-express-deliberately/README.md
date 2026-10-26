# U33 — Why frameworks exist; Express deliberately

**Phase 4**

## Where you are

You built routing by hand. Now a **framework** can reduce boilerplate — as a **choice**, not a religion.

## What you will be able to do

- Explain what a web framework buys you.
- Install Express as a runtime dependency.
- Recreate `/`, `/health`, and 404 with Express.
- Compare Express code to your raw `http` code.

## What you need already

- **U24–U26**, **U31–U32**

## Time and energy

**80–120 minutes.**

## Why this exists

Express is popular. Using it without raw HTTP creates superstition. You earned it.

## Plain-language teaching

### What a framework is

A **framework** provides structure and helpers for a class of programs.  
A **web framework** helps with routing, request parsing, responses, middleware (plug-in pipeline).

### Tradeoffs

| Gains | Costs |
|-------|-------|
| Less boilerplate | Another dependency |
| Conventions | Magic if you skip fundamentals |
| Ecosystem | Version upgrades |

### Install Express in a project

```bash
mkdir u33-express
cd u33-express
npm init -y
npm install express
```

### Minimal Express app

`server.js`:

```javascript
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.status(200).type("text").send("Hello, Express\n");
});

app.get("/health", function (req, res) {
  res.status(200).json({ ok: true });
});

app.use(function (req, res) {
  res.status(404).json({ error: "not found" });
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log("Listening on http://localhost:" + PORT);
});
```

```bash
node server.js
```

### Mapping concepts

| Raw http | Express |
|----------|---------|
| `createServer` callback | `app.get` / `app.post` / … |
| `res.end` | `res.send` / `res.json` |
| manual 404 at end | `app.use` fallback |
| `server.listen` | `app.listen` |

### Middleware teaser

`app.use(fn)` runs functions on requests. JSON body parsing:

```javascript
app.use(express.json());
```

Needed before reading `req.body` on POST (U34–U35).

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Framework | Structured toolkit | Not Node itself |
| Express | Popular Node web framework | Not the only one |
| Middleware | Functions in a request pipeline | |
| `app.get` | Register GET route | |

## Worked example

Same routes as U32, less manual header code via `res.json`.

## Common errors

### Error: Forgetting `npm install express`

`Cannot find module 'express'`.

### Error: 404 middleware registered *before* routes

Order matters. Define routes first; 404 last.

### Error: Treating Express as the only way

You can still use raw `http`. Express is optional convenience.

## Checkpoints

1. Why frameworks?
2. One cost of frameworks?
3. Express equivalent of res.end JSON?
4. Why route order matters for 404?

## Practice

### P1 — rebuild health app in Express

### P2 — side-by-side note: 5 lines raw vs Express for same route

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full middleware ecosystem
- Template engines / frontend

## Next unit

**U34 — Validation and error responses**
