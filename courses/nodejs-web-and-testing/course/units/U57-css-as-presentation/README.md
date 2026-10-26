# U57 — CSS as presentation

**Phase 7**

## Where you are

HTML structure exists. **CSS** controls **presentation**: colors, spacing, layout — not the meaning of the content.

## What you will be able to do

- Link a stylesheet to HTML.
- Use element, class, and id selectors lightly.
- Apply margin, padding, font, colors.
- Explain box model at a beginner level.
- Avoid using CSS classes as the only test hooks (preview U62/U67).

## What you need already

- **U56**

## Time and energy

**70–100 minutes.**

## Why this exists

Usable UI needs readable spacing and hierarchy. You do not need to be a designer. You need **clear enough** pages for humans and automation.

## Plain-language teaching

### CSS

**CSS** (Cascading Style Sheets) is a language for describing how HTML elements should look.

### Link a file

In `head`:

```html
<link rel="stylesheet" href="styles.css" />
```

`styles.css`:

```css
body {
  font-family: system-ui, sans-serif;
  margin: 2rem;
  line-height: 1.5;
}

h1 {
  color: #123;
}

.button-primary {
  background: #246;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
}
```

### Selectors (start small)

| Selector | Matches |
|----------|---------|
| `h1` | All `h1` elements |
| `.button-primary` | Elements with `class="button-primary"` |
| `#note-list` | Element with `id="note-list"` |

Classes are for **styling groups**. Prefer **not** to make brittle Playwright tests depend on decorative class names alone (U62/U67).

### Box model (light)

Roughly every box has:

- **content**
- **padding** (inside space)
- **border**
- **margin** (outside space)

```css
.card {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
}
```

### Layout light

For this course, stack content vertically with margin. Flexbox optional:

```css
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 24rem;
}
```

You need not master every layout system.

### Cascade (why “cascading”)

Multiple rules can apply; more specific / later rules can win. When confused, use browser **DevTools** (Inspect) to see applied styles — optional skill, highly useful.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Stylesheet | CSS file or block | |
| Selector | Pattern choosing elements | |
| Class | Reusable style label | Not JS class keyword required |
| Box model | content+padding+border+margin | |
| Cascade | How conflicting rules resolve | |

## Worked example

Style the notes page: readable body text, spaced form, distinct submit button.

## Common errors

### Error: Inline styles everywhere

Hard to maintain. Prefer stylesheet for learning projects.

### Error: Styling only by tag when many buttons differ

Use classes.

### Error: Tiny gray text on gray background

Contrast matters for humans and screenshots.

## Checkpoints

1. How do you attach CSS to HTML?
2. `.x` vs `#x`?
3. Padding vs margin?
4. Why not rely only on CSS classes for tests?

## Practice

### P1 — styles.css for index.html

### P2 — improve focus visibility on inputs (outline)

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Sass, Tailwind, CSS modules
- Animations
- Responsive expert breakpoints (optional mention)

## Next unit

**U58 — JavaScript in the browser and the DOM**
