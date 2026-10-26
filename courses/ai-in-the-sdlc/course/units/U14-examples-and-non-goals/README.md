# U14 — Examples and non-goals

**Phase 3 — Specifications**

## Where you are

You can draft the six headings. This unit spends time on the two headings that do the most work when an agent is involved: **examples** and **non-goals**. Rules in prose still leave a crack. An example is a crack with a number in it. A non-goal is a crack you close on purpose.

## What you will be able to do

- Write an example as input → output, including one edge case.
- Write non-goals aimed at real agent habits: new packages, new files, new routes, drive-by refactors.
- Tighten a spec whose happy path is clear and whose edges are open.

## What you need already

- **U13 — A spec shape agents can execute.**

## Time and energy

About **50–70 minutes**.

## Why this exists

Agents imitate examples more reliably than they imitate adjectives. "Reject duplicates sensibly" becomes a thrown exception in one session and `{ error: "duplicate" }` in another. `borrow("b1","Asha")` twice returns `{ ok: false, error: "already-borrowed" }` is one behavior.

Non-goals exist because agents optimize for a demo. A count function becomes an API. A date becomes `dayjs`. A one-line fix becomes a rename across the file. You have seen these habits, or you will. Naming them in the spec is cheaper than reverting them.

## Plain-language teaching

### What an example is

An **example** is one concrete input and the exact result.

```text
reset loans
borrow("b1", "Asha") → { ok: true, loan: { bookId: "b1", borrower: "Asha", returned: false } }
countForBorrower("Asha") → 1
```

Include the fields that matter. If the whole loan object is noisy, specify the fields you care about and say the others are unchanged:

```text
Second borrow("b1", "Asha") → ok: false, error: "already-borrowed"
The first loan stays active.
```

### How many examples

Three is a good minimum for a small shelf change:

1. The new success or the new error.
2. A neighbor case that must **keep** working (so the agent does not break `no-copies` while adding `already-borrowed`).
3. An edge that a guess gets wrong (empty string, returned loan, second copy).

Twenty examples means you are writing the test suite in prose. At that point, write the tests (U20) and let the spec point at them. The spec's job is the cases that define the behavior, not every assertion.

### What a non-goal is

A **non-goal** is a change a helpful agent is likely to attempt, which you refuse in advance.

Useful shelf non-goals:

- Do not add or change HTTP routes.
- Do not add npm dependencies, including date or utility libraries.
- Do not create new files.
- Do not rename `borrow`, `returnLoan`, or `activeLoans`.
- Do not change existing error strings.
- Do not reformat the file or convert functions to classes.
- Do not "improve" borrower matching with fuzzy search or case-folding.

Useless non-goals:

- Do not write bugs.
- Do not do anything bad.
- Do not over-engineer.

They name no file, no package, and no behavior. The agent cannot steer by them.

### Case-folding is the kind of "help" you must refuse explicitly

`borrow` stores a trimmed name and compares with `===`. A spec that says "count the borrower's loans" without an example might get:

```javascript
loan.borrower.toLowerCase() === borrower.toLowerCase()
```

That is a behavior change for every caller. If you want it, it is a spec of its own. If you do not, say: comparison stays strict, as in `returnLoan`.

### Non-goals and standing rules overlap

`AGENTS.md` already bans new dependencies. Repeating "no new dependencies" in the spec is still worth it when the task **mentions a concept that attracts libraries**. The word "overdue" attracts date libraries. The word "count" attracts lodash. The word "route" attracts a framework. The spec repeats the ban in the place where the temptation is introduced. This is not drift. Drift is two files that disagree. Agreement is allowed.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Example | One input and the exact output | Not a screenshot of a UI you do not have |
| Edge | A case a reasonable guess gets wrong | Not an exotic stunt |
| Neighbor case | An old behavior that must survive | Not the new feature |
| Non-goal | A likely extra you refuse by name | Not a vague "don't be bad" |

## Worked example

**Loose behavior section:**

```markdown
## Behavior
Users can see overdue loans. Handle dates properly.
```

**Tight version:**

```markdown
## Behavior
Loans gain an optional field `due`.
`borrow(bookId, borrower)` leaves `due` undefined. Existing callers stay valid.
`borrow(bookId, borrower, today)` sets `due` to the calendar date 14 days after `today`.
`today` is a string `YYYY-MM-DD`. No time zone math: add 14 to the day and roll the calendar using UTC dates only.
`overdueLoans(today)` returns active loans whose `due` is a string strictly less than `today`.
Loans with no `due` are not overdue.

Examples:
- borrow("b1", "Asha", "2026-01-01") → loan.due === "2026-01-15"
- overdueLoans("2026-01-15") does not include that loan
- overdueLoans("2026-01-16") includes it
- borrow("b1", "Ben") then overdueLoans("2026-12-01") does not include Ben's loan

## Non-goals
- No date library (no dayjs, date-fns, moment, luxon).
- No HTTP route.
- No clock reads (`Date.now`). The caller passes `today`.
- No change to the no-copies rule.
```

The word "properly" is gone. UTC calendar addition is specified because "14 days" is otherwise a time-zone argument. You are allowed to look at that spec and decide the date rule is more than shelf needs. Then you cut the feature. You do not leave "properly" in its place.

Notice `Date.now` is banned so tests stay repeatable. That is a non-goal aimed at a real habit: agents love "just use today's date."

## Common errors

### Examples that use data shelf does not have

**What you see:** `borrow("b9", "Asha")` expected to succeed. Book `b9` does not exist. The real result is `unknown-book`.

**What it means:** The example fights the code. The agent will either change the book list or fail the example.

**What to do:** Use `b1` and `b2` unless the spec also adds a book. State which.

### Non-goals that forbid the goal

**What you see:** Goal adds a test file. Non-goal says "do not edit anything under `test/`."

**What it means:** A contradiction, same disease as U11, now inside one spec.

**What to do:** Read goal and non-goals as a pair before you hand the spec to anyone.

## Checkpoints

1. Write one example for `already-borrowed` from memory.
2. Name three non-goals that are about agent habits, not about manners.
3. Why repeat "no date library" in an overdue spec when `AGENTS.md` already bans new packages?

## Practice exercises

### P1 — Three examples

Write three examples for: "`activeLoans()` returns newest last" is **not** the task. The task is: `activeLoans` stays in insertion order; add a test that borrows Asha then Ben on `b1` and expects that order. Include the non-goal "do not sort."

### P2 — Temptation list

The feature is "search books by title." List four likely agent extras, then turn each into a non-goal. Shelf's book list is two titles. Say whether search belongs in `books.js`.

### P3 — Repair "properly"

Replace "validate the borrower properly" with two examples. Use the existing `borrower-required` behavior rather than inventing a new one, and set a non-goal that names are not checked against a directory.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No prompt yet.
- You are not implementing date math.
- Capstone due dates return in U29. You are only practicing the spec muscle.

## Next unit

**U15 — From a rough note to a spec.**
