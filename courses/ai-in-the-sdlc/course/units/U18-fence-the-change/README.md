# U18 — Fence the change

**Phase 4 — Prompts**

## Where you are

You have seen what an unfenced prompt produces. This unit is the countermeasure you will reuse on every real task: a **fence** around files, dependencies, and behavior. Standing rules are the fence around the project. This is the fence around the turn, drawn tighter because you know what this task tempts the agent to do.

## What you will be able to do

- Write a file fence with an allow list and a deny list.
- Add a dependency fence that names the libraries this task will attract.
- Add a behavior fence that protects one existing contract by name.

## What you need already

- **U17 — What ambiguous prompts produce.**

## Time and energy

About **50–75 minutes**.

## Why this exists

`AGENTS.md` says "only files the task names." The task still has to name them. If the prompt forgets, the standing rule has nothing to point at, and the agent names files itself. A fence is that naming, done by you, before the turn.

Denylists without allow lists fail in a different way. "Do not edit server.js" still allows `src/services/LoanService.js`, which the U17 fixture invented. Allow lists are the stronger fence. Deny lists are for the specific temptations just outside the allow list, so they are obvious in the prompt.

## Plain-language teaching

### File fence

```text
Allowed files:
- src/loans.js
- test/loans.test.js
- CHANGELOG.md

Forbidden:
- any other file
- any new file
```

"Forbidden: any other file" makes the allow list closed. Without it, an agent treats the allow list as a suggestion and adds a helper "beside" those files.

If a change truly needs `src/server.js`, put it on the allow list and add a behavior fence for what the server must still do (`GET /loans` unchanged, still no Express). Do not leave the server in a fuzzy middle.

### Dependency fence

Name the attractive packages. Generic "no dependencies" is required. Specific names help more when the task vocabulary is a magnet.

| Task words | Packages agents reach for | Fence line |
|------------|----------------------------|------------|
| count, group, unique | lodash, underscore | Do not import lodash or any utility library. Use `.filter`. |
| overdue, date, calendar | date-fns, dayjs, moment, luxon | Do not add a date library. Use `YYYY-MM-DD` strings. |
| route, API, modern | express, fastify, koa | Do not add a framework. `src/server.js` uses `node:http`. |
| validate | zod, joi, yup | Do not add a validation library. |

You will not memorize every package name on earth. You memorize the **magnets**: dates, HTTP frameworks, utility bags, validation. When the task contains the magnet, the fence names it.

### Behavior fence

Protect the neighbor contract in one line the agent cannot reinterpret:

```text
Do not change the result of borrow("b2", "Asha") then borrow("b2", "Ben"):
the second call stays { ok: false, error: "no-copies" }.
Do not edit that existing test except to add new tests below it.
```

This is the fence that would have saved the U17 fixture's deleted suite. "Don't break anything" is not a behavior fence. A named call and a named error string is.

### What a fence is not

- Not an insult ("don't do anything stupid").
- Not a new feature hidden in the forbid list's shadow ("while you're here, also…"). The forbid list only forbids.
- Not tool wiring. "Deny `npm install`" in a settings screen is excellent and separate. The prompt fence still says "do not add dependencies," because you review the diff even if the command was blocked. A blocked install with a leftover `import` still fails the review.

### Order inside the prompt

From U16, fences sit after the target and before verify. Put the allow list first, then the named temptations, then the behavior fence. Agents that skim still hit the allow list early. Humans reviewing the prompt can see it.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Allow list | Files the turn may change | Not a suggestion |
| Deny list | Files, packages, or behaviors this turn must not introduce | Not a substitute for the allow list |
| Magnet | A word that attracts a popular package | Not a moral failing of the tool |
| Closed fence | Allow list plus "no other files" | Stronger than a few forbids |

## Worked example

**Task words:** "overdue" and "list."

**Unfenced:** "Add overdue support."

**Fenced prompt:**

```text
Implement specs/overdue-loans.md.

Allowed files only:
- src/loans.js
- test/loans.test.js
- CHANGELOG.md
No other file. No new file.

Dependencies:
- Do not add packages.
- Do not import date-fns, dayjs, moment, or luxon.
- Do not read the clock. The caller passes today.

Behavior:
- Keep borrow(bookId, borrower) working for existing tests.
- no-copies, unknown-book, and borrower-required stay those strings.
- GET /loans is out of scope. Do not edit src/server.js.

Verify: npm test
Stop: if a test fails, stop. Do not weaken assertions.
```

The spec still holds the examples (`due` fourteen days later, strict string compare). The fence holds the limits that the word "overdue" puts at risk. Together they are the pattern U19 will compress into a habit.

## Common errors

### Allow list of the whole repository

**What you see:** "Allowed: the repo."

**What it means:** There is no fence. Every file is legal, which is how `README.md` grows a tutorial the task did not ask for.

**What to do:** Name paths. If you cannot name them, you are not ready to prompt. Return to the spec's Files section.

### Forbidding the file that contains the bug

**What you see:** The defect is in `src/server.js`. The fence says "do not edit server.js" because server edits feel scary.

**What it means:** The turn cannot succeed faithfully. The agent will either stop (good) or edit a different file to hack around the ban (bad).

**What to do:** Allow the file, and fence the behaviors inside it that must stay. Fear of a file is not a fence. A named surviving behavior is.

## Checkpoints

1. Why is an allow list stronger than three random forbids?
2. Name the magnet and two packages for a task that says "validate the JSON body."
3. Write a one-line behavior fence that protects `borrower-required`.

## Practice exercises

### P1 — Close the list

Rewrite "You can edit the loan code and whatever else you need" as a closed file fence for `countForBorrower`.

### P2 — Magnets

The prompt is "Add a modern search endpoint for book titles." Write a dependency fence and a file fence. Decide whether `src/books.js` and `src/server.js` are in scope. State the decision in one sentence. Remember shelf's server is `node:http` and has one route.

### P3 — Behavior

Write two behavior fences: one for `no-copies`, one for "do not case-fold borrower names."

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- You are not implementing overdue loans.
- Pattern language for "fast and accurate" prompts is the next unit. This unit is the fence itself.

## Next unit

**U19 — Prompt patterns that stay accurate.**
