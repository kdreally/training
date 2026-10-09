# U14 Assessor notes

Assessor-only. Do not link from learner README.

## Model answer sketch

**Q1 (composition):** Building a page by nesting named components inside a parent, instead of writing everything in one block. Design comparison: a home screen frame containing named groups/instances (Header, Body, Footer), each editable on its own.

**Q2 (one file per component):** (a) findability — filename maps to component; (b) small files are readable; (c) parallel editing without conflicts. Any two suffice.

**Q3:** `<header>` is the HTML element; `<Header>` is a custom React component. Lowercase means React renders the DOM element and ignores the component; the bug is silent because the page still renders, just without expected content.

**Q4 (boundary):** Strong answers cite independent change ("the footer changes for its own reasons"), reuse ("cards repeat"), or clear naming/boundary. Weak answers only say "cleaner."

**Q5 (wireframe):** The description should list the div containing Header, each Card, and Footer in order. Deduct if it names components that do not appear.

## Error-reading model

**What shows:** `<card title="Mug" body="A mug." />` renders a plain HTML element called `card` (an unknown custom element) with no visible content. The `Card` component is never used, so no `<article>`, `<h2>`, or `<p>` appears. The browser shows essentially nothing for that line.

**Why:** The lowercase tag is treated as an HTML/CSS custom element, not the imported component. React requires capitalized names to mean a component.

**Fix:** `<Card title="Mug" body="A mug." />`.

**Rule:** Capitalize component tags; lowercase tags are HTML elements.

## Common weak submissions

- All content in `App.jsx`; no separate files. Renders fine, misses the entire lesson.
- Files exist but nothing is imported/used.
- `Card`s duplicated as inline `<article>`s.
- Q3 that says "capitalization is a style choice" — it is not; it changes what renders.
- Error-reading that "fixes" it by renaming the HTML element rather than capitalizing the component.

## Common wrong-but-thoughtful answers

- Asking whether a component can be defined inside another component's file. Legitimate question; answer: yes technically, but the file-per-component convention exists for findability, so keep it separate. Credit the thought.
- Arguing that tiny pages do not need splitting. Fair; acknowledge the judgment call and note the convention pays off as the page grows.

## Notes on running

- `npm run dev` from the project folder. No new tooling.
- Unstyled output is correct for this unit; CSS is Phase 4.
