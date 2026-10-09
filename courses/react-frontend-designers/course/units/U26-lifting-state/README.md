# U26 — Lifting state

**Phase 5 — Interaction and polish**

## Where you are

You can build components, pass them props, hold small pieces of changing data with `useState`, and render lists with `map`. Now you meet a very common design problem: **two parts of the screen need to agree about the same piece of data**. This unit shows the standard React answer — moving the data to their closest shared parent — and the vocabulary for it.

This is the first unit of Phase 5. The ideas here repeat in every real interface you will build.

## What you will be able to do

- Explain what "lifting state up" means and why it is necessary.
- Identify the **closest common parent** of two components that share data.
- Move a piece of `useState` from a child into a parent.
- Pass a value **down** to a child with a prop.
- Pass a **callback function** **up** to a child with a prop, so the child can ask the parent to change something.
- Build a search box that filters a list — the classic worked example of this pattern.

## What you need already

- **U13** — props as component "design properties."
- **U14** — composing components into a page.
- **U15** — rendering lists with `map`.
- **U16** — conditional rendering (show/hide by rule).
- **U17** — events and state with `useState`.
- **U18** — forms and controlled inputs.

If any of those feel shaky, re-open that README's Vocabulary table first. This unit builds directly on all of them.

## Time and energy

About **90–120 minutes**. This is the unit where "my data is in the wrong place" starts to make sense, and that click takes a little time. Take a break after the worked example. Confusion here is normal and expected.

## Why this exists

In a design tool, two frames on the same page can show "the same thing" without any code thinking about it. On the web, each component literally holds its own separate copy of any data you give it. If a search box and a result list each held their own copy of "the search text," they could drift apart — the box shows one word, the list shows results for another.

The human problem: **shared data must live in one place so it cannot disagree with itself.** Lifting state is how React keeps several parts of the screen in sync.

Without this pattern, you would copy the data into every component, then write extra code to keep all the copies identical. That extra code is where bugs live. Lifting state removes the copies.

## Plain-language teaching

### The setup: a search box and a list

Picture a simple screen:

- A **search box** at the top.
- A **list of products** below it.

You want typing in the box to narrow the list. That means both parts depend on the same value: the current search text.

If the search box holds the text in its own `useState`, the list has no way to see it. Components cannot reach sideways into each other and grab data. Data only travels through **props**, and props flow from parent to child.

### The rule

> **Whichever component owns the data must be a parent of every component that needs it.**

The box and the list are siblings. The data cannot live in either one, because the other cannot see it. So we move the data **up** to the parent that contains both. That parent is their **closest common parent**.

Then:

- The parent passes the value **down** to the list as a normal prop.
- The parent passes the value and a **callback** down to the box.
- When the box wants to change the value, it calls the callback. The parent's `useState` updates. The parent re-renders, and both children receive the new value.

This "down with values, up with events" flow is often written as **"data down, actions up."**

### What a callback prop is

A **callback** is a function you pass to another piece of code so it can call it later. A **callback prop** is just that: you pass a function as a prop value, and the child calls it when something happens.

You already use event handlers (`onClick={...}`). A callback prop is the same idea, except the function comes from the parent instead of being written inside the child.

```jsx
function SearchBox({ value, onValueChange }) {
  return (
    <input
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
    />
  );
}
```

The child does not know or care *what* `onValueChange` does. It only knows to call it with the new text. This keeps the child reusable: the same `SearchBox` works for products, people, or messages, because the parent decides what the change means.

### What "single source of truth" means

**Single source of truth** means exactly one piece of code holds the real value. Everywhere else reads it through props.

If a screen shows the same data in three places and each place keeps its own copy, you have three sources of truth and they will eventually disagree. One source, shown in three places, cannot disagree with itself.

This is the same instinct as using one shared Color Style in a design tool instead of typing the hex value into forty layers. One variable, many readers.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Lifting state up | Moving `useState` from a child into a parent so several children can share it | Not about "higher" on screen; it means higher in the component tree |
| Closest common parent | The nearest parent component that contains every component needing the data | Not necessarily the top of your app |
| Sibling components | Components rendered side by side under the same parent | They cannot pass data to each other directly |
| Callback prop | A function passed as a prop so a child can notify the parent | Not an event handler written inside the child |
| Data down, actions up | Values flow to children; changes are requested back from children | Not a law of physics — a convention that prevents tangled data |
| Single source of truth | Exactly one place stores the real value | Not "one place draws it"; it may be drawn in many places |
| Controlled component | An input whose value comes from state and whose changes go back to that state | Not a component you dragged with a mouse |

## Worked example

A complete, self-contained example. Three components: `App` (owns the state), `SearchBox` (reads and requests changes), and `ProductList` (reads the value).

**File:** `src/App.jsx`

```jsx
import { useState } from "react";
import SearchBox from "./SearchBox";
import ProductList from "./ProductList";

const PRODUCTS = [
  { id: 1, name: "Desk lamp" },
  { id: 2, name: "Desk mat" },
  { id: 3, name: "Floor lamp" },
  { id: 4, name: "Chair" },
];

export default function App() {
  const [query, setQuery] = useState("");

  const visible = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      <h1>Products</h1>
      <SearchBox value={query} onValueChange={setQuery} />
      <ProductList products={visible} />
    </main>
  );
}
```

**File:** `src/SearchBox.jsx`

```jsx
export default function SearchBox({ value, onValueChange }) {
  return (
    <label>
      Search
      <input
        type="text"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder="Type a product name"
      />
    </label>
  );
}
```

**File:** `src/ProductList.jsx`

```jsx
export default function ProductList({ products }) {
  if (products.length === 0) {
    return <p>No products match that search.</p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

**How to run it:** in your project folder, start the dev server with `npm run dev`, then open the address it prints (usually `http://localhost:5173`). The command is the same on Windows, macOS, and Linux.

### Why every line is where it is

- `const [query, setQuery] = useState("")` lives in `App` because `App` is the parent of both children. This is the single source of truth.
- `PRODUCTS` is a plain array. It does not change, so it does not need state.
- `visible` is **derived** data — it is computed from `query` and `PRODUCTS` every render. We do not store it in state. Storing derived data in state would create a second source of truth that can fall out of date. If this idea is new, that is fine: the rule for now is "if you can calculate it from existing state, do not make it its own state."
- `<SearchBox value={query} onValueChange={setQuery} />` passes the current text **down** as `value`, and the setter **down** as `onValueChange`. Passing `setQuery` directly is allowed; we could also wrap it in a new function.
- In `SearchBox`, `onChange` fires on every keystroke. It calls `onValueChange` with the typed text. The child never stores the text itself — it asks the parent to.
- In `ProductList`, we receive the already-filtered `products`. The list does no filtering; it just draws what it is given.

**What success looks like:** the page shows a heading, a search box, and four products. Typing `de` leaves "Desk lamp" and "Desk mat." Typing `zzz` shows "No products match that search." The input always shows exactly what you typed.

## Common errors

### Error: `Warning: A component is changing an uncontrolled input to be controlled`

**When it happens:** you set `value={query}` on the input, but `query` starts as `undefined` (perhaps you wrote `useState()` with no starting value, or forgot to pass `value` from the parent).

**Decoded:** React is saying the input started with no value (uncontrolled) and then suddenly received one (controlled). It refuses to guess which you meant.

**Fix:** give the state an honest starting value, typically an empty string: `useState("")`. And check the prop name matches on both sides.

### Error: `setQuery is not a function`

**When it happens:** you passed the value down but forgot the callback, or you named the prop differently in the two files.

**Decoded:** inside `SearchBox`, `onValueChange` is `undefined`, so calling it fails. Usually a spelling mismatch: parent passes `onChange` but child reads `onValueChange`.

**Fix:** make the prop name identical in the parent's JSX and the child's parameter list. Pick one name and use it in both places.

### Error: typing does nothing, no error shown

**When it happens:** the input is `value={value}` but you never pass `onValueChange`, or the parent never uses the new value.

**Decoded:** a controlled input with no way to send changes back is frozen. It shows the state, but nothing updates the state. This is called a **read-only input**.

**Fix:** confirm the callback prop is passed and that it calls the state setter.

### Error: the list still shows everything

**When it happens:** you filter in the wrong component, or you pass the full `PRODUCTS` array to the list instead of `visible`.

**Decoded:** the list faithfully draws whatever it is handed. If it is handed everything, it draws everything.

**Fix:** confirm the filter runs in the parent and the *filtered* array is the prop. Add a temporary `console.log(visible)` to see what the parent computed.

## Checkpoints

Answer these before the assignment. If you can answer all four, you are ready.

1. Why can't the search box own the search text if the list also needs it?
2. In the worked example, which component holds the single source of truth? Why that one?
3. What does the child send upward, and what does the parent send downward?
4. Why is `visible` calculated every render instead of stored in `useState`?

## Practice exercises

### P1 — Read and predict

Without running anything, look at the worked example and predict the list when the box contains `"la"`. Then check against the code. Which products match, and why? (Hint: "lamp" contains "la"; "mat" does not.)

### P2 — Change one value

Add a fifth product to `PRODUCTS`. Predict whether the search still filters correctly, then run it. Explain in one sentence why no other code changed.

### P3 — Fill in the blank

A `SearchBox` below has a gap. Write the missing line so typing updates the parent's state.

```jsx
export default function SearchBox({ value, onValueChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => __________}
    />
  );
}
```

### P4 — Write from a specification

Write a `Toggle` child that receives `isOn` and `onToggle` as props and shows a button labelled `"On"` or `"Off"`. The parent stores `isOn` in `useState`. You write both parent and child. This is the same pattern as search, with a boolean instead of a string.

### P5 — Fix a broken example

```jsx
export default function App() {
  return (
    <div>
      <SearchBox />
      <ProductList products={PRODUCTS} />
    </div>
  );
}

function SearchBox() {
  const [query, setQuery] = useState("");
  function handleChange(event) {
    setQuery(event.target.value);
  }
  return <input value={query} onChange={handleChange} />;
}
```

This runs, but typing does not change the list. Fix the broken example. Write down each problem you found and how you knew.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). The rubric is not a secret; read it before you start.

## What is *not* in this unit

- No `useContext` yet — that is **U27**.
- No custom hooks yet — that is **U28**.
- No animation, transitions, or `useEffect`.
- We do not cover global state libraries (Redux, Zustand, and similar). This course does not need them.
- We do not cover "render props" or other advanced sharing patterns.

## Next unit

**U27 — Context (light)** — when you would otherwise pass a prop through many layers of components that do not care about it.
