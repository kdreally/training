# U25 Rubric

Visible to learners. Total **30 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Image imported from `src/assets/` and renders | 4 | Yes | `YourComponent.jsx`, `component/` |
| `alt` text is correct (informative or deliberately empty) | 3 | Yes | `YourComponent.jsx`, `answers.md` Q3 |
| Inline SVG icon component with a `size` prop | 4 | Yes | `icons/YourIcon.jsx` |
| Icon uses `currentColor` and camelCase SVG attributes | 3 | Yes | `icons/YourIcon.jsx` |
| Font loaded and applied via a token | 4 | Yes | `tokens.css`, `index.html` or CSS |
| Only used font weights requested | 2 | No | `index.html` / CSS |
| Explains `public/` vs `src/assets/` correctly | 3 | Yes | `answers.md` Q1–Q2 |
| Network panel observations are real and specific | 3 | Yes | `answers.md` Q6 |
| No 404s for added assets | 2 | Yes | testing / `answers.md` Q6 |
| Path-reading answer shows a real message or correct forms | 1 | No | `answers.md` Q7 |
| Design bridge lists typeface and weights requested | 1 | No | `answers.md` Q8 |

## What the assessor should look for

- **Image import (4):** the image is in `src/assets/` and imported, not hard-coded as a string path. Hard-coding `src="src/assets/..."` is a common failure and loses this row.
- **`alt` (3):** informative images have a plain-language description; decorative ones use exactly `alt=""`. Descriptive alt on a decorative flourish, or missing alt entirely, loses points.
- **Icon (4):** a real inline SVG (or an equally dependency-free approach), with a `size` prop actually used. A screenshot-exported PNG icon does not meet the outcome.
- **`currentColor` + camelCase (3):** both present. Hyphenated attributes (`stroke-width`) lose this row with a note.
- **Font (4):** loaded and referenced through a token. Using the font without a token still earns most of this row; using a token is the expected course style.
- **Q1–Q2 (3):** must contrast `public/` (absolute path, copied as-is) with `src/assets/` (import returns a URL).
- **Q6 (3):** evidence of opening the Network panel: named sizes and status codes. A vague "it loaded fine" fails this row.

## Partial credit notes (assessors)

- If the image renders but is served from `public/`, award 2/4 on the import row and explain the trade-off, rather than zeroing it.
- If the icon is inline SVG but has no `size` prop, award 2/4.
- If the font is applied but not tokenised, award 3/4 and note the U22 connection.
- If a weight is requested but never used, deduct 1 on the weights row and name the specific weight.
- A 404 on a *third-party* font while a local fallback works is a partial, not a zero; note it as a real-world caveat.
- Do not penalise a component idea different from the lesson's example.

## Common weak submissions

- Image referenced with a hard-coded `src="src/assets/..."` string.
- Icon exported as a PNG instead of an inline SVG.
- Hyphenated SVG attributes copied directly from a design tool export.
- Font requested at many weights (e.g. 100–900) "just in case."
- `answers.md` Q6 with no actual sizes or status codes.
- Decorative image given long descriptive alt text, cluttering screen-reader output.
