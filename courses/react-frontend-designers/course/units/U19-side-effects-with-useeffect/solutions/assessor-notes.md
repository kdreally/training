# U19 Assessor notes

Assessor-only. Do not link from learner README.

## Model answer sketch

**Q1 (side effect):** Work a component does outside producing UI — reaching the browser, network, timers, or storage. Design comparison: an "on load" prototype action or a plugin automation that fires after the frame is drawn.

**Q2 (timing):** Running outside actions during render would intermix external changes with drawing and cause unpredictable results. Effects run after the screen is painted, so rendering stays predictable and side effects happen in a controlled place.

**Q3 (dependency array):**
- No array → runs after every render.
- `[]` → runs once, after the first render (mount), not again.
- `[value]` → runs on first render and again only when `value` changes.

**Q4 (when not to use):** Computing a derived value (`const total = price * qty`), responding to a click (use the handler), or showing/hiding content (conditional rendering). Any one, with its correct home, earns the point.

**Q5 (predict):** Depends on the learner's component; look for a coherent sequence matching their implementation.

## Error-reading model

With no dependency array, the effect runs after every render and calls `setCount(count + 1)`, which schedules another render, forever. React throws:

```text
Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
```

Fix (the component should render once and stay at 0): remove the `setCount` from the effect entirely, or remove the effect if it has no purpose. Adding `[]` alone would run the effect once and leave count at 1 — acceptable only if the learner explains the intended final value. Accept either, but the "stay at 0" requirement means the unconditional `setCount` must go.

Rule: an effect that updates state must not run unconditionally on every render.

## Common weak submissions

- Effect with no dependency array that sets state (the loop).
- Effect that reads state but uses `[]`, so the title freezes.
- Using `useEffect` to compute a value with no side effect at all.
- Forgetting to import `useEffect`.
- Error-reading that "fixes" it by adding `if (count < 1)` without explaining, or by removing `useState` so nothing updates.

## Common wrong-but-thoughtful answers

- Adding `[count]` and a guard `if (count < 1) setCount(count + 1)`. Runs to 1 then stops; award full if they explain it and note the final value is 1, not 0. Flag the mismatch with the "stay at 0" instruction.
- Using `setInterval` for the title sync. Overkill but works; note that `[]` + cleanup is the honest shape.
- Asking whether the badge effect is a "bug in React." Good teaching moment — it is React correctly refusing to loop forever; the bug is in the code, not React. Credit the curiosity.

## Notes on running

- `npm run dev` from the project folder. No new tooling.
- The browser tab title is the observable outcome; ask the learner to share a screenshot or describe the tab text.
- Data fetching is intentionally out of scope; if a learner asks, point to later phases and confirm it is deferred here.
