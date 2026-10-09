# U18 Assessor notes

Assessor-only. Do not link from learner README.

## Model answer sketch

**Q1 (controlled input):** A form field whose displayed text comes from React state rather than the browser. Design comparison: a text layer bound to a prototype variable; typing updates the variable, which redraws the layer.

**Q2 (the loop):** keypress → browser fires a change event → React calls `onChange` → handler reads `event.target.value` and calls the setter → state updates → React re-renders → `value` is now the new text, so the box shows it.

**Q3 (event object):** `event.target.value` is the current text of the input that fired the event. We read it there because the event carries the freshest value directly from the DOM; reading state would give the value from *before* this keystroke.

**Q4 (preventDefault):** Without it, the browser performs its default form submission, reloading/navigating the page. Symptoms: a flash, cleared fields, lost state, console reset.

**Q5 (predict):** (a) placeholders only; (b) first field's text + placeholder for the second; (c) both texts.

## Error-reading model

`useState()` with no argument starts `text` as `undefined`. React treats a `value` of `undefined` as uncontrolled, then a defined value arrives on the first keypress, so it warns:

```text
Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.
```

Fix: `useState("")`.

Rule: string inputs should start as `""`, never `undefined`.

## Common weak submissions

- Two fields sharing a single `value`/`onChange`.
- Missing `onChange` → read-only field; the learner may blame the browser.
- `onSubmit` on the button rather than the form.
- `preventDefault` omitted; page reloads and they report "it resets."
- Q2 describing the loop in the wrong order (e.g., state first, event last).
- Error-reading that removes `value` entirely (making it uncontrolled) instead of initializing to `""`.

## Common wrong-but-thoughtful answers

- Using one object state (`{name, email}`) updated by computed key (`{...form, [field]: value}`). Correct and forward-looking; award full marks and note it previews later patterns.
- Making fields controlled but submitting via `onClick` on a non-submit button *and* also handling `onSubmit`. Works; accept if no reload occurs.
- Wondering why the input cannot be uncontrolled and controlled together. Good question — React wants a component to commit to one or the other for its lifetime. Credit the curiosity.

## Notes on running

- `npm run dev` from the project folder. No new tooling.
- Inline styles (as in exercise P4) are acceptable for the exercises; formal styling is Phase 4.
