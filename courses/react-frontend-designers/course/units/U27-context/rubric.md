# U27 Rubric

Visible to learners. Total **24 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Working app: one control changes a value read by three or more components | 5 | Yes | submitted project files |
| At least one reader is nested two or more levels below the provider (real drilling avoided) | 3 | Yes | `answers.md` Q2 + code |
| `createContext`, `Provider`, and `useContext` all used correctly and named | 4 | Yes | `answers.md` Q3 + code |
| State lives in a component's `useState`; context distributes it rather than owning it | 3 | Yes | `answers.md` Q4 + code |
| Explains prop drilling in own words, including when it is worth fixing | 3 | Yes | `answers.md` Q1 |
| Two concrete "when NOT to use context" situations with reasons | 3 | Yes | `answers.md` Q6 |
| Predict-then-run is concrete and compares prediction to reality | 1 | No | `answers.md` Q5 |
| Debug snippet correctly diagnosed and fixed | 1 | No | `answers.md` Q7 |
| Design bridge connects a file/global design property to scoping a provider | 1 | No | `answers.md` Q8 |

### Partial credit notes (assessors)

- Q1: full credit requires both halves — what drilling is *and* the threshold (many readers / deep / region-wide). A definition only, with no "when it hurts," gets partial.
- Q3/Q4: watch for the common misconception that context "holds" the state. It holds *a value you give it*; the state lives in a component. If a learner says the context is the source of truth, this is the key misreading to correct.
- Q6: this question protects against overuse. Award full only for concrete, sensible cases (one or two components, parent-child, a component meant to be reusable elsewhere). Vague "when it's simpler" gets partial. Zero if they claim context is always better.
- Q7: the bug is the provider's `value={{ theme }}` omits `toggleTheme`, so the button's `onClick` is `undefined`. A fix adds `toggleTheme` to the value object (or provides it another way). Accept any correct fix.
- Q5: removing the provider should show the default value, not a crash, if the default is shaped correctly. This is the point of that exercise.
- Do not penalize imperfect English. Do penalize copied lesson text with no personalization on Q1, Q6, and Q8.

### What to look for (assessor pointer)

Two central outcomes: (1) a real multi-level reader that would otherwise need drilling, and (2) evidence the learner understands **when not** to use context. A working theme alone, with no sign of restraint, is incomplete.
