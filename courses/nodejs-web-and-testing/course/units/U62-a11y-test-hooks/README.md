# U62 — Small UI structure, a11y basics, stable test hooks

**Phase 7**

## Where you are

UI + API work. Before Playwright, make the page **usable** and **locatable** without brittle CSS hacks.

## What you will be able to do

- Use labels, buttons, and landmarks more carefully.
- Add `data-testid` (or role-friendly markup) for stable automation hooks.
- Show status/error regions clearly.
- Prefer user-facing names over “div soup.”

## What you need already

- **U56–U61**

## Time and energy

**60–90 minutes.**

## Why this exists

Playwright can click “the third div.” That test breaks when you restyle. **Accessible, semantic markup** helps humans *and* stable tests.

## Plain-language teaching

### Accessibility (a11y) — beginner slice

**Accessibility** means more people can use the UI (keyboard, screen readers, clarity). You will not master WCAG here. You will do basics:

1. Every input has a **visible label** tied with `for`/`id`.
2. Use **`<button>`** for actions (not clickable `div`s).
3. Errors are **text in the page**, not only color.
4. One main heading; logical order.

### Stable test hooks

| Approach | Pros | Cons |
|----------|------|------|
| CSS class `.btn-blue` | Easy | Changes with design |
| Complex CSS path | — | Brittle |
| Role + accessible name | User-centric | Needs good markup |
| `data-testid="note-form"` | Stable for apps you own | Not shown to users; do not overuse |

Example:

```html
<form id="note-form" data-testid="note-form">
  <label for="title">Title</label>
  <input id="title" name="title" data-testid="note-title" />
  <button type="submit" data-testid="note-submit">Add note</button>
</form>
<p id="error" data-testid="error" role="alert"></p>
<ul id="note-list" data-testid="note-list"></ul>
```

`role="alert"` helps announce errors to assistive tech (basic pattern).

### Structure checklist before Phase 8

- [ ] Can use the form with keyboard only (Tab, Enter)
- [ ] Empty submit shows an error message in the DOM
- [ ] List region has a stable test id
- [ ] Primary actions are real buttons
- [ ] Page still works after a light CSS change (hooks not only on colors)

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| a11y | Accessibility | Not “features for later” |
| Accessible name | Name assistive tech uses (often label text) | |
| `data-testid` | Hook attribute for tests | Not a secret security feature |
| Landmark | Regions like `main`, `nav` | |
| Brittle selector | Breaks on tiny UI churn | |

## Worked example

Refactor your notes page: labels, `role="alert"` error, test ids on form/input/button/list.

## Common errors

### Error: Placeholder instead of label

Placeholders disappear; labels stay. Use both if you want, not placeholder alone.

### Error: `div` with click handler as “button”

Keyboard and semantics suffer; Playwright role=button may miss it.

### Error: Test ids on every single span

Reserve for meaningful controls and assertions.

## Checkpoints

1. Why labels matter for a11y and tests?
2. When use `data-testid`?
3. Why prefer button elements?
4. What makes a selector brittle?

## Practice

### P1 — audit page with checklist

### P2 — keyboard-only create a note

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- Full WCAG audit
- Aria-everything deep dive
- Playwright install (next phase)

## Next unit

**U63 — Why test the UI; manual browser checklist**
