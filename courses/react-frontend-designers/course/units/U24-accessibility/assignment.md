# U24 Assignment — Accessibility audit and fix

Submit to your trainer in **one folder or zip** named `U24-YourName`.

You will audit an interface against the unit's checklist, fix the issues you find, and explain your reasoning. Use any of your own components from U21–U23, or the lesson's sign-up form.

## Files to submit

### 1. `before.md`

- Paste (or screenshot-and-describe) the **broken** version of your chosen interface.
- List **every** accessibility problem you can find, grouped by category: semantics, labels, keyboard/focus, images/alt, contrast, ARIA.
- For each problem, write one line on the impact: who is affected and how.

### 2. `after/`

The corrected version as code:

```text
after/
  YourComponent.jsx
  YourComponent.css
```

- Semantic elements used correctly.
- Every input labelled (implicit wrap or explicit `htmlFor`/`id`).
- A real `<button>` for actions.
- A visible `:focus-visible` style.
- Color contrast considered; note any token changes.
- No `aria-label` unless an element genuinely has no visible text.

### 3. `annotations.md`

Accessibility annotations for the interface, in the spirit of design annotations:

| Element | Role | Accessible name | Notes / focus order |
|---------|------|-----------------|---------------------|
| … | button / heading / text field / … | the name announced | e.g. "focus 2nd", "decorative" |

Add the intended keyboard focus order as a numbered list.

### 4. `answers.md`

1. **Why it matters.** In your own words, explain why accessibility matters to the people who use your design — name at least three user situations (not just "disability").
2. **Semantics first.** Why is semantic HTML the first tool rather than ARIA? Give one example where a native element already solves the problem.
3. **Label association.** Explain how your label is connected to its input, and why placeholder text is not a substitute.
4. **Buttons vs divs.** Explain, to a designer, the three things a real `<button>` provides that a styled `<div>` does not. Include the keyboard detail.
5. **Focus.** Why is `outline: none` a problem, and what did you do instead?
6. **Contrast.** Report one contrast ratio you checked (text and background), and say whether it passed the relevant minimum.
7. **ARIA.** Describe one place you deliberately did **not** use ARIA, and why.
8. **Inspection.** Describe what you saw in the browser's accessibility pane for one element (its role and name). This proves you inspected, not just remembered.

### 5. `checklist.md`

```markdown
- [ ] I used semantic elements (heading, button, form, label).
- [ ] Every input has an associated label.
- [ ] I used <button> for actions, not a clickable div.
- [ ] Focus is visible via :focus-visible (no outline: none).
- [ ] Images have appropriate alt text (empty for decorative).
- [ ] I checked at least one contrast ratio.
- [ ] I used aria-label only where no visible text existed.
- [ ] I inspected the accessibility tree in Developer Tools.
- [ ] I read the U24 rubric before submitting.
```

## Definition of done

- `before.md` lists real problems with impacts.
- `after/` fixes those problems in code.
- `annotations.md` covers every interactive element.
- `answers.md` answers all eight prompts in your own words.
- At least one finding came from inspecting in the browser.

## Predict-then-run requirement

Before fixing, write in `answers.md` which single fix you expect to have the largest impact, and why. After fixing, say whether that turned out to be true.
