# U04 Rubric

Visible to learners. Total **30 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| `styles.css` linked from `<head>`; no inline/`<style>` CSS | 3 | Yes | `index.html` |
| `box-sizing: border-box` present | 2 | Yes | `styles.css` |
| ≥1 element selector and ≥2 class selectors used correctly | 3 | Yes | `styles.css` |
| Colors: hex + one other valid form; legible | 2 | Yes | `styles.css` |
| Font stack ends in a generic family; size + line-height set | 3 | Yes | `styles.css` |
| Padding and margin used deliberately (both present, explained) | 3 | Yes | `styles.css`, `answers.md` Q3 |
| Flex container with `display: flex` and `gap` | 3 | Yes | `styles.css` |
| ≥3 explanatory comments on rules | 1 | No | `styles.css` |
| Structure from U03 preserved (semantic tags intact) | 2 | Yes | `index.html` |
| Selector vs declaration explained with own example | 1 | No | `answers.md` Q1 |
| Separation-of-files reason is sound | 1 | No | `answers.md` Q2 |
| Padding-vs-margin answer matches their own CSS | 2 | Yes | `answers.md` Q3 |
| Box-sizing explanation correct | 1 | No | `answers.md` Q4 |
| Flexbox answer names their container and effects | 1 | No | `answers.md` Q5 |
| Contrast answer: states colors and gives a valid readability reason | 1 | No | `answers.md` Q6 |
| Predict-then-run recorded honestly | 1 | No | `answers.md` Q7 |
| Debug task: all three problems found, named, fixed | 3 | Yes | `answers.md` Q8 |
| Screenshot clearly styled; checklist; correct filenames | 2 | Yes | folder/zip |

### Partial credit guidance

- **Link (3):** 1 if a `<style>` block or inline styles are used instead of an external file (this is a core teaching point; award credit only for the linked external sheet). 0 if no CSS reaches the page.
- **Selectors (3):** 1 per qualifying selector type, capped at 3. A single class used many times earns 1, not 2.
- **Fonts (3):** 1 for the stack ending in a generic family, 1 for `font-size`, 1 for `line-height`. A stack with no generic fallback loses 1.
- **Padding/margin (3):** 2 if both appear in the CSS but the explanation is vague; 0 for the explanation if they clearly swapped the two concepts. Award up to 3 when the explanation matches the actual CSS.
- **Flex (3):** 2 if `display: flex` is present but `gap` is missing; 0 if flex is claimed but not in the file.
- **Debug task (3, one per problem):**
  1. Missing semicolon after `background-color: white` (and after `padding: 20px`).
  2. Missing semicolon after `padding: 20px`.
  3. `.crad__title` is misspelled — should be `.card__title` (selector will never match).
  Award 1 point per distinct problem correctly named and fixed.
- **Contrast (1):** accept any answer that names both colors and gives a sensible readability reason. Do not demand an exact numeric ratio; auto-fail only if the colors are clearly unreadable and the learner claims otherwise.
- **Structure preserved (2):** 2 if semantic tags remain; 1 if minor regressions; 0 if the page was replaced with `<div>`s.

### Must-have vs nice-to-have

- **Must-have (unit fails without these):** linked external stylesheet, box-sizing, selectors, colors, fonts, deliberate padding/margin, flexbox, preserved structure, padding-vs-margin answer, the debug task, and the files/screenshot.
- **Nice-to-have (points only):** comments, Q1, Q2, Q4, Q5, Q6, Q7.

Do not penalize aesthetic choices. Do penalize inline styling, `!important`, id-based styling without justification, or unreadable contrast.
