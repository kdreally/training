# U13 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| `Button` accepts `label` and `variant` and renders using both | 4 | Yes | `Button.jsx` |
| Both props have working defaults | 3 | Yes | `Button.jsx` behavior with `<Button />` |
| Three instances render distinctly (proves reuse, not copy-paste) | 3 | Yes | `App.jsx` + running app |
| Explains props in own words, aimed at a non-coder | 4 | Yes | `answers.md` Q1 |
| Correctly names prop names/values and explains defaults | 3 | Yes | `answers.md` Q2–Q3 |
| Predict-then-run completed, with honest reporting | 2 | No | `answers.md` Q4 |
| Design bridge maps a real component's properties to props | 3 | No | `answers.md` Q5 |
| Error-reading: correct cause + correct fix + general rule | 3 | Yes | `error-reading.md` |
| Files named and present correctly | 2 | Yes | submission structure |

### Partial credit notes (assessors)

- **`Button` renders but ignores `variant`:** award 2/4 for the component; the variation must actually appear in the class string.
- **Defaults wrong syntax** (e.g. `label = "Button"` assigned in the body, overwriting props): award 0/3 for defaults but keep component points. This is the U13 Error 4 trap.
- **Three buttons that are really three separate components:** award 0/3 for reuse. The point of the unit is one definition, many instances.
- **Q1:** Full marks require plain language and no unexplained jargon. A correct but jargon-heavy answer ("props are immutable payloads") caps at 2/4.
- **Q4:** There is no penalty for wrong predictions. Penalize only a falsified or empty report.
- **Error-reading:** If the learner says "it shows undefined" that is partially right (award 1–2/3); full marks need the *why* (`amount` is not wrapped in braces, so it is literal text) and the one-sentence rule (values in JSX need `{ }`).
- Do not penalize imperfect English. Penalize empty or copied lesson text with no personalization.
