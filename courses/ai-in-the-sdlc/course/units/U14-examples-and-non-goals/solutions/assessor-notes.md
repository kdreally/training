# U14 Assessor notes

Assessor-only.

## Model spec

Same behavior as the count spec in U13's README. Examples must include a numeric 0 and a numeric 1. A returned loan dropping the count is the best edge. Non-goals should kill the loose note's "API if easy" and "dates later" (no dates in this change) plus lodash / new file / no fuzzy name match.

Files: `src/loans.js`, `test/loans.test.js`, `CHANGELOG.md`. Not `server.js`.

## Bad example the learner might show

`borrow("b9", "Asha")` succeeds — impossible, book does not exist. Replacement uses `b1`.

## Contradiction check

Goal says no HTTP; files must not list `server.js` as editable. If both slip in, Q-style answers should notice. If the spec contradicts itself and the learner says "no contradiction," deduct the files/Done points.

## Common weak submissions

- Examples only in English: "when they have a book, it counts it."
- Non-goals copied as "do not over-engineer" four times with synonyms.
- API added because the note said "maybe." The assignment is to refuse that maybe.

## Partial credit

Including a fourth example about two copies is a strength, not scope creep, as long as HTTP stays out.
