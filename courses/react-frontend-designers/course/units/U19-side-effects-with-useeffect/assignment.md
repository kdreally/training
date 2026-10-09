# U19 Assignment — One careful effect

Submit the following to your trainer in **one folder or zip** named:

`U19-YourName`

## Files to submit

### 1. `TitleSync.jsx`

A small component that uses `useState` and `useEffect` meeting this specification:

- Holds a piece of state that the user can change with a control (for example, a counter with a button, or a text field from U18).
- Uses `useEffect` with a **dependency array** to keep `document.title` in sync with that state.
- The title must update when the state changes, and must not cause an infinite loop.

### 2. `App.jsx`

Imports and renders `TitleSync`.

### 3. `answers.md`

Answer in your own words:

1. **Side effect.** In 3–5 sentences, explain what a side effect is to a designer who has not coded, using a design-tool or prototype comparison.
2. **Timing.** Why does `useEffect` run *after* render rather than during it? What problem does that avoid?
3. **Dependency array.** Explain the difference between no array, `[]`, and `[count]`. Say when each runs.
4. **When not to use it.** Name one task that people often put inside `useEffect` that does not belong there, and say where it should go instead.
5. **Predict then run.** For your own component, write the sequence of browser-tab titles as the user interacts with it, then run it and confirm.

### 4. `error-reading.md`

Paste, run, and answer:

```jsx
import { useEffect, useState } from "react";

function Badge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  });

  return <span>{count}</span>;
}

export default Badge;
```

a. Describe what happens when the component loads.
b. Quote the exact warning from the console.
c. Explain, in one or two sentences, why the loop happens (mention the dependency array).
d. Fix it so the component renders once and stays at 0.
e. Write the general rule in one sentence.

## Definition of done

- The tab title is driven by state through `useEffect` and updates without looping.
- `app.jsx` renders the component cleanly.
- `answers.md` answers all five prompts in your own words.
- `error-reading.md` quotes the real warning, explains the loop, fixes it, and states the rule.
- Files are named exactly as above.

## What a strong submission looks like

- The effect's dependency array genuinely matches what the effect reads.
- The "when not to use it" answer (Q4) names a concrete example (e.g. computing a total, or responding to a click) and its correct home.
- The error-reading answer correctly ties the loop to the missing dependency array, and the fix keeps the component stable (removing the unwanted `setCount`, or guarding it).
- The side-effect explanation uses the timing idea (after render), not just "it runs extra code."
