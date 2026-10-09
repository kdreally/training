# U29 Rubric

Visible to learners. Total **24 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Hover transition using `transform` and/or color, duration roughly 150–300ms | 4 | Yes | CSS + live behavior |
| Open/close transition driven by a React boolean state | 5 | Yes | component + CSS |
| `transition` written on the base class so both opening and closing animate | 3 | Yes | CSS |
| Only cheap properties animated (`transform`, `opacity`, color); no `width`/`top`/`height` motion | 4 | Yes | CSS |
| Reduced-motion rule present and interface fully usable without motion | 4 | Yes | CSS + `answers.md` Q7 |
| Explains transition vs keyframe in own words and states which was used and why | 2 | No | `answers.md` Q1 |
| Explains React's role vs CSS's role concretely | 1 | No | `answers.md` Q2 |
| Predict-then-run is concrete and compares prediction to reality | 1 | No | `answers.md` Q4 |
| Error-reading: a real error/warning quoted and decoded | 1 | No | `answers.md` Q6 |
| Design bridge connects smart-animate prototype to state-driven CSS | 1 | No | `answers.md` Q8 |

### Partial credit notes (assessors)

- The transition-on-open-only bug is the most common. If the learner wrote `transition` only on the open class, award points for the working opening motion but note the one-way bug and consider it against the "base class" criterion (partial).
- Reduced motion: the test is that the interface still works with motion removed. If the panel relies on animation to become visible and disappears under reduced motion, treat this as a real accessibility defect, not a stylistic one.
- Animating `width`, `height`, `top`, or `left` is a real conceptual miss even if it looks smooth in a simple case. Note it clearly; the reason is performance and layout reflow.
- Q5: any correct example with a sensible reason: `display` (keyword), `visibility` (keyword), or layout properties forcing reflow.
- Q6: accept missing stylesheet (404), specificity override, or a silent no-animation case, as long as it is decoded.
- Do not penalize imperfect English. Do penalize copied lesson text with no personalization on Q1, Q2, and Q8.

### What to look for (assessor pointer)

The core takeaways are: (1) React decides what, CSS decides how, and (2) motion is optional and honored. A submission with beautiful motion but no reduced-motion handling is incomplete for this unit.
