# U28 — Workflow: evaluation

**Phase 6 — Life-cycle workflows**

## Where you are

Evaluation, in this course, is not a leaderboard of models. It is the written moment after a turn when you decide whether the change **met the spec**. Tests and the diff are the evidence. The agent's self-assessment is a claim to verify, not a score.

## What you will be able to do

- Fill an evaluation sheet: each acceptance criterion, pass or fail, evidence.
- Separate "tests passed" from "spec met."
- Record a fail without softening it into a follow-up feature.

## What you need already

- **U21** (review) and **U24** (a spec's Done section).

## Time and energy

About **50–75 minutes**.

## Why this exists

Teams say "the AI did pretty well" and merge. "Pretty well" is not a result you can defend in a week, when a borrower name matches case-insensitively and nobody remembers that the spec forbade it. An evaluation sheet is a spec turned into yes/no rows. It is also how you grade an agent over time without mythology: count how often a fence failed, then tighten the fence. You are not grading the model's soul.

## Plain-language teaching

### The sheet

One row per criterion from the spec's examples, non-goals, files, and tests.

```text
Criterion | Result | Evidence
----------|--------|----------
countForBorrower("Asha") is 1 after borrow b1 | Pass | test name, npm test fail 0
countForBorrower("asha") is 0 | Fail | no assertion; implementation lowercases
No new dependency | Fail | package.json adds lodash
Files only loans.js, test, CHANGELOG | Fail | src/services/LoanService.js
Old suite present | Fail | test/loans.test.js deleted
Changelog is one behavior line | Fail | four process lines
```

Overall: **fail**. A single failed non-goal fails the turn. You do not average them into 70 percent and merge. This is not a test score at school. One forbidden dependency is enough, which you already practiced. The sheet makes the "enough" visible to someone who did not watch the session.

### Evidence is a pointer

"Looks good" is not evidence. Evidence is:

- a test name and the runner summary you produced yourself, or
- a path and a quoted line in the diff, or
- a file that should have changed and did not.

If you cannot point, the row stays fail or "not checked." Do not mark pass from the report.

### Pass on tests, fail on spec

```text
npm test: fail 0
```

and the only new test is `typeof count === "number"`.

The test row can say "runner green." The spec row says fail, because the case-sensitive example has no assertion. Overall fail. U20 prepared you for this. Evaluation is where you write it down so the merge conversation has a document.

### What you do with a failed sheet

You do not prompt "fix the failed rows" on the dirty tree if the failures include extra files or packages. You restore (U22), then retry with fences taken from the failed rows. The sheet is the tighten list.

If every row passes, you accept and you keep the sheet with the change (in the ticket or the PR description). Future you should not need the transcript.

### Evaluating the standing rules

Add two rows that are easy to forget because they are not in the feature spec:

- `AGENTS.md` itself was not rewritten to include the ticket.
- No secret appeared in the diff.

A generation that "helpfully" updates policy with "always use lodash now" fails evaluation even if the function is correct.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Evaluation | Pass/fail of this change against the spec, with evidence | Not a model benchmark |
| Criterion | One row: a behavior, a non-goal, or a file rule | Not a vibe |
| Overall fail | Any must-have row failed | Not an average |
| Not checked | You did not look | Not a pass |

## Worked example

Use the sheet in the teaching section as the worked example for the U17 count generation. Overall fail. Next action: restore, not "keep the service layer and add one more test."

A passing sheet for a faithful count change would quote:

- test names for `1` and for `"asha"` → `0`,
- `git diff --stat` showing only the three allowed files,
- `package.json` absent from the stat,
- one changelog line,
- `npm test` summary with the old tests still in the count (more than the baseline of 6, not fewer).

## Common errors

### Grading the agent

**What you see:** "7/10, the structure was elegant."

**What it means:** Elegance replaced a failed row.

**What to do:** The sheet has no elegance row unless the spec had a match-the-repo criterion. If it did, score that row pass/fail with a quoted class or a quoted plain function. Still no 7/10.

### All passes, no pointers

**What you see:** Every row says pass. The evidence column says "agent said so."

**What it means:** The report was copied into the sheet.

**What to do:** Mark those rows not checked, then look at the diff. Not checked is more honest than a borrowed pass.

## Checkpoints

1. What is evaluation in this course?
2. Can a green suite fail the evaluation?
3. What do you do when a dependency row fails?

## Practice exercises

### P1 — Rows

Turn the `hasActiveLoan` spec from U24 (or the assignment's behavior if you skipped ahead) into four criterion rows with the result left blank. You are practicing the shape.

### P2 — Overall

Given one fail on "no HTTP" and four passes, what is the overall result? What is the next action?

### P3 — Evidence

Rewrite "Pass — seems fine" for a changelog row into a pass or fail that quotes a line.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No benchmark dataset, no model comparison, no "evaluate the LLM."
- The capstone asks you to build a sheet for a change you specify yourself.

## Next unit

**U29 — Capstone: one change end to end.**
