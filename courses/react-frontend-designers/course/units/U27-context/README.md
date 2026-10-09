# U27 — Context (light)

**Phase 5 — Interaction and polish**

## Where you are

In U26 you moved a shared value to the closest common parent and passed it down as props. That works beautifully for two or three components. This unit covers the case where the value is needed by **many components at different depths**, and passing it down prop by prop becomes noise. We introduce React's built-in answer: **context**.

We keep this unit deliberately light. Context is useful, and it is also easy to overuse. You will learn the one situation where it clearly helps and, just as importantly, when to reach for props instead.

## What you will be able to do

- Describe the problem called **prop drilling** and when it hurts.
- Create a context with `createContext`.
- Wrap part of your app in a context **provider** and give it a value.
- Read that value anywhere below with `useContext`.
- Build a light/dark **theme** that several components read, with one button that flips it.
- Explain at least two situations where context is the *wrong* tool.

## What you need already

- **U13** — props as component "design properties."
- **U14** — composing components into a page.
- **U17** — events and state with `useState`.
- **U26** — lifting state, closest common parent, data down / actions up.

## Time and energy

About **70–100 minutes**. The syntax is short. The judgment — when to use this — is the real lesson and takes thinking time.

## Why this exists

Imagine your app has this shape:

```
App
 └── Page
      └── Layout
           └── Header
                └── ThemeToggleButton
```

Suppose the user's chosen theme (light or dark) is stored in `App`. The `ThemeToggleButton` five levels down needs to read it and change it. To use props alone, every component in that chain — `Page`, `Layout`, `Header` — must accept `theme` and forward it, even though none of them displays a theme or cares about it.

Those components become **couriers** for a value that is not theirs. Add a second shared value and each courier must pass two. This is **prop drilling**, and it is how a simple screen turns into a hallway of passing.

The human problem: **a value that the whole area needs should not have to be handed person-to-person down a chain.** Context lets a subtree read a value directly.

## Plain-language teaching

### What prop drilling is (and is not)

**Prop drilling** means passing a prop through components that do not use it, only to reach a descendant that does. You saw a glimpse in U26: the parent handed data to children. Here the chain is longer and the middle components are innocent bystanders.

A short amount of prop passing is not a problem. Lifting state (U26) is still the correct default. Prop drilling only becomes a real annoyance when:

- the same value is needed by many components at several depths, and
- it is a value that feels "global" to a region of the screen — a theme, the current language, a signed-in user, a set of design tokens that must reach deep components.

### The smallest honest definition

**Context** is a way to make one value available to a whole subtree without passing it as a prop at every level.

Think of it as a radio broadcast with one station and many receivers, scoped to the region where you turn it on. Components inside the region can tune in directly. Components outside hear nothing.

### The three pieces

1. **`createContext(defaultValue)`** — makes the "station." It returns a context object. The default value is only used if a component reads the context where no provider exists above it.
2. **`<MyContext.Provider value={...}>`** — turns on the broadcast for everything inside it. Every component nested within can read `value`.
3. **`useContext(MyContext)`** — tunes in. Returns the current value from the nearest provider above.

### The theme example, in words

- `App` holds `theme` in `useState` — the single source of truth, exactly as in U26.
- `App` wraps its JSX in `<ThemeContext.Provider value={theme}>`.
- Deep inside, `ThemeToggleButton` calls `useContext(ThemeContext)` to read `theme` — no props passed through `Page`, `Layout`, or `Header`.
- To change the theme, the same context can also carry the setter, or a named `toggleTheme` function. That keeps the "actions up" idea from U26, just delivered by broadcast instead of by props.

### What context is *not*

- **Not a replacement for props.** Ordinary configuration that a component clearly owns should still be a prop. Context is for values shared across a region.
- **Not global state by default.** It only reaches components inside the provider. That is a feature: you can scope it to one page.
- **Not a performance tool.** Changing a context value re-renders all readers. It does not make things faster; it makes passing cleaner.
- **Not state itself.** Context stores *whatever value you give it*, including a value from `useState`, but the state still lives where you created it.

### When NOT to use context

Reach for props first when:

1. Only one or two components need the value. Lifting state (U26) is simpler and more obvious.
2. The components are parent and child, or close. Passing one prop is clearer than opening a broadcast.
3. You want to re-use a component in a different place. A prop makes the dependency visible; context hides it, which makes the component harder to understand on its own.

The design analogy: context is like a File-level style that every layer in the file inherits. Powerful — and dangerous if you really meant "only this card." Used carelessly, everything starts reacting to a change you intended to be local.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Prop drilling | Passing a prop through components that do not use it | Not any prop passing; only the wasteful kind |
| Context | A way to share one value with a whole subtree | Not the same as "global variable" — it is scoped to the provider |
| `createContext` | Creates the context object (the "station") | Does not hold a value by itself; the provider does |
| Provider | A component that supplies the value to everything inside it | Not required at the very top of the app; can wrap one page |
| `useContext` | Reads the current value from the nearest provider above | Returns the default if no provider exists |
| Default value | What `useContext` returns when no provider is above | Not the initial state; it is a fallback |
| Reader / consumer | Any component that calls `useContext` on that context | A reader re-renders when the value changes |

## Worked example

A complete light/dark theme, with a deep button that flips it. Notice the button is two components below the toggle's owner and receives **no theme props**.

**File:** `src/ThemeContext.js`

```js
import { createContext } from "react";

export const ThemeContext = createContext("light");
```

**File:** `src/App.jsx`

```jsx
import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import Page from "./Page";

export default function App() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

**File:** `src/Page.jsx`

```jsx
export default function Page() {
  return (
    <section>
      <h1>My app</h1>
      <div className="card">
        <CardBody />
      </div>
    </section>
  );
}
```

**File:** `src/CardBody.jsx`

```jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function CardBody() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Switch theme</button>
    </div>
  );
}
```

**File:** `src/App.css` (add to your stylesheet)

```css
.light {
  background: #ffffff;
  color: #1a1a1a;
  padding: 1rem;
}

.dark {
  background: #1a1a1a;
  color: #f5f5f5;
  padding: 1rem;
}
```

**How to run it:** start the dev server with `npm run dev` in your project folder, then open the printed address. Same command on Windows, macOS, and Linux.

### Why every line is where it is

- `createContext("light")` makes the station. `"light"` is only a fallback for the unusual case of reading the context with no provider above.
- In `App`, `theme` lives in `useState` — still the single source of truth. Context does **not** move the state; it distributes it.
- `value={{ theme, toggleTheme }}` shares both the value and the way to change it. The `{ }` inside `value={ }` is the start of a JavaScript object; the doubled braces are simply "an object literal inside a JSX attribute."
- `Page` and its markup receive **no theme prop**. That is the point: the middle of the chain is untouched.
- `CardBody` reads the context directly with `useContext`. It does not know or care where the provider is.
- `toggleTheme` uses the function form `setTheme((current) => ...)`. This reads the latest value safely. It is a good habit and avoids stale-value bugs.

**What success looks like:** the page shows "Current theme: light" on a white card. Clicking "Switch theme" changes the text to "dark" and the card becomes dark with light text. No theme prop appears anywhere except the provider.

## Common errors

### Error: `Cannot read properties of undefined (reading 'theme')`

**When it happens:** you call `useContext(ThemeContext)` but destructure as if a value exists, while no provider is above — so you get the default. If the default is `"light"` (a string), then `{ theme }` on a string gives `undefined`.

**Decoded:** the context was read outside its provider, or the default does not match the shape you expect.

**Fix:** make sure the component that reads is *inside* `<ThemeContext.Provider>`. If you want a safe default, set the default to an object: `createContext({ theme: "light", toggleTheme: () => {} })`. Note a no-op function: it does nothing, which is safer than `undefined`.

### Error: click does nothing, no crash

**When it happens:** the value object contains `theme` but not `toggleTheme`, or the button calls a name that is not in the object.

**Decoded:** `toggleTheme` is `undefined`; clicking a button with `onClick={undefined}` does nothing and reports no error.

**Fix:** confirm the provider's `value` includes the function and that the name matches exactly in both files.

### Error: everything re-renders and feels slow

**When it happens:** you placed the provider very high, or you pass a brand-new object every render to many readers.

**Decoded:** every reader re-renders whenever the provider's `value` changes. A new object literal is created on every parent render, so readers see a "new" value even when nothing meaningful changed.

**Fix:** for this course's scope, keep providers small and scoped to the region that needs them. Do not put a rapidly changing value (like mouse position) in a top-level context.

### Error: `ThemeContext is not defined`

**When it happens:** you forgot to import the context in a file that uses it.

**Decoded:** a plain missing-import error. The file exists, but this file has not been told about it.

**Fix:** add `import { ThemeContext } from "./ThemeContext";` at the top. Check the path if the file lives in a subfolder.

## Checkpoints

Answer before the assignment. Four yeses means you are ready.

1. What is prop drilling, and what makes it *worth* fixing?
2. Which of the three pieces (`createContext`, `Provider`, `useContext`) stores the actual value?
3. Where does the theme state live in the worked example — in the context, or in a component?
4. Name one case where passing a normal prop is better than using context.

## Practice exercises

### P1 — Read and predict

In the worked example, `Page` renders `CardBody`. Predict what `CardBody` would show if `App` did **not** wrap `Page` in the provider. Then explain why in one sentence.

### P2 — Change one value

Change the default value in `createContext` from `"light"` to `"sepia"`. Run the app with the provider still in place. Does anything change? Explain why or why not. This proves the default is only a fallback.

### P3 — Fill in the blank

```jsx
function Badge() {
  const { theme } = ______________(ThemeContext);
  return <span className={theme}>New</span>;
}
```

### P4 — Write from a specification

Add a second piece of shared value through the **same** context: the user's `displayName`. Store it in `App` with `useState`, add it to the provider's value, and show it in `CardBody`. Do not pass any props through `Page`.

### P5 — Fix a broken example

```jsx
const ThemeContext = createContext("light");

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <>
      <ThemeContext value={theme}>
        <Page />
      </ThemeContext>
      <CardBody />
    </>
  );
}
```

Two problems hide here. One prevents `Page` from seeing the theme; the other lets `CardBody` render without the theme. Find both, write them down, and fix them.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). It is visible by design; read it before you build.

## What is *not* in this unit

- No state-management libraries (Redux, Zustand, MobX, and similar). This course does not use them.
- No `useReducer`, no context performance tuning, no splitting one context into many.
- No server data or authentication context. That is beyond this course's scope.
- We do not treat context as a general replacement for props. If you leave thinking "context is for everything," this unit has failed its main goal.

## Next unit

**U28 — Custom hooks** — giving a reusable behavior a name, so you stop copying the same state logic between components.
