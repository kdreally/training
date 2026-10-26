# U13 Assessor notes

Assessor-only.

## Model spec (sketch)

Goal: second active loan of the same book by the same borrower is rejected with `already-borrowed`.

Non-goals: no HTTP, no dependencies, no new error names besides `already-borrowed`, do not change `no-copies` / `unknown-book` / `borrower-required`.

Behavior examples:

- `borrow("b1","Asha")` then `borrow("b1","Asha")` → `{ ok: false, error: "already-borrowed" }`.
- `borrow("b1","Asha")` then `borrow("b1","Ben")` → second is `ok: true` (two copies).
- `borrow("b2","Asha")` then `borrow("b2","Ben")` → still `no-copies`.
- After Asha returns `b1`, she may borrow it again.

Files: `src/loans.js`, `test/loans.test.js`, `CHANGELOG.md`. Not `server.js`, not `package.json`.

Tests: new cases plus existing suite stays green.

Done: `npm test` pass, diff file list matches, no dependency.

Order of checks inside `borrow` can vary (already-borrowed vs no-copies). If both could apply, the spec should say which wins. If the learner leaves that ambiguous, note it and award behavior 4/6 or 5/6 rather than failing the unit. A thoughtful spec that picks "already-borrowed is checked first when the same borrower already holds the book" is complete.

## Common weak submissions

- Behavior says "reject duplicates" with no error string and no example call.
- Non-goals empty.
- Implementation section prescribing a class.

## Partial credit

A spec that also trims the borrower again is acceptable if it says so and notes that stored names are already trimmed.
