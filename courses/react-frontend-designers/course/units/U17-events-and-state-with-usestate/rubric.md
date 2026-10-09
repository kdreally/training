# U17 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| `Counter` uses `useState` and updates the screen on click | 4 | Yes | `Counter.jsx` + running app |
| Add, subtract, and reset all work | 3 | Yes | `Counter.jsx` |
| A second piece of state drives a label or behavior | 2 | Yes | `Counter.jsx` |
| Handlers are passed as functions, not called | 2 | Yes | `Counter.jsx` |
| No direct mutation of state anywhere | 2 | Yes | `Counter.jsx` |
| Explains event handlers using a prototype comparison | 2 | Yes | `answers.md` Q1–Q2 |
| Explains why plain variables do not re-render | 3 | Yes | `answers.md` Q3 |
| Predict-then-run completed and honest | 1 | No | `answers.md` Q4 |
| States and demonstrates the no-direct-mutation rule | 2 | Yes | `answers.md` Q5 |
| Error-reading: quotes error, explains, fixes, states rule | 3 | Yes | `error-reading.md` |
| Files named and present correctly | 1 | Yes | submission structure |

### Partial credit notes (assessors)

- **Onclick wired but number never changes:** check for `onClick={fn()}` or direct mutation. Award 0/2 for handlers or 0/2 for mutation as appropriate; explain the specific error.
- **Counter works but only one state variable used:** award 3/2 for the base counter but 0/2 for the second-state line; nudge them to add a toggle or step.
- **Q2:** Full marks require naming what is passed (`handleClick` → the function; `handleClick()` → its return value, usually `undefined`).
- **Q3:** Must mention React re-rendering being triggered by tracked state, and/or the fresh `let` resetting each render. "React needs useState" alone caps at 1/3.
- **Error-reading:** The bug is `onClick={setSeconds(seconds + 1)}` — the setter is called during render, causing an infinite render loop. Vite/React shows: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` Full marks require quoting that (or close), explaining it as calling the setter during render, and fixing to `onClick={() => setSeconds(seconds + 1)}`.
- Do not penalize imperfect English. Penalize copied lesson text with no personalization.
