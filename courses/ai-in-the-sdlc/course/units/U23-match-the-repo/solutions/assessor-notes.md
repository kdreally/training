# U23 Assessor notes

Assessor-only.

## Mismatches

- Class instead of plain function.
- `throw` instead of `{ ok: false, error: "borrower-required" }`.
- Error text `"Borrower required"` is a different contract even aside from throw.
- `String(name)` changes comparison.
- `loans` exported.
- `borrow` rewritten (drive-by consistency).
- Tests moved to `expect` / another library's style.
- Function named `count` on a class, not `countForBorrower`.

Any five solid rows. Decision: restore.

## Retry

Plain `countForBorrower`, no class, no throw, do not export `loans`, do not edit `borrow`, tests stay `node:test` and `node:assert/strict`, `===`, `npm test`, stop if existing assertions change.

## Q1

Tests were rewritten to expect throws, so the runner is green while callers that check `error: "borrower-required"` break. Also `expect` may be an undeclared import; if they added a dependency for it, that is another fail. The lesson text says they imported a different assertion style. Either reading is a reject.

## Q2

A class is legitimate only after a spec says so and the file fence includes that migration. Not as a side effect of a count.

## Common weak submissions

- "The class is cleaner, accept."
- Retry prompt says "match the repo" with no list.

## Partial credit

Calling `String(name)` a small kindness: deduct one table point if they approve it. It changes `"1"` versus `1` if a non-string arrived. Shelf passes strings. It is still a behavior change to flag.
