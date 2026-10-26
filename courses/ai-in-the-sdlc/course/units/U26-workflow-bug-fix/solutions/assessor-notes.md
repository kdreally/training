# U26 Assessor notes

Assessor-only.

## Test

```javascript
test("returnLoan finds the loan by book id and borrower", () => {
  resetLoans();
  borrow("b1", "Asha");
  assert.equal(returnLoan("b1", "Asha").ok, true);
  assert.deepEqual(activeLoans(), []);
});
```

Imports included. A test that calls `returnLoan("Asha","b1")` reproduces nothing; it matches the bug. Score the test row low.

## Prompt

Names the test. Allows `src/loans.js`. Forbids assertion edits, new files, packages, renames, borrow changes. `npm test`. Stop on unrelated failures.

## Q1

`(item) => item.bookId === bookId && item.borrower === borrower`

## Q2

The green suite calls the function backwards. Production callers still pass book then borrower. Restore the test. Do not accept.

## Q3

Overdue is a new behavior (feature) or a change if due dates already existed. Shelf has no due dates, so it is a feature with a spec. Ask what overdue means before prompting.

## Common weak submissions

- Prompt includes the full corrected function and also says "redesign for safety."
- Reproduction has no `borrow` first, so it expects `no-active-loan` and would pass on the bug too. That test does not reproduce. Cap the test row at 2/6.

## Partial credit

Explaining the swap in comments inside the test is fine.
