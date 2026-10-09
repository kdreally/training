# U04 Assessor notes — assessors only

Do not link this file from learner-facing materials.

## Model answers

**Q1 (selector vs declaration):** The selector chooses *which* elements (`body`, `.card`), the declarations describe *how they look* (`color: navy;`). Example: "In `.card { padding: 20px; }`, `.card` is the selector and `padding: 20px;` is a declaration."

**Q2 (separate files):** Structure stays separate from presentation; one stylesheet can restyle many pages; content edits do not touch styling and vice versa. Any one practical benefit is enough.

**Q3 (padding vs margin):** Padding = space *inside* the box between content and edge (e.g. a button's `padding: 8px 16px`). Margin = space *outside* the box pushing neighbors away (e.g. `margin: 0 0 16px` under a paragraph). The answer must point to their actual CSS.

**Q4 (box-sizing):** Without `border-box`, a specified width is measured for the content only, and padding + border are added on top, making the visible box wider than intended. `border-box` includes padding and border inside the width, so the number you type matches the box you get.

**Q5 (flexbox):** `display: flex` makes the container arrange its direct children in a row; `gap` adds even space between them. `align-items` aligns on the cross axis (vertical for a row); `justify-content` distributes along the main axis. The answer must name their own container.

**Q6 (contrast):** Example: body text `#2b2b2b` on `#f5f3ef` background — dark on light, comfortably legible. Must state both colors and give a sensible reason. A rough sense of the 4.5:1 guideline is ideal but not mandatory.

**Q7 (predict then run):** Any honest prediction and observed result. The habit is the point, not the specific value.

**Q8 (debug):** Three problems:
1. `background-color: white` — missing semicolon; should be `background-color: white;`.
2. `padding: 20px` — missing semicolon; should be `padding: 20px;`.
   (These two are often reported as one "missing semicolons" problem; count them as up to two points if the learner distinguishes both lines, otherwise 1.)
3. `.crad__title` — misspelled class; should be `.card__title`. As written it matches nothing.

## What "styled" should look like

A passing screenshot shows a page that is clearly not browser-default: a chosen background or text color, a non-default font size/line-height, visible spacing, and at least one horizontal arrangement (the flex container) — e.g., a nav or toolbar with items in a row.

## Common weak submissions

- `<style>` block or `style=""` attributes instead of a linked file.
- `styles.css` present but never linked (page is unstyled) — the most common hard failure.
- Filename mismatch: HTML links `style.css`, file is `styles.css`.
- `display: flex` claimed but absent; or flex applied but with no `gap`.
- Padding and margin swapped in Q3 (or the CSS contradicts the explanation).
- `.crad__title` typo not spotted in the debug task.
- Light gray body text on white claimed as readable.

## Common wrong-but-thoughtful answers (partial credit)

- Uses an `#id` for styling but explains the reasoning (e.g. "one hero section"). Not best practice, but shows understanding; award selector credit and note that classes are preferred.
- Adds `!important` to force a style without knowing why. Dock nothing for the feature itself, but flag it as a smell and explain specificity in feedback.
- Uses `px` throughout instead of relative units. This is acceptable at this stage; do not penalize. Relative units are revisited in Phase 4.
- Sets `display: flex` on a container whose children are not what they expected (e.g. text nodes are not flex items). Good diagnostic moment for feedback, not a scoring penalty unless flex is absent entirely.
