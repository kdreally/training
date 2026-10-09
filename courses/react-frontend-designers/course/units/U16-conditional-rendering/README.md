# U16 — Conditional rendering

**Phase 3 — Components and data**

## Where you are

Your components now take props and render lists from data (U13–U15). But everything you have built shows *all* of its content, always. Real interfaces show different things in different situations: a "Delete" button only when an item is selected, a welcome message only when the user is signed in, a "No results" message only when the list is empty.

Showing and hiding by rule is called **conditional rendering**, and that is this unit.

## What you will be able to do

- Explain what conditional rendering is and where designers already use it.
- Show or hide a piece of JSX with `&&`.
- Choose between two pieces of JSX with a ternary (`condition ? a : b`).
- Exit a component early to render a whole different view.
- Design and implement an empty state versus a loaded state.

## What you need already

- **U05** — JavaScript values and truthiness (what counts as "true" or "false").
- **U12** — JSX and curly braces.
- **U13** — Props.
- **U14** — Composition.
- **U15** — Lists with `map` (the empty-state exercise builds directly on it).

## Time and energy

About **60–90 minutes**. The syntax is short; the judgment is the real work. Deciding *what* a state should look like is design work you already know how to do. Take a break after the teaching section before the exercises.

## Why this exists

As a designer, you already think in **states and variants**. A button has default, hover, pressed, and disabled states. A table has loading, empty, populated, and error states. A screen has a signed-in and signed-out version. You have designed these differences for years.

The human problem: a live interface must *choose* which state to show, at the moment it renders. A static design file shows all your variants side by side. A real app can only show one at a time, based on what is true right now.

In design tools, you flip between variants manually (or with prototype logic). In React, **JavaScript conditions** make the choice. Conditional rendering is simply: "if this is true, show this; otherwise, show that."

## Plain-language teaching

### A quick reminder: what counts as true or false

JavaScript treats some values as **truthy** (behave like true) and some as **falsy** (behave like false) when used in a condition (U05). The falsy values you will meet most:

```text
false, 0, "" (empty text), null, undefined, NaN
```

Everything else is truthy — including the text `"0"`, any non-empty string, and any array or object (even an empty array!).

This matters immediately, because a common bug is showing something when a list is empty. An empty array `[]` is truthy, so `items && ...` would show the content. We handle the empty case with `.length`.

### Three tools, three jobs

**Tool 1 — `&&` for "show this only if."**

```jsx
{isSignedIn && <p>Welcome back!</p>}
```

Read `&&` as "and": *if the left side is truthy, render the right side; otherwise render nothing.* If `isSignedIn` is `false`, React renders nothing for this spot. This is for showing or hiding a single thing.

**Tool 2 — the ternary for "show one of two."**

```jsx
{isSignedIn ? <Dashboard /> : <LoginPrompt />}
```

A **ternary** has the shape `condition ? valueIfTrue : valueIfFalse`. Read it aloud as "if condition, then valueIfTrue, else valueIfFalse." Use it when you must pick between exactly two options.

**Tool 3 — early return for "this component is an entirely different view."**

```jsx
function Profile({ user }) {
  if (!user) {
    return <p>Please sign in.</p>;
  }

  return (
    <section>
      <h1>{user.name}</h1>
      <p>{user.role}</p>
    </section>
  );
}
```

An **early return** is a `return` placed before the rest of the function, usually inside an `if`. When the condition is met, the function returns immediately and skips the rest. Use it when the alternative view is large enough that nesting a ternary would hurt readability.

You now have three tools. Choosing among them is a readability decision, not a correctness one — all three can often express the same idea.

### The design bridge: states

Think of each condition as choosing a **state** (like a variant) of the interface:

| State | Condition | What shows |
|-------|-----------|------------|
| Empty | The list has no items | A friendly "nothing here yet" message + a call to action |
| Loaded | The list has items | The items |
| Signed out | No user | Sign-in prompt |
| Signed in | A user | Their profile |

A good conditional covers every state a user can be in. The classic mistake is designing the beautiful loaded state and forgetting the empty and error states — then shipping a screen that shows a blank void to a brand-new user. Conditional rendering is where you *build* the empty state you (hopefully) designed.

### Combining with `.map` (the empty-state pattern)

From U15 you can render a list. The empty state is a condition on the same data:

```jsx
{products.length === 0 ? (
  <p>No products yet. Add one to get started.</p>
) : (
  <ul>
    {products.map((product) => (
      <li key={product.id}>{product.name}</li>
    ))}
  </ul>
)}
```

- `products.length === 0` — `.length` counts the items; `===` checks equality. Both are plain JavaScript (`length` from U06).
- If the array is empty, render the empty-state message.
- Otherwise, render the mapped list.
- Note we use the **ternary** here, not `&&`, because we truly need one of two things — the list or the message.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Conditional rendering | Showing different JSX based on a condition | Not CSS `display: none`; the element is not created at all |
| Condition | A value that is truthy or falsy | Not only `true`/`false`; see truthy list |
| Truthy / falsy | How JavaScript treats values in conditions | `[]` and `{}` are truthy; `0`, `""`, `null`, `undefined` are falsy |
| `&&` | "Show the right side only if the left is truthy" | Renders `0` if the left is the number `0` — a classic bug |
| Ternary | `condition ? a : b` — pick one of two | Nesting many ternaries is hard to read; use early return instead |
| Early return | A `return` before the rest of the function | Must be inside a condition to mean anything |
| Empty state | The view shown when there is no data | Not the same as an error state |
| Loaded state | The view shown when data exists | The one everyone remembers to design |
| `===` | Strict equality (same value and type) | `=` assigns; `==` loosens types — prefer `===` |
| `.length` | How many items are in an array or characters in a string | An empty array is truthy, so check `.length`, not the array itself |

## Worked example

We will build a `TaskList` that shows one of three states based on props: a signed-out message, an empty state, or the list.

**`src/TaskList.jsx`:**

```jsx
// src/TaskList.jsx
function TaskList({ isSignedIn, tasks }) {
  if (!isSignedIn) {
    return <p>Please sign in to see your tasks.</p>;
  }

  return (
    <section>
      <h1>Your tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks yet. Enjoy the calm.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;
```

Line by line:

- `function TaskList({ isSignedIn, tasks })` — two props (U13): a boolean and an array.
- `if (!isSignedIn) { return ... }` — the **early return**. `!` means "not" (U05). If the user is not signed in, return the sign-in message and skip everything below. This handles a whole different view cleanly.
- `return ( <section> ... )` — the main view, reached only when signed in.
- `{tasks.length === 0 ? ( ... ) : ( ... )}` — the **ternary**. If there are no tasks, show the empty-state paragraph; otherwise show the list.
- `tasks.map((task) => <li key={task.id}>{task.title}</li>)` — the U15 list, with a stable `key`.

**`src/App.jsx` to try all three states:**

```jsx
// src/App.jsx
import TaskList from "./TaskList.jsx";

const myTasks = [
  { id: "t1", title: "Sketch the empty state" },
  { id: "t2", title: "Check the contrast" },
];

function App() {
  return (
    <div>
      <TaskList isSignedIn={false} tasks={myTasks} />
      <TaskList isSignedIn={true} tasks={[]} />
      <TaskList isSignedIn={true} tasks={myTasks} />
    </div>
  );
}

export default App;
```

**Run it** (U09):

```text
npm run dev
```

Same command on every OS; only the terminal app differs.

**What success looks like:** Three sections stacked: "Please sign in to see your tasks."; "Your tasks" with "No tasks yet. Enjoy the calm."; and "Your tasks" with two list items. One component, three states, driven entirely by its props.

**A design-tool parallel:** you made three variants of one component and switched between them based on a condition, instead of drawing three unrelated screens.

## Common errors

### Error 1 — The accidental zero

```jsx
{count && <p>You have {count} messages</p>}
```

When `count` is `0`, JavaScript evaluates `0 && ...` as `0`, and React renders the number `0` right there on the page — a stray "0" where the message should be hidden. Truthy/falsy: `0` is falsy, so `&&` short-circuits to the left side, which is `0` itself.

**Decode it:** No error message. Just an unexplained `0` on screen. This is one of the most common React mistakes and is worth remembering forever.

**Fix:** Make the left side a real boolean:

```jsx
{count > 0 && <p>You have {count} messages</p>}
```

`count > 0` is always `true` or `false`, so no stray number appears.

### Error 2 — Empty array is truthy

```jsx
{tasks && tasks.map((t) => <li key={t.id}>{t.title}</li>)}
```

You expect nothing when there are no tasks, but React renders an empty `<ul>` (or nothing looks right, but the "empty state" never appears). An empty array `[]` is truthy, so `tasks && ...` proceeds.

**Fix:** Check the length or count:

```jsx
{tasks.length > 0 ? ( /* the list */ ) : ( /* empty state */ )}
```

### Error 3 — Rendering a falsy value by mistake

```jsx
{user.name && <span>{user.name}</span>}
```

If `name` is `undefined` (missing), `undefined && ...` is `undefined`, which React renders as nothing — fine. But if `name` is `""` (empty string) you get nothing, and if it is `0` you get `0`. The fix is the same: make the left side an explicit boolean (`Boolean(user.name)` or a `.length`/comparison check).

### Error 4 — `=` instead of `===` in a condition

```jsx
{isSignedIn = true ? <Dashboard /> : <Login />}
```

`=` assigns; `===` compares. This accidentally *sets* `isSignedIn` to `true` and always shows the dashboard. Some setups will not even error, making it a silent bug.

**Fix:** Use `===` for comparison (or just the boolean itself). Watch for this in `if` statements too.

## Checkpoints

1. What are the three tools for conditional rendering in this unit, and when would you use each?
2. Why can `count && <p>…</p>` show an unwanted "0"?
3. Why is `tasks && ...` the wrong check for an empty list?
4. Name three states a list on an interface might have. Which is most often forgotten?

## Practice exercises

### P1 — Read and predict

Predict what each line shows, then check by putting them in an `App`:

```jsx
{false && <p>Hidden</p>}
{0 && <p>Zero trap</p>}
{"" || <p>Fallback</p>}
{true ? <p>Yes</p> : <p>No</p>}
```

(`||` means "or": if the left is falsy, use the right. You saw it in U05.)

### P2 — Change one value, observe

In the worked example, flip `isSignedIn` on the first `TaskList` from `false` to `true` and back. Observe. Then empty `myTasks` and watch every state change.

### P3 — Fill in the blank

Fill the blanks so a badge shows only when there are unread messages:

```jsx
const unread = 3;

{unread ____ 0 && <span className="badge">{unread}</span>}
```

Now make it safe when `unread` is `0`.

### P4 — Write from a specification

Create `Status.jsx`:

- If a prop `status` is `"loading"`, return `<p>Loading…</p>` (**early return**).
- Otherwise, if `status` is `"error"`, return `<p>Something went wrong.</p>` (another early return).
- Otherwise, return `<p>Ready.</p>`.

Use it in `App` three times to show all three states.

### P5 — Fix the broken example

This shows a `0` on the page when there are no notifications. Fix it and explain why in one sentence.

```jsx
function Bell({ notifications }) {
  const count = notifications.length;
  return <span>{count && <b>{count} new</b>}</span>;
}
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No events, clicks, or toggles that change state over time — that is U17.
- No `useState`; here every condition comes from props or constants.
- No data fetching or loading spinners wired to real requests — that is deferred (U19 mentions effects only lightly).
- No animations between states — U29.
- No CSS-based hiding (`display: none`); we create or skip elements entirely.

## Next unit

**U17 — Events and state with useState** (making the page respond to clicks by remembering values that change over time).
