# U19 — Side effects with useEffect

**Phase 3 — Components and data**

## Where you are

You can respond to events and hold state (U17), and bind state to form fields (U18). So far, everything a component does happens either while it renders JSX or in response to a user action. This unit covers the third case: code that runs **after** rendering, for reasons that reach outside the component — like changing the browser tab's title.

This unit is deliberately **light and honest**. `useEffect` is famously over-taught and over-used, and a lot of its reputation comes from trying to do too much with it. We teach what a side effect is, the safe shape of `useEffect`, the dependency array, a one-line cleanup, and one decoded failure. We do **not** teach data fetching here.

## What you will be able to do

- Explain what a "side effect" is and give two examples.
- Use `useEffect` to run code after render.
- Explain what an empty dependency array (`[]`) means.
- Mention cleanup and know when it is needed.
- Read and decode the classic infinite-loop error caused by an effect that updates state.

## What you need already

- **U12** — JSX and curly braces.
- **U17** — `useState`, setters, and the re-render idea (essential — effects live and die by re-renders).
- **U18** — Events and controlled inputs (we reuse state and handlers).

## Time and energy

About **60–80 minutes**. Short on new syntax, heavy on an idea that is easy to misapply. The most valuable thing you will take away is a sense of *when not to reach for `useEffect`*.

## Why this exists

Rendering produces the UI. That is a component's main job. But sometimes you need to do something that is **not** producing UI:

- change the browser tab's title to match the page,
- log something for debugging,
- start a timer,
- read or write to storage,
- (later) fetch data from a server,
- set up a subscription.

These are called **side effects**: things that reach outside the pure job of turning state into on-screen elements. The human problem is timing: if you change the tab title *while* rendering, you are intermixing an outside-world action with drawing the screen, which leads to confusing bugs. React gives you a controlled place to run side effects **after** the screen has been drawn: `useEffect`.

A good mental model from design tools: rendering is drawing the frame; effects are the automations that fire *after* the frame is drawn — like a prototype "on load" action or a plugin that runs once the screen appears.

## Plain-language teaching

### What a side effect is

A **side effect** is any action a component takes that is not "compute and return JSX." Two examples we can run today:

- Setting `document.title` (the text in the browser tab).
- Logging to the console (`console.log`).

Both touch the world *outside* the component. Both are fine to do — just not during rendering.

To see the outside world here, we need one new vocabulary item. **`document`** is the browser's representation of the whole page (this is the **DOM**, met back in U02). `document.title = "..."` sets the tab title. In plain JavaScript (U05), assigning to `document.title` is how you change it. React does not give you a special way to do this; it is a normal, outside-the-component assignment.

### `useEffect` basics

`useEffect` is a hook (U17). Like `useState`, you import it from React and call it at the top level of your component:

```jsx
import { useEffect, useState } from "react";

useEffect(() => {
  // code that runs after render, side-effect territory
});
```

Read it as: "after every render of this component, React, please run this function."

The function you pass is called the **effect function** (or just "the effect"). React runs it *after* the browser has drawn the current output, so you never block or corrupt the render.

### Re-running and the dependency array

By default, the effect runs after **every** render. Often you do not want that; you want it to run only when certain values change. You control this with the second argument: the **dependency array**.

```jsx
useEffect(() => {
  document.title = "Count: " + count;
}, [count]);
```

The array `[count]` lists the values the effect depends on. React compares this list to the previous render's list. The effect runs again only if a listed value changed.

Two special cases you must know:

- **`[]` (empty array)** — a list of no dependencies. The effect runs **once, after the first render**, and not again. This is the shape for setup that should happen on mount.
- **No array at all** — the effect runs after every render. This is the shape that most often causes bugs, because if the effect changes state, you get a loop (see Common Errors).

(The word **mount** means "when the component first appears on screen"; **unmount** means "when it disappears.")

### Cleanup (a mention, not a deep dive)

If your effect starts something that needs stopping — a timer, a subscription, an event listener — you return a function from the effect. That function is the **cleanup function**, and React calls it before re-running the effect and when the component unmounts:

```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);
}, []);
```

For a small course project you may never need this. Know that it exists, know the shape (return a function), and know it matters most for timers and subscriptions. That is the honest scope here.

### When *not* to use an effect

A surprising amount of beginner trouble comes from using `useEffect` for things that need no effect at all.

- To compute a value from props or state, just compute it during render: `const total = price * quantity;`.
- To run code *in response to a click*, put it in the handler (U17), not an effect.
- To show or hide something by rule, use conditional rendering (U16).

The rule of thumb: **effects are for reaching outside the component — the browser, the network, timers — not for reorganizing your own data.** If you cannot name what outside thing the effect touches, you probably do not need it.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Side effect | An action outside "compute and return JSX" | Not a bug; a category of legitimate work |
| `useEffect` | Hook to run code after render | Not a place to calculate values for render |
| Effect function | The function you pass to `useEffect` | Runs after paint, not during render |
| Dependency array | Second argument listing values the effect watches | `[]` means once; missing array means every render |
| `[]` | Empty dependency array — run once after first render | Not "run never" |
| Mount | When a component first appears | Not a filesystem mount |
| Unmount | When a component is removed | Cleanup runs here |
| Cleanup function | A function returned from an effect to undo it | Not required unless you started something |
| `document.title` | The browser tab's text (a real side effect target) | Part of the DOM (U02), not a React feature |
| Infinite loop | An effect that triggers a render that re-triggers the effect | Decoded below |

## Worked example

We will build a component whose effect updates the browser tab title to follow a counter.

**`src/CounterTitle.jsx`:**

```jsx
// src/CounterTitle.jsx
import { useEffect, useState } from "react";

function CounterTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = "Count: " + count;
  }, [count]);

  return (
    <section>
      <h2>Watch the browser tab</h2>
      <p>Count is {count}</p>
      <button onClick={() => setCount(count + 1)}>Add one</button>
    </section>
  );
}

export default CounterTitle;
```

Line by line:

- `import { useEffect, useState } from "react";` — both hooks come from React.
- `const [count, setCount] = useState(0);` — state (U17), starting at `0`.
- `useEffect(() => { document.title = "Count: " + count; }, [count]);` — after render, set the tab title. The dependency array `[count]` says: re-run this effect whenever `count` changes.
- `document.title = "Count: " + count;` — a real side effect: it reaches outside React and changes the browser tab.
- `onClick={() => setCount(count + 1)}` — the click changes state, which re-renders, which re-runs the effect, which updates the title. Follow that chain; it is the whole point.

**`src/App.jsx`:**

```jsx
// src/App.jsx
import CounterTitle from "./CounterTitle.jsx";

function App() {
  return <CounterTitle />;
}

export default App;
```

**Run it** (U09):

```text
npm run dev
```

Same command on every OS; only the terminal app differs.

**What success looks like:** The page shows "Count is 0," and the browser tab reads `Count: 0`. Click "Add one": the number and the tab title both update to `Count: 1`, then `Count: 2`, and so on. The tab text follows the state.

**A design-tool parallel:** an "on change" automation attached to a variable, updating something outside the frame — the document itself.

**Try this variation:** change `[count]` to `[]`. Now the title is set once to `Count: 0` and never updates, even as the number changes. That is what an empty dependency array means: run once.

## Common errors

### Error 1 — Infinite loop (effect sets state, no/wrong dependency)

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  });

  return <p>{count}</p>;
}
```

There is no dependency array, so the effect runs after **every** render. The effect calls `setCount`, which causes a render, which runs the effect again, forever. React stops it and throws:

```text
Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
```

**Decode it, piece by piece:**

- **"Maximum update depth exceeded"** — the component updated itself too many times in a row.
- **"calls setState inside useEffect"** — the effect changed state.
- **"doesn't have a dependency array, or one of the dependencies changes on every render"** — the two usual causes: a missing array (runs every time), or an array whose contents are always "new" so React always sees a change.

**How to fix:** Decide what the effect truly depends on and list it. If the effect is setup that should run once, use `[]`. And beware: if the effect genuinely must set state, make sure it does so only under a condition, not unconditionally after every render.

### Error 2 — A dependency that is "new" every render

```jsx
useEffect(() => {
  // ...
}, [user]);
```

where `user` is an object recreated on each render (for example `const user = { name: "Ada" };` inside the component). Even if the values inside look identical, React sees a brand-new object each render, so the effect re-runs every time — which can loop.

**Decode it:** Same "Maximum update depth exceeded" message. The subtle part is the cause: the dependency *is* listed, but it changes on every render.

**Fix:** Depend on the specific values you need (`user.id`) rather than a whole object, or create the object outside the component if it does not change. (This is a known sharp edge; you are not expected to master it now.)

### Error 3 — Doing render work inside an effect

```jsx
useEffect(() => {
  const total = price * quantity;
  setTotal(total);
}, [price, quantity]);
```

This works but is a roundabout, bug-prone way to compute a value that could simply be `const total = price * quantity;` during render. It causes an extra render and can loop if written carelessly.

**Fix:** If you can compute it from current props and state, compute it in the component body. Save `useEffect` for genuinely outside-the-component actions.

### Error 4 — Forgetting cleanup for a timer

```jsx
useEffect(() => {
  setInterval(() => console.log("tick"), 1000);
}, []);
```

You started a timer and never stopped it. It keeps running even if the component is removed, leaking work.

**Fix:** Return a cleanup function:

```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);
}, []);
```

## Checkpoints

1. In one sentence, what is a side effect?
2. When does an effect with `[]` run, and when does an effect with no array run?
3. Why can an effect that calls `setCount` unconditionally create an infinite loop?
4. Name one thing people often put in `useEffect` that should not be there.

## Practice exercises

### P1 — Read and predict

Predict what the browser tab reads after: page loads, click once, click again — for the worked example. Then predict what it reads if you change `[count]` to `[]` and click twice.

### P2 — Change one value, observe

Change the effect body to `document.title = "Hello!";` with `[count]` still in place. What updates the title now? Then change the array to `[]` with the original body and observe.

### P3 — Fill in the blank

Make the tab title always show the current `name` from a text field:

```jsx
const [name, setName] = useState("");

useEffect(() => {
  ____ = "Name: " + name;
}, [____]);
```

### P4 — Write from a specification

Create `Clock.jsx`: a component that, on mount, uses `setInterval` to update a `seconds` state every second, and displays the seconds. Include a cleanup function with `clearInterval`. (This combines the timer pattern with state; keep it small.)

### P5 — Fix the broken example

This component loops forever. Fix it and explain in one sentence why it looped.

```jsx
import { useEffect, useState } from "react";

function Ticker() {
  const [n, setN] = useState(0);

  useEffect(() => {
    setN(n + 1);
  });

  return <p>{n}</p>;
}
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No data fetching (`fetch`), no loading states, no API calls — deliberately deferred.
- No `useRef`, `useMemo`, `useCallback`, or other hooks.
- No deep cleanup patterns or subscription management — only the shape is shown.
- No global side effects or state management libraries.
- No explanation of React's internal scheduling; we treat effects as "run after render."

## Next unit

**U20 — Styling options in a React app** (Phase 4). That closes Phase 3: you can now configure components with props, compose them, render lists and conditions, respond to events, hold state, build forms, and run a careful side effect. You can build a genuinely interactive single page. Phase 4 turns to **styling and design** — carrying your design system into a React app. U20 surveys how styling is done, including plain CSS, and picks one clear recommendation.
