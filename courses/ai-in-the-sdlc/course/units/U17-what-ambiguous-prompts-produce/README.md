# U17 — What ambiguous prompts produce

**Phase 4 — Prompts**

## Where you are

You can shape a prompt. This unit shows the failure you came here to recognise: a short, reasonable-sounding prompt, and a generation full of packages, files, and APIs nobody asked for. The generation below is fixed. You will not need a live model. You will need to read it like a reviewer who is no longer charmed by fluency.

Ambiguous does not mean "written in a hurry by a bad developer." It means **at least one decision that changes the diff was left open.** The agent closes open decisions with whatever is common in its training. Common is not the same as "fits this repo."

## What you will be able to do

- List the open decisions in a short prompt.
- Annotate a bad generation: each invented package, file, route, and behavior.
- Say which open decision each invention filled.

## What you need already

- **U16 — Prompt anatomy.**
- **U09** (you know which inventions matter).

## Time and energy

About **60–90 minutes**. The worked example is a bit long because bad diffs are long. That length is the lesson.

## Why this exists

If you have never seen a bad generation dissected, you will accept the next one that compiles. "It runs" is a low bar. Shelf running with Express and lodash is a different program than the one you have. This unit makes the mess visible before you are staring at your own repository.

## Plain-language teaching

### What ambiguity is

A prompt is **ambiguous** when two diffs could both claim to satisfy the words, and you would accept only one of them.

```text
Add overdue support to shelf.
```

Diff A: a function `overdueLoans(today)` using string dates, tests, no new files.

Diff B: Express, `date-fns`, a React page, a `DueDateService` class, email.

Both "add overdue support." Only one belongs in this course's shelf. The prompt allowed both. The agent is not required to prefer the smaller one. Many agents prefer the more impressive one.

### The inventions to hunt

When you read a generation, hunt this list. It is the same list as the U09 catalog, seen from the other side.

| Invention | How it shows up |
|-----------|-----------------|
| New package | `import` from a name that is not a relative path or `node:…`, plus `package.json` |
| New framework | `express`, a rewrite of `createServer` |
| New file or folder | `src/services/`, `src/utils/`, `routes/` |
| New route or field | `POST /api/v1/...` while the server only had `GET /loans` |
| Changed contract | error strings reworded, function renamed |
| Drive-by | formatting, comments, "cleanup" in unrelated functions |
| Weaker tests | deleted assertion, or tests that import the new framework and skip the real rule |
| Process changelog | lines about reading files |

### A fixed bad generation

**Prompt:**

```text
Add a way to count how many books a borrower has out. Make it nice.
```

**What the agent produced** (you are looking at a teaching fixture, not something you should save):

`package.json` gained:

```json
"dependencies": {
  "lodash": "^4.17.21",
  "date-fns": "^3.6.0"
}
```

`src/services/LoanService.js` (new file):

```javascript
import _ from "lodash";
import { format } from "date-fns";
import { activeLoans } from "../loans.js";

export class LoanService {
  count(name) {
    const today = format(new Date(), "yyyy-MM-dd");
    console.log("count requested", today);
    return _.filter(
      activeLoans(),
      (loan) => loan.borrower.toLowerCase() === name.toLowerCase(),
    ).length;
  }
}
```

`src/server.js` was rewritten to:

```javascript
import express from "express";
import { LoanService } from "./services/LoanService.js";

const app = express();
const service = new LoanService();

app.get("/api/v1/borrowers/:name/count", (req, res) => {
  res.json({ count: service.count(req.params.name), status: "success" });
});

export default app;
```

`test/loans.test.js` was **deleted**. Replaced by `test/count.test.js`:

```javascript
import { LoanService } from "../src/services/LoanService.js";

test("counts", () => {
  const n = new LoanService().count("anybody");
  if (typeof n !== "number") throw new Error("not a number");
});
```

`CHANGELOG.md` gained:

```markdown
- looked at the repo
- installed helpful libraries
- created a modern service layer
- added a REST endpoint
- removed brittle old tests
```

And `borrow` inside `src/loans.js` was "cleaned up" from a plain function into a method on the same class, so existing tests would not have compiled. Deleting them made `npm test` green.

### Annotation

| Piece | Invention | Open decision it filled |
|-------|-----------|-------------------------|
| lodash | New package | "count" did not say to use `.filter` like the rest of the file |
| date-fns and `new Date()` | New package and a clock | "nice" was read as timestamps in logs |
| `LoanService` class and `src/services/` | New pattern, new file | No file fence |
| Case-insensitive compare | Changed contract | "Borrower" was not tied to `===` |
| Express and `/api/v1/...` | Framework and route | "A way to count" did not say "function only" |
| Response `{ count, status: "success" }` | New JSON shape | Shelf uses `{ ok, error }` and `{ loans }` |
| Old tests deleted | Weaker tests | "Make it nice" was allowed to judge the suite |
| Changelog diary | Process log | No changelog rule in the prompt |
| `console.log` | Noise and a side effect | Unspecified |

Nothing in that table requires malice. Each row is a plausible completion of an open slot. Your job is to close the slots before the turn, and to recognise the rows if they appear anyway.

### What a faithful generation would have contained

A function `countForBorrower` in `src/loans.js` using `.filter` and `===`, tests next to the old tests, no new package, server untouched, one changelog line. You saw that shape in U13. The distance between that and the fixture is the cost of "make it nice."

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Ambiguous prompt | A prompt two different diffs could both claim to satisfy | Not "a prompt with a typo" |
| Invention | A package, file, route, or behavior the prompt did not decide | Not creativity to celebrate by default |
| Faithful | A diff that stays inside the decisions you actually made | Not a diff that merely runs |
| Fixture | A sample checked into the lesson | Not your repo's code |

## Worked example

The fixture above is the worked example. Read it once for the story, then once with the hunt list. Practice P1 asks you to do that on paper.

Here is the same prompt, de-ambiguated enough that the fixture would violate it by name:

```text
Implement countForBorrower in src/loans.js only, plus tests in test/loans.test.js
and one CHANGELOG line.

Use activeLoans() and === on borrower. No new files. No new packages.
Do not edit server.js. Do not change borrow. Do not delete tests.
Run npm test. If it fails, stop.
```

U18 and U19 expand this into a repeatable pattern. This unit's job is to feel the difference between the two prompts when you look at the bad diff.

## Common errors

### "But the REST version is more complete"

**What you see:** A review comment that praises `/api/v1/borrowers/:name/count` and merges it.

**What it means:** Impressive was substituted for faithful. The old server is gone. The old tests are gone. Case-folding changed the meaning of a borrower name.

**What to do:** Score the diff against decisions, not against how modern the route looks. If you want the route, write a spec for the route. Do not take it as a side effect of "count."

### Fixing the bad generation with a follow-up prompt

**What you see:** "Now remove express but keep the service class."

**What it means:** You are negotiating with an unreviewed pile. The class was never wanted either.

**What to do:** Restore the tree to the last commit (U22). Send a fenced prompt. Do not iteratively sculpt a bad turn into a good one. Sculpture keeps hidden leftovers, like the `date-fns` dependency you forgot to remove.

## Checkpoints

1. Define an ambiguous prompt without using the word "bad."
2. Name four inventions in the fixture.
3. Why did deleting tests make the generation look successful?

## Practice exercises

### P1 — Hunt

Take the fixture. Write the hunt-list table with one row per invention. You should land near nine rows. Fewer than six means you stopped at the obvious package.

### P2 — Open slots

List the open decisions in "Add overdue support to shelf. Make it production-ready." Aim for six.

### P3 — Faithful sketch

In five lines, describe the diff you would accept for P2 **after** you had specified: string dates, caller passes `today`, no library, no HTTP, loans without `due` are never overdue. Do not write the implementation.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- You are not asked to run a model to reproduce the fixture. Reproductions vary; the fixture is the assignment's source of truth.
- The repair prompt's full pattern is U18 and U19.

## Next unit

**U18 — Fence the change.**
