# U23 Rubric

Visible to learners. Total **30 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Layout reflows across at least two shared breakpoints | 6 | Yes | `ResponsiveRow.css` |
| Base styles are mobile-first with `min-width` queries | 5 | Yes | `ResponsiveRow.css` |
| `flex-wrap` and a fluid `flex: 1 1 <basis>` used | 4 | Yes | `ResponsiveRow.css` |
| No horizontal scrolling at 360px | 4 | Yes | testing / `App.jsx` |
| Viewport meta tag present (or correctly noted) | 2 | Yes | `index.html` / `answers.md` |
| Defines main axis, cross axis, breakpoint correctly | 3 | Yes | `answers.md` Q1 |
| Explains the media query change line by line | 2 | No | `answers.md` Q2 |
| Fluid-vs-fixed choice is concrete and reasoned | 2 | No | `answers.md` Q4 |
| Explains why responsiveness lives in CSS | 1 | No | `answers.md` Q5 |
| Records observed breakpoint width | 1 | No | `answers.md` Q6 |

## What the assessor should look for

- **Reflow (6):** four or more items change arrangement across widths. Test by narrowing the browser, not by reading alone.
- **Mobile-first (5):** base rules target small screens; `min-width` blocks add desktop changes. A submission that starts desktop-first with `max-width` loses most of this row — note it, because it is a deliberate teaching point.
- **Fluid sizing (4):** `flex-wrap` present; children use `flex: 1 1 <basis>` (or equivalent) and `max-width: 100%`. Fixed `width` on the main items loses points here.
- **No horizontal scroll (4):** verify at 360px. If there is a scrollbar, identify the culprit (usually a fixed width or a long unbroken string) in feedback.
- **Q1 (3):** all three terms must be correct; a swapped main/cross axis answer is a common partial.
- **Q2 (2):** sentence-by-sentence is not literally required; a clear explanation of what changes and why is enough.

## Partial credit notes (assessors)

- If the layout reflows only via a fixed-width hack (e.g. fixed px widths plus no wrap), award reflow points partially and explain the fluid alternative.
- If `max-width` is used but the design is still coherent, deduct on the mobile-first row but do not zero the layout rows.
- A single breakpoint when two were requested caps the reflow row at 4/6.
- Do not penalize a grid-based solution if it meets the outcomes; the outcome is responsive behavior, not flex specifically. (Grid was out of scope but is a legitimate extra.)

## Common weak submissions

- Three fixed columns that never change.
- Desktop-first `max-width` queries.
- Horizontal scrolling at phone width, unnoticed.
- Media query typos, so the breakpoint silently does nothing.
- `answers.md` recites the lesson instead of reporting their own observations.
