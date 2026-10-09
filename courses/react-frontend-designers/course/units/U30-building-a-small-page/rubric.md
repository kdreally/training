# U30 Rubric

Visible to learners. Total **30 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Page composes 3–6 components, each with one clear job | 4 | Yes | project files |
| One stateful interaction driven by a control; state lifted to the correct parent (U26) | 5 | Yes | code + `answers.md` Q3 |
| List rendered with `map` and a stable, unique `key` | 3 | Yes | code |
| At least one conditional/empty state | 2 | Yes | code |
| Design tokens in one file and referenced throughout (U22) | 3 | Yes | token file + CSS |
| Responsive layout reflows to one column at a narrow width (U23) | 4 | Yes | CSS + `answers.md` Q6 |
| Accessible markup: labeled input, heading structure, `alt`, visible focus (U24) | 4 | Yes | code + `answers.md` Q7 |
| One CSS transition respecting `prefers-reduced-motion` (U29) | 3 | Yes | CSS |
| Page plan and build order explained concretely | 2 | No | `answers.md` Q1 + Q2 |
| Predict-then-run is concrete and compares prediction to reality | 1 | No | `answers.md` Q8 |
| Error-reading: a real error/warning quoted and decoded | 2 | No | `answers.md` Q9 |
| Design bridge compares staged building to a staged design review | 1 | No | `answers.md` Q10 |

### Partial credit notes (assessors)

- The central outcome is **integration**: a page where components, props, state, and lists work together. A beautiful page with duplicated state still fails the state-lifting criterion.
- Derived data: if the filtered list is stored in state and synced with `useEffect`, award partial and note it. It often works but creates a second source of truth.
- Responsive: check it actually reflows. A `repeat(3, 1fr)` that squeezes three columns onto a phone-width screen is not responsive; it should drop to one.
- Accessibility: focus visibility is a must-have in this unit. Missing focus styles are a real defect, not a nicety.
- `key={index}`: the page may work, but the P5 exercise explains the drift. Treat index keys in a *filtered* list as a partial miss.
- Error-reading and predict-then-run reward honest process. Full credit requires a genuine message or prediction, not a generic statement.
- Do not penalize imperfect English. Do penalize copied lesson text with no personalization on Q1, Q2, and Q10.

### What to look for (assessor pointer)

Read the page's code top-down as a story: data → state in one parent → filter (derived) → grid maps → card displays. If you can follow the data without hunting, the integration is sound.
