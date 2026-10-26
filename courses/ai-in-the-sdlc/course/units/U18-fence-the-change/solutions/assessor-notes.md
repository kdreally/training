# U18 Assessor notes

Assessor-only.

## Model prompt

Allowed: `src/loans.js`, `test/loans.test.js`, `CHANGELOG.md`. No other files. No new files.

No packages. Name date-fns, dayjs, moment, luxon or a similar set. No `Date.now` / no reading the clock.

Behavior: `no-copies` and `borrower-required` (or `unknown-book`) unchanged. Do not edit existing assertions except to add tests.

Do not edit `src/server.js`. `npm test`. Stop on failure without weakening tests.

## Q1

A deny list of one file still allows creating `src/services/LoanService.js`. A closed allow list does not.

## Q2

The typo is in `server.js`, so the file must be allowed. Behavior fence: `GET /loans` still returns 200 and `{ loans }` for the in-memory list; no new routes; no Express. Allow list is `src/server.js` plus a test file if they add a test. Accept `test/server.test.js` only if they say they are adding it on purpose. There is no server test in the baseline; creating one is a new file and should be named.

## Common weak submissions

- "Allowed: src/". That is a directory grant, and `src/services` fits inside it. Cap the allow-list row at 3/5 unless they also say no new files.
- Date fence says "use moment, it is standard."

## Partial credit

Naming only one date library plus "or similar" is enough for the names row if the generic ban is present.
