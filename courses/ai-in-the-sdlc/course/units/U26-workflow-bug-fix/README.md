# U26 — Workflow: bug fix

**Phase 6 — Life-cycle workflows**

## Where you are

A change request chooses a new correct result. A **bug fix** restores a result the project already claimed. The claim might be a test, a spec, or a sentence in the README. The agent habit to fight is the rewrite: a two-line fix becomes a new service. This unit's extra rule is **smallest change that makes a failing test pass**.

## What you will be able to do

- Write a failing test that reproduces a bug before asking for a fix.
- Prompt for the smallest edit, with a fence that forbids a redesign.
- Reject a "fix" that passes the new test by weakening an old one.

## What you need already

- **U25**, **U20** (oracles), **U22** (restore).

## Time and energy

About **50–80 minutes**.

## Why this exists

Bugs are where agents look most helpful and do the most extra. The failure is local. A local repair is what you want. "While I was here I modernized loans" is a second, unreviewed change request glued to the fix. Reviewers miss the glue when the red test turns green.

## Plain-language teaching

### Reproduce first

A bug report without a failing test is a story. Stories are ambiguous, and you know what ambiguity produces. The workflow:

1. Read the claim the code already makes (existing test or spec).
2. Write a test that fails on today's code and would pass on the claimed behavior.
3. Run it. See the failure. That output is the evidence.
4. Prompt: make this test pass. Do not edit the assertion. Smallest change. No new files. No new dependencies.
5. Review. The new test passes. The old tests still pass. The diff is small.
6. Changelog: one line naming the bug, only if you accept.

If you cannot write a failing test, you do not understand the bug yet. Do not delegate that confusion to the agent. It will pick a definition and "fix" that.

### A bug in a snippet

Shelf's real `returnLoan` compares `bookId` and `borrower` correctly. The following **broken snippet** is the lesson's bug. It is not in `course/examples/shelf` unless you paste it yourself. Do not paste it into the shared example.

```javascript
export function returnLoan(bookId, borrower) {
  const loan = activeLoans().find(
    (item) => item.bookId === borrower && item.borrower === bookId,
  );
  if (!loan) {
    return { ok: false, error: "no-active-loan" };
  }
  loan.returned = true;
  return { ok: true, loan };
}
```

The arguments are swapped in the comparison. `returnLoan("b1", "Asha")` looks for a loan whose book id is `"Asha"`. It returns `no-active-loan` even after `borrow("b1", "Asha")`.

**Reproduction:**

```javascript
test("returnLoan finds the loan by book id and borrower", () => {
  resetLoans();
  borrow("b1", "Asha");
  assert.equal(returnLoan("b1", "Asha").ok, true);
  assert.deepEqual(activeLoans(), []);
});
```

On the broken snippet, this fails. On the real shelf file, it passes. The oracle is the assertion `ok: true`, not a rewrite of the finder into a class.

### Smallest change

The smallest fix is to swap the comparison back:

```javascript
(item) => item.bookId === bookId && item.borrower === borrower
```

A generation that introduces a `Map`, a class, or a fuzzy matcher to "prevent this class of bug" is a change request pretending to be a fix. Restore it unless a human opened that design on purpose.

### Prompt

```text
The test "returnLoan finds the loan by book id and borrower" fails
because the find comparison swaps bookId and borrower.

Make that test pass.
Allowed files: src/loans.js only, plus the test file if the test is not already there.
Do not edit the expected values.
Do not create files. Do not add dependencies. Do not rename returnLoan.
Do not change borrow.
Run npm test. If a different test fails, stop and report it. Do not edit that test.
```

The prompt names the cause once you know it. If you do not know the cause yet, you are in U27 (debugging), not in a fix prompt. Do not guess a cause in the prompt. A wrong guessed cause sends the agent to edit the wrong line with confidence.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Bug | Behavior contradicts a claim the project already made | Not "I wish it did something new" |
| Reproduction | A test that fails before the fix and passes after | Not a screenshot alone |
| Smallest change | The edit that fixes the reproduction and nothing else | Not the most impressive edit |
| Claim | The existing test, spec, or documented result | Not a new product idea |

## Worked example

Broken comparison above. Reproduction test. Prompt. Diff you would accept: two identifiers swapped, nothing else. Diff you would restore: `returnLoan` replaced by an ORM call. There is no database. The standing rules already say so. The bug fix does not suspend them.

Changelog, if accepted:

```markdown
- returnLoan matches bookId and borrower in the correct order.
```

## Common errors

### Fixing the test

**What you see:** The agent changes the test to `returnLoan("Asha", "b1")` so the swapped comparison "works."

**What it means:** The reproduction was edited to fit the bug. Callers still pass `(bookId, borrower)`.

**What to do:** Restore. The stop line in the prompt exists for this. The assertion stays.

### Bundling a feature

**What you see:** The fix diff also adds `already-borrowed`.

**What it means:** Two workflows, one turn.

**What to do:** Restore the feature part, or restore all if the hunks are tangled. Land the bug alone.

## Checkpoints

1. What has to fail before you ask for a fix?
2. What is the smallest fix for the swapped comparison?
3. Why is a guessed cause in the prompt risky?

## Practice exercises

### P1 — Reproduction

Write the test from the README from memory. Include `resetLoans` and the final `activeLoans()` expectation.

### P2 — Judge a diff

The diff adds `src/search.js` with a fuzzy finder and changes `returnLoan` to use it. The new test passes. Accept or restore? Two sentences.

### P3 — Not a bug

"Add a count of loans" is filed as a bug. Say which workflow it belongs to, and why.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- You do not have to break your local shelf file. The snippet is enough.
- Debugging when you do not yet know the line is U27.

## Next unit

**U27 — Workflow: debugging.**
