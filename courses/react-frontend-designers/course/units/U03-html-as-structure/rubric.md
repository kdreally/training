# U03 Rubric

Visible to learners. Total **30 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Complete document skeleton (doctype, html+lang, head+charset+title, body) | 4 | Yes | `index.html` |
| `<header>` with `<h1>` and `<p>` | 2 | Yes | `index.html` |
| `<nav>` with a real link (`<a href>`) | 2 | Yes | `index.html` |
| `<main>` with ≥2 `<section>`s, each led by an `<h2>` | 4 | Yes | `index.html` |
| List with ≥3 `<li>` items | 2 | Yes | `index.html` |
| `<img>` with `src` and meaningful `alt` | 3 | Yes | `index.html` |
| `<button>` used for the action (not `<div>`) | 3 | Yes | `index.html` |
| `<footer>` with a paragraph | 1 | Yes | `index.html` |
| Correct nesting (no overlapping tags); readable indentation | 3 | Yes | `index.html` |
| Explains semantic-vs-generic choice with a real benefit | 2 | No | `answers.md` Q1 |
| Explains button-vs-div correctly (keyboard/meaning) | 2 | No | `answers.md` Q2 |
| Own DOM tree is accurate and shows a grandchild relationship | 2 | Yes | `answers.md` Q4 |
| Predict-then-run recorded honestly | 1 | No | `answers.md` Q5 |
| Debug task: all three problems found, named, and fixed | 3 | Yes | `answers.md` Q6 |
| Screenshot + checklist present; correct filenames | 2 | Yes | folder/zip structure |

### Partial credit guidance

- **Skeleton (4):** 1 per correct part (doctype, `<html lang>`, head with charset+title, body). Missing `lang` or charset = lose that point.
- **Sections (4):** 2 per valid `<section>` led by an `<h2>`. A section with no heading earns 1.
- **Image (3):** 1 for a valid `<img>` tag, 1 for a plausible `src`/placeholder note, 1 for genuinely descriptive `alt`. `alt="image"`, `alt=""`, or `alt="photo"` loses the alt point.
- **Button (3):** full only for a real `<button>` with an action label. Using `<div>Save list</div>` earns 0 — this is a core teaching point.
- **Nesting (3):** 1 if minor issues exist but the tree is mostly sound; 0 if overlapping tags produce wrong nesting throughout.
- **Debug task (3, one per problem):**
  1. `</h2>` was mistyped as `<h2>` (unclosed/reopened heading).
  2. `<p>` is never closed.
  3. `<div>Save list</div>` should be `<button>Save list</button>`.
  Award 1 point per problem correctly named **and** fixed. Finding a problem but giving no fix earns 0.5.
- **Tree (2):** 1 for structure, 1 for the grandchild relationship. If the tree does not match the submitted HTML, cap at 1.

### Must-have vs nice-to-have

- **Must-have (unit fails without these):** all structural items, correct nesting, the DOM tree, the debug task, and the files/screenshot.
- **Nice-to-have (points only):** Q1, Q2, Q5.

Do not penalize cosmetic ugliness, content choice, or a missing real image file if the note in `answers.md` explains it. Penalize `div`-for-button and invented/nonexistent structure.
