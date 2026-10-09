# U17 — Events and state with useState

**Phase 3 — Components and data**

## Where you are

Everything so far has been fixed: props come in (U13), and the page shows what it shows. Nothing the user does changes it. This unit adds the two ideas that bring a page to life: **events** (reacting to a click or keystroke) and **state** (values a component remembers and changes over time).

This is the biggest conceptual jump in Phase 3. If it feels like more than one idea at once, that is because it is — but the two ideas genuinely need each other, so we take them together, slowly.

## What you will be able to do

- Attach a **handler function** to a JSX element so it runs on a click (`onClick`).
- Explain what a **state variable** is and why a plain variable will not update the screen.
- Create state with **`useState`** and read it in JSX.
- Update state with its setter and understand the **re-render** that follows.
- Build a counter and a toggle.
- Explain the rule: never change state directly; use the setter.

## What you need already

- **U05** — JavaScript values, variables, and functions (state is variables; handlers are functions).
- **U12** — JSX and curly braces.
- **U13** — Props.
- **U14** — Composition.
- **U16** — Conditional rendering (a toggle is conditional rendering driven by state).

## Time and energy

About **90–120 minutes**, split over two sittings if you like. This unit is longer because it introduces the most important idea in React after components themselves. Re-reading is normal here. If your first counter does not work, you are in excellent company.

## Why this exists

Think about a Figma prototype. You connect a button to a "Change to" interaction so that clicking it flips the design to a different variant. The design documents two looks; the prototype lets a viewer move between them.

A real interface does this *for real*, with real data, and remembers the result. When a user clicks "Add to cart," the cart count must go from 2 to 3 and the screen must update. When a user toggles dark mode, the page must remember and show dark.

The human problem: **an interface must remember things that change while the user uses it, and redraw itself when they do.** Memory that changes = state. React redrawing = re-render. Wiring a user action to a change = an event handler. Those three pieces are this unit.

## Plain-language teaching

### Events and handlers

An **event** is something the user does: a click, a key press, moving the mouse, submitting a form. React lets you say "when this event happens on this element, run this function."

A **handler** (also called an **event handler**) is the function you want to run. You attach it with a special prop whose name starts with `on`:

```jsx
<button onClick={handleClick}>Add</button>
```

Read it as: "on a click of this button, run `handleClick`."

Then you define the handler. A handler takes no special arguments for a simple click:

```jsx
function handleClick() {
  alert("Clicked!");
}
```

In modern React, handlers are usually arrow functions (U07), often written right on the element:

```jsx
<button onClick={() => alert("Clicked!")}>Add</button>
```

**Crucial detail:** you pass the function itself, not the result of calling it.

- `onClick={handleClick}` — correct: hands React the function to call later.
- `onClick={handleClick()}` — wrong: calls the function *now*, during rendering, and hands React `undefined`. This is one of the most common early React bugs.

### Why a plain variable fails

Suppose you try to store a count in an ordinary variable and change it on click:

```jsx
function Counter() {
  let count = 0;
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => { count = count + 1; }}>Add</button>
    </div>
  );
}
```

This looks right and does nothing. Clicking runs, `count` becomes `1`, and then... the screen still says `0`.

Why? Because React only redraws a component when something React is *tracking* changes. A plain variable is invisible to React. Changing it does not tell React "redraw." React rerenders this component only if a prop changed, a state value changed, or a parent re-rendered. A plain `let` is none of those, so the screen never updates.

Even worse, on the next render a fresh `count = 0` runs anyway, wiping your change.

### Enter `useState`

`useState` is a React **hook**. A **hook** is a special function that starts with `use` and lets a component hold onto React features (like state) across renders. You import it from React:

```jsx
import { useState } from "react";
```

Then you call it inside your component:

```jsx
const [count, setCount] = useState(0);
```

Let's unpack that single line, because it is dense:

- `useState(0)` — create a piece of state, with an **initial value** of `0`.
- It returns an **array of two things**: the current value and a setter function.
- `const [count, setCount] = ...` — **array destructuring** (U07) pulls those two things into names you choose. `count` is the current value; `setCount` is the function you call to change it.
- By convention the setter is named `set` + the value name: `count`/`setCount`, `isOpen`/`setIsOpen`, `query`/`setQuery`.

A **state variable** is special: React remembers its value between renders, and when you change it through the setter, React **re-renders** the component — redraws it with the new value.

### The re-render idea

A **re-render** is React running your component function again to produce updated JSX. When you call `setCount(1)`, React:

1. stores the new value,
2. re-runs your component function,
3. this time `count` is `1`, so the JSX contains `1`,
4. updates the screen.

That is the whole loop. Nothing magical, but it is the engine of every interactive interface you have ever used.

### The rules of state

1. **Never change state directly.** Do not do `count = count + 1` or `items.push(x)`. React will not know, and the screen will not update. Instead call the setter: `setCount(count + 1)`.
2. **Call the setter, not the value.** `setCount(5)` replaces the value with 5. `setCount(count + 1)` replaces it with one more than the current value.
3. **Do not call hooks conditionally or in loops.** `useState` must run in the same order every render, so keep it at the top level of your component, never inside an `if` or a loop. (This is why the early-return pattern from U16 goes *after* your hooks.)
4. **State is private to the component.** A parent cannot read a child's state directly. Sharing comes later (U26).

### A counter and a toggle

A **counter** uses a number:

```jsx
const [count, setCount] = useState(0);
// ...
<button onClick={() => setCount(count + 1)}>Add one</button>
```

A **toggle** uses a boolean:

```jsx
const [isOn, setIsOn] = useState(false);
// ...
<button onClick={() => setIsOn(!isOn)}>{isOn ? "On" : "Off"}</button>
```

The toggle is conditional rendering (U16) fed by state: the label shows "On" or "Off" based on `isOn`, and the click flips the value, which re-renders with the other label.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Event | Something the user does (click, type, submit) | Not an error or an "event log" |
| Handler | The function that runs when an event happens | Attach the function, do not call it |
| `onClick` | The JSX prop for "when clicked" | The HTML attribute is `onclick`; in JSX it is camelCase `onClick` |
| `useState` | A hook that gives a component remembered, changeable value | Not a normal function; must be called at the top level |
| Hook | A React function starting with `use` | Not a CSS class; not a "webhook" |
| Initial value | What the state starts as (e.g. `0`, `false`, `""`) | Only used on the first render |
| State variable | The current value, remembered across renders | Not the same as a prop |
| Setter | The function (`setCount`) used to change state | Never mutate the value directly |
| Re-render | React running the component again to update the screen | Not a browser page reload |
| Mutate | Changing a value in place (e.g. `arr.push`) | React needs a new value via the setter, not a mutation |
| Destructuring | `const [a, b] = ...` pulls items into names | Here it pulls value + setter from `useState` |

## Worked example

We will build a small counter with a toggle-able message.

**`src/Counter.jsx`:**

```jsx
// src/Counter.jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  return (
    <section>
      <h2>Counter</h2>

      {!isHidden && <p>Count is {count}</p>}

      <button onClick={() => setCount(count + 1)}>Add one</button>
      <button onClick={() => setCount(count - 1)}>Take one</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <button onClick={() => setIsHidden(!isHidden)}>
        {isHidden ? "Show count" : "Hide count"}
      </button>
    </section>
  );
}

export default Counter;
```

Line by line:

- `import { useState } from "react";` — pulls the hook in. It must be imported to be used.
- `const [count, setCount] = useState(0);` — state number, starting at `0`.
- `const [isHidden, setIsHidden] = useState(false);` — state boolean, starting `false`. Two pieces of state, two hooks, both at the top level.
- `{!isHidden && <p>Count is {count}</p>}` — conditional rendering (U16): if the count is not hidden, show it. `!isHidden` flips the boolean.
- `onClick={() => setCount(count + 1)}` — the arrow function runs *on click*, calling the setter with one more than now. Handing React the arrow function (not calling it) is the key.
- `onClick={() => setCount(0)}` — resets to the initial value.
- `{isHidden ? "Show count" : "Hide count"}` — a ternary (U16) picks the button text from state. Clicking calls `setIsHidden(!isHidden)`, flipping the value and re-rendering with the opposite label.

**`src/App.jsx`:**

```jsx
// src/App.jsx
import Counter from "./Counter.jsx";

function App() {
  return <Counter />;
}

export default App;
```

**Run it** (U09):

```text
npm run dev
```

Same command on every OS; only the terminal app differs.

**What success looks like:** A heading "Counter," the text "Count is 0," and four buttons. Clicking "Add one" makes the number go up; "Take one" makes it go down; "Reset" returns it to 0; clicking "Hide count"/"Show count" makes the text appear and disappear and the button label switch. Every change is instant, with no page reload.

**A design-tool parallel:** you built a prototype variable (`count`) and connected buttons to set it, then bound the text layer to that variable. This is exactly that, running live.

## Common errors

### Error 1 — Calling the handler instead of passing it

```jsx
<button onClick={handleClick()}>Add</button>
```

**What happens:** `handleClick()` runs immediately, while rendering. Then React receives whatever it returned (usually `undefined`) as the handler, so clicks do nothing. If the function's job was to change state, you may also get an infinite render loop and an error about too many re-renders.

**Decode it:** If you see:

```text
Too many re-renders. React limits the number of renders to prevent an infinite loop.
```

that almost always means a function that changes state was called during render — often exactly this `onClick={fn()}` mistake, or calling a setter directly in the component body.

**Fix:** Pass the function: `onClick={handleClick}`. If you need to pass arguments, wrap it in an arrow: `onClick={() => handleClick(id)}`.

### Error 2 — Mutating state directly

```jsx
const [count, setCount] = useState(0);
// ...
onClick={() => { count = count + 1; }}
```

**What happens:** Nothing. The click changes the local variable, but React does not know, so it never re-renders. The screen keeps the old number.

**Decode it:** No error at all — just a dead button. This is the exact "plain variable" trap from earlier, now with state. The fix is not about React being fussy; it is that React must be *told* to update.

**Fix:** `setCount(count + 1)`.

### Error 3 — Changing an array or object in place

```jsx
const [items, setItems] = useState([]);
// wrong:
onClick={() => { items.push("New"); }}
```

**What happens:** Same dead screen. `push` mutates the existing array; React compares values and sees the *same* array, so it does not re-render.

**Fix:** Create a **new** value and set it:

```jsx
onClick={() => setItems([...items, "New"])}
```

`[...items, "New"]` (the spread from U06/U07) makes a new array with a copy of the old items plus the new one. New array, so React notices.

### Error 4 — Hook inside a condition

```jsx
if (isSignedIn) {
  const [count, setCount] = useState(0);
}
```

**What happens:** React errors with something like:

```text
React has detected a change in the order of Hooks called by ...
```

Hooks must run in the same order every render. Putting one inside an `if` means it sometimes runs and sometimes does not, which breaks React's bookkeeping.

**Fix:** Call all hooks at the top level, before any early returns or conditions.

## Checkpoints

1. What is the difference between `onClick={handleClick}` and `onClick={handleClick()}`?
2. Why does changing a plain `let` variable not update the screen?
3. What does `useState` return, and what do we do with each part?
4. Why must you call `setCount` instead of writing `count = count + 1`?

## Practice exercises

### P1 — Read and predict

For the worked example, predict the screen after: (a) clicking "Add one" three times, (b) clicking "Reset," (c) clicking "Hide count," then "Add one" twice, then "Show count."

### P2 — Change one value, observe

Change the counter's initial value from `0` to `10`. Re-run and observe. Then change `setCount(count + 1)` to `setCount(count + 2)` and click a few times.

### P3 — Fill in the blank

Complete the toggle so the button label flips between "Lights on" and "Lights off":

```jsx
import { useState } from "react";

function Lights() {
  const [____, ____] = useState(____);

  return (
    <button onClick={() => ____(!isOn)}>
      {____ ? "Lights on" : "Lights off"}
    </button>
  );
}
```

### P4 — Write from a specification

Create `Like.jsx`: a button that shows "♡ Like (0)" and, on click, adds one to a `likes` state and shows "♥ Liked (n)". Keep it to one state variable and explain your choice in a comment-free sentence in `answers` of the assignment.

### P5 — Fix the broken example

This component is meant to count clicks but the number never changes. Fix it and explain the cause in one sentence.

```jsx
import { useState } from "react";

function Clicks() {
  const [n, setN] = useState(0);

  function addOne() {
    n = n + 1;
  }

  return <button onClick={addOne}>Clicked {n}</button>;
}
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No forms or text inputs bound to state — that is U18.
- No `useEffect`, timers, or data fetching — that is U19.
- No sharing state between components (lifting state) — that is U26.
- No animation between states — U29.
- No deeper state patterns (reducers, context) — later phases.

## Next unit

**U18 — Forms and controlled inputs** (tying state to text inputs so the page reflects what the user types).
