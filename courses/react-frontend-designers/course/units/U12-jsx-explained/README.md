# U12 — JSX explained

**Phase 2 — Running React**

## Where you are

In U11 you wrote your first component: a function that returns something that looked like HTML. You copied the shape and changed the words. This unit explains that shape.

The markup-inside-JavaScript is called **JSX**. It is the single most unusual-looking thing to a newcomer, and also the thing that makes React feel like design. By the end of this unit, JSX will stop looking like a typo and start looking like a language.

## What you will be able to do

- Explain what JSX is and why React uses it.
- Explain why a component must return **one root element**.
- Use `{}` to embed JavaScript values inside markup.
- Use `className` instead of `class`, and say why.
- Write a JSX comment.
- Read and fix the two most common JSX errors: multiple roots and unclosed tags.

## What you need already

- **U11** — you have written a component and understand `return` and `export default`.
- **U03** — HTML tags: elements open and close, some are nested inside others.
- **U04** — CSS applies through class names.
- **U05–U06** — JavaScript values, variables, and template-style embedding.
- **U09** — a running dev server.

## Time and energy

About **75–100 minutes**. The ideas are few but dense. Read the two error sections twice.

## Why this exists

A designer reads structure visually. HTML already mirrors that: nested boxes, hierarchy, named parts. React could have made you write JavaScript objects by hand to describe your layout, but that would be unreadable to a visual thinker. Instead, React lets you write **markup that looks like the result**, and quietly transforms it into JavaScript behind the scenes.

JSX is that choice. It is not HTML, and it is not a string. It is a **syntax that expands into JavaScript function calls**. Knowing this removes the confusion.

## Plain-language teaching

### What JSX is

**JSX** stands for **JavaScript XML**. It is a syntax that lets you write HTML-looking markup directly inside JavaScript.

This is JSX:

```jsx
const header = <h1>Design notes</h1>
```

The browser does not understand that line. When Vite builds your project, it translates the JSX into ordinary JavaScript. A rough idea of the transformation:

```js
const header = React.createElement('h1', null, 'Design notes')
```

You will never have to write the second form. But knowing that JSX becomes a function call explains why it behaves the way it does: it is **code**, not a string.

**It is not HTML.** It looks like HTML and shares most tag names, but it is stricter and has a few different rules. It is not a template string either — you do not wrap it in quotes.

**Design bridge:** think of JSX as the "layer tree" view that also lets you type math and variables between the layers. Structure stays visual and readable; logic lives in small pockets you mark with `{}`.

### Rule 1 — One root element

A component's `return` must produce **exactly one** outer element. Not zero. Not two. One.

This works:

```jsx
return (
  <div>
    <h1>Title</h1>
    <p>Body text</p>
  </div>
)
```

This fails:

```jsx
return (
  <h1>Title</h1>
  <p>Body text</p>
)
```

The failure message is:

```text
Adjacent JSX elements must be wrapped in an enclosing tag.
```

**Why:** a `return` gives back one value. The `<div>` is that one value, and it contains the rest. Two siblings side by side are two values, which JavaScript's `return` cannot hand back together.

**The fragment escape hatch.** If you do not want an extra `<div>` in your layout, wrap in a **fragment**:

```jsx
return (
  <>
    <h1>Title</h1>
    <p>Body text</p>
  </>
)
```

`<>` and `</>` are an empty wrapper that groups elements without adding a real HTML element to the page. Use it when a `<div>` would disturb your layout.

### Rule 2 — Every tag must be closed

In HTML, some tags may be left unclosed (`<br>`, `<img>`). In JSX, **every** element must close:

- Container tags close normally: `<h1>hello</h1>`.
- Empty tags are self-closed with a slash: `<br />`, `<img src="..." />`, `<input />`.

Forgetting either produces a "tag not closed" style error. U12's second error section decodes it.

### Rule 3 — `{}` embeds JavaScript

Anything you want React to *compute* or *insert from a variable* goes inside curly braces:

```jsx
const designer = "Priya"
const role = "Product designer"

return (
  <div>
    <h1>{designer}</h1>
    <p>Role: {role}</p>
    <p>Time saved: {2 + 3} hours</p>
  </div>
)
```

`{designer}` inserts the variable's value. `{2 + 3}` inserts `5`. You can put any JavaScript **expression** — a value, a calculation, a function call that returns a value — inside `{}`.

**What `{}` is not for:** statements like `if` and `for`. JSX braces hold *expressions* (things that produce a value), not control-flow blocks. You will meet the patterns for conditions and loops in U15 and U16.

**Also:** `{}` is only for content or values, not for wrapping sibling elements. The fragment form `<>` is not the same as curly braces.

### Rule 4 — `className`, not `class`

In HTML you write:

```html
<p class="intro">Hello</p>
```

In JSX you write:

```jsx
<p className="intro">Hello</p>
```

**Why:** `class` is a reserved word in JavaScript (from U05, it is used to define classes in code). To avoid a collision, JSX calls the HTML attribute `className`. CSS does not care — `.intro` works the same. Your class name in JSX becomes `class` in the real HTML the browser receives.

This trips up nearly everyone once. If your styles are not applying, check for `class=` instead of `className=`.

### Rule 5 — Comments

Because JSX is code, a `<!-- HTML comment -->` will not work. Inside `{}` you write a normal JavaScript comment:

```jsx
return (
  <div>
    {/* This is a JSX comment */}
    <h1>Visible heading</h1>
  </div>
)
```

- `{/* ... */}` — inside JSX between elements.
- `// ...` or `/* ... */` — inside a JavaScript block (for example inside a function body but outside the returned markup).

### A note on attribute names generally

Besides `className`, a few other attributes differ from HTML (for example `htmlFor` instead of `for` on labels). You will meet them when they matter. The pattern is always: JSX avoids clashing with JavaScript keywords.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| JSX | HTML-looking syntax inside JavaScript | Not HTML, not a string |
| Expression | Code that produces a value | Not a statement like `if`/`for` |
| Root element | The single outer element a component returns | Can be a `<div>` or a fragment |
| Fragment | `<>...</>` wrapper that adds no real element | Not the same as `{}` |
| `{}` | Embed a JavaScript value in markup | Only expressions, not control flow |
| `className` | JSX name for the HTML `class` attribute | Not `class`, which is a JS keyword |
| Self-closing tag | `<br />`, `<img />` — an element with no children | JSX requires the slash |
| `HTML comment` | `<!-- -->`; does not work directly in JSX | Use `{/* */}` instead |
| Reserved word | A word JavaScript already uses, like `class` | Reason `className` exists |

## Worked example

We will edit `App.jsx` to use all the JSX rules above. Start from a running project.

### Step 1 — Replace `App.jsx` with this

```jsx
function App() {
  const designerName = "Sam"
  const role = "Product designer"

  return (
    <div className="card">
      {/* A small introduction card */}
      <h1>Hello, {designerName}</h1>
      <p className="role">Role: {role}</p>
      <p>Time saved this week: {3 + 4} hours</p>
      <hr />
    </div>
  )
}

export default App
```

### Step 2 — Justify every line

- `const designerName = "Sam"` — a JavaScript variable (U05) holding a value.
- `const role = "Product designer"` — a second variable.
- `return (` — beginning the one value this component returns.
- `<div className="card">` — the **single root** element; `className` (not `class`) sets up CSS.
- `{/* A small introduction card */}` — a JSX comment, invisible on the page.
- `<h1>Hello, {designerName}</h1>` — markup with a variable inserted via `{}`.
- `<p className="role">Role: {role}</p>` — another class and another insertion.
- `<p>Time saved this week: {3 + 4} hours</p>` — `{}` can hold an expression; `3 + 4` becomes `7`.
- `<hr />` — a self-closing empty element. Note the slash.
- `</div>` — closes the root.
- `)` and `}` — close the return and the function.
- `export default App` — makes `App` importable (U11).

### Step 3 — Save and observe

*What success looks like:* your browser shows "Hello, Sam", "Role: Product designer", "Time saved this week: 7 hours", and a horizontal rule. No logos, no counter.

*One decoded failure:* if instead you see the whole thing as plain text, untouched by styling, the likely cause is that Vite is not running or your file was saved with the wrong extension. Fix: confirm the file is named `App.jsx` (not `App.txt`) and that `npm run dev` is running.

### Step 4 — Break the root on purpose

Delete the opening `<div className="card">` and its closing `</div>`, leaving the `<h1>`, paragraphs, and `<hr />` as siblings. Save.

*What success looks like (for learning):* an error appears:

```text
Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?
```

**Decoded:** the component now returns several elements side by side. `return` needs one value. **Fix:** re-add the `<div>`, or wrap the siblings in `<>...</>`. After fixing, the page returns.

### Step 5 — Break a tag on purpose

Remove the slash from `<hr />`, making it `<hr>`. Save.

*What success looks like (for learning):* an error about the tag not being closed, often pointing at the line. **Decoded:** JSX requires empty elements to be self-closed. **Fix:** restore `<hr />`.

## Common errors

### Error: `Adjacent JSX elements must be wrapped in an enclosing tag`

**What it means:** the component returns two or more elements at the top level.

**Fix:** wrap them in one element (`<div>...</div>`) or a fragment (`<>...</>`). A component returns exactly one root.

### Error: `Expected corresponding JSX closing tag` / `Unterminated JSX contents`

**What it means:** a tag was opened and never closed, or an empty element lacks its `/>`.

**Fix:** go to the named line and check every opened tag has a matching close. Self-close empty ones: `<br />`, `<img ... />`. Editors often auto-close tags; type the closing tag first if it helps.

### Error: styles are not applying

**What it means:** likely you used `class="..."` instead of `className="..."`.

**Fix:** replace `class` with `className`. The CSS rule (`.card { ... }`) is unchanged.

### Error: `Unexpected token` around `{`

**What it means:** you put a **statement** (like `if` or a variable declaration) inside `{}` in the markup, or used `{}` where only markup can go.

**Fix:** braces in JSX hold expressions only. Move `if`/`for` logic above the `return`, or use the conditional patterns taught in U15/U16.

### Error: a raw `<` or `>` in text

**What it means:** JSX reads `<` as the start of a tag. Using it in text (for example "5 < 10") confuses the parser.

**Fix:** write the comparison inside `{}` (`{"5 < 10"}`) or use the entity forms; better, compute it in `{}` and insert the result.

## Checkpoints

Answer these before the assignment.

1. What does JSX become after the build tool processes it (roughly)?
2. Why must a component return one root element, and what is the fragment form?
3. When do you use `{}` in JSX, and what may not go inside it?
4. Why is it `className` and not `class`?
5. How do you write a comment inside JSX markup?
6. Name the two errors you broke on purpose in the worked example and their fixes.

## Practice exercises

Ungraded.

### P1 — Insert a variable

Add a variable `const tagline = "..."` in `App` and render it inside an `<h2>` using `{}`.

### P2 — Do some math in markup

Add a paragraph that prints `{10 * 3}`. Predict the output before you save; then confirm.

### P3 — Fragment practice

Rewrite the worked example so it uses `<>...</>` as the root instead of `<div className="card">`. Save and confirm it still works. Then put the `<div>` back.

### P4 — Comment both ways

Add one `{/* ... */}` comment between elements and one `// ...` comment inside the function body (outside the returned markup). Save.

### P5 — Break and decode (two errors)

Deliberately cause `Adjacent JSX elements must be wrapped` (Step 4). Read and write down the message. Fix it. Then deliberately remove the slash from `<hr />` (Step 5) and write down that message. Fix it.

### P6 — Wrong class attribute

Change `className="card"` to `class="card"`. Save. Open the browser console (F12). Write down the warning text React gives. Then fix it.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No props (U13) or state (U17).
- No lists with `map` or conditional rendering (U15, U16) — `{}` expressions only.
- No events or interactivity.
- No styling systems or design tokens (Phase 4) — only the `className` attribute is introduced.
- No TypeScript JSX.

## Next unit

**U13 — Props as component "design properties"** (you will configure a component the way you set layer properties).
