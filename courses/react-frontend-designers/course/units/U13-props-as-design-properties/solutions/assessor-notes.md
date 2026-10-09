# U13 Assessor notes

Assessor-only. Do not link from learner README.

## Model answer sketch

**Q1 (props):** A prop is an input you hand a component when you place it, so one component can look/behave differently per use. Good analogies: component properties in a design tool, arguments to a function, form fields on a reusable template. The key is *input given at the point of use*.

**Q2:** Names = `label`, `variant`. Values = `"Save"`, `"secondary"`.

**Q3:** Defaults keep a component usable when an input is omitted; they are the starting value. Without it, the prop is `undefined` and renders as empty text (or breaks arithmetic). `Button`'s `label` default means `<Button />` still shows something.

**Q4:** `<Button />` → "Button" (both defaults). `<Button label="Save" />` → "Save" with default variant. `<Button variant="ghost" />` → "Button" (default label) with ghost variant. Award the point for correct predictions *or* an honest correction.

**Q5:** Any real component + two properties. Strong answers name the property type (text/boolean/variant) and state that each instance can set its own value.

## Error-reading model

`Price` renders literally `USD amount` because `{currency}` is evaluated (shows "USD") but `amount` is **not** inside braces, so it prints as the text "amount". The fix:

```jsx
function Price({ amount, currency = "USD" }) {
  return <p>{currency} {amount}</p>;
}
// <Price amount={9.99} />
```

Rule students should extract: **values in JSX need curly braces; bare words are literal text.**

## Common weak submissions

- `Button` hardcodes the class instead of using `variant`.
- Three buttons that are actually three components (copy-paste), defeating the reuse lesson.
- Defaults written as `props.label = "Button"` in the body — this overwrites rather than defaults. Point them back to Error 4.
- Q1 that only restates "props are data passed to components" with no attempt at plain language for a designer.
- Error-reading that fixes it by hardcoding text instead of using braces.

## Common wrong-but-thoughtful answers

- Claiming props are the same as CSS properties. Award Q1 partial; clarify that CSS is applied by the component, props are inputs *to* the component.
- Wondering whether defaults override passed props. Clarify: defaults apply only when the prop is absent. Give credit for the curiosity.

## Notes on running

- The app runs with `npm run dev` in the project folder (from U09). No new tooling is required.
- Styling is not assessed; a plain browser button is a correct outcome for this unit.
