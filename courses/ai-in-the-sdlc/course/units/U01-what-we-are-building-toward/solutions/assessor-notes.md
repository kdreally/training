# U01 Assessor notes

Assessor-only. Do not link from the learner README.

## Model answer sketch

**Q1:** Standing instructions are project policy loaded every turn, written when the policy is set. A spec defines done for one change, written before code. A prompt asks the agent to implement that spec, written at the start of a turn. Tests check behavior and are written with the change, before acceptance. Evaluation is the human's pass/fail against the spec after the turn, using test output and the diff.

**Q2:** In-memory loans in `src/loans.js`, books in `src/books.js`, tests in `test/loans.test.js` via `node:test`. Failure shape `{ ok: false, error: "..." }`. `GET /loans` only. `package.json` has no dependencies.

**Q3 (examples):** vendor selection; fine-tuning; replacing tests with the agent's summary. Reasons should mention that those topics would make the graded skill unstable or would skip the review habit.

**Q4:** Command `node --version`. Success starts with `v20` or higher. Missing command means the shell cannot find Node, often fixed by installing LTS and opening a new terminal.

## Common weak submissions

- Calls the prompt the spec.
- Describes shelf as a React app or a SQL database.
- Q3 lists "we will not learn to code," which is true of the audience but is not one of the course's deliberate topic fences. Accept it only if the reason is accurate; prefer the fences in the README.
- Q4 prediction written in the past tense after the output ("I predicted it would say v22" under the output). Cap at 2/4.

## Red flags

- Learner believes they cannot continue without a paid agent subscription. Point them at the course home: graded work is files.
