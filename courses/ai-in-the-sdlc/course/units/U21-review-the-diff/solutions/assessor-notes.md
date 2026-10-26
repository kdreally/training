# U21 Assessor notes

Assessor-only.

## Review

1. Stat: `package.json`, `src/loans.js`, `CHANGELOG.md`. `package.json` not allowed. No test file.
2. Dependencies: lodash import and manifest entry.
3. Tests: none added. Old tests not shown; the new behavior is unproven.
4. Behavior: `==`, lodash, rewrites `activeLoans`.
5. Leftovers: `console.log`, process changelog.
Decision: restore.

## Q1

The function body calls `_.filter`. Keeping the function without the import breaks the file. A follow-up in a dirty tree often "fixes" that by reinstalling lodash. Restore all, retry clean.

## Q2

Without install, Node throws cannot find module `lodash`. After install, tests might stay green because no new assertion exists and old tests still pass if `_.filter` matches `.filter` for this case. Green would not change the decision: forbidden dependency, drive-by, no oracle, `==`.

## Q3

`git diff --stat` and `git diff`. The pasted summary can omit files.

## Common weak submissions

- Accepts because the function "basically works."
- Review starts with praise for the algorithm.
- Partial keep of `loans.js`.

## Partial credit

A restore decision that cites only package.json and nothing else can still pass the decision row and miss the drive-by row. Score each row separately.
