# U18 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Two or more text fields, each a controlled input | 4 | Yes | `ProfileForm.jsx` + running app |
| Each field has its own independent state | 3 | Yes | `ProfileForm.jsx` |
| Live preview stays in sync with typing | 3 | Yes | running app |
| Submit uses `onSubmit` + `preventDefault` and shows values | 3 | Yes | `ProfileForm.jsx` + running app |
| `onSubmit` is on the form; button is `type="submit"` | 1 | Yes | `ProfileForm.jsx` |
| Explains controlled inputs with a comparison | 2 | Yes | `answers.md` Q1 |
| Correctly describes the update loop in order | 3 | Yes | `answers.md` Q2 |
| Explains the consequences of missing `preventDefault` | 2 | Yes | `answers.md` Q4 |
| Error-reading: quotes warning, explains, fixes, states rule | 3 | Yes | `error-reading.md` |
| Predict-then-run completed and honest | 1 | No | `answers.md` Q5 |
| Files named and present correctly | 1 | Yes | submission structure |

*(Total weights to 20 across content; drop the lowest non-must-have if a cohort over-scores.)*

### Partial credit notes (assessors)

- **Fields render and echo but share one state:** award 2/3 for independent state; two fields visibly mirroring each other is a common mistake worth a clear note.
- **Field is read-only (no `onChange`):** award 0/4 for controlled inputs; check whether they hit Error 1 and guide them to the exact warning text.
- **Sample Name in a page reload leaving state blank:** award 0/3 for submit handling; this is the Error 3 experience.
- **Q1:** Full marks for a genuine design comparison (bound text/variable). Pure definition caps at 1/2.
- **Q2:** The order must be substantially correct. Confusing `onChange` with `onClick` caps at 1/3.
- **Error-reading:** The cause is `useState()` with no initial value, producing `undefined` and the warning: `A component is changing an uncontrolled input to be controlled...`. Full marks require quoting it (or close), naming the undefined start, and fixing to `useState("")`. Blaming `preventDefault` is off-target (1/3).
- Do not penalize imperfect English. Penalize copied lesson text with no personalization.
