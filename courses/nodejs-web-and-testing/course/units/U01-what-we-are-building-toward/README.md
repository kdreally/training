# U01 — What we are building toward

**Phase 0 — Orientation**

## Where you are

You know how units and assessment work (U00). Now you get an honest map of the **destination** and the **path** — without pretending you already understand every stop.

## What you will be able to do

- State the course destination in plain language.
- Name the main phases in order and why that order exists.
- Explain what is **in scope** and **out of scope**.
- Point to where automated testing sits (not as an afterthought).

## What you need already

- **U00** completed (or at least read).

## Time and energy

**30–50 minutes.**

## Why this exists

Without a map, every new word feels random. With a map, new words have a parking space. You are not expected to understand servers or tests yet — only to know they are coming and why they come late.

## Plain-language teaching

### The destination (one paragraph)

By the end of the main path, you will write **small backend web applications** in **Node.js**: programs that wait for **network requests** and send **responses** (often **JSON** data). You will also write **automated tests** — small programs that check your programs — so you can change code without living in fear.

You will not become “a senior engineer in six weeks.” You will become someone who can **build a small API**, **explain it**, and **test it** without cargo-culting commands.

### Why backend first

A **backend** is the part of a web system that runs on a server (a computer that waits for requests). It is a good first web target because:

1. You can learn **real programming** without fighting layout/CSS.
2. **HTTP** (the conversation browsers and apps use) is learnable as request → response.
3. **Tests** for backends can be clear: “When I send X, I should get Y.”

Browser UI frameworks are mostly **out of the main path**. If we ever need a tiny HTML page to call your API, we will say so explicitly.

### The phases (remember the *order*, not every detail)

| Phase | Name | In one sentence |
|-------|------|-----------------|
| 0 | Orientation | How to learn here; where we are going. |
| 1 | First principles | What programs are; values, decisions, functions, errors. |
| 2 | Node.js | Running JavaScript files outside the browser. |
| 3 | Packages | Why reuse code; what packages and package managers are. |
| 4 | Backend web | Servers, HTTP, routes, simple APIs. |
| 5 | Automated tests | Why automate; unit, integration, API tests. |
| 6 | Craft | Polish, refactoring with tests, optional extras. |

### Why this order is non-negotiable

Imagine someone says on day one: “Just run `npm install express` and write a route.”

That sentence smuggles in:

- a package manager (`npm`)
- installing (`install`)
- a package (`express`)
- a web framework concept (`route`)

…without explaining **why packages exist**. This course refuses that cruelty.

**Rule you can trust:**  
**why packages → what a package is → what a package manager is → then install commands.**  
Same pattern for servers and tests.

### Where testing sits

| Stage | Relationship to tests |
|-------|------------------------|
| Early programming | You check work **manually** (eyes + checklist). |
| After small modules exist | You learn **assertions** and a **test runner**. |
| After a server exists | You test **HTTP** behavior (“API tests”). |
| Throughout later work | Tests become a **safety net** for change. |

Testing is not a punishment module bolted on at the end. It is a skill equal to writing the app.

### What “done with the course” looks like (concrete)

You might build something like:

- A small API: create/list/get simple resources (e.g. notes, books, tasks).
- Validation: bad input gets a clear error response.
- Tests: pure logic tested in isolation; HTTP tested with requests.
- A README that tells another human how to run app + tests.

Exact capstone details appear in later units. For now, hold the shape.

### What we will not pretend

| We will not pretend… | Because… |
|----------------------|-----------|
| That you already know the terminal | We teach it when needed |
| That npm is obvious | We earn it in Phase 3 |
| That frameworks are mandatory day one | Core HTTP first |
| That “real developers don’t need tests” | That is folklore, not craft |
| That struggle means you chose the wrong career | Struggle is the default |

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Backend | Program that serves data/logic over a network | Not “the database only” |
| Frontend | What users see in a browser/app UI | Mostly out of main path here |
| API | A defined way for programs to talk (often over HTTP) | Not a specific product |
| Node.js | A way to run JavaScript outside the browser | Not a programming language by itself |
| Package | Reusable code someone published for others | Not the same as “package manager” |
| Automated test | A program that checks another program | Not a school exam |
| HTTP | Common request/response rules for the web | Not “the internet” as a whole |

## Worked example

**Destination sentence (memorize a version of this):**

> I will write Node.js backend programs that speak HTTP, and I will write automated tests that check those programs.

**Order sentence:**

> I learn programming ideas → run them with Node → use packages honestly → build a server → automate checks.

If you can say both without looking, you are oriented.

## Common errors

### Error: Trying to skip to “the web part”

**What happens:** Vocabulary avalanche; confidence crash.

**Fix:** Trust the spine. Phase 1–3 are not filler; they remove magic.

### Error: Thinking testing is optional “extra credit”

**What happens:** You build something you are afraid to change.

**Fix:** Treat Phase 5 as core. Manual checking is only the on-ramp.

## Checkpoints

1. In one sentence, what is the course destination?
2. Why do packages come before `npm install`?
3. Name one thing that is out of main-path scope.
4. When do automated tests show up relative to servers?

## Practice

### P1 — Teach-back

Explain the course destination to an imaginary friend who has never programmed. Use no more than 8 sentences. Avoid unexplained jargon; if you use a term, define it.

### P2 — Phase cards

Write the six phase names on paper. Shuffle. Reorder them correctly. Check against this unit.

### P3 — Scope fence

List 3 topics you might be curious about that this course will **not** prioritize (e.g. fancy CSS, Kubernetes). Crossing them off reduces anxiety.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Installing tools
- Writing code
- Deep definitions of HTTP or npm (later units)

## Next unit

**U02 — What a computer program is**
