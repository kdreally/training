# U15 Assessor notes

Assessor-only.

## Model choices

- `returnAll(borrower)` in `src/loans.js`.
- Returns `{ ok: true, loans }` for the loans it marked returned.
- Empty → `{ ok: true, loans: [] }` as a labeled default (the other choice, an error, is also fine if labeled and exampled).
- Ben's loan remains when Asha returns all.
- No database, no library, no framework rewrite.
- HTTP: default none. If they specify `POST /returns` in plain `node:http` with examples, accept it. Express is still a fail.
- Not a stakeholder question: file path, test runner, whether to import lodash.

## Blocking

The note says "you decide" on the empty case, so a spec with no open questions can be ready. Award full "ready" credit when the default is labeled. If they leave the empty case as an open question and say "not ready to implement," that is also full credit for the ready-or-blocked row. Both are honest. Implementing-while-blocked in the spec's Done section is not.

## Common weak submissions

- "Talk to the database" copied into the goal because the note asked.
- Modern API as "rewrite server.js in Express."
- No example with two borrowers.

## Partial credit

A learner who asks the stakeholder "error or empty?" and blocks implementation is demonstrating the unit, not stalling. Do not mark them down relative to a learner who picked a default.
