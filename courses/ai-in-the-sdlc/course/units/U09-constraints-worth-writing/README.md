# U09 — Constraints worth writing

**Phase 2 — Standing instructions**

## Where you are

You can sort lasting rules from tasks. This unit is the catalog: which constraints earn a line in `AGENTS.md`, how to phrase them so a diff can prove them, and which popular ideas ("log everything," "be careful") fail in practice.

## What you will be able to do

- Write a constraint so that a reviewer can point at a diff and say pass or fail.
- Cover the shelf categories: dependencies, data and network, secrets, file scope, style match, tests, changelog, commands, honesty when the spec conflicts with the code.
- Reject or rewrite an uncheckable constraint.

## What you need already

- **U08 — Standing rules vs today's task.**

## Time and energy

About **60–90 minutes**. This is dense on purpose. The catalog is the part people skip, and then they are surprised when the agent imports a package.

## Why this exists

A standing file full of mood ("write beautiful code") does not stop `npm install date-fns`. A standing file full of checkable limits does not *guarantee* a stop either, but it gives you a yes/no question during review: did `package.json` change? If yes, the constraint failed, restore. The phrases below are the ones that have earned their place on small codebases like shelf and on ordinary application repos. You will adapt the nouns (`src/loans.js`, `npm test`) to your own project later. The categories stay.

## Plain-language teaching

### Checkable means yes or no

A constraint is **checkable** when two reviewers, looking at the same diff and the same test output, would usually agree whether it held.

| Phrase | Checkable? | Better phrase |
|--------|------------|----------------|
| Be careful with data | No | Do not connect to a database or any host that is not this repo |
| Write clean code | No | Match the style of `src/loans.js`: ESM, no classes, result objects `{ ok, error }` |
| Log all actions to `CHANGELOG.md` | Almost, and noisy | After an **accepted** behavior change, append one line under `## Unreleased` |
| No new packages | Yes | Do not add dependencies. `package.json` stays free of `dependencies` and `devDependencies` unless a human edits it |
| Don't break things | No | Do not delete or weaken a test to obtain a passing run |

"Log all actions" is the interesting failure. A turn may read ten files and run tests twice. A changelog line for each read hides the one line a human needed: what behavior changed. Logs of tool actions belong in the agent transcript, which already exists. The changelog is for **behavior the project accepted**. Write that. You were right to want a record. The record stays useful if it is one line per accepted change, not a diary of reads.

### The catalog

Use these categories. A project may add a category. It should not skip data, dependencies, or secrets because those are how real damage happens.

**1. Identity.** Two or three lines. What the project is, where code lives, how to test. This is not a rule so much as a map, and it prevents the agent from inventing a second architecture.

> Shelf is an in-memory library-loan tracker. Logic: `src/loans.js`. Books: `src/books.js`. HTTP: `src/server.js` with `GET /loans` only. Tests: `npm test` (`node:test`). No npm dependencies.

**2. File scope.**

> Edit only files named in the current task. Do not create new top-level files or folders unless the task names them. Do not reformat or rename code the task did not mention.

**3. Dependencies and frameworks.**

> Do not add npm packages. Do not introduce a web framework, an ORM, or a date library. Use the JavaScript and Node built-ins already in the repo. If a package seems necessary, stop and ask. Do not install it.

This is the constraint that blocks the "random import" failure. Agents reach for popular packages when a task mentions dates, lists, or HTTP. Naming the ban, and naming the libraries you refuse, reduces the reach.

**4. Data and network.**

> Do not connect to a database server. Do not call a network API. Do not read environment files for connection strings. Persistence in this repo is the in-memory array in `src/loans.js` only.

On a real service you might write: "You may use the local test database described in `docs/test-db.md`. You may not use the production host, even if a credential is present." Shelf does not have that document. The ban is total.

**5. Secrets.**

> Do not read, print, summarize, or commit secrets: `.env`, private keys, tokens, passwords. If a task is impossible without a secret, stop and ask.

**6. Style match.**

> Match `src/loans.js`. ESM `import`. Plain functions. Failures return `{ ok: false, error: "kebab-name" }`. Success returns `{ ok: true, loan }`. Do not convert the file to classes, TypeScript, or a different module system.

Style rules that cite a file are checkable. Style rules that cite an aesthetic are not.

**7. Tests.**

> A behavior change adds or updates a test in `test/` using `node:test` and `node:assert/strict`. Run `npm test`. Do not delete, skip, or weaken a test to force a pass. If a test fails, stop and report the output.

**8. Changelog.**

> When a behavior change is accepted, append one line to `CHANGELOG.md` under `## Unreleased`. Do not log file reads, failed attempts, or test runs there.

**9. Commands.**

> You may run `npm test` and `node` on files inside this repo. Do not run package installs, destructive git (`push --force`, `reset --hard`), or any command that talks to a network service.

Prose plus wiring is ideal. If the tool cannot deny commands, the prose still tells the reviewer what to look for in the transcript.

**10. Honesty.**

> If the task contradicts this file or contradicts the current code, stop and describe the conflict. Do not invent HTTP routes, fields, or error codes to paper over a gap.

### How many is enough

Ten short bullets fit on a screen. A file that needs scrolling for the rules (not for a long example) will be skimmed by humans and partly ignored by models. If a rule is only for one subsystem, put it in a second file next to that subsystem **when the tool is documented to load it**, and keep a pointer in the root file. Until you have that documentation, one root file is the whole policy.

### Wrong on purpose

```markdown
- Make the code production-ready.
- Log every action you take to CHANGELOG.md.
- You may add small npm packages if they save time.
- Feel free to improve anything you notice.
```

Decoded:

- "Production-ready" has no test.
- Logging every action makes `CHANGELOG.md` a transcript. The behavior line is lost.
- "Small npm packages" is an open door. `date-fns` will walk through it during the overdue feature. The agent decides "small."
- "Improve anything" cancels the file-scope rule. Drive-by refactors hide real changes. U23 is about that mess.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Checkable constraint | A rule two reviewers could agree held or failed | Not a feeling |
| File scope | The list of files a task may touch | Not "the whole repo is in scope because it is open" |
| Drive-by | An edit to code the task did not mention | Often described as a cleanup |
| Honesty rule | Stop when the task and the repo disagree | Not "apologize in the report and invent a route anyway" |
| Accepted change | A change the human decided to keep | Not "the agent finished a turn" |

## Worked example

Task: "Add overdue listing." A diff adds `import { addDays } from "date-fns"` and a changelog with twelve lines ("read loans.js", "ran tests", "thought about time zones"…).

Review against the catalog:

| Category | Verdict |
|----------|---------|
| Dependencies | Fail. `date-fns` is a new package |
| Changelog | Fail. Twelve process lines, no single behavior line |
| Honesty | Fail if the spec never defined overdue. The agent guessed |
| Tests | Unknown until you look. A green run that required the new package is not a pass of the dependency rule |

The decision is restore, then write a spec that defines overdue as date strings and forbids a date library (U14, U18). The catalog told you **what** failed. It did not require you to debate whether `date-fns` is a nice library. It is. Shelf still does not get it by surprise.

## Common errors

### A private exception

**What you see:** "Do not add packages, except lodash, dayjs, zod, and express, those are fine."

**What it means:** The exception list is the real policy, and it grows every time an agent asks.

**What to do:** Zero packages unless a **human** edits `package.json` in a commit you review. The agent stops and asks. The human adds the dependency in their own change if they agree. That keeps the grant visible.

### Contradictions

**What you see:** Bullet 3: "Never edit `server.js`." Bullet 9: "Keep HTTP routes up to date with new functions."

**What it means:** The agent can cite either bullet. It will cite the one that justifies the larger edit.

**What to do:** Read your own file once as a list of pairs. If two bullets can bless opposite diffs, delete one. U11 practices this repair.

## Checkpoints

1. Why is "log every action to the changelog" a weaker rule than "one line per accepted behavior change"?
2. Which catalog item blocks an unsolicited `import _ from "lodash"`?
3. What should the agent do when a task needs a database and the file forbids one?

## Practice exercises

### P1 — Rewrite

Rewrite each as a checkable shelf constraint, or mark it `drop`:

1. Be careful.
2. Handle dates properly.
3. Don't mess up git.
4. Tests should be good.

### P2 — Apply

A diff adds `src/db.js` that calls `connect("postgres://prod.internal/shelf")`. Name every catalog category it fails. There are at least two.

### P3 — Changelog

Write the single `CHANGELOG.md` line you would want for an accepted `countForBorrower` feature. Then write two lines that would be inappropriate process noise.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- You are not writing the polished full file for submission yet (U10). You are writing constraints.
- No live agent.

## Next unit

**U10 — A worked AGENTS.md.**
