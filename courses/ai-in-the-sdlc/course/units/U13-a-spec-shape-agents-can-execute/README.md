# U13 — A spec shape agents can execute

**Phase 3 — Specifications**

## Where you are

You know what a spec is for. This unit gives it a shape that is short and still hard to misread. The shape is the practice that makes later prompts fast: the thinking happens once, in the spec, and the prompt stays small.

## What you will be able to do

- Draft a spec with goal, non-goals, behavior, files, tests, and done.
- Keep each section to decisions, not implementation diaries.
- Recognise a section that has collapsed back into a wish.

## What you need already

- **U12 — What a spec is for.**

## Time and energy

About **60–80 minutes**, including writing one spec by hand.

## Why this exists

An unstructured paragraph can contain every decision and still hide them. Agents attend to the start and the end, and so do tired humans. Headings put the dangerous decisions (what not to do, which files) where a scan can find them. The same headings become the evaluation checklist in U28. You are building that checklist's parent document.

## Plain-language teaching

### The shape

Use these headings, in this order. Skip none. If a heading has nothing to say, write "None" and be suspicious: a change with no non-goals is usually a wish.

```markdown
# Spec: short name

## Goal
One or two sentences. What the caller can do when this is done.

## Non-goals
Bullets the agent must not "helpfully" add.

## Behavior
Rules, then examples with inputs and outputs.

## Files
Allowed files. Forbidden files if the temptation is obvious.

## Tests
Names and assertions you expect. The runner is npm test.

## Done
How a human will decide. Usually: these tests pass, these files only, standing rules hold.
```

### What each heading prevents

| Heading | Prevents |
|---------|----------|
| Goal | A diff that solves a different problem cleanly |
| Non-goals | Extra routes, extra libraries, refactors |
| Behavior | Invented error strings and fuzzy matching |
| Files | New folders and drive-by edits |
| Tests | "It works on my example" with no regression check |
| Done | Accepting a report instead of evidence |

### A complete tiny spec

```markdown
# Spec: count-for-borrower

## Goal
Callers can ask how many active loans a borrower has.

## Non-goals
- No HTTP route.
- No new dependency.
- No change to borrow or returnLoan behavior.
- No new source file.

## Behavior
- Add `countForBorrower(borrower)` in `src/loans.js`.
- Count loans where `returned === false` and `borrower` is strictly equal to the argument.
- Names are already trimmed inside `borrow`. This function does not trim again and does not call `borrow`.
- `countForBorrower("Asha")` is `0` when Asha has no active loan.
- After a successful `borrow("b1", "Asha")`, `countForBorrower("Asha")` is `1`.
- After `returnLoan("b1", "Asha")`, the count is `0` again.
- A second active loan of `b1` (the book has two copies) makes the count `2`.

## Files
- May edit: `src/loans.js`, `test/loans.test.js`, `CHANGELOG.md`
- Must not edit: `src/server.js`, `src/books.js`, `package.json`

## Tests
- Add tests in `test/loans.test.js` using `node:test`.
- Cover the `0`, `1`, and returned-loan cases above.
- Existing tests stay as they are and still pass.

## Done
- `npm test` passes, including the new cases.
- Diff touches only the files listed.
- `package.json` has no dependencies.
- One changelog line under `## Unreleased` describes the behavior, not the process.
```

That is enough to implement without guessing. It is not a design novel. You are not expected to invent this shape under pressure; you are expected to reuse it.

### Wishes wearing headings

```markdown
## Behavior
Make counting nice and intuitive for users.
```

The heading is present. The decision is not. Replace it with a number: given this history, the return value is this.

### Implementation leaking in

```markdown
## Behavior
Loop with a for-loop, not filter, for speed. Extract a helper class LoanBook.
```

Those are implementation orders. They belong in a prompt only if you truly require them. For shelf, `.filter` already exists in the file, and a class fights the style rule. A spec that demands a class will force a style violation and then fail review. Specify **observable** behavior. Leave the line-by-line approach to the implementer unless the approach is itself a constraint ("no new dependencies" is a constraint; "use a for-loop for speed" on a three-item array is a preference).

Non-goals can mention implementation when the temptation is a known agent habit: "do not add lodash." That is a constraint on the diff, which is observable.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Goal | What becomes possible | Not a slogan |
| Non-goal | An explicit refusal of a likely extra | Not a negative attitude |
| Behavior | Rules plus input/output examples | Not the algorithm |
| Done | The evidence that ends the turn | Not the agent's adjective "done" |

## Worked example

**Bad section:**

```markdown
## Files
Update the code as needed.
```

**Why it fails:** "As needed" is permission to create `src/services/LoanService.js`.

**Replacement:** the file list from the spec above.

**Bad done section:**

```markdown
## Done
The assistant says it succeeded.
```

**Replacement:** `npm test` output shows 0 failures, and `git diff --stat` lists only the allowed files.

You already know `git diff`. `--stat` is the short file list. The full diff still gets read before you accept (U05, U21).

## Common errors

### Non-goals left empty

**What you see:** "None." Then the diff adds `GET /count` because the goal said "callers," and the agent assumed HTTP callers.

**What it means:** The likely extra was not refused.

**What to do:** If the change is a plain function, say "no HTTP change." If you have seen the agent add helpers, say "no new files."

### Examples that skip the failure path

**What you see:** Only the happy count `1`. The agent returns `-1` for an unknown borrower, or throws.

**What it means:** Unspecified cases are invention space.

**What to do:** State the zero case and one existing-error interaction (the return-loan case). You do not need every permutation. You need the ones a guess would get wrong.

## Checkpoints

1. Name the six headings.
2. Why is "make it intuitive" not a behavior section?
3. What does a non-goal do that `AGENTS.md` might already say, and why say it again?

## Practice exercises

### P1 — Fill a blank

Copy the shape with the headings only. Fill it for this goal: "`returnLoan` of an unknown loan already returns `no-active-loan`; add a test that documents that. Do not change production code unless the test proves it is wrong." The non-goals matter.

### P2 — Spot the leak

Underline the implementation orders in:

```text
Use a Map for speed, add Express route /api/v2/count, and make the UI pop.
```

Rewrite as observable behavior or as non-goals. Drop the UI. Shelf has no UI.

### P3 — Done line

Write the Done section, three bullets, for the count spec. Include the test command and the file list.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- You do not write the prompt yet (U16).
- You do not implement the function.
- Rough stakeholder notes are U15. This unit uses a clear goal on purpose.

## Next unit

**U14 — Examples and non-goals.**
