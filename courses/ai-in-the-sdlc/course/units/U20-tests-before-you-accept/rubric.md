# U20 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Case-sensitive count test encodes both 1 and 0 | 5 | Yes | `test-notes.md` |
| already-borrowed test also shows Ben can borrow the second copy of `b1` | 5 | Yes | `test-notes.md` |
| Existing contract asserted with the real error string, not only `ok: false` | 4 | Yes | `test-notes.md` |
| Weak green test rejected in prose; baseline prediction and real summary (or a decoded blocker) | 4 | Yes | `answers.md` |
| `unavailable` change is a rejected weaken, with restore | 2 | No | `answers.md` Q3 |

### Partial credit

- Ben's loan missing: score the already-borrowed row 3/5 if Asha's second borrow is exact.
- Tests that import a framework: cap the whole test file at 8/14 for the three test rows.

### Must-have vs nice-to-have

Q3 is nice-to-have. Missing must-have caps at 15/20.
