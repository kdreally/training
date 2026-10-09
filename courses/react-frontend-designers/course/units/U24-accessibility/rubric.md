# U24 Rubric

Visible to learners. Total **30 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Semantic elements used (headings, forms, buttons, labels) | 5 | Yes | `after/` |
| Every input has an associated label | 4 | Yes | `after/` |
| Real `<button>` for actions | 4 | Yes | `after/` |
| Visible focus style via `:focus-visible` (no `outline: none`) | 3 | Yes | `after/*.css` |
| Image `alt` handling is correct (empty for decorative) | 2 | Yes | `after/` or notes |
| Contrast checked and reported | 2 | Yes | `answers.md` Q6 |
| `before.md` lists real problems with impacts | 3 | Yes | `before.md` |
| Annotations cover all interactive elements + focus order | 2 | No | `annotations.md` |
| ARIA used sparingly and only where justified | 3 | No | `after/` + `answers.md` Q7 |
| Inspection evidence (role/name reported) | 2 | Yes | `answers.md` Q8 |

## What the assessor should look for

- **Semantics (5):** real headings (`<h1>`–`<h6>`), not styled divs; a `<form>` where appropriate. Deduct for a heading-as-div or a nav as a plain div.
- **Labels (4):** either implicit (input wrapped in label) or explicit (`htmlFor`/`id` matching). A visible text label that is not associated does **not** count.
- **Buttons (4):** any interactive action is a `<button>`. Clickable divs, spans, or links-as-buttons lose this row.
- **Focus (3):** a defined `:focus-visible` (or `:focus`) rule; no `outline: none` without a replacement. If they removed the outline entirely, this row is 0.
- **`before.md` (3):** problems must be specific to their interface. Generic lists copied from the lesson score partial.
- **Q8 (2):** must describe an actual observation (role and name seen in the pane). A generic statement fails.
- **ARIA (3):** full when ARIA is absent where HTML suffices and present only for a genuine gap (e.g. icon-only button). Using `aria-label` on a div to "fix" it loses this row.

## Partial credit notes (assessors)

- If the interface works with a keyboard but focus is only a default browser ring (not custom), award 1–2 on the focus row; a default ring is better than none.
- If labels are visually present but unassociated, award 1/4 and explain that visual proximity is not programmatic association.
- If they list five problems but fix three, `before.md` can score fully while `after/` rows reflect what was fixed. Note the gap.
- If decorative images have descriptive (non-empty) alt, award 0–1 on images with a note; this is the most common over-correction.
- Do not require a specific contrast value; require that they *checked* and reported one honestly.

## Common weak submissions

- Copying the lesson's "broken" list instead of auditing their own interface.
- Using `aria-label` everywhere "to be safe."
- Removing the focus outline because it "looked ugly."
- Adding a visible label but not associating it.
- Claiming contrast was fine without reporting a ratio or using a tool.
