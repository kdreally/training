# U17 Assessor notes

Assessor-only. Do not link from learner README.

## Model answer sketch

**Q1 (event handler):** A function that runs in response to a user action. Prototype comparison: connecting a button's click interaction to "change to" a variant; the handler is the action attached to the trigger.

**Q2:** `onClick={handleClick}` passes the function itself, which React calls later. `onClick={handleClick()}` calls the function immediately during render and passes its return value (`undefined`), so no handler remains.

**Q3:** A plain `let` is not tracked by React; React re-renders only when props, state, or a parent's render change. `setCount` updates tracked state and schedules a re-render. Also, the local `let` is reinitialized to `0` on every render.

**Q4 (predict):** 0 → add → 1 → add → 2 → subtract → 1 → reset → 0 → add → 1. (Final answer: 1.)

**Q5:** Never change state directly; use the setter. Example: `items.push(x)` mutates the same array reference, so React sees no change and does not re-render; fix with `setItems([...items, x])`.

## Error-reading model

Loading `Timer` calls `setSeconds(seconds + 1)` during render, which schedules a new render, which calls it again, forever. React throws:

```text
Too many re-renders. React limits the number of renders to prevent an infinite loop.
```

Fix:

```jsx
<button onClick={() => setSeconds(seconds + 1)}>
```

Rule: pass a function to `onClick`; do not call a state setter during render.

## Common weak submissions

- `onClick={handleClick()}` anywhere.
- Direct mutation (`count++`, `items.push(...)`) without the setter.
- Two hooks, one of them inside an `if`.
- Q3 that only says "useState is special" with no mention of re-rendering.
- Error-reading that fixes by wrapping in `setTimeout` or removing the button rather than passing a function.

## Common wrong-but-thoughtful answers

- Using `setCount(c => c + 1)` (the updater form). This is actually *more* correct for rapid updates; award full marks and note it as a good habit, even though the functional form is not formally taught here.
- Asking why `setCount(count + 1)` twice in one handler only adds one. Excellent question — React batches updates and uses the `count` captured in that render; the updater form fixes it. Credit the curiosity.
- Wondering if state can live outside the component. It can (later units), but for this unit, state belongs inside. Acknowledge and defer.

## Notes on running

- `npm run dev` from the project folder. No new tooling.
- Alerts (`alert(...)`) are acceptable for simple feedback but not required.
