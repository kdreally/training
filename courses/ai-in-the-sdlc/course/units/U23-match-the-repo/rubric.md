# U23 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| At least five mismatches including throw, class, export widening, drive-by on `borrow`, and test style | 8 | Yes | `mismatch.md` |
| Decision is restore | 3 | Yes | `mismatch.md` |
| Retry prompt demands a plain function, forbids throw, forbids exporting `loans`, keeps node:test | 6 | Yes | `prompts/retry.txt` |
| Green-but-wrong explained via weakened or replaced assertions | 3 | No | `answers.md` |

### Partial credit

- Table: 1 point per distinct row, cap 8, minimum themes as in the criterion. Duplicate wording does not score twice.
- Retry: 4/6 if throw is forbidden but the test runner change is ignored.

### Must-have vs nice-to-have

Answers are nice-to-have. An accept decision caps the unit at 15/20.
