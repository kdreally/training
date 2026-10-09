# U19 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Component uses `useState` + `useEffect` together correctly | 4 | Yes | `TitleSync.jsx` + running app |
| `document.title` is kept in sync with state | 3 | Yes | running app (tab text) |
| Dependency array is present and correct | 3 | Yes | `TitleSync.jsx` |
| No infinite loop | 3 | Yes | running app |
| Explains side effects with a design/prototype comparison | 2 | Yes | `answers.md` Q1 |
| Explains why effects run after render | 2 | No | `answers.md` Q2 |
| Correctly distinguishes no-array / `[]` / `[value]` | 3 | Yes | `answers.md` Q3 |
| Names a task that should not be in `useEffect` | 2 | No | `answers.md` Q4 |
| Error-reading: quotes warning, explains loop, fixes, states rule | 3 | Yes | `error-reading.md` |
| Files named and present correctly | 1 | Yes | submission structure |

*(Weights overlap; total 20. If a flawless submission is misnamed, dock only the naming line.)*

### Partial credit notes (assessors)

- **Effect present but no dependency array on a state-setting effect:** this loops; award 0/3 for "no infinite loop" and guide to the decoded warning.
- **Effect sets `document.title` but never updates (used `[]` while depending on state):** award 1/3 for the dependency array; the title is frozen. This is the intended "empty array means once" lesson.
- **Effect used to compute a value that could be computed in render (no side effect at all):** award effect-syntax points but note Q4; the unit explicitly warns against this.
- **Q1:** Full marks for a timing/outside-the-component framing or a prototype "on load" comparison. "It does extra stuff" caps at 1/2.
- **Q3:** Must state that no array = every render, `[]` = once, `[value]` = when value changes. Missing one caps at 2/3.
- **Error-reading:** The missing dependency array makes the effect run every render, calling `setCount` each time. React shows: `Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect...`. Fix: remove the `setCount` (the component is meant to stay at 0) or add `[]` **and** stop unconditionally setting state. Full marks require the fix to actually render once and stay at 0.
- Do not penalize imperfect English. Penalize copied lesson text with no personalization.
