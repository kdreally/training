# U27 Assessor notes

Assessor-only.

## Prompt

Includes the assertion mismatch (got `ok: true` with borrower `""`, expected `borrower-required`). Asks to quote the condition and give one hypothesis. Does not edit, does not add packages, does not change the test.

## Q1

Proves: for input `"   "`, the function returned a successful loan with borrower `""` (trimmed). Six other tests passed.

Does not prove: which token is wrong, that trim is the enemy, or that the test should change. The cause is only confirmed after reading the branch that returns `ok: true`.

## Q2

Confirmed. The blank branch returns success. Switch to U26. Smallest fix: `return { ok: false, error: "borrower-required" };` and do not push a loan. Leave the trim check in place.

## Q3

Thrash: change test to expect `ok: true`; delete the test; add a validation library; rewrite `borrow` as a class. After a second wrong hypothesis, read the function yourself. Stop prompting rewrites.

## Common weak submissions

- Debug prompt says "fix this stack trace."
- Smallest fix replaces the whole function.
- Hypothesis treated as proven before the quote in Q1. They can speculate; they must label it as not yet proven.

## Partial credit

Noticing that `borrower.trim()` became `""` is good evidence reading. Award full Q1 if that is in "proves."
