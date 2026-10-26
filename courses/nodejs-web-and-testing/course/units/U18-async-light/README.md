# U18 — Asynchronous ideas (only as forced by I/O)

**Phase 2**

## Where you are

Sync file reads block everything until done. Real network programs need a gentler model: **start work, continue later**. This unit is a **light** intro — enough not to panic later.

## What you will be able to do

- Explain sync vs async in plain language.
- Read a file with `fs.readFile` (callback style) once.
- State what a callback is.
- Know that `async/await` exists as clearer syntax for the same idea (preview).

## What you need already

- **U17**

## Time and energy

**50–80 minutes.**

## Why this exists

Servers handle many requests. If one slow file read froze the whole process always, apps would feel dead. Async I/O is why Node became popular for network apps. You need the *idea* before HTTP servers.

## Plain-language teaching

### Sync: wait here

```javascript
const text = fs.readFileSync("big.txt", "utf8");
console.log("after read");
```

Nothing else in this program continues until read finishes.

### Async: start now, finish later

```javascript
const fs = require("fs");

console.log("before");
fs.readFile("note.txt", "utf8", function (err, text) {
  if (err) {
    console.log("error:", err.message);
    return;
  }
  console.log("file says:", text);
});
console.log("after starting read");
```

Possible order:

```text
before
after starting read
file says: ...
```

The function you pass in is a **callback** — “call me back when done.”

### Error-first callbacks

Node’s old style: callback `(err, result)`.  
If `err` is not null/undefined, something failed; do not trust `result`.

### Promises / async-await (preview only)

Modern code often looks like:

```javascript
// conceptual preview — not required mastery yet
// const text = await fs.promises.readFile("note.txt", "utf8");
```

Same idea: wait for I/O without freezing the mental model of “one big freeze.” We will use simple styles until a unit needs more.

### What you must not do yet

Do not rewrite your whole brain in Promises. Do not invent race-condition theory. Hold this:

> Some operations finish later; you provide a function (or await) for the result.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Synchronous | Finish now before next line | |
| Asynchronous | Complete later | Not “random” |
| Callback | Function called when work finishes | |
| Non-blocking I/O | Start I/O without freezing all progress | |
| Event loop | Node’s scheduler for later work | Deep details later |

## Worked example

Use the `readFile` snippet with a real `note.txt`. Observe line order.

## Common errors

### Error: Using `text` outside the callback

```javascript
let text;
fs.readFile("note.txt", "utf8", (err, data) => { text = data; });
console.log(text); // still empty/undefined — too early
```

Use the value **inside** the callback (or learn await later).

### Error: Ignoring `err`

Always check `err` in error-first callbacks.

## Checkpoints

1. Sync vs async in one sentence each?
2. What is a callback?
3. Why might “after starting read” print before file contents?
4. What is error-first?

## Practice

### P1 — async read

Log before, start read, log after start, log contents in callback.

### P2 — force error

Read a missing file; log `err.message`.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full Promise combinators
- Streams deep dive
- Concurrency bugs catalog

## Next unit

**U19 — Why reuse exists (packages motivation)**
