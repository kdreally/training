# U18 — Forms and controlled inputs

**Phase 3 — Components and data**

## Where you are

You can react to clicks and remember values with state (U17). Now we point that same machinery at the most common interaction of all: **typing into a field**. In React, the text you type lives in state, and the input displays that state. This two-way tie is called a **controlled input**, and it is the standard way to build forms.

By the end of this unit you will have a form that reflects exactly what the user types, and that reacts when they submit it.

## What you will be able to do

- Explain what a controlled input is and why React recommends it.
- Bind an `<input>` to state with `value` and `onChange`.
- Build a form that echoes typed text live.
- Submit with `onSubmit` and stop the browser's default page reload using `preventDefault`.
- Decode the "read-only input" and "uncontrolled" warnings.

## What you need already

- **U12** — JSX and curly braces.
- **U13** — Props.
- **U17** — Events, handlers, `useState`, and the re-render idea (this unit is unusable without it).
- **U03** — HTML forms and inputs (we recap the parts we need).

## Time and energy

About **75–100 minutes**. If U17 felt wobbly, pause and re-read its "Why a plain variable fails" and "Enter useState" sections first. Controlled inputs are state plus one new idea: the input's value is *driven by* state.

## Why this exists

A form is where a user gives the app information: a name, an email, a search term, a review. In a design tool you draw a text field with placeholder text and maybe a filled state. But a live field must actually *hold* the characters as they are typed, and let the rest of the page notice them.

The human problem: **the app needs to know what the user is typing, as they type it, so it can validate, preview, enable a button, or filter a list.**

In React, the pattern is: the state is the single source of truth for the field's text. The field displays state; typing updates state; state updates redisplay the field. Because state and field are always in sync, you can never have the screen and the data disagree — which is what makes controlled inputs trustworthy.

## Plain-language teaching

### The parts of an input

An `<input>` in HTML (U03) is a text box. Two attributes matter here:

- `value` — the text currently in the box.
- `onChange` — a handler that runs whenever the text changes (on each keystroke).

With plain HTML, the browser manages the text and you read it later. With React, we take over: **we** store the text in state and feed it back through `value`. That is a **controlled component** — a form element whose value is controlled by React state.

### The controlled input pattern

```jsx
import { useState } from "react";

function NameField() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
  );
}
```

The loop, step by step:

1. State `name` starts as `""` (empty text).
2. The input's `value` is `name`, so it starts empty.
3. The user types "A". The browser fires a **change event**.
4. `onChange` runs. The event object carries the new text at `event.target.value` ("A").
5. `setName("A")` updates state.
6. State changed, so React **re-renders** (U17).
7. The input's `value` is now `"A"`, which matches what the user typed.

This looks like extra work to achieve the same result as plain HTML — and it is. The payoff is that at every moment, `name` in your code *is* the field's text. You can read it, validate it, or show it anywhere.

### The event object

When an event fires, React passes a **synthetic event object** to your handler. It is a cross-browser wrapper with the details of what happened. For typing, the useful part is:

- `event.target` — the DOM element that fired the event (your input).
- `event.target.value` — the current text in that input.

`(event) => setName(event.target.value)` is the idiom you will write hundreds of times. You can name the parameter whatever you like (`e` is common), but `event` is clearer for beginners.

### Why not let the field store its own text?

You *can* — that is an **uncontrolled input**, where `value` is not set and the browser remembers the text. React warns you if you mix the two: setting `value` without `onChange` makes a field you cannot type into (it always snaps back to the fixed value). More on that in Common Errors.

For this course we build controlled inputs, because they keep the data and the display in one place and prepare you for validation and submission.

### Submitting a form

HTML forms want to submit — usually by sending data to a server and **reloading the page**. In a React app, a page reload would wipe your state and is almost never what you want. So we intercept the submit.

Wrap the fields in a `<form>` and handle `onSubmit`:

```jsx
function SearchForm() {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    alert("Searching for: " + query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

Two new pieces:

- `onSubmit={handleSubmit}` — attaches the handler to the form's submit event. Submitting happens when the user presses Enter in a field or clicks a button of `type="submit"`.
- `event.preventDefault()` — stops the browser's default behavior (the page reload). **`preventDefault` is a method on the event object.** Without it, the page reloads and you lose everything.
- `"Searching for: " + query` — reading state directly, because after `preventDefault` the submit handler has access to `query` from the current render.

### A field that reflects typed text

The simplest demonstration: type in a box, and watch the same text appear elsewhere on the page.

```jsx
<p>You typed: {query}</p>
```

Because the field is controlled by `query`, this paragraph is always in sync, character for character.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Form | A group of fields plus a submit action | Submitting normally reloads the page unless prevented |
| Input | A text field element | In JSX, self-closing: `<input />` |
| `value` | The text shown in a controlled input | Setting it without `onChange` makes the field read-only |
| `onChange` | Handler that runs on each keystroke | Not the same as HTML's `onchange` (which may fire on blur) |
| Controlled component | A field whose value comes from React state | Not "any component with a form in it" |
| Uncontrolled input | A field that keeps its own text (no `value`) | You read it via a ref; not used in this unit |
| Event object | The object passed to a handler with event details | `event.target.value` is the new text |
| `event.target` | The element that fired the event | For typing, it is your input |
| `onSubmit` | Handler on the `<form>` for submit | Attach to the form, not the button |
| `preventDefault` | Stops the browser's default action | Must be called inside the handler; forgetting it reloads the page |
| Source of truth | The one place a value really lives (here, state) | Avoids screen and data disagreeing |

## Worked example

We will build a tiny sign-up form that echoes the typed values and shows a confirmation on submit.

**`src/SignupForm.jsx`:**

```jsx
// src/SignupForm.jsx
import { useState } from "react";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    alert("Thanks, " + name + "! We will email " + email + ".");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <label>
        Name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <label>
        Email
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <button type="submit">Sign up</button>

      <p>Preview: {name || "(no name yet)"} — {email || "(no email yet)"}</p>
    </form>
  );
}

export default SignupForm;
```

Line by line:

- `import { useState } from "react";` — state is required for controlled inputs.
- `const [name, setName] = useState("");` — the name's text, starting empty. String state starts as `""`.
- `const [email, setEmail] = useState("");` — a second, independent piece of state.
- `function handleSubmit(event) { event.preventDefault(); ... }` — stops the reload, then acts on the current state. `alert` is a simple way to show a result; a real app would show a message on the page.
- `<form onSubmit={handleSubmit}>` — attach the handler to the form.
- `<label> Name <input ... /> </label>` — wrapping the input inside its label associates them, which is good for accessibility (a fuller treatment is U24). Clicking the label focuses the field.
- `value={name} onChange={(event) => setName(event.target.value)}` — the controlled-input pattern, once per field.
- `<button type="submit">` — submits the form (triggering `onSubmit`).
- `<p>Preview: {name || "(no name yet)"} ...</p>` — the `||` (or) from U05: if `name` is empty (`""` is falsy), show the placeholder text in parentheses. This proves the field and state are the same.

**`src/App.jsx`:**

```jsx
// src/App.jsx
import SignupForm from "./SignupForm.jsx";

function App() {
  return <SignupForm />;
}

export default App;
```

**Run it** (U09):

```text
npm run dev
```

Same command on every OS; only the terminal app differs.

**What success looks like:** A "Sign up" form with Name and Email fields. As you type, the "Preview" line updates character by character. Clicking "Sign up" or pressing Enter shows a browser alert greeting you by name and email — and the page does **not** reload. Type nothing and the preview shows the "(no name yet)" placeholders.

**A design-tool parallel:** you made a prototype where typing into a text layer updates another text layer bound to the same variable. That is exactly what is happening.

## Common errors

### Error 1 — Read-only field (value without onChange)

```jsx
<input value={name} />
```

(where `name` is state that never changes, or a fixed string).

**What happens:** You type and nothing appears. React keeps resetting the field to the fixed `value` on every keystroke. In the console React prints:

```text
Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
```

**Decode it, piece by piece:**

- **"provided a `value` prop ... without an `onChange` handler"** — you set `value` but gave React no way to hear the typing.
- **"This will render a read-only field"** — the visible consequence: you cannot type.
- **"use `defaultValue`"** — the uncontrolled alternative (the field keeps its own text). We are building controlled forms, so instead...
- **"set either `onChange` or `readOnly`"** — add `onChange` to make it controlled, or `readOnly` if you truly mean a fixed field.

**Fix:** Add the handler: `value={name} onChange={(event) => setName(event.target.value)}`.

### Error 2 — Value is undefined (uncontrolled warning)

```jsx
const [name, setName] = useState();
// ...
<input value={name} onChange={(event) => setName(event.target.value)} />
```

**What happens:** Starting `useState()` with no argument makes `name` `undefined`. React treats a `value` of `undefined` as "uncontrolled" and prints:

```text
Warning: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen.
```

**Decode it:** "uncontrolled ... to be controlled" means the field started with no `value` (undefined) and then got one — React warns because that switch can cause confusing behavior.

**Fix:** Always give string state a starting value: `useState("")`.

### Error 3 — Forgetting `preventDefault`

**What happens:** You click "Sign up" and the whole page reloads. Your typed text vanishes, the console clears, and the form appears reset. Nothing seems to have submitted.

**Decode it:** There is no error message. The tell is the flash and the lost state. The browser did its default action: it submitted the form and navigated/reloaded.

**Fix:** Call `event.preventDefault()` as the first line of your submit handler.

### Error 4 — Attaching `onSubmit` to the button

```jsx
<button type="submit" onSubmit={handleSubmit}>
```

**What happens:** `onSubmit` is a form event, not a button event. Clicking the button submits the form, which reloads the page, and your handler may never run (or runs oddly).

**Fix:** Put `onSubmit` on the `<form>`, and let the `type="submit"` button trigger it.

### Error 5 — Two fields sharing one state

```jsx
<input value={name} onChange={(e) => setName(e.target.value)} />
<input value={name} onChange={(e) => setName(e.target.value)} />
```

**What happens:** Typing in either box changes the same value, so both update together. If you expected independent fields, this is a surprise.

**Fix:** Use a separate piece of state per field (`name` and `email`), or an object state updated by field name (an advanced pattern for later).

## Checkpoints

1. In one sentence, what is a controlled input?
2. What does `event.target.value` contain during typing?
3. What are the two things you must do to handle a form submit without reloading the page?
4. Why does `<input value={name} />` with no `onChange` become read-only?

## Practice exercises

### P1 — Read and predict

Predict what the Preview line shows at each step: page loads; type "Sam"; clear it completely; type a single space.

### P2 — Change one value, observe

Change both `useState("")` calls to `useState("hello")`. Reload and observe the fields' starting text and the preview. Then change one field's `onChange` to remove the state update and observe the read-only warning.

### P3 — Fill in the blank

Complete a controlled search field:

```jsx
const [q, ____] = useState("");

<input
  value={____}
  onChange={(event) => setQ(____.target.value)}
/>
```

### P4 — Write from a specification

Create `ColorForm.jsx`: one text field bound to state, and a `<div>` whose inline `style={{ backgroundColor: color }}` uses the typed text as a CSS color name. Type "tomato" and the swatch should turn that color. Submit does nothing but prevent the reload. (Inline styles are fine here; deeper styling is Phase 4.)

### P5 — Fix the broken example

This form reloads the page every time you submit, and the field cannot be typed into. Fix both bugs and explain each in one sentence.

```jsx
import { useState } from "react";

function Broken() {
  const [text, setText] = useState("hello");

  return (
    <form>
      <input value={text} />
      <button type="submit" onSubmit={() => setText("sent")}>
        Send
      </button>
    </form>
  );
}
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No form validation, error messages, or required-field logic — later phases.
- No checkboxes, radios, selects, or textareas in depth — the same `value`/`onChange` idea extends to them.
- No backend submission, `fetch`, or API calls — deferred beyond U19.
- No `useEffect` or `useRef` — U19 introduces effects; refs come later.
- No deep accessibility pass on forms — that is U24 (we only use `<label>` here).

## Next unit

**U19 — Side effects with useEffect** (running small pieces of code after rendering, like updating the page title — kept light and honest).
