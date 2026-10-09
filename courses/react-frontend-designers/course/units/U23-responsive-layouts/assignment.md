# U23 Assignment — A responsive layout

Submit to your trainer in **one folder or zip** named `U23-YourName`.

You will make one layout that visibly changes across the shared breakpoints, and explain your choices.

## Files to submit

### 1. Your layout (folder `layout/`)

```text
layout/
  ResponsiveRow/
    ResponsiveRow.jsx
    ResponsiveRow.css
  App.jsx
```

- Pick a content set with **at least four items** (cards, articles, stats, team members — your choice). You may reuse your U21 or U22 component.
- Single column on the smallest screen; more columns as the viewport grows.
- Use **mobile-first** `min-width` media queries.
- Use at least **two** of the shared breakpoints (640px and 768px or 1024px).
- Use `flex-wrap` and a fluid `flex: 1 1 <basis>`; no fixed widths that cause horizontal scroll.
- Use `var(--token)` spacing if you have a `tokens.css` from U22.
- `index.html` must include the viewport meta tag (or note that Vite's default already has it).

### 2. `answers.md`

1. **Terms.** Define main axis, cross axis, and breakpoint in your own words.
2. **The rules.** Paste your media query block and explain, sentence by sentence, what changes at that width.
3. **Mobile-first.** Why did we write the small-screen styles first? Give one practical reason from your own file.
4. **Fluid vs fixed.** Name one element in your layout that should be fluid and one that should be fixed, with a reason for each.
5. **CSS vs React.** Explain why this layout does not use React state or a screen-size check.
6. **Inspection.** Report the exact viewport width (from the device toolbar) at which your layout changes, as you observed it.
7. **Design bridge.** For one component, describe its responsive frames in words and match each to a breakpoint.

### 3. `checklist.md`

```markdown
- [ ] Base styles are mobile-first (single column).
- [ ] I used `min-width` media queries, not `max-width`.
- [ ] I used at least two shared breakpoints (640/768/1024).
- [ ] `flex-wrap` is set on the row.
- [ ] No element causes horizontal scrolling at 360px.
- [ ] The viewport meta tag is present.
- [ ] I tested by dragging the device toolbar in Developer Tools.
- [ ] I read the U23 rubric before submitting.
```

## Definition of done

- At least four items render and visibly reflow across widths.
- No horizontal scrollbar at 360px wide.
- Media queries use consistent `min-width` breakpoints.
- Written answers are in your own words.

## Predict-then-run requirement

Before testing, write in `answers.md` how many items you expect per row at 360px, 700px, and 1100px. After testing, record any difference and explain it.
