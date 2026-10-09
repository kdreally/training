# U28 — Custom hooks

**Phase 5 — Interaction and polish**

## Where you are

You have used `useState`, and you met `useEffect` in U19. You have felt the small frustration of writing the same little block of state logic in two or three components. This unit gives that repeated logic a **name** by packaging it into a **custom hook**.

The reassuring truth up front: a custom hook is not a new feature of React with new rules to memorize. It is a plain JavaScript function that follows one naming rule and one calling rule. This unit is mostly about recognizing a pattern you already write, then refactoring it.

## What you will be able to do

- Explain what a custom hook is in plain language.
- Recognize repeated state logic across components.
- Write a custom hook named `useSomething` that calls built-in hooks.
- Use a custom hook in one or more components.
- State the **rules of hooks** and recognize a violation from an error message.
- Build a `useToggle` and a `useLocalStorage` hook.

## What you need already

- **U05** — JavaScript functions.
- **U07** — arrow functions, destructuring, imports.
- **U17** — events and state with `useState`.
- **U19** — side effects with `useEffect` (light scope).
- **U26** — lifting state (custom hooks often return a value and a setter, the same pair lifting state uses).

## Time and energy

About **70–100 minutes**. This unit feels clever, and it can pull you into over-abstracting. We keep the scope small: two useful hooks, both short. If you catch yourself inventing a hook framework, stop and take a walk.

## Why this exists

A designer reuses a button with three variants instead of redrawing it six times. Reuse is how design systems stay consistent. Code has the same need.

Suppose two different components each need a true/false flag that flips when a button is clicked. You write the same three lines twice:

```jsx
const [isOpen, setIsOpen] = useState(false);
const open = () => setIsOpen(true);
const close = () => setIsOpen(false);
```

That is fine for two. By the fifth time, you have five copies to keep in sync. A custom hook names this behavior once: `useToggle`. Five components call `useToggle()` and each still gets its **own** independent flag.

The human problem: **the same behavior, written repeatedly, drifts and multiplies bugs.** Naming it once fixes it once.

## Plain-language teaching

### What a custom hook is

A **custom hook** is a JavaScript function whose name starts with `use` and which calls one or more React hooks inside it.

That is the whole definition. It is not a component. It is not a class. It renders nothing. It is a function that packages **stateful behavior** so several components can reuse it.

### Why the name must start with `use`

React cannot see your code the way you can. It uses the `use` prefix as a signal: "this function may call hooks." That single convention lets React and its lint tools check your code for the rules below. If you name it `toggleState` instead of `useToggle`, React may still run it, but you lose the safety checks and break a strong community convention. Always start with `use`.

### The rules of hooks

There are only two rules, and they apply to *all* hooks, built-in and custom:

1. **Only call hooks at the top level** of a component or another hook. Never inside a loop, an `if`, a nested function, or after an early `return`.
2. **Only call hooks from React components or from other hooks.** Never from a plain utility function that is not a component or a hook.

Why rule 1 exists: React tracks your component's hooks **by the order they run**, not by their names. If a hook runs conditionally, the order changes between renders, and React reads the wrong value from the wrong hook. The rules keep the order stable. The order is the identity.

Think of it like a numbered stack of layers. If you sometimes hide the third layer, then "third from the bottom" stops meaning the same thing. React counts positions, so the set of hooks must stay the same on every render.

### What a custom hook is *not*

- **Not shared state.** Calling `useToggle()` in two components gives each its own independent flag. To share one flag, you lift state (U26) or use context (U27). A hook shares *behavior*, not *data*.
- **Not magic.** No new syntax, no compiler trick. Just a function that calls functions.
- **Not a component.** Hooks return values; components return JSX.

### A useful mental model: the returned pair

Most custom hooks return the same shape you already know from `useState`: a value and a way to change it. `useToggle` returns `[value, toggle]`; `useLocalStorage` returns `[storedValue, setStoredValue]`. If you understand `useState`, you already understand the interface.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Custom hook | A function starting with `use` that calls other hooks | Not a component; it renders nothing |
| Rules of hooks | Two rules about where hooks may be called | Not optional style — React depends on them |
| Top level | Directly inside the component or hook body, not nested | "Top" means depth, not vertical position on screen |
| Order of hooks | The sequence in which hooks run each render | The order must be identical every render |
| `useToggle` | A hook returning `[value, toggle]` for a boolean | Not shared between components; each call is separate |
| `useLocalStorage` | A hook that keeps a value in the browser's storage | Not React state; the browser stores it; you sync it |
| `localStorage` | A browser storage area that survives refreshes | Not a React feature; it belongs to the browser |
| Refactor | Rewriting code to keep behavior while improving its shape | Not adding features; here, it removes repetition |

## Worked example

Two hooks, then a component that uses both. Every line is justified below.

**File:** `src/useToggle.js`

```js
import { useState } from "react";

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue((current) => !current);
  }

  return [value, toggle];
}
```

**File:** `src/useLocalStorage.js`

```js
import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const saved = window.localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  function setValue(newValue) {
    const valueToStore =
      typeof newValue === "function" ? newValue(storedValue) : newValue;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  }

  return [storedValue, setValue];
}
```

**File:** `src/Counter.jsx`

```jsx
import { useToggle } from "./useToggle";
import { useLocalStorage } from "./useLocalStorage";

export default function Counter() {
  const [isVisible, toggleVisible] = useToggle(true);
  const [count, setCount] = useLocalStorage("counter", 0);

  return (
    <div>
      <button onClick={toggleVisible}>
        {isVisible ? "Hide" : "Show"} counter
      </button>

      {isVisible && (
        <p>
          <button onClick={() => setCount((c) => c + 1)}>Add one</button>
          Count: {count}
        </p>
      )}
    </div>
  );
}
```

**How to run it:** start the dev server with `npm run dev` in your project folder and open the printed address. Same command on Windows, macOS, and Linux.

### Why every line is where it is

**In `useToggle`:**

- `initialValue = false` is a **default parameter**. If you call `useToggle()` with no argument, the starting value is `false`. This is plain JavaScript, not React.
- `useState(initialValue)` holds one boolean per component that calls this hook. The name `useToggle` begins with `use`, satisfying rule 2.
- `toggle` uses the function-updater form `setValue((current) => !current)`. It reads the latest value safely.
- `return [value, toggle]` returns an array of two items, exactly like `useState`. Callers destructure with names of their choosing.

**In `useLocalStorage`:**

- `window.localStorage` is the browser's small storage area. Values survive a page refresh. `window` is available in the browser; it is not part of React.
- The first `useState` argument is a function — a **lazy initializer**. React runs it only on the first render. This reads storage once instead of on every keystroke.
- `getItem` returns `null` when the key is absent. We check `saved !== null` so that a stored `0` or `false` is not mistaken for "nothing there."
- `JSON.parse` turns the stored text back into a real value. Storage can only hold text, so numbers and objects must be converted.
- `setValue` mirrors a state setter: it accepts either a new value or a function of the previous value. The `typeof newValue === "function"` check supports both forms.
- `JSON.stringify` converts the value to text before storing. Without it, an object would be saved as `"[object Object]"`.
- `localStorage` can throw if storage is full or disabled. For this course's purposes we keep it simple; a production hook would wrap these calls in `try`/`catch`.

**In `Counter`:** both hooks are called at the top level, unconditionally, in a fixed order. Each component that calls them gets independent values. Notice `setCount((c) => c + 1)` — passing a function is supported by the hook because we handled it.

**What success looks like:** the page shows a "Hide counter" button and "Count: 0." Clicking "Add one" increments the count. Clicking "Hide counter" hides the block and the button label changes to "Show counter." Reloading the page keeps the count, because it is in browser storage.

## Common errors

### Error: `React Hook "useState" is called conditionally`

**When it happens:** you put a hook inside an `if`, a loop, or two hooks behind a condition.

```jsx
function Panel({ show }) {
  if (show) {
    const [open, setOpen] = useState(false); // violation
  }
  // ...
}
```

**Decoded:** rule 1 was broken. React cannot guarantee the same order of hooks on every render, so it refuses.

**Fix:** move every hook call to the top level of the component, before any `if` or `return`. If a hook should sometimes do nothing, let it run always and use its value conditionally instead.

### Error: `Invalid hook call. Hooks can only be called inside of the body of a function component`

**When it happens:** you call a hook from a plain function that is not a component or a hook — for example, inside a helper named `formatTheme` or inside a class method.

**Decoded:** rule 2 was broken. Hooks do not know which component they belong to here.

**Fix:** either make the function a proper component (name it in `PascalCase` and have it return JSX) or, better, move the hook into a custom hook whose name starts with `use`.

### Error: two components seem to share the same counter

**When it happens:** you put the state *outside* the hook — at module level, in a plain variable shared by the file.

```js
let count = 0; // module-level: shared by everyone
export function useBadCounter() {
  const [value, setValue] = useState(count);
  // ...
}
```

**Decoded:** this is not a hook bug. `useState` gives each component its own value, but a module-level variable is shared by the whole file. The two ideas were mixed.

**Fix:** keep the state inside the hook via `useState`. If you truly want one shared value, that is lifting state (U26) or context (U27), not a custom hook.

### Error: `JSON.parse` throws `Unexpected token o in JSON at position 1`

**When it happens:** something other than valid JSON text is in storage under that key. `"[object Object]"` is the classic culprit — an object was stored without `JSON.stringify`.

**Decoded:** the text in storage cannot be parsed as JSON.

**Fix:** store with `JSON.stringify`, and read with `JSON.parse`. If old bad data is already there, clear it in the browser's developer tools (Application → Local Storage) and reload.

## Checkpoints

Answer before the assignment. If all five are clear, you are ready.

1. In one sentence, what is a custom hook?
2. Why must its name start with `use`?
3. State the two rules of hooks.
4. If two components both call `useToggle()`, do they share one flag or have two? Why?
5. What does `useLocalStorage` return, and what does the second item do?

## Practice exercises

### P1 — Read and predict

Look at `Counter`. Predict what the count shows after: click "Add one" three times, then reload the page. Then run it and compare.

### P2 — Change one value

Call `useToggle(false)` instead of `useToggle(true)` in `Counter`. Predict what is visible when the page first loads, then check.

### P3 — Fill in the blank

```js
import { useState } from "react";

export function useCounter(start = 0) {
  const [count, setCount] = useState(start);
  function increment() {
    setCount((c) => ________);
  }
  return [count, increment];
}
```

### P4 — Write from a specification

Write a hook `useInput(initial)` that returns `[value, handleChange]`, where `handleChange` accepts a change event and updates the value to `event.target.value`. Use it in a small `NameField` component. This packages the controlled-input pattern from U18.

### P5 — Fix a broken example

```jsx
import { useState } from "react";

function useIsOnline() {
  const [online, setOnline] = useState(true);
  window.addEventListener("online", () => setOnline(true));
  window.addEventListener("offline", () => setOnline(false));
  return online;
}

function Status() {
  if (navigator.onLine) {
    const isOnline = useIsOnline();
  }
  return <p>Status ready</p>;
}
```

This code has at least two problems. One is a rules-of-hooks violation. The other is a real-world issue with adding event listeners. Find them, write them down, and describe (even if you do not fully fix) a better approach. Note: setting up listeners cleanly involves `useEffect` from U19; using it here is allowed.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). Read it before you start.

## What is *not* in this unit

- No `useMemo`, `useCallback`, `useRef`, or `useReducer`. Those exist; they are out of scope here.
- No third-party hook libraries. We write our own small hooks.
- No data-fetching hooks (`useFetch`, React Query, and similar).
- No testing of hooks. That is beyond this course.
- No state-sharing through hooks. If you want shared data, that is U26/U27.

## Next unit

**U29 — Simple transitions and animation** — where motion belongs (mostly CSS), and how to respect people who prefer less of it.
