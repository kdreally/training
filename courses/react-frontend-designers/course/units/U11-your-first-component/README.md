# U11 — Your first component

**Phase 2 — Running React**

## Where you are

You have a running Vite + React project (U09) and you know what every file in it does (U10). You have not written any React yet.

Now you write your first **component**. It will be small: a function that returns a heading. That is genuinely all a component is. But writing one yourself, seeing it appear in the browser, and then breaking and fixing the export is the doorway into the rest of the course.

We will go slowly. You will replace the starter content in `App.jsx` with your own, encounter the single most common React beginner failure (a name mismatch between `import` and `export`), and learn to read it.

## What you will be able to do

- Define what a React component is in one plain sentence.
- Explain why component names use **PascalCase** (capital first letter).
- Create a component function that returns markup.
- Export a component and import it in another file.
- Edit `App.jsx` and see your own text on the page.
- Diagnose and fix a blank page caused by an import/export mismatch.

## What you need already

- **U09** — you can start the dev server (`npm run dev`) and open the `localhost` URL.
- **U10** — you know `App.jsx` is your top-level component and `main.jsx` imports it.
- **U05** — functions: a named block of code that can be called.
- **U07** — `import` and `export` at a high level.

You do **not** need to know JSX deeply. U12 explains the markup-looking part. Today you copy the shape and change the text.

## Time and energy

About **60–90 minutes**. Expect to make the blank-page mistake on purpose. That is the lesson, not a detour.

## Why this exists

React is built from **components**. Everything you will build later — a card, a navbar, a whole page — is a component. If "component" stays an abstract word, the rest of the course is fog. If you write one today, even a tiny one, the word becomes concrete.

**Design bridge:** you already work with components. A button symbol in your design tool is a named, reusable part. You define it once, place many instances, and change all of them by editing the one definition. A React component is that idea in code: **a named, reusable piece of interface defined once and used wherever you name it.**

## Plain-language teaching

### What a React component is

> A React component is a **function that returns a piece of interface**.

That is the shortest honest definition. In code it looks like this:

```jsx
function Greeting() {
  return <h1>Hello</h1>
}
```

Read it in plain words:

- `function Greeting()` — a function named `Greeting`. (From U05: a function is a reusable named block.)
- `return <h1>Hello</h1>` — it hands back some markup, a heading.
- The `<h1>Hello</h1>` part is almost HTML; U12 explains why it lives inside JavaScript.

A component may also **be used** like a tag. Once defined, you write `<Greeting />` somewhere and React places its output there.

**What a component is not:**

- It is not a whole app (it is one part).
- It is not a class you have to understand (modern React uses functions).
- It is not named after its file by requirement (though by convention it usually matches).

### Why the name is capitalized (PascalCase)

**PascalCase** means every word starts with a capital letter: `Greeting`, `UserCard`, `NavBar`. React relies on this rule:

- A name starting with a **capital** letter (`<Greeting />`) is treated as **your component**.
- A name starting with a **lowercase** letter (`<div>`, `<img>`) is treated as a **built-in HTML element** (from U03).

So `function greeting()` used as `<greeting />` would fail — React would look for an HTML tag called `greeting`, which does not exist. **The capital letter is not decoration; it is how React tells your parts apart from HTML's.**

### Component name vs file name

By convention the file and the component share a name:

- File `App.jsx` defines `function App()`.
- File `Greeting.jsx` would define `function Greeting()`.

This is a strong convention, not a hard rule, but following it prevents a whole class of confusion.

### `export` and `import`: how files share components

A component defined in one file is not automatically visible in another. It must be **exported** by its file and **imported** by the file that uses it.

```jsx
export default App
```

Means: "this file's main thing is `App`." The matching side is:

```jsx
import App from './App.jsx'
```

Means: "bring in the default thing from `App.jsx`, and call it `App` here."

If the name on one side does not match what the other side provides, you get a blank page and a console error. That is the headline failure below.

**Default vs named exports (preview).** A file can have one **default** export (`export default App`) or several **named** exports (`export function Greeting() {}`). The import syntax differs: default imports have no braces (`import App from ...`), named imports use braces (`import { Greeting } from ...`). U13 introduces named exports properly; today you use the default pattern that the scaffold already uses.

### Your top-level component: `App`

In your project, `main.jsx` already imports and renders `App`. So the simplest thing you can do is **change what `App` returns**. When you edit `App.jsx` and save, `main.jsx` re-renders it, and the page updates. You do not need to touch `main.jsx` at all today.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Component | A function that returns a piece of interface | Not a whole page; not a CSS class |
| Function | A named reusable block of code (from U05) | Not the same as a component, though a component *is* a function |
| Return | The value a function hands back | Not `console.log`, which only prints |
| PascalCase | Capital first letter of each word | Required for components, not for HTML tags |
| JSX | HTML-looking markup inside JavaScript | Explained fully in U12 |
| `export default` | Marks a file's main value for others to use | Not automatic; you must write it |
| `import` | Brings another file's export in | Name must match |
| Default export | The single main export of a file | Imported without braces |
| Named export | One of possibly many exports | Imported with braces |
| Render | React placing a component's output on the page | Not the same as "save" |
| Blank page | Page loads but shows nothing | Usually import/export name mismatch |

## Worked example

We will replace the starter `App.jsx` with your own tiny component and see it live.

### Step 1 — Make sure the server is running

In the project folder, run:

```text
npm run dev
```

*What it does:* starts the Vite dev server so the page updates when you save.

*What success looks like:* the Local URL is printed (for example `http://localhost:5173/`).

*One decoded failure:* `npm error Missing script: "dev"` — you are in the wrong folder. `cd` into `my-first-react-app` and run again.

### Step 2 — Open `src/App.jsx` in your editor

You will see the starter component from U10 (logos, heading, a counter). You are going to replace its **body**, not delete the file.

### Step 3 — Replace the file with this complete version

```jsx
function App() {
  return (
    <div>
      <h1>Hello, I am learning React</h1>
      <p>I am a designer, and this is my first component.</p>
    </div>
  )
}

export default App
```

Every line justified:

- `function App() {` — defines the component named `App`, capital A. This must match what `main.jsx` imports.
- `return (` — begins the value the component gives back.
- `<div>` — one wrapping HTML element around everything (U12 explains why one root is needed).
- `<h1>...</h1>` — a heading with your words.
- `<p>...</p>` — a paragraph with your words.
- `</div>` — closes the wrapper.
- `)` — closes the return.
- `}` — closes the function.
- `export default App` — makes `App` the default export so `main.jsx`'s `import App from './App.jsx'` can find it.

### Step 4 — Save the file

**Ctrl + S** (Windows/Linux) or **Cmd + S** (macOS).

### Step 5 — Look at the browser

*What success looks like:* the page now shows **"Hello, I am learning React"** as a large heading and your paragraph below it. The starter logos and counter are gone.

**Why it updated by itself:** Vite noticed the file changed (the hot reload from U09) and re-rendered the `App` component.

### Step 6 — Now break it on purpose

Change the last line to:

```jsx
export default Appp
```

(Notice the extra `p`.) Save.

*What success looks like (for a lesson about failure):* the page may go **blank**, and the terminal or browser console shows a message about `App` or `Appp`. This is the exact mistake we want you to meet now, while it is safe.

**The decoded error.** The browser console (press F12, click **Console**) may show something like:

```text
Warning: React.jsx: type is invalid ... but got: undefined
```

or Vite may show:

```text
"Appp" is not defined
```

Read it slowly. `main.jsx` imports a default export and calls it `App`. Your file now exports a value called `Appp`, and `App` no longer exists. The names disagree. **The fix:** change the last line back to:

```jsx
export default App
```

Save, and your page returns.

**This is the single most common React beginner bug.** Whenever you see a blank page with a "not defined" or "type is invalid" message, suspect a name mismatch between `export` and `import` first.

## Common errors

### Error: blank page, console says "type is invalid" or "X is not defined"

**What it means:** the component used in `main.jsx` cannot be found — usually a typo in the `export` name, or the `import` in `main.jsx` was changed.

**Fix:** make `App.jsx` end with `export default App` and confirm `main.jsx` says `import App from './App.jsx'`. Names are case-sensitive.

### Error: `Adjacent JSX elements must be wrapped in an enclosing tag`

**What it means:** your component returns two elements side by side with no single parent. U12 covers this in full.

**Fix (preview):** wrap everything in one `<div>...</div>` (or a fragment, `<>...</>`), so there is one root element.

### Error: nothing appears and the terminal shows a syntax error

**What it means:** a typo in the code — a missing `)`, an unclosed bracket, or a tag not closed.

**Fix:** read the file name and line the error points to, go to that line, and compare your code with the worked example. Fix one thing at a time.

### Error: you renamed the component but not the import in `main.jsx`

**What it means:** you changed `function App()` to `function Home()`, but `main.jsx` still imports/uses `App`.

**Fix:** either rename it back to `App`, or update `main.jsx` to import and render `Home`. Pick one and keep the names consistent.

## Checkpoints

Answer these before the assignment.

1. In one sentence, what is a React component?
2. Why do component names begin with a capital letter?
3. If a file ends with `export default App`, what must the importing file's line look like?
4. You save `App.jsx` and the browser goes blank with "App is not defined." Name the first thing you check.
5. Which file renders `<App />`, and did you need to edit it today?

## Practice exercises

Ungraded.

### P1 — Change the words

In your working `App.jsx`, change the heading and paragraph text to describe a real UI part you might build (for example "Recipe card" and "This card will show one dish."). Save and confirm.

### P2 — Add elements inside the wrapper

Inside the `<div>`, add an `<h2>` and a `<ul>` with two `<li>` items. Keep them all within the one wrapping `<div>`. Save and observe.

### P3 — Break and fix the export

Do the worked example's Step 6 again from memory: make the export name wrong, observe the error, read it out loud, then fix it. Write down the exact message you saw.

### P4 — Second component in the same file

Below `App`, add a second function:

```jsx
function SmallNote() {
  return <p>Made by a designer learning React.</p>
}
```

Then inside `App`'s returned `<div>`, add `<SmallNote />` on its own line. Save. If it does not work, write the error down and bring it to the checkpoints.

### P5 — Name experiment

Temporarily rename `function App()` to `function app()` (lowercase) and save. Read what happens and write the error text. Then change it back to `App`.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No deep JSX rules yet (U12): why one root, `{}`, `className`, comments.
- No props (U13) or state (U17).
- No events or interactivity.
- No styling (Phase 4).
- No multiple-file components beyond what the practice touches.

## Next unit

**U12 — JSX explained** (why markup lives inside JavaScript, and the rules that make it work).
