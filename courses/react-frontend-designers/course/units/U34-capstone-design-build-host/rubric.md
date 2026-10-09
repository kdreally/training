# U34 Rubric — Capstone

Visible to learners. Total **40 points**. Designed so a trainer can score it in a few minutes.

## Criteria

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Live page loads correctly (styled, not blank/404) | 8 | Yes | live URL in a fresh tab |
| 3–6 components, each with one clear responsibility | 4 | Yes | source; `submission.md` |
| At least one component driven by props | 4 | Yes | source; reflection Q2 |
| At least one stateful interaction with `useState` | 4 | Yes | source; reflection Q3 |
| Tokens file drives color, spacing, radius | 4 | Yes | source; reflection Q4 |
| Responsive layout across at least one breakpoint | 4 | Yes | live URL at ≈375px and ≈1024px; reflection Q5 |
| Accessibility checklist met | 4 | Yes | live URL + source; reflection Q6 |
| Production build succeeds; correct `base` for hosting | 3 | Yes | `npm run build` / `npm run preview`; `vite.config.js` |
| Reflection answers are specific and in own words | 3 | Yes | `reflection.md` |
| Design reference present | 1 | No | `design-reference.*` |
| Self-review checklist present and honest | 1 | No | `self-review.md` |

**Total: 40.** Must-have subtotal: **38**. Nice-to-have: **2**.

## Fast pass — scoring order (about 3 minutes)

1. **Open the live URL** (8 points). Blank/404? See the honest-failure rule.
2. **Count components** in the source and match to `submission.md` (4).
3. **Search the source** for `useState` and for a props parameter in a component (4 + 4).
4. **Search for `var(--`** and confirm a tokens file exists (4).
5. **Check both widths** on the live URL — narrow and wide (4).
6. **Skim accessibility** on the live page: Tab order, one `<h1>`, alt text, contrast (4).
7. **Run** `npm install`, `npm run build`, `npm run preview`; open `vite.config.js` for `base` (3).
8. **Read `reflection.md`** for real, specific answers (3).
9. **Confirm** `design-reference` and `self-review.md` are present (1 + 1).

## Partial credit notes (assessors)

- **Live page:** award 0 if blank/404 *unless* `submission.md` documents an honest, specific failure (exact error or URL). Then award up to 4 of 8 if `npm run preview` works locally.
- **Components:** full for 3–6 single-purpose components; 2 for 2 or 7+; 0 for one monolithic component.
- **Props / state:** full only if the feature is actually used, not imported and ignored.
- **Tokens:** 0 if hex/pixel literals dominate; 2 if a tokens file exists but is partly ignored.
- **Responsive:** require evidence at both widths. A single fixed width gets 1–2.
- **Accessibility:** 1 point per satisfied group up to 4 — headings, alt text, labels, focus + contrast + keyboard. Do not accept clickable `<div>`s.
- **Reflection:** full for specific, personal answers; 0 for copy-pasted lesson text. Imperfect English is not penalized.
- **Self-review:** 1 if completed; do not penalize an honest "not done" on a nice-to-have item.

### Honest-failure rule (state this to learners)

A working build that fails only at hosting, with a clearly documented cause (for example a wrong `base` plus the exact console 404), keeps all must-have points except the live-page points, which are capped at 4 of 8. We grade capability and honesty, not luck.

## Common weak submissions

- One giant `App.jsx` with no separate components.
- State declared but no user-facing interaction.
- A tokens file that exists but components use raw hex.
- Layout that only works at one screen width.
- Clickable `<div>`s instead of buttons.
- Reflection that restates the README rather than their own decisions.
- `node_modules/` zipped into the submission.
- Hosted URL is actually `localhost`.
- Blank live page with no explanation in `submission.md`.
