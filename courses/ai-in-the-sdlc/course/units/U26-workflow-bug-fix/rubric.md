# U26 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Reproduction calls `returnLoan("b1", "Asha")` after borrowing that pair and expects `ok: true` | 6 | Yes | test |
| Prompt demands the smallest change and forbids new files, dependencies, and assertion edits | 6 | Yes | prompt |
| Corrected line compares `bookId` to `bookId` and `borrower` to `borrower` | 3 | Yes | `answers.md` Q1 |
| Swapped test call is rejected as hiding the bug | 3 | Yes | `answers.md` Q2 |
| Overdue ticket classified as a feature or change request, not a bug fix | 2 | No | `answers.md` Q3 |

### Partial credit

- Test expects only `ok: true` and skips the active-list check: 5/6 is fair.
- Prompt says "smallest" but allows a helper file: cap the prompt row at 3/6.

### Must-have vs nice-to-have

Q3 is nice-to-have. Missing must-have caps at 15/20.
