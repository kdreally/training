# U26 Assignment — Reproduce, then the smallest fix

Submit `U26-YourName`.

## The bug

In a branch someone swapped the fields inside `returnLoan`'s `find`, as in the U26 README snippet. Callers still use `returnLoan(bookId, borrower)`.

## Files

### 1. `reproduction.test.js`

A failing test (it would fail on the broken snippet) using `node:test` and `node:assert/strict`. Assert `ok: true` and an empty active list. Do not "fix" the call order to match the bug.

### 2. `prompts/fix-return.txt`

A fix prompt: smallest change, allowed files, do not edit expected values, do not add files or dependencies, do not redesign, `npm test`, stop if another test fails.

### 3. `answers.md`

1. Write the corrected comparison line only.
2. Reject this fix in one paragraph: the agent changes the test to `returnLoan("Asha", "b1")` and says the suite is green.
3. A ticket says "bug: users want overdue loans." Which workflow is it really, and what would you ask before any prompt?

### 4. `checklist.md`

```markdown
- [ ] I read the U26 README.
- [ ] My reproduction would fail on the swapped comparison.
- [ ] I read the rubric.
```

## Definition of done

The prompt cannot be satisfied by a new framework or by editing the assertion to swap arguments.

## Submission format

```text
U26-YourName/
  reproduction.test.js
  prompts/fix-return.txt
  answers.md
  checklist.md
```
