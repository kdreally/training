# U15 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Array of 4+ objects with `id` and 2+ fields | 2 | Yes | `App.jsx` |
| Uses `.map` to render one component per object | 4 | Yes | `App.jsx` + running app |
| Every item has a unique, stable `key` (not the index) | 4 | Yes | `App.jsx` |
| Two or more fields passed as props and displayed | 2 | Yes | `App.jsx` |
| Explains `.map` in own words / with a design metaphor | 3 | Yes | `answers.md` Q1 |
| Explains why stable keys beat indices | 3 | Yes | `answers.md` Q3 |
| Predict-then-run completed with honest reporting | 1 | No | `answers.md` Q4 |
| Add-a-row description matches actual behavior | 1 | No | `answers.md` Q5 |
| Error-reading: quotes real message, fixes bug, states rule | 3 | Yes | `error-reading.md` |
| Files named and present correctly | 1 | Yes | submission structure |

### Partial credit notes (assessors)

- **`.map` used but no `key`:** award 2/4 for the map and 0/4 for keys. This is the exact lesson; do not let it pass on "it still rendered."
- **`key={index}` only:** award 1/4 for keys, and check Q3 — if they explain *why* index is weak and still used it in a static list with a comment, award 2/4. The reasoning matters more than dogma.
- **Duplicate keys (`key="item"`):** 0/4 for keys; this is a distinct bug from missing keys.
- **List hardcoded instead of mapped:** 0/4 for `.map`; the unit's core skill is absent.
- **Q1:** Full marks for a concrete design comparison (repeat grid, data-connected component). Pure code restatement caps at 2/3.
- **Q3:** Must mention that indices change on reorder/remove. Just "ids are unique" caps at 2/3.
- **Error-reading:** The bug is `{label}` (undefined variable) — it should be `{item.label}`. In Vite this likely fails to build with `'label' is not defined`. Award full only if they quote the real message and fix to `{item.label}`. If they mistakenly blame the key, award 1/3 and note the actual cause.
- Do not penalize imperfect English. Penalize copied lesson text with no personalization.
