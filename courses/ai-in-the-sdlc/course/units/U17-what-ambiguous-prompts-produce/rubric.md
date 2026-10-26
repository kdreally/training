# U17 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| At least eight inventions, each with evidence and an open decision | 8 | Yes | `annotation.md` |
| Deleted tests and a behavior change (case-folding, response shape, or borrow rewritten) are both present | 4 | Yes | table |
| Green tests do not equal accept; explanation mentions deleted or replaced assertions | 4 | Yes | Q3 |
| Fenced prompt would reject the fixture in multiple named ways and has stop/verify | 4 | Yes | `prompts/count-fenced.txt` |

### Partial credit

- Inventions: 1 point each up to 8. Two inventions that are the same package counted twice score once.
- Prompt: 2/4 if it bans lodash but still allows a new route or omits tests.

### Must-have vs nice-to-have

All rows must-have. A miss caps at 15/20.
