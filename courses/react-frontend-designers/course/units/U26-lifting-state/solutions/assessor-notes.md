# U26 Assessor notes (solutions — do not link from learner README)

## Model answer sketch

**Q1 (lifting state):** When two components need the same value, they cannot reach into each other. Data only flows through props from parent to child. So the value is moved into the parent that contains both (closest common parent). It becomes the single source of truth; children read it via props and ask for changes via callbacks.

**Q2 (owner):** The line looks like `const [query, setQuery] = useState("");` inside the parent (often `App`). It is the closest common parent because it renders both the input component and the list component. Neither child is an ancestor of the other, so neither can own shared data.

**Q3 (down/up):** Down: the current value (e.g. `value={query}`) and, to the input, a callback (`onValueChange={setQuery}`). Up: when the user types, the child calls the callback with the new text; the parent's setter updates state, which re-renders both children.

**Q4 (predict then run):** Any concrete prediction with a real comparison. Good answers name the exact items and the exact filter rule (case-insensitive substring).

**Q5 (derived data):** Filtered list should be computed every render from `query` and the source array. Storing it in `useState` creates a second source of truth that can fall out of sync. Some learners may use `useMemo` — acceptable if they explain it is an optimization, not a requirement.

**Q6 (debug):** The bug is the arrow handler returns/calls `onValueChange` incorrectly: `onChange={(event) => onValueChange}` passes the function reference (or nothing) instead of the new string, and does not invoke it with the value. Correct:

```jsx
onChange={(event) => onValueChange(event.target.value)}
```

Partial credit if they identify that the new text is not being passed but express the fix loosely.

**Q7 (design bridge):** Strong answers name a concrete reused element — a color/text style, a component with variants, a shared auto-layout header — and say that editing it once updates every use, which is exactly what one source of truth gives the app.

## Common weak submissions

- The input and the list each hold their own `useState`; typing changes the input but not the list (or only sometimes).
- The filtered list stored in state and updated by `useEffect`, causing a flash or a one-render lag.
- Callback prop passed but never invoked, producing a frozen read-only input with no error.
- Prop name mismatch between parent and child (`onSearch` vs `onValueChange`), causing `onValueChange is not a function`.
- `answers.md` restates headings instead of explaining in their own words.
- The page works but the learner cannot say where the state lives.

## Common wrong-but-thoughtful answers

- "Lifting state means making the state global." Not yet — it means moving it to the nearest shared parent, not to the top of the app. This is the exact bridge into U27; note it kindly.
- "I should always keep the filtered list in state for speed." Reasonable instinct, wrong default. Note that performance is not the issue at this scale and that a second copy can drift.
- Passing the whole product array and filtering inside the child. It can work, but if the *query* lives in the parent you now have two owners. If the query lives in the child, the parent cannot filter. Either way, connect it back to who needs the value.
