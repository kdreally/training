# U10 Assessor notes

Assessor-only.

## Model file

The README's worked `AGENTS.md` is the model. Learner files may reorder bullets and change wording.

## Q1 examples

- Dependency bullet catches `import _ from "lodash"` plus a `package.json` change.
- File fence catches new `src/utils/time.js`.
- Test bullet catches deleting the `no-copies` test.
- Database bullet catches `src/db.js` with a postgres URL.
- Changelog bullet catches a diary of "read loans.js."

## Q2

The map (`src/loans.js`, `npm test`) would make an agent invent a Node tree in a Python project. Keep the categories: no surprise dependencies, no production database, no secrets, tests with the project's runner, stop on conflict, small changelog.

## Q3

"Make loans nicer" names no files and no behavior. The agent should stop and ask, or at most describe a conflict. It should not rewrite `loans.js`. Accept any answer that refuses a drive-by rewrite.

## Common weak submissions

- File includes "current task: add overdue loans with moment."
- Tests described as "in tests/" (wrong folder).
- Changelog says log every action.

## Partial credit

If the file is excellent and Q1 is thin, send it back for Q1 only. The file is the must-have artifact; the explanations prove it was not a blind paste.
