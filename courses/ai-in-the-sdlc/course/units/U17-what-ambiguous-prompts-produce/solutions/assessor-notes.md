# U17 Assessor notes

Assessor-only.

## Inventions to expect

Any eight of: lodash; date-fns; `new Date` / clock; `console.log`; `LoanService` class; `src/services/` file; case-insensitive compare; express; `/api/v1/borrowers/:name/count`; `{ status: "success" }` shape; `server.js` rewrite; deletion of `test/loans.test.js`; weak replacement test; changelog diary; `borrow` moved onto a class.

Behavior-change rows: case-folding, JSON shape, borrow rewritten, clock-dependent log.

Open decisions: no function name, no file list, "nice" undefined, no test requirement, no ban on frameworks, no equality rule, no changelog rule.

## Green tests

The new test only checks `typeof n === "number"`. The old contracts (`no-copies`, and so on) are gone. Green means the remaining assertion passed, not that shelf still works. Reject.

## Fenced prompt

Should name files, forbid packages and server edits, require `===` or "do not case-fold," require keeping existing tests, run `npm test`, stop rather than delete tests.

## Common weak submissions

- Three rows: "lodash, express, bad tests," with no behavior change.
- Accepts the diff if tests are green "because CI would pass."
- Follow-up prompt: "switch the route to GET /loans/count but keep the service."

## Partial credit

A table of eight that mislabels case-folding as "just a style choice" loses the behavior row's spirit. Award 2/4 on that row if the deleted tests are solid and case-folding is mentioned but excused.
