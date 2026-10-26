# U05 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Turn defined with prompt, actions, diff, and human decision | 4 | Yes | Q1 |
| Six steps present; decision is restore (or accept only the two named files **after** dropping server.js, with a method) | 6 | Yes | Q2 |
| Reason cites `src/server.js` or the report's "GET /loans" extra | 3 | Yes | Q2 |
| Dirty-tree answer explains mixed authorship | 4 | Yes | Q3 |
| Prediction of 6 pass / 0 fail on the untouched example; real output or a stated blocker | 3 | No | Q4 |

### Partial credit

- Q2: full marks if they restore everything. Also full marks if they keep `loans.js` and the test **and** explicitly restore `server.js`, and say they re-read those two diffs first. 3/6 if they accept all files because tests passed.

### Must-have vs nice-to-have

Q4 is nice-to-have. A missed must-have caps the grade at 15/20.
