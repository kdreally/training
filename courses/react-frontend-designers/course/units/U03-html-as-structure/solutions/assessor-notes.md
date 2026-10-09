# U03 Assessor notes — assessors only

Do not link this file from learner-facing materials.

## What "done" looks like

A valid submission is one `index.html` that opens in a browser and produces a sensible DOM tree, plus the supporting files. The page need not be styled or pretty. Structure is the whole assessment.

Reference structure for the "personal reading list" option:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My Reading List</title>
  </head>
  <body>
    <header>
      <h1>My Reading List</h1>
      <p>Books I finished this year.</p>
    </header>
    <nav>
      <a href="https://example.com/library">Find them at a library</a>
    </nav>
    <main>
      <section>
        <h2>Nonfiction</h2>
        <ul>
          <li>A history of typography</li>
          <li>A book about tea</li>
          <li>A field guide to birds</li>
        </ul>
      </section>
      <section>
        <h2>Fiction</h2>
        <p>Short notes on the stories I loved.</p>
        <img src="cover.jpg" alt="A stack of well-read paperbacks">
        <button>Add a book</button>
      </section>
    </main>
    <footer>
      <p>Updated by hand, 2026.</p>
    </footer>
  </body>
</html>
```

## Model answers

**Q1 (semantic vs generic):** Semantic tags name what a region is, so screen readers can jump to them and other developers can read the structure; a `<div>` says nothing. Any one concrete benefit is enough.

**Q2 (button vs div):** `<button>` is focusable by keyboard, announced as a button by screen readers, and activatable natively. A `<div>` does none of these; making it *look* like a button does not make it one.

**Q3 (alt):** Descriptive text (e.g. "A stack of well-read paperbacks"), shown when the image fails to load and read aloud by screen readers, benefiting blind/low-vision users and anyone on a slow connection.

**Q4 (tree):** Must match the submitted HTML and contain at least one grandchild relationship (e.g. `main → section → ul → li`).

**Q5 (predict then run):** Any honest before/after pair. The point is the habit of predicting, not a particular observation.

**Q6 (debug):** Three problems:
1. `<h2>Supplies<h2>` — the closing tag is missing its slash; should be `</h2>`.
2. `<p>Tape and labels.` — the paragraph is never closed; add `</p>`.
3. `<div>Save list</div>` — an action element must be a `<button>`; should be `<button>Save list</button>`.

## Common weak submissions

- `index.html.txt` (Notepad trap) — does not render as a page. Return for resubmission; this is a named decoded failure in the lesson.
- A flat document with no `<main>`/`<section>` nesting, or every area a `<div>`.
- `<div>` used where `<button>` belongs.
- `alt=""` or `alt="image"`.
- Heading levels chosen for size (`<h1>` then `<h4>`), or multiple `<h1>`s.
- The tree in `answers.md` is invented and does not match the file.
- Overlapping tags (`<section><p>…</section></p>`).

## Common wrong-but-thoughtful answers (partial credit)

- Uses `<img src="cover.jpg">` with no real file present but writes a meaningful `alt` and explains in `answers.md`. Award full image credit — the lesson explicitly allows this.
- Uses `<a>` for the "action" instead of `<button>` (e.g. `<a href="#">Add a book</a>`). Somewhat defensible for navigation, but the spec asked for an action. Dock the button point (or half) and note the distinction.
- Omits `lang="en"` but everything else is correct — lose only the skeleton sub-point, not the whole unit.
- Uses `<article>` or `<aside>` (not taught but semantic and correct). Accept it; do not penalize correct reasoning beyond the lesson's vocabulary.
