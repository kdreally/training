# U20 Assessor notes

Assessor-only.

## Model tests

Case: borrow b1 Asha; count Asha is 1; count asha is 0.

Already: first Asha ok; second Asha `{ ok:false, error:"already-borrowed" }`; Ben's borrow of b1 ok.

Existing: `borrow("b1"," ")` or `"  "` → `borrower-required`, or b2 Asha then Ben → `no-copies`.

Imports from `../src/loans.js`. `resetLoans` in each.

## Q1

The weak test accepts any number, including a case-folded count, a constant `0`, or a count of returned loans. Green only means that one weak assertion held.

## Q2

Unmodified shelf: 6 tests, 6 pass, 0 fail, unless the example was revised. If they ran from the wrong directory, the decoded error can still earn the row at 3/4 when the prediction was 6 and 0.

## Q3

Not acceptance. The spec's string was `no-copies`. Restore the test file and the code from the last good commit. Do not keep "consistency."

## Common weak submissions

- `assert.ok(countForBorrower("Asha") > 0)` which allows case bugs and double counts.
- Ben forbidden to borrow b1, which contradicts two copies.
- No `resetLoans`, so order-dependence. Note it; deduct 1 point on that test if otherwise perfect.

## Partial credit

A test file that is clearly runnable Node, not pseudocode, is the bar. Pseudocode with the right cases can earn half on each test row.
