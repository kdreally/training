# U16 Assignment — Design and build states

Submit the following to your trainer in **one folder or zip** named:

`U16-YourName`

## Files to submit

### 1. `MessageList.jsx`

A component that renders three different views based on its props, meeting this specification:

- Props: `isSignedIn` (a boolean) and `messages` (an array of objects, each with `id` and `text`).
- If `isSignedIn` is false, use an **early return** to show a sign-in prompt.
- If signed in and `messages.length === 0`, show an **empty state** with a short, friendly message and one sentence of guidance.
- If signed in and there are messages, render them as a list (use `.map` with a proper `key`, from U15).

### 2. `App.jsx`

Import and render `MessageList` **three times** so all three states are visible at once on the page.

### 3. `states.md`

A short design document for your empty state. Include:

1. **State inventory.** A table listing every state your `MessageList` can be in (`signed out`, `empty`, `loaded`) and what the user sees in each.
2. **Why the empty state matters.** 3–5 sentences. What goes wrong for a brand-new user if you ship only the loaded state?
3. **The condition.** Write the exact boolean expression that decides between empty and loaded, and say in words why checking the array itself (instead of `.length`) would be wrong.
4. **Tool choice.** For each of the two conditions in your component, say whether you used `&&`, a ternary, or an early return, and why that one fit.

### 4. `error-reading.md`

Paste, run, and answer:

```jsx
function Cart({ items }) {
  return (
    <p>You have {items.length && <b>{items.length} items</b>} in your cart.</p>
  );
}

// rendered as: <Cart items={[]} />
```

a. Describe exactly what appears on the page.
b. Explain why, using the words truthy/falsy.
c. Fix it so that an empty cart shows plain "You have 0 items in your cart" with no stray characters.
d. Write the general rule in one sentence.

## Definition of done

- All three states are visible when the app runs.
- `MessageList.jsx` uses an early return, a ternary, and `.map` with keys.
- `states.md` contains all four parts, including the exact boolean expression.
- `error-reading.md` includes the real observed output, the fix, and the rule.
- Files are named exactly as above.

## What a strong submission looks like

- The empty state is genuinely designed (a real message a user would want to see), not a placeholder like "empty."
- The state inventory is complete and matches what actually renders.
- The tool-choice answer reasons about readability, not just "it worked."
- The error-reading answer correctly names the `0` trap and fixes it with an explicit boolean.
