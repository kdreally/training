# U28 Rubric

Visible to learners. Total **24 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Two custom hooks, each named `use…` and calling at least one React hook | 5 | Yes | submitted hook files |
| Two or more components use the hooks; values are independent per caller | 4 | Yes | components + `answers.md` Q4 |
| Both rules of hooks stated correctly in own words | 3 | Yes | `answers.md` Q3 |
| Explains that a hook shares behavior, not data, and shows it | 3 | Yes | `answers.md` Q1 + Q4 |
| Clear before/after refactor showing repetition removed | 3 | Yes | `answers.md` Q2 |
| Debug snippet correctly diagnosed (conditional hook) and fixed | 2 | No | `answers.md` Q6 |
| Error-reading: a real error quoted and decoded | 2 | No | `answers.md` Q7 |
| Predict-then-run is concrete and compares prediction to reality | 1 | No | `answers.md` Q5 |
| Design bridge connects a named reusable behavior across design and code | 1 | No | `answers.md` Q8 |

### Partial credit notes (assessors)

- The central skill is **independence**: two callers must get their own value. If a learner shares one value through a module-level variable, award the hook points but 0–1 on independence, and note it clearly (this is also a U26/U27 confusion).
- Q1: full credit requires the "behavior, not data" idea plus a plain explanation. A definition that says "a function starting with use" alone gets partial.
- Q3: both rules needed at top-level-only and components/hooks-only. The "why" (hook order = identity) is the part many skip; partial if the rules are right but the reason is missing.
- Q6: the bug is `useState` inside an `if` (conditional hook). The corrected hook must call both `useState` calls unconditionally at the top and use the value conditionally. Accept returning both values or an object.
- Q7: any genuine error message, decoded. The classic is `React Hook "useState" is called conditionally`. Full credit if they connect the message to a rule.
- Do not penalize imperfect English. Do penalize copied lesson text with no personalization on Q1 and Q8.

### What to look for (assessor pointer)

Strongest evidence: a learner who moved repeated logic into a hook **and** can explain why two components calling it do not share data. Watch for "hooks are global state" — that is the misconception this unit must correct.
