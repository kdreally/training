# U13 — Props as design properties

**Phase 3 — Components and data**

## Where you are

You can write a component (U11) and read JSX (U12). But every component you have written so far is frozen: a button always says the same words, every time. In this unit you make a component **configurable**, the same way you give a Figma component properties (a text property, a variant, a boolean toggle). The feature that does this in React is **props**.

This is the unit where "a component is like a reusable symbol" stops being a metaphor and becomes literal.

## What you will be able to do

- Say what a prop is, in plain language, and what problem it solves.
- Pass a prop into a component where you use it.
- Read a prop inside the component that receives it.
- Give a prop a default value so the component still works when the prop is not passed.
- Build a reusable `Button` that takes a `label` prop and a `variant` prop.

## What you need already

- **U11** — Writing your first component (function component, `export default`, where `App.jsx` lives).
- **U12** — JSX explained (curly braces `{ }` inside markup mean "put a JavaScript value here").
- **U05** — JavaScript values and functions (a function can take inputs).
- **U07** — Arrow functions and destructuring. We reuse destructuring here; a short reminder is inside this unit, so re-reading U07 is helpful but not required.

If any of those words feel slippery, re-read that unit's vocabulary table first. Props build directly on all of them.

## Time and energy

About **60–90 minutes**. Props are the first idea in this course that makes components feel genuinely powerful, so the "aha" is worth the wait. If it clicks slowly, that is the normal speed. Take a break when your eyes glaze over; nothing here is a race.

## Why this exists

Here is the human problem, and you have felt it in a design tool.

You make a button. You place it on twelve screens. Now marketing says the corner radius changes. In a file where you copied and pasted twelve separate rectangles, you have twelve edits. In a file where you made **one component** and placed twelve **instances**, you edit once.

But a component alone is not enough. The twelve buttons are not identical: some say "Save," some say "Cancel," some are solid, some are outlined. A component that can only ever look one way is useless. You need it to be **configurable per instance**.

Design tools answer this with **component properties** — text, boolean, and variant properties you set on each instance. React answers it with **props**. Same idea, new word. Props are the reason we can build one `Button` and use it twenty times with twenty different labels and styles.

Without props, every variation would be a separate hand-made component, and your code would rot exactly like a copied design file full of orphaned layers.

## Plain-language teaching

### What a prop is

A **prop** (short for "property") is an input you give a component when you use it. The component receives the input and uses it to decide what to show.

Compare the two lines:

```jsx
<Greeting />
<Greeting name="Ada" />
```

The first places a `Greeting` with no input. The second places a `Greeting` and hands it the input `name` with the value `"Ada"`. That `name="Ada"` part is a prop.

You are not inventing a new kind of thing. You already pass inputs to components in a design tool when you set the text property of an instance, or switch its variant from "Primary" to "Secondary." Props are that exact activity, written in code.

### A component is a function that takes inputs

In U11 you learned a component is a function that returns JSX. A function can take inputs. So a component can take inputs. That is the whole secret:

```jsx
function Greeting(inputs) {
  return <h1>Hello!</h1>;
}
```

React collects all the props you pass into one object and hands it to your function as the first argument. By strong convention (and so everyone reads each other's code easily), we name that object `props`:

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

Line by line:

- `function Greeting(props)` — declares a component named `Greeting` that receives the props object, called `props`.
- `props.name` — reads the prop named `name` out of that object.
- `{props.name}` — the curly braces say "put this value into the markup here," exactly as taught in U12.
- `<h1>Hello, {props.name}!</h1>` — the heading now depends on what was passed in.

### Passing a prop

"Passing a prop" means writing it on the tag when you use the component:

```jsx
<Greeting name="Ada" />
```

Rules that matter:

- The part before the `=` is the **prop name** (`name`). It must match the name the component reads (`props.name`).
- The part inside the quotes is the **prop value** (`"Ada"`).
- Text values need **quotes**: `name="Ada"`.
- A non-text value (a number, or a variable from U05) goes inside **curly braces**: `count={3}` or `name={someVariable}`.

### Reading a prop with destructuring (the reminder from U07)

Most React code does not write `props.name` again and again. It **destructures** the props in the function's parameter list. Destructuring means "pull named values out of an object into their own variables." U07 taught this. Here is the same component, destructured:

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

`{ name }` means "take the `name` prop out of the props object and give me a variable called `name`." Inside the function you now write `name` instead of `props.name`. Both forms work; destructuring is just shorter and very common, so we use it from here on.

### Defaults: what if the prop is not passed?

If you use `<Greeting />` with no `name`, then `name` is the special JavaScript value `undefined`, and the heading reads `Hello, !`. That is rarely what you want.

A **default value** is a fallback the component uses when a prop is missing. With destructuring, you write it with a single `=`:

```jsx
function Greeting({ name = "friend" }) {
  return <h1>Hello, {name}!</h1>;
}
```

Now `<Greeting />` shows `Hello, friend!` and `<Greeting name="Ada" />` shows `Hello, Ada!`. The default is the design-tool equivalent of a property's starting value when you first drag the component onto the canvas.

### What a prop is *not*

- A prop is **not** something the component changes later. It arrives, the component reads it, and it stays put for that render. If you start changing a component's own values over time, that is a different concept called **state**, which arrives in U17.
- A prop is **not** free-form CSS. It is an input you deliberately named. The cleanest props map to the properties you would offer a designer in a design tool.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Prop | An input passed into a component when you use it | Not the same as a CSS property or a design "layer property," though it plays a similar role |
| Props object | The single object React collects all passed props into | Not something you create yourself; React makes it |
| Prop name | The label before the `=`, like `name` in `name="Ada"` | Must match what the component reads, exactly (case matters) |
| Prop value | What you pass, like `"Ada"` | Text needs quotes; numbers/variables need `{ }` |
| Passing a prop | Writing it on the tag: `<Greeting name="Ada" />` | Not writing it inside the component's own body |
| Destructuring | Pulling named values out of an object into variables | Not a React feature; it is plain JavaScript from U07 |
| Default value | Fallback used when a prop is missing | Only works with destructuring `{ name = "..." }`, not with `props.name = "..."` |
| Component | The reusable definition (the symbol) | Not the same as one use of it |
| Instance | One use of a component, configured by props | In code there is no `instance` keyword; it is just `<Greeting />` on a line |
| `undefined` | JavaScript's "there is no value here" value | Not an error on its own; it just renders as empty text |

## Worked example

We will build a small configurable Button and use it twice. Use the Vite project from U09 and the `src` folder from U10.

**Step 1 — create `src/Button.jsx`:**

```jsx
// src/Button.jsx
function Button({ label = "Button", variant = "primary" }) {
  const className = "button button--" + variant;
  return <button className={className}>{label}</button>;
}

export default Button;
```

Every line, justified:

- `// src/Button.jsx` — the filename as a comment. This file defines one component.
- `function Button({ label = "Button", variant = "primary" })` — declares the component. It destructures two props: `label` (default text `"Button"`) and `variant` (default `"primary"`).
- `const className = "button button--" + variant;` — builds a CSS class name as text. `+` joins strings (U05). If `variant` is `"primary"`, `className` becomes `"button button--primary"`. The `className` attribute is how JSX tags an element with a CSS class (the HTML attribute is called `class` in plain HTML and `className` in JSX, as noted in U12). Styling components in depth is U20; here we only label it.
- `return <button className={className}>{label}</button>;` — returns a real `<button>` element. `{className}` drops the class string in, and `{label}` drops the label text in.
- `export default Button;` — makes the component importable elsewhere (U07, U11).

**Step 2 — use it in `src/App.jsx`:**

```jsx
// src/App.jsx
import Button from "./Button.jsx";

function App() {
  return (
    <div>
      <Button />
      <Button label="Save" />
      <Button label="Cancel" variant="secondary" />
    </div>
  );
}

export default App;
```

- `import Button from "./Button.jsx";` — pulls the component out of the file next to it (U07).
- `<Button />` — no props, so the defaults apply: it shows "Button" as a primary button.
- `<Button label="Save" />` — passes `label`; `variant` still falls back to `"primary"`.
- `<Button label="Cancel" variant="secondary" />` — passes both.

**Step 3 — run it.** In a terminal opened in your project folder:

```text
npm run dev
```

(On all three operating systems the command is identical; the difference is only how you open the terminal — Windows Terminal/PowerShell, macOS Terminal, or a Linux terminal. U09 explains `npm run dev`.)

**What success looks like:** The browser at the address Vite prints (usually `http://localhost:5173`) shows three buttons stacked vertically: "Button," "Save," and "Cancel." The first two carry the primary class, the third the secondary class. If you have no CSS yet, they all look like plain browser buttons — that is expected and correct. What matters is the visible text: each button shows a different label from the same single component.

**A design-tool parallel:** you made one `Button` symbol and placed three instances, setting each instance's text property and one variant. Change the component once, and all instances follow.

## Common errors

### Error 1 — Forgetting to pass the prop (it shows nothing)

```jsx
<Greeting />
```

renders `Hello, !`. The component reads `name`, but nothing passed it, so `name` is `undefined`, and `undefined` renders as empty text.

**Reading it:** There is no red error — the screen just has a hole where text should be. This is the sneakiest kind of problem, because the code is technically valid.

**Fix:** Either pass the prop (`<Greeting name="Ada" />`) or give it a default (`{ name = "friend" }`). Decide which is right for the component: does it *require* the input, or is there a sensible fallback?

### Error 2 — Writing `props.name` as plain text

```jsx
return <h1>Hello, props.name!</h1>;
```

**What happens:** The heading literally reads `Hello, props.name!`. The curly braces are missing, so JSX treats `props.name!` as ordinary text, not as a value to compute.

**Fix:** Wrap the value in braces: `Hello, {props.name}!`. Curly braces are the "put a value here" signal from U12.

### Error 3 — Passing a variable without curly braces

```jsx
<Greeting name=Ada />
```

**What happens:** JSX reads `Ada` as a JavaScript variable, not the text `"Ada"`. Since no variable named `Ada` exists, you get an error in the terminal/browser console mentioning `Ada is not defined`.

**Decode it:** "is not defined" means "I looked for a name and found nothing with that name." The name it lists is the thing it could not find.

**Fix:** Text gets quotes: `name="Ada"`. If you truly meant the value of a variable called `Ada`, it needs braces: `name={Ada}`.

### Error 4 — Using `=` for a default without destructuring

```jsx
function Button(props) {
  const label = props.label = "Button";
  ...
}
```

**What happens:** This does not give `label` a default. It *overwrites* `props.label` with `"Button"`, so every button says "Button" no matter what was passed. Silently wrong.

**Fix:** Defaults belong in the destructured parameter: `function Button({ label = "Button" }) { ... }`.

## Checkpoints

Answer these before the assignment. If you can answer all four, you are ready.

1. In one sentence, what is a prop?
2. In `name="Ada"`, which part is the prop name and which is the prop value?
3. How do you give `label` the default text `"Button"` when the prop is missing?
4. Name one way props are like design-tool component properties, and one way they differ.

## Practice exercises

Ungraded. Struggle is information.

### P1 — Read and predict

Look at this component and prediction prompt. Write down what each of these three headings will say *before* running anything.

```jsx
function Badge({ text, tone = "neutral" }) {
  return <span className={"badge badge--" + tone}>{text}</span>;
}

// predictions for:
// <Badge text="New" />
// <Badge text="Sale" tone="danger" />
// <Badge tone="success" />
```

### P2 — Change one value, observe

Copy the worked example. Change `Button`'s default `label` from `"Button"` to `"Click me"`. Save. Watch the browser update. Then remove the `label` from the second `<Button label="Save" />` and observe. Which default shows now?

### P3 — Fill in the blank

Fill the blanks so the component shows `Hi, Maria`:

```jsx
function Hello({ name }) {
  return <p>Hi, ____</p>;
}

// use it:
<Hello ____="Maria" />
```

### P4 — Write from a specification

Create `src/Tag.jsx`: a component that takes a `label` prop and a `color` prop, with defaults `"Tag"` and `"grey"`. It returns a `<span>` whose `className` is `"tag tag--" + color` and whose text is `label`. Import it in `App.jsx` and use it twice with different labels.

### P5 — Fix the broken example

This component always shows "Button" even when a label is passed. Find and fix the bug, and write one sentence explaining what was wrong.

```jsx
function Button({ label }) {
  label = "Button";
  return <button>{label}</button>;
}
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). It is written for you, not kept secret.

## What is *not* in this unit

- No events, clicks, or `onClick` — that is U17.
- No state, no `useState` — components here never change themselves.
- No list rendering with `map` — that is U15.
- No deep CSS or design-system styling — that is Phase 4.
- No `children` prop (nesting content between tags) — that arrives with composition in U14.

## Next unit

**U14 — Composing components** (taking several small components and assembling them into a page).
