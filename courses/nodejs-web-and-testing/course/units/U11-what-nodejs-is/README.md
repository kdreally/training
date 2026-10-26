# U11 — What Node.js is

**Phase 2 — Programs in Node.js**

## Where you are

You can think in JavaScript on paper. Now: **where** JS runs outside the browser — **Node.js**.

## What you will be able to do

- Explain Node.js vs JavaScript vs browser.
- Explain what a runtime is.
- Name what Node is good for (backends, tools, scripts).
- Know what we will *not* do with Node yet.

## What you need already

- Phase 1 (**U02–U10**), especially U02–U03.

## Time and energy

**40–60 minutes.**

## Why this exists

People say “learn Node” as if Node were a language. It is not. Confusing language and runtime creates permanent muddle.

## Plain-language teaching

### JavaScript is the language

**JavaScript (JS)** is a programming language: syntax and meaning of values, functions, etc.

### A runtime runs the language

A **runtime** (or runtime environment) is the program that **executes** your JS and gives it **capabilities**.

| Place JS runs | Runtime-ish home | Extra powers |
|---------------|------------------|--------------|
| Web browser | Browser JS engine + Web APIs | Change web pages, respond to clicks |
| Node.js | Node (built on a JS engine + system APIs) | Read files, listen on network ports, run tools |

Same language family; **different libraries and purposes**.

### What Node.js is

**Node.js** is a **runtime** that lets you run JavaScript on your computer as a general-purpose tool — especially for **servers** and **developer tooling**.

Born to build fast network programs; used widely for **backend APIs**, CLIs, build tools.

### What Node is not

| Not this | Reality |
|----------|---------|
| A language | JS is the language |
| A database | You might *connect* to DBs later |
| A browser | No DOM (`document`) by default |
| “The backend” itself | You *write* backends that *run on* Node |

### Why backends like Node

- One language for server logic (JS).
- Strong fit for request/response network apps.
- Huge ecosystem of packages (Phase 3 — earned later).

### Our path with Node

1. Install and verify (U12).
2. Use the terminal (U13).
3. Run `.js` files (U14).
4. Grow into modules, packages, HTTP servers, tests.

You will not need a browser to run your first Node programs.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| JavaScript | The language | Not identical to “Node” |
| Node.js | JS runtime outside the browser | Not a language |
| Runtime | Executes code + provides APIs | |
| Engine | Core that evaluates JS (e.g. V8) | Inside Node; you need not master it |
| DOM | Browser page model | Not available in plain Node |
| Backend | Server-side program | Often hosted with Node |

## Worked example — same language, different world

Browser-oriented idea (do not run in Node):

```javascript
// Browser world (conceptual): document.querySelector(...)
```

Node-oriented idea (later):

```javascript
// Node world: read a file, listen on a port
```

If you see `document` in a Node beginner script, something is misplaced.

## Common errors

### Error: “I already know JavaScript so I know Node”

You know the language core. Node’s **system capabilities** and project culture are additional learning.

### Error: Installing random stacks before understanding Node

Frameworks sit *on top*. We install Node first, run files, then earn packages.

## Checkpoints

1. Is Node a language? What is it?
2. Name one power browsers have that plain Node does not.
3. Name one power Node has that plain browser JS does not.
4. Why is this course using Node?

## Practice

### P1 — Teach-back

Explain Node vs JS to a friend in 5 sentences.

### P2 — Sort

Label browser / Node / both: `let x = 1`, change CSS of a button, listen on port 3000, `function add(a,b)`.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Installing yet (next)
- npm
- Express

## Next unit

**U12 — Installing Node and verifying**
