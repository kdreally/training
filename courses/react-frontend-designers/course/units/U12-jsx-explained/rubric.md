# U12 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Explains what JSX is and is not | 3 | Yes | `answers.md` Q1, Q2 |
| Explains the one-root rule with both fixes | 3 | Yes | `answers.md` Q3 |
| Correct use of `{}` for values/expressions | 3 | Yes | `App.jsx`, `answers.md` Q4 |
| Correct `className` usage and reason | 2 | Yes | `App.jsx`, `answers.md` Q5 |
| Comments used correctly | 2 | Yes | `App.jsx`, `answers.md` Q6 |
| Working `App.jsx` with a single root | 3 | Yes | `App.jsx`, screenshot |
| Error-reading practice decoded (two errors + console warning) | 3 | No | `answers.md` Q7–Q8, `errors.md` |
| Evidence files complete and matching | 1 | No | screenshots, `errors.md` |

`App.jsx` and the render screenshot are the **evidence** for the JSX-usage criteria; missing them caps those criteria at half.

### Partial credit notes (assessors)

- Q1/Q2: full for "syntax that becomes a function call / is translated before the browser sees it." "It is HTML" caps at 1/3.
- Q3: full requires both a `<div>` fix and a fragment `<>...</>` fix and the reason (`return` yields one value).
- Q4: full requires a valid expression example **and** a correct statement that `if`/`for` cannot go inside `{}`. Award 2/3 if only the example is given.
- Q5: the reason must connect `class` to a JavaScript keyword. "That is just how React is" caps at 1/2.
- `App.jsx`: full needs one root, `className`, `{}` with a variable and a calculation, and a JSX comment. Missing the single root caps at 1/3.
- Q7: award full for either error correctly decoded; award 3/3 only if both are. Do not require exact wording — require correct diagnosis and fix.
- Q8: the `class=` warning typically mentions using `className` instead. Award full for a correct paraphrase.
- Do not penalize extra elements or styling beyond the brief.

### Common weak submissions

- `App.jsx` does not run (unclosed tag or two roots left in place).
- `class=` still used while claiming `className` is understood.
- `{}` contains an `if` statement or a `const`.
- `errors.md` contains invented text that is not a real JSX error.
- Screenshots absent or not matching the submitted file.
