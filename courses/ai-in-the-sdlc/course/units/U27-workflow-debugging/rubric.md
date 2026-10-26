# U27 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Prompt states the observed `ok: true` / blank borrower fact and asks for a hypothesis plus a quote | 5 | Yes | prompt |
| Prompt forbids edits, new packages, and changing the expected error | 5 | Yes | prompt |
| Proves vs does-not-prove distinguishes evidence from the cause | 4 | Yes | `answers.md` Q1 |
| After the quote, switches to a bug fix; smallest change returns `{ ok: false, error: "borrower-required" }` | 4 | Yes | `answers.md` Q2 |
| Thrash example is concrete; second failure stops the rewrite loop | 2 | No | `answers.md` Q3 |

### Partial credit

- Prompt that asks for a hypothesis but allows "small edits if you are sure": cap the forbid row at 2/5.
- Smallest fix that also trims differently or adds a library: 2/4 on Q2.

### Must-have vs nice-to-have

Q3 is nice-to-have. Missing must-have caps at 15/20.
