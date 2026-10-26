# U25 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Spec examples include already-borrowed, Ben sharing `b1`, and `no-copies` for Ben on `b2` | 6 | Yes | spec |
| Conflict case Asha twice on `b2` chooses `already-borrowed` explicitly | 4 | Yes | spec |
| Prompt fences files and forbids editing old error expectations | 4 | Yes | prompt |
| Keep list is concrete calls, not "nothing breaks" | 3 | Yes | `keep.md` |
| Weakened `no-copies` test leads to restore, not a sculpt | 3 | No | `answers.md` |

### Partial credit

- Missing Ben-on-`b1`: score the examples row 4/6 if `no-copies` and `already-borrowed` are both exact.
- Conflict case left as "either error is fine": score that row 0. The unit's point is to choose.

### Must-have vs nice-to-have

The answers row is nice-to-have. Missing must-have caps at 15/20.
