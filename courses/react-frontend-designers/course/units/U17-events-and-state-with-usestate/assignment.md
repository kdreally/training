# U17 Assignment — A counter and a toggle

Submit the following to your trainer in **one folder or zip** named:

`U17-YourName`

## Files to submit

### 1. `Counter.jsx`

A component meeting this specification:

- Uses `useState` for a numeric `count` state starting at `0`.
- Renders the current count.
- A button that adds one.
- A button that subtracts one.
- A button that resets to `0`.
- At least one button whose label or behavior depends on a **second** piece of state (for example, a hide/show toggle, or a step size).

### 2. `App.jsx`

Imports and renders your `Counter`.

### 3. `answers.md`

Answer in your own words:

1. **Events and handlers.** In 3–5 sentences, explain to a designer what an event handler is, using a prototype interaction as the comparison.
2. **Why bind state.** Explain why `onClick={handleClick}` works but `onClick={handleClick()}` does not. What actually gets passed to React in each case?
3. **Plain variable.** Explain why an ordinary `let count = 0` does not update the screen when changed, whereas `setCount` does.
4. **Predict then run.** Before running, write the value shown after this exact sequence: start at 0 → add one → add one → subtract one → reset → add one. Then run it and confirm.
5. **The rule.** State the rule about changing state directly, and give one concrete example (using an array or object would strengthen your answer) of what goes wrong if you break it.

### 4. `error-reading.md`

Paste, run, and answer:

```jsx
import { useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  return (
    <button onClick={setSeconds(seconds + 1)}>
      Seconds: {seconds}
    </button>
  );
}

export default Timer;
```

a. Describe what happens when the component first loads (expect an error).
b. Quote the exact error message from the terminal or browser console.
c. Explain, in one or two sentences, why this error happens.
d. Fix the code.
e. Write the general rule in one sentence.

## Definition of done

- `Counter.jsx` changes the displayed number on click and never reloads the page.
- Two or more pieces of state are used.
- `answers.md` answers all five prompts in your own words.
- `error-reading.md` quotes the real error and includes the fix and the rule.
- Files are named exactly as above.

## What a strong submission looks like

- Handlers are passed correctly (function, not called).
- State is never mutated directly anywhere in the files.
- The "plain variable" answer (Q3) explains re-rendering, not just "React wants it that way."
- The error-reading answer connects the infinite-loop error to calling the setter during render.
- The predict-then-run report is honest about any wrong prediction.
