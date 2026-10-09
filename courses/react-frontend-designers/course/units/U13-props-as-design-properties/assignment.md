# U13 Assignment — A reusable Button, configured by props

Submit the following to your trainer in **one folder or zip** named:

`U13-YourName`

## Files to submit

### 1. `Button.jsx`

A component file that meets the specification below. You may adapt the worked example, but it must be your own file and it must run.

Specification:

- The component is named `Button`.
- It accepts two props: `label` and `variant`.
- Both props have sensible defaults (`label` should default to `"Button"`; choose a reasonable default for `variant`).
- The returned `<button>` uses `className` built from the `variant` prop, following the pattern `"button button--" + variant`.
- The button's visible text is the `label` prop.

### 2. `App.jsx`

A file that imports your `Button` and renders **three** instances:

- One with no props at all (defaults only).
- One with a `label` but no `variant` (so you prove the default variant works).
- One with both `label` and `variant`.

### 3. `answers.md`

Answer these prompts in your own words. Short paragraphs or bullets are fine. Do not paste the lesson back unchanged.

1. **Explain props.** In 3–5 sentences, explain what a prop is to a person who designs interfaces but has never coded. Use your own analogy if one helps.
2. **Name and value.** In the line `<Button label="Save" variant="secondary" />`, identify the prop names and the prop values.
3. **Defaults.** Why is a default value useful? Give one prop from your own `Button` that benefits from a default and say what happens without it.
4. **Predict then run.** Before running, write what each of these three lines will show. Then run them and record whether you were right.
   ```jsx
   <Button />
   <Button label="Save" />
   <Button variant="ghost" />
   ```
5. **Design bridge.** Describe one component in a design tool you have used and list two properties you could offer on it. Say how those map to props.

### 4. `error-reading.md`

Copy this broken snippet, run it (or read it carefully if you prefer), then answer below it:

```jsx
function Price({ amount, currency = "USD" }) {
  return <p>{currency} amount</p>;
}
```

a. What does the screen show, and why?
b. Fix the snippet so it shows a real price (pick a number).
c. Write, in one sentence, the general rule this bug teaches.

## Definition of done

- `Button.jsx` and `App.jsx` exist and the dev server shows three buttons with different labels.
- `answers.md` answers all five prompts in your own words.
- `error-reading.md` includes the fixed snippet and the one-sentence rule.
- Files are named exactly as above.

## What a strong submission looks like

- The `Button` genuinely reuses one definition for three variations (not three hand-written buttons).
- Defaults are used and explained, not just copied.
- The predict-then-run section honestly reports any wrong prediction (a wrong prediction you understood is worth more than a "correct" one you cannot explain).
- The design bridge names a real component and real properties.
