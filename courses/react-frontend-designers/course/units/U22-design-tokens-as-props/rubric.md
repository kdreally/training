# U22 Rubric

Visible to learners. Total **30 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Token file has the required token types, grouped and role-named | 5 | Yes | `tokens.css` |
| Token file imported once in the entry file | 2 | Yes | `main.jsx` |
| Component has at least three named variants | 4 | Yes | `YourComponent.jsx` |
| Component guards against an invalid variant | 3 | Yes | `YourComponent.jsx` |
| Component stylesheet uses `var()` tokens, not raw values | 5 | Yes | `YourComponent.css` |
| All variants render in `App.jsx` | 3 | Yes | `App.jsx` |
| Explains token vs style with their own examples | 3 | Yes | `answers.md` Q1 |
| Traces prop → class → token correctly | 2 | No | `answers.md` Q3 |
| Names a concrete drift risk | 2 | No | `answers.md` Q4 |
| Figma → token mapping table is concrete | 1 | No | `answers.md` Q6 |

## What the assessor should look for

- **Tokens (5):** required types present; names describe role (`--color-success-bg`) rather than appearance (`--green-100`) — role naming may be a few points lower if consistently appearance-based, with a note. Comments grouping sections are a plus but not required.
- **Import (2):** `tokens.css` imported once, early, in the entry file, not duplicated.
- **Variants + guard (7):** three or more variants; guard present (a list + `includes`, a lookup object, or a documented map). A component with no guard loses the guard row but may keep the variants row.
- **`var()` usage (5):** the count of raw hex/px values for the tokenized groups. One or two legitimate exceptions (e.g. a `1px` border or `0`) are fine; broad raw colors/spacing are not. Require the learner to have called out exceptions in `answers.md`.
- **Q1 (3):** must give both a token example and a distinct style example from their own work.
- **Q3 (2):** a correct, specific trace. Vague descriptions of "props choose styles" without the actual class string earn partial.

## Partial credit notes (assessors)

- If a raw value is repeated three or more times in their CSS, note it as the exact drift the unit warns about, even if the score row is only slightly reduced.
- If variants exist but the stylesheet hardcodes colors (no tokens), award variants points but 0–1 on the `var()` row — the unit's central skill is missing.
- If the guard uses a lookup object, that is fully acceptable; do not require `includes`.
- Immediate-fallback styling (e.g. `var(--color-x, #ccc)`) is a legitimate bonus technique; mention it positively but do not require it.

## Common weak submissions

- Tokens created but never used; component still full of hex values.
- A single token for everything (one color reused for unrelated roles), ending the benefit of role naming.
- No guard, so a typo silently strips styles.
- `tokens.css` imported inside each component rather than once.
- Mapping table invented from nothing rather than from a real or realistic design file.
