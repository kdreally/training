# This course now lives in the training repository

Path: `courses/nodejs-web-and-testing/`
Shared teaching doctrine for every course: `../../AGENTS.md`
Published site: https://kdreally.github.io/training/nodejs-web-and-testing/

The rest of this file is the course-specific doctrine. Paths written as `course/` mean `courses/nodejs-web-and-testing/course/`.

---

# AGENTS.md — Teaching Doctrine for the Node.js Web & Testing Course

This file is **for the AI author** (and any future author) who generates course units.

It is **not** what the learner reads end-to-end.

The learner receives **static unit materials** you generate from this doctrine. They study alone, do the work, and submit assignments to a **human trainer/assessor**. You will not be in the room with them. Every unit must stand on its own without a live coach.

---

## 1. Mission

Build a complete path that takes a learner from **first principles of programming** through **writing Node.js programs**, **backend web applications (HTTP/APIs)**, **automated tests of every major kind**, then a **frontend track** (HTML/CSS/browser JS talking to their API) and **browser end-to-end tests with Playwright**.

Success is not “they finished the modules.” Success is:

- They can explain *why* each step exists.
- They can do the next step without guessing what a word means.
- They leave each unit with slightly more confidence than they entered.
- A human assessor can judge their submission fairly from the unit’s own rubric.

---

## 2. Who the learner is

### 2.1 Profile

- Has **some prior contact with code** (HTML, Python, a bootcamp, tutorials, unfinished courses).
- Is **not** a confident programmer. Prior teaching was often rushed, jargon-heavy, or humiliating.
- Default emotional state around new technical material: **confusion + fear of looking stupid**.
- Can usually open a browser, install software with a guide, and follow numbered steps **if every term is defined first**.
- Node.js, package managers, servers, HTTP, and automated testing are effectively **new**.

### 2.2 What you must never assume

Never assume they already know (or remember):

| Concept | Why people wrongly assume it |
|--------|-------------------------------|
| What a “program” is vs a document | They may have only edited HTML |
| What a terminal/shell is for | Many courses jump to `npm install` on day one |
| What a file path is | Copy-paste paths break and they freeze |
| What “running” code means | They may only have used online sandboxes |
| What an error message is for | Errors feel like personal failure, not feedback |
| What a package/library is | “Just install Express” is magic |
| What a package manager is | npm appears as ritual, not tool |
| What a server is | “Backend” is a vague word from job ads |
| What HTTP is | “API” is a buzzword, not a conversation |
| What a test is for | Testing sounds like QA bureaucracy or school exams |
| What “pass/fail” means in automation | They may think tests grade *them*, not the code |
| What the DOM is | “JavaScript in the browser” is a different world from Node |
| What a CSS selector is | Playwright locators look like magic without this |
| Why UI tests flake | They will blame themselves; teach waiting/isolation first |

If a unit needs any of these, **teach them in that unit or require a prior unit that already taught them.**

### 2.3 Confidence is a learning objective

These learners have been failed by teachers who:

- Said “it’s easy” and then used ten undefined terms.
- Skipped “why” and punished wrong guesses.
- Treated questions as weakness.
- Equated speed with intelligence.

Your materials must do the opposite:

- Name confusion as normal.
- Separate **the learner** from **the code** (“the test failed” ≠ “you failed”).
- Prefer slow clarity over impressive density.
- Never ask for a leap of faith when a short explanation would do.

---

## 3. Core pedagogical law

> **Never ask the learner to do a thing you have not first explained the hell out of.**

Corollaries:

1. **Explain before instruct.** Motivation → concept → vocabulary → tiny example → then a task.
2. **Why before what before how.**  
   - *Why packages exist* → *what a package is* → *what a package manager does* → *then* `npm install`.
3. **One new idea at a time.** A unit may *use* prior ideas; it may introduce only a small number of new ones.
4. **No ritual commands.** Every command appears only after the learner knows what it does, what success looks like, and what common failure looks like.
5. **Errors are curriculum.** When a common error is likely, show it *before* or *immediately after* the first attempt, and decode it line by line.
6. **Static materials must be self-sufficient.** No “ask your AI,” no “google it,” no “you’ll see later” for something they need *now* to complete the task.
7. **Define every term at first use** in that unit (or link back to the unit that defined it, with the definition restated briefly).

### 3.1 The “explain the hell out of it” checklist

Before any hands-on step that introduces a new tool or idea, the unit must answer:

1. What problem does this solve for a human writing software?
2. What would we do without it (even if painful)?
3. What is the smallest honest definition in plain language?
4. What is it *not*?
5. What does the learner look at / type / run?
6. What does “it worked” look like?
7. What does a typical failure look like, and what do we do?

If any answer is missing, the unit is not ready.

### 3.2 Forbidden teaching moves

- “Simply run…” / “Just install…” / “Obviously…” / “As you know…”
- Dumping a wall of new vocabulary in one paragraph.
- Showing a complete app and only then explaining pieces (unless the unit is explicitly a *guided tour of a finished artifact* after concepts exist).
- Using metaphors that require the thing being taught (e.g. explaining servers only with “like an API gateway”).
- Asking them to configure tooling they do not yet understand (linters, bundlers, Docker, CI) before the course has earned that complexity.
- Treating the assessor’s rubric as secret. Rubrics are part of the learning materials.

### 3.3 Allowed, and preferred, teaching moves

- Plain language first, then the industry term.
- Tiny programs (5–20 lines) before larger ones.
- “Wrong on purpose” examples that show *why* a rule exists.
- Side-by-side: confusing error → decoded meaning → fix.
- Checkpoints: “If you can answer these three questions, you are ready for the exercise.”
- Explicit “you are not expected to invent this yet” when showing a pattern they will only copy once.

---

## 4. Course shape (backend-first)

### 4.1 North star

By the end, the learner can:

1. Write small, clear Node.js programs from first principles.
2. Structure a backend web application (HTTP server, routes, request/response, simple persistence as introduced).
3. Explain why automated tests exist and what kinds solve what fears.
4. Write and run **unit**, **integration**, and **HTTP/API** tests (and other types as the curriculum introduces them) against *their own* code.
5. Read a failing test and improve the code (or the test) without panicking.

**Main path (U00–U54):** backend-first. Prefer `curl`/HTTP tests until Phase 7.

**Track B (U55+):** browser frontend (HTML/CSS/DOM JS) that talks to their API, then **Playwright** for UI/E2E tests. No React/Vue/Svelte in the core track unless a later optional unit — plain browser JS first. No CSS design systems; only enough CSS to structure usable pages.

### 4.2 Spiral, not dump

Return to ideas with more precision later:

| Pass | Programming | Node | Web | Tests |
|------|-------------|------|-----|-------|
| First contact | What a program is; values; control flow | Running a file with Node | “A program that waits for messages” | Manual checking is a kind of test |
| Working skill | Functions, modules, errors | `require`/`import`, scripts | HTTP request/response | Automated assertions |
| Application | Design small modules | Project layout, deps | Routes, status codes, JSON APIs | Unit + integration + API tests |
| Craft | Clarity, boundaries | Sensible `package.json` | Validation, error responses | Test pyramid, naming, isolation |

### 4.3 Concept dependency chain (do not reorder casually)

This is the **why → what → how** spine. Units must respect it.

```
computers run instructions
  → a program is a list of instructions in a language
    → a programming language has rules and meaning
      → we write programs as text in files
        → a runtime executes those files (Node.js)
          → the terminal is how we talk to the runtime and OS
            → errors are the runtime talking back
              → we grow programs with functions and modules
                → we reuse others’ modules: packages
                  → we need a system to fetch/version packages: package managers
                    → projects declare dependencies (package.json, lockfiles — when earned)
                      → long-running programs can listen for network requests: servers
                        → HTTP is a common request/response conversation
                          → web backends speak HTTP (APIs)
                            → manual checking does not scale: automated tests
                              → test runners execute tests and report pass/fail
                                → kinds of tests (unit, integration, HTTP, …) answer different questions
```

**Never** introduce `npm install express` before the package → package manager chain is taught.  
**Never** introduce Jest/Node test runner before “why automate checking” is taught.  
**Never** introduce middleware stacks before HTTP request/response is solid.

### 4.4 Phases and unit map (authoring guide)

Unit IDs are stable. Titles may be polished in generated materials. Split a unit if it gets heavy; do not merge across phase boundaries without updating this map.

#### Phase 0 — Orientation (trust and map)

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U00 | How this course works; how to be stuck productively; how assessment works | Start without shame; know what “done” means |
| U01 | What we are building toward (backend + tests); honest scope | See the destination without needing the whole map memorized |

#### Phase 1 — First principles of programming

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U02 | What a computer program is (and is not) | Explain program vs document vs data |
| U03 | Values, expressions, statements (language-agnostic, then JS) | Read simple expressions |
| U04 | Names, assignment, state over time | Trace a few lines by hand |
| U05 | Decisions (branching) | Predict if/else outcomes |
| U06 | Repetition (loops) | Trace simple loops |
| U07 | Functions: name a process, pass inputs, get outputs | Write tiny functions |
| U08 | Data shapes: arrays and objects (as needed) | Read and build small structures |
| U09 | Errors: mistakes vs exceptions; reading messages | Use an error message without freezing |
| U10 | Algorithms as clear steps; pseudocode → code | Turn a plain-language process into code |

#### Phase 2 — Programs in Node.js

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U11 | What Node.js is (JS runtime outside the browser) | Explain why Node exists |
| U12 | Installing Node safely; verifying install | Prove `node` works on their machine |
| U13 | The terminal as a tool (cd, ls/dir, running commands) | Navigate to a project folder without panic |
| U14 | Running a `.js` file with Node; program entry | Run `node something.js` and explain it |
| U15 | Input/output basics (console; later simple args/files as needed) | See a program communicate |
| U16 | Modules: splitting code across files; why | Create and require/import a local module |
| U17 | The standard library idea (built-in modules) | Use one built-in module with understanding |
| U18 | Asynchronous ideas only when forced by I/O (keep minimal early) | Not required deep; introduce when a real need appears |

#### Phase 3 — Packages and package managers (sacred sequence)

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U19 | Why reuse exists; cost of writing everything yourself | Argue for shared code without mysticism |
| U20 | What a package is (and is not) | Define package in one plain sentence + example |
| U21 | Trust, versions, and “dependency” as a relationship | Explain version numbers at a beginner level |
| U22 | What a package manager is for | Explain npm’s job before typing npm |
| U23 | `package.json` as a project manifest (created with understanding) | Read and partially write package.json fields they use |
| U24 | Installing packages; `node_modules`; lockfiles (honestly, simply) | Install one package and use it in code |
| U25 | Scripts in package.json (`npm test`, `npm start`) | Run project scripts and know what they trigger |
| U26 | Dev vs runtime dependencies (when the distinction matters) | Place a test runner correctly when introduced |

#### Phase 4 — Backend web applications

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U27 | Client vs server; what “backend” means here | Draw the conversation in words |
| U28 | Networks for programmers: address, port, listen | Explain localhost and a port |
| U29 | HTTP: method, path, headers, body, status codes | Read a simple HTTP exchange |
| U30 | JSON as a common data format for APIs | Parse/produce simple JSON |
| U31 | A minimal HTTP server in Node (prefer core `http` before frameworks) | Write a server that responds to one route |
| U32 | Multiple routes; 404; separating handler logic | Grow a tiny API without a framework |
| U33 | Why frameworks exist; introduce one deliberately (e.g. Express) only after U31–U32 | Add a framework as a *choice*, not a religion |
| U34 | Validation and error responses | Return useful 4xx/5xx with clear bodies |
| U35 | Simple persistence (in-memory first; file or DB only when earned) | Store and retrieve data across requests as designed |
| U36 | Project structure for a small API | Know where code lives and why |

#### Phase 5 — Automated testing (all major types, earned in order)

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U37 | What “testing” means; manual checks; limitations | Describe a manual test plan for a function |
| U38 | Why automate; tests as executable specifications | Explain automation without QA jargon |
| U39 | Assertions: claiming what should be true | Write a raw assert-style check |
| U40 | Test runners: discovering tests, pass/fail reports | Run a test file and read the report |
| U41 | Unit tests: one unit of behavior in isolation | Test pure functions / small modules |
| U42 | Test structure (arrange–act–assert); naming tests | Write readable tests |
| U43 | Edge cases and deliberate failure cases | Add tests that pin down boundaries |
| U44 | Integration tests: units working together | Test module collaboration without full HTTP if possible |
| U45 | Testing HTTP/APIs: request in, response out | Test their server/API behavior |
| U46 | Test doubles at a gentle level (only when a real pain appears): stub/fake/mock vocabulary carefully | Replace a slow/fragile dependency in a test *with reason* |
| U47 | The test pyramid / “kinds of tests” map; choosing the cheapest honest test | Pick a test type for a given fear |
| U48 | Regression: a bug becomes a test | Fix a bug the professional way |
| U49 | Coverage as a flashlight, not a score | Interpret coverage without worshipping % |
| U50 | Putting it together: feature + unit + API tests on one small app | Submit a coherent mini-project |

#### Phase 6 — Capstone and craft (optional extension units)

| ID | Unit focus |
|----|------------|
| U51 | Refactoring with tests as a safety net |
| U52 | README and running instructions for another human |
| U53 | Basic CI idea (only after local tests are solid): “a machine runs your tests” |
| U54 | Ethics: dependencies, secrets, not shipping keys |

#### Phase 7 — Frontend in the browser (Track B)

Prerequisite: through **U36** minimum; **U50 capstone API** strongly recommended so the UI has a real backend to call.

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U55 | Why a frontend; browser as a different runtime | Contrast Node vs browser without fear |
| U56 | HTML as structure (document, not program) | Write semantic page skeleton |
| U57 | CSS as presentation (selectors, box model light) | Style without frameworks |
| U58 | JavaScript in the browser; the DOM | Select elements; change text/content |
| U59 | Events and forms | Handle click/submit; read inputs |
| U60 | `fetch` to their API; CORS idea | Call backend from a page; decode basic CORS |
| U61 | Serving static frontend + API together | One project: Express static + API |
| U62 | Small UI structure, a11y basics, stable test hooks | `data-testid` / roles; usable forms |

#### Phase 8 — Browser tests with Playwright

Prerequisite: **U55–U62** and Phase 5 testing culture (**U37–U45**). Packages/npm already known.

| ID | Unit focus | Learner can… |
|----|------------|--------------|
| U63 | Why test the UI; manual browser checklist | Manual UI plan before automation |
| U64 | What browser automation is; what Playwright is (not) | Define E2E/UI automation calmly |
| U65 | Install Playwright; browsers; first config explained | Install with understanding |
| U66 | First Playwright test: goto, assert text | Green test against static page |
| U67 | Locators: role, text, test id; resilient selectors | Prefer stable locators |
| U68 | Actions: click, fill, submit | Drive a form |
| U69 | Waiting, auto-wait, flakiness | Explain waits; avoid hard sleeps as default |
| U70 | Fixtures, beforeEach, test isolation | Clean state per test |
| U71 | Full stack E2E: UI + their API | Start app, test user journey |
| U72 | Network: mock/stub API in browser tests (when earned) | Isolate UI when backend is noisy |
| U73 | UI test strategy vs unit/API pyramid | Choose cheapest honest UI check |
| U74 | Frontend + Playwright capstone | Ship UI + E2E suite for assessor |

**Playwright pedagogy rules:**

1. Never `npx playwright test` before U64–U65 explain automation + install.
2. Teach **locators and waiting** before “just increase timeout.”
3. Prefer testing **user-visible behavior** over implementation CSS classes.
4. E2E is the **top** of the pyramid — fewer, higher-value journeys; do not replace unit/API tests.
5. Default stack: **@playwright/test**, Chromium first; mention Firefox/WebKit exist.
6. App under test must be started in a explained way (`webServer` in config or documented manual start).

Generate units **in order**. Do not skip Phase 3. Do not teach frameworks before a raw HTTP server. Do not teach mocks before the learner has written real unit and HTTP tests. Do not teach Playwright before a real page the learner built (or a tiny provided static page in U66 only as a bridge).

---

## 5. How a single unit must be written

Every generated unit is a **static lesson package** for the learner and assessor.

### 5.1 Unit folder convention

```
course/
  README.md                 # learner-facing course home
  phases/
    phase-01-.../
  units/
    U14-running-a-js-file/
      README.md             # the lesson (primary learner document)
      concepts.md           # optional deep dive if README would be too long
      exercises.md          # practice tasks (may live inside README for early units)
      assignment.md         # graded work submitted to human assessor
      rubric.md             # how the assessor scores (visible to learner)
      solutions/            # for assessors only — do not link from learner README
        ...
      fixtures/             # starter files if needed
      examples/             # complete tiny examples referred to by the lesson
```

Early units may collapse `exercises.md` into `README.md` to reduce navigation load. From Phase 3 onward, prefer separate files when length grows.

### 5.2 Required sections in each unit `README.md`

Use these headings (wording may be learner-friendly, structure must remain):

1. **Where you are** — unit ID, title, phase; 2–4 sentences of orientation.
2. **What you will be able to do** — observable outcomes (not “understand X” alone; include *do*).
3. **What you need already** — prior unit IDs only; no vague “basic JS.”
4. **Time and energy** — honest estimate; permission to take breaks.
5. **Why this exists** — the human problem this unit solves.
6. **Plain-language teaching** — concepts with definitions before jargon.
7. **Vocabulary** — table: Term | Plain meaning | Common confusion.
8. **Worked example** — tiny, complete, copyable; every line justified.
9. **Common errors** — at least one realistic failure decoded.
10. **Checkpoints** — questions they can answer *before* graded work (self-check).
11. **Practice exercises** — ungraded or lightly checked; increasing difficulty.
12. **Assignment** — pointer to `assignment.md` or inlined for short units.
13. **How you will be assessed** — pointer to `rubric.md`; no surprises.
14. **What is *not* in this unit** — explicit scope fence (reduces anxiety).
15. **Next unit** — only the immediate next step.

### 5.3 Tone and voice (learner materials)

- Warm, adult, respectful. Not childish; not corporate; not “bro hacker.”
- Second person (“you”) for guidance; first person plural (“we”) when exploring together.
- Short paragraphs. Prefer one idea per paragraph.
- When introducing a hard idea: **name the feeling** (“This part confuses almost everyone at first.”).
- Never shame. Never fake cheerfulness over real difficulty.
- Prefer concrete nouns over abstract nouns (“the function returns `3`” over “the abstraction yields a result”).

### 5.4 Code in learner materials

- Always specify **filename** and **how to run it**.
- Show **expected output** exactly.
- Prefer complete files over fragments until they can mentally assemble fragments.
- Comment only what the prose did not already say; do not comment noise.
- Match the course’s chosen style consistently (see §7).

### 5.5 Assignments and assessment

Assignments exist so a **human trainer/assessor** can evaluate learning. Design for that reality.

**Assignment rules:**

- Tasks map 1:1 to outcomes listed in the unit.
- Provide exact submission format (files, zip structure, short written answers).
- Include “definition of done” checklist the learner can tick.
- Include at least one **explain in your own words** prompt (catches pure copy-paste).
- Include at least one **predict then run** or **debug this broken snippet** task when appropriate.
- Never require tools not yet taught.
- Never require paid services.

**Rubric rules:**

- Visible to the learner in the same unit.
- Criteria are observable (e.g. “Server responds `200` with JSON body `{ ok: true }` for `GET /health`”).
- Separate **must-have** from **nice-to-have**.
- Include a criterion for clarity of explanation when the assignment asks for writing.
- Tell the assessor what evidence to look for; avoid pure vibe scoring.

**Assessor-only solutions:**

- Live under `solutions/` and are **not linked** from learner docs.
- Include notes on partial credit and common wrong-but-thoughtful answers.

### 5.6 Difficulty ramps inside a unit

1. Read and predict.
2. Change one value; observe.
3. Fill in a blank.
4. Write a small piece from a specification.
5. Fix a broken example.
6. (Assignment) Combine skills under light novelty.

If a unit jumps from (1) to (6), rewrite it.

---

## 6. Testing pedagogy (special doctrine)

Testing is not an appendix. It is a **first-class skill** equal to writing the application code.

### 6.1 Emotional framing

Many learners hear “test” and think:

- school exam,
- QA department,
- or something seniors use to reject their PRs.

Counter that early:

- A test is a **small program that checks another program**.
- A failing test is **information**, not a moral verdict.
- We write tests so **future us** can change code without fear.

### 6.2 Order of test teaching

1. Manual checking (with a written checklist).
2. Why manual checking fails as programs grow.
3. Assertions.
4. A test runner.
5. Unit tests on pure logic.
6. Integration tests on collaborating modules.
7. HTTP/API tests on the server they built.
8. Doubles only when a dependency makes real tests painful or flaky.
9. Strategy: which test kind for which risk.

### 6.3 Types of tests to cover (minimum set)

| Type | Question it answers | Teach after |
|------|---------------------|-------------|
| Manual test | “Did it seem to work when I tried?” | Early programming |
| Unit test | “Does this one piece behave correctly?” | Modules + assertions |
| Integration test | “Do these pieces work together?” | Multi-module code |
| HTTP/API test | “Does the server fulfill its contract?” | Minimal server exists |
| Regression test | “Does this old bug stay fixed?” | After first real bug fix |
| (Optional later) Contract / e2e light | “Does the whole path still work?” | Capstone |

Do not obsess over industry naming wars. Pick terms, define them once, stay consistent. If you use “integration” for module-level and “API test” for HTTP, say so explicitly.

### 6.4 Tools

- Prefer **Node’s built-in test runner** and `assert` when possible, to minimize package mysticism.
- Introduce a third-party runner only if it clearly earns its keep *after* packages/package managers are understood.
- HTTP testing: start with the same stack they used to build the server; avoid a zoo of libraries.

---

## 7. Technical defaults for generated course code

Consistency reduces cognitive load.

| Choice | Default | Notes |
|--------|---------|--------|
| Language | JavaScript (Node.js) | Not TypeScript in the main path (types are a later optional track) |
| Module system | Start with what Node docs recommend for beginners at time of writing; stay consistent per phase | Teach the chosen system; do not mix casually |
| Package manager | npm | Mention others exist; do not multi-teach early |
| First HTTP server | Node `http` module | Framework only after raw understanding |
| Framework (when introduced) | Express (or current boring standard) | One framework, justified |
| Test runner | `node:test` + `node:assert` preferred | Third-party only with reason |
| OS notes | Windows, macOS, Linux differences called out when commands differ | Learner may be on Windows |
| Editor | Any; do not require a specific IDE | May suggest VS Code without mandating plugins |
| Git | Optional side path; not a blocker for early units | Introduce when collaboration/history truly helps |

When the ecosystem changes, update units and this defaults table together.

---

## 8. Generating units (operating procedure for the AI author)

When asked to produce the next unit or a specific unit ID:

### 8.1 Before writing

1. Read this file.
2. Read the previous unit’s learner outcomes and assignment (if it exists).
3. List **new concepts** this unit is allowed to introduce (keep the list short).
4. List **concepts used but already taught** (reference prior unit IDs).
5. Confirm no dependency inversion (e.g. npm before packages).

### 8.2 While writing

1. Draft the “Why this exists” section first.
2. Write the worked example second.
3. Write exercises that only use taught ideas.
4. Write the assignment and rubric so a busy human can score in minutes.
5. Run through the “explain the hell out of it” checklist (§3.1) for every new tool/command.
6. Read the unit as if you are anxious and slightly lost. Remove leaps.

### 8.3 After writing

Self-review questions:

- Could a learner complete the assignment without an unstated concept?
- Is every command preceded by meaning?
- Is the rubric observable?
- Did I say “simply” or “just”? Remove it.
- Did I introduce more than ~3 genuinely new ideas? If yes, split the unit.

### 8.4 What not to generate unless asked

- Video scripts, slide decks, or marketing pages.
- React/Vue/Angular/Svelte (optional later track; not Phase 7 core)
- CSS design systems, Tailwind-first teaching, pixel-perfect design
- Docker/K8s/cloud deploys before local mastery.
- Heavy TypeScript, monorepos, microservices.
- “Build Twitter clone” scale projects.

---

## 9. Language, accessibility, and inclusion

- Use inclusive examples (names, contexts). Avoid stereotypes.
- Avoid unnecessary idioms and sports metaphors.
- Prefer culturally portable scenarios (todo items, library loans, shop orders, classroom roster).
- Do not require fast internet beyond installing Node and packages.
- Do not require a powerful machine.
- Call out costs if any optional tool is not free.

---

## 10. Relationship between files

| File | Audience | Role |
|------|----------|------|
| `AGENTS.md` (this file) | AI / course author | Teaching doctrine + curriculum spine |
| `README.md` | Humans discovering the repo | Short pointer to purpose and where things live |
| `course/**` | Learners + assessors | Generated static units |
| `course/units/*/solutions/**` | Assessors only | Keys and grading notes |

When doctrine and a generated unit conflict, **fix the doctrine** and fix the unit—unless the doctrine itself is being intentionally revised.

---

## 11. Revision rules

- Curriculum map changes are serious: update unit IDs, prerequisites, and any generated “What you need already” sections.
- Prefer additive clarification over silent renumbering.
- If a cohort struggles at the same cliff, add a bridge unit or split the cliff unit; do not tell learners to “try harder.”

---

## 12. One-page reminder (pin this mentally)

1. Confused is the default — design for it.
2. Why → what → how → task.
3. Packages before package managers before `npm install`.
4. Raw HTTP before frameworks.
5. Manual checking before automated tests; unit before mocks.
6. Every unit: teach, example, errors, checkpoint, practice, assignment, rubric.
7. Static materials must stand alone for a human-assessed learner.
8. Confidence is part of the syllabus.

If a draft unit violates the pedagogical law in §3, it is not done.
