# U23 — Match the repo

**Phase 5 — Making the code correct**

## Where you are

Fences stop new packages and new files. Generations still drift in a subtler way: the code runs, the files are allowed, and the **style of the solution** is alien to the repo. A class hierarchy inside `loans.js`, a new error shape, a renamed function "for clarity." This unit trains you to treat the existing file as the pattern the change must join.

## What you will be able to do

- Compare a generation to its neighbor functions and list the mismatches.
- Write a style fence that cites file-local patterns: result objects, `===`, ESM, no classes.
- Reject a drive-by "cleanup" that changes behavior under the name of consistency.

## What you need already

- **U21**, **U22**.

## Time and energy

About **45–70 minutes**.

## Why this exists

Reviewers are generous toward code that looks like the file around it, and rightly so: matching code is easier to maintain and easier to see as a small change. Agents often "upgrade" a file to a pattern from a tutorial. The upgrade is a second project hiding in your ticket. Matching the repo is a correctness practice, not a matter of taste. A new error shape breaks callers. A class split breaks imports. Those are behavior changes wearing a style hat.

## Plain-language teaching

### What "match" means on shelf

Open `src/loans.js` and list the patterns that are already decisions:

- ESM `import` / `export`.
- Plain functions, not classes.
- Module-level `loans` array.
- Failure: `{ ok: false, error: "kebab-case" }`.
- Success: `{ ok: true, loan }`.
- Comparisons with `===`.
- No logging.
- Tests in `test/loans.test.js` call the functions directly and use `node:assert/strict`.

A generation matches when a new function could sit beside `returnLoan` without a comment explaining why it looks different.

### A mismatched generation

Task: `countForBorrower`. Files allowed: `src/loans.js` and the test file. No new package. This one obeys the file fence and still fails the match:

```javascript
export class LoanCounter {
  constructor(store) {
    this.store = store;
  }

  count(name) {
    if (!name) throw new Error("Borrower required");
    return this.store.filter((loan) => loan.borrower === name && !loan.returned)
      .length;
  }
}
```

And the test constructs `new LoanCounter(loans)`, except `loans` is not exported. So the generation also exports the array "to make it testable."

Mismatches:

| Spot | File's pattern | Generation |
|------|----------------|------------|
| Shape | Plain function | Class |
| Failure | `{ ok: false, error }` | `throw` |
| Error text | `borrower-required` | `"Borrower required"` |
| Privacy of state | `loans` is not exported | Export added so the class can be fed |
| API | Call `countForBorrower("Asha")` | Call `new LoanCounter(...).count` |

Tests might pass. The repo got a second style and a wider export. Reject, restore, tighten with: "Plain function like `returnLoan`. Do not throw. Do not export `loans`. Do not add a class."

### Drive-by consistency

Sometimes the agent changes the **old** code to match the new pattern instead of the reverse:

```diff
-  if (!borrower || borrower.trim() === "") {
-    return { ok: false, error: "borrower-required" };
-  }
+  if (!borrower || borrower.trim() === "") {
+    throw new Error("Borrower required");
+  }
```

The changelog says "made error handling consistent." It made the file consistent with the tutorial, not with the tests. Every existing assertion on `borrower-required` fails, unless the tests were weakened in the same turn. This is why you read test diffs and neighbor diffs, not only the new function.

### How to write the match into a prompt

```text
Match src/loans.js:
- export a plain function countForBorrower
- do not add a class
- do not throw
- do not export the loans array
- do not change borrow or returnLoan
```

That is Pattern 2 from U19, made specific after you have seen the file. "Match the repo" without a list is a proverb. The list is the practice.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Neighbor pattern | How the surrounding file already behaves | Not a suggestion |
| Alien style | A working solution in a pattern the file does not use | Not "more modern," automatically |
| Drive-by consistency | Rewriting old code so the new pattern looks normal | Often labeled cleanup |
| Export widening | Making private module state public for a new design | Breaks the boundary |

## Worked example

Use the class above. Decision: restore. Tightening lines are the four "do not" bullets. Retry once. If the second diff throws again, the spec's Done section should say "no throw" explicitly, and you stop retrying until it does (U22 ceiling).

A matching version:

```javascript
export function countForBorrower(borrower) {
  return activeLoans().filter((loan) => loan.borrower === borrower).length;
}
```

It uses `activeLoans`, `filter`, `===`, a plain export, and no new failure mode. Blank names count zero, which you should have decided in the spec. If you wanted a thrown error, you would be choosing the alien style. Do not let the generation choose it for you.

## Common errors

### Keeping the class because it is "cleaner"

**What you see:** The review praises encapsulation.

**What it means:** A style preference overruled the file and the tests' calling convention.

**What to do:** Encapsulation can be a spec. It is not a side effect of a count function. Reject.

### Matching a bug

**What you see:** The file has a known bug. The prompt says "match the file," so the agent copies the bug into the new function.

**What it means:** Match was applied to the defect, not to the house style.

**What to do:** The spec says the new behavior. The neighbor citation names the patterns (result objects, ESM), not "copy the buggy condition." Bug fixes are U26. They do not ride inside "match."

## Checkpoints

1. Name three patterns a new shelf function must match.
2. Why is `throw new Error("Borrower required")` a contract change?
3. What is drive-by consistency?

## Practice exercises

### P1 — Table

Make a mismatch table for the class example. At least four rows.

### P2 — Fence

Write the match fence you would add before a retry.

### P3 — Neighbor good

Write the matching `countForBorrower` in five lines or fewer, using `activeLoans`. No class, no throw.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No requirement to hate classes in every codebase. On shelf, the file is the authority.
- Life-cycle workflows start at U24. You now have the tools those workflows use.

## Next unit

**U24 — Workflow: new feature.**
