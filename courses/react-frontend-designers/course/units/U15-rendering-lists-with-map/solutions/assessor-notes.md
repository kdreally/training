# U15 Assessor notes

Assessor-only. Do not link from learner README.

## Model answer sketch

**Q1 (`.map`):** `.map` walks an array and produces a new array by transforming each item. Design metaphor: a repeat grid where one designed item becomes many, or connecting a component to a data list. The original array is unchanged.

**Q2 (why not hand-write):** The number of items is unknown and changes; hand-written markup cannot react to added/removed rows and requires editing code every time data changes.

**Q3 (key):** A stable, unique identity React uses to track list items when diffing. `id` is stable per item; the index changes when items reorder or are removed, so it can attach state/content to the wrong row.

**Q4 (predict):** Renders three inline `<span>`s: "design" "code" "craft". Using `tag` as the key is acceptable here because the tags are unique and static; credit noting this.

**Q5 (add a row):** Add a fifth object to the array literal; a fifth item renders with no JSX changes.

## Error-reading model

The list items reference `{label}`, but `label` is not in scope — the variable is `item.label`. In Vite this is a build/runtime error, typically:

```text
ReferenceError: label is not defined
```

(If the build halts, the page may show the last good render or an overlay error; either is acceptable to describe.) Fix:

```jsx
<li key={item.id}>{item.label}</li>
```

Rule: **inside the map, reach object fields through the item variable (`item.label`), not as bare names.**

Note: a student who misreads this as a missing-key bug is missing that the key is already present and correct. Redirect them to scope and property access.

## Common weak submissions

- `.map` used but items lack keys, or all share one key.
- `key={index}` with no awareness of the tradeoff.
- Data array of primitives with no id, forcing index keys — acceptable only if they explain.
- Q1 that copies U06's `.map` description without applying it to components.
- Error-reading that "fixes" it by adding `const label = ...` globally rather than using `item.label`.

## Common wrong-but-thoughtful answers

- Using the array index and arguing the list never reorders. Legitimate in a static list; award keys partially and ask them to note the assumption in a comment.
- Using visible text as a key because it is unique. Valid when guaranteed unique and stable; grant Q3 partial if they justify it and acknowledge the risk.
- Asking whether `key` is passed as a prop to the child. Great question — it is reserved by React and not readable in the component. Credit the curiosity.

## Notes on running

- `npm run dev` from the project folder. No new tooling.
- Styling is not part of this unit; lists will render as default browser styles.
