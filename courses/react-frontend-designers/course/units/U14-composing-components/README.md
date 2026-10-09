# U14 — Composing components

**Phase 3 — Components and data**

## Where you are

You can make a component and configure it with props (U13). But so far everything has lived inside one file (`App.jsx`), and it is starting to feel crowded. In this unit you learn to **break a page into components** — a Header, a Card, a Footer — put each in its own file, and **assemble** them into a page.

This is the unit where a real page starts to emerge from parts you already know how to build.

## What you will be able to do

- Explain why a page is easier to work with when it is split into components.
- Create a component in its own file and import it where it is needed.
- Nest components inside each other to form a page.
- Follow a file-per-component convention and know when a component is too big.

## What you need already

- **U11** — Writing your first component.
- **U12** — JSX explained (a component returns markup; a tag in JSX can be a custom component).
- **U13** — Props (you will pass props into the components you compose).
- **U07** — Imports and exports (we use `import`/`export default` throughout; a reminder is included).

## Time and energy

About **60–90 minutes**. This unit is mostly mechanical once you see the pattern: make a file, export a component, import it, place it. The thinking work is deciding *where* to draw the boundaries. That decision is the same one you make when grouping layers in a design tool.

## Why this exists

Open a design file where the entire home screen is one flat frame with 200 layers and no grouping. Finding the footer means scrolling. Moving the footer means selecting half the canvas. Changing the header means hoping you did not grab a body layer.

Now open a file where the page is a frame containing three named groups: `Header`, `Body`, `Footer`. Everything is easier. You can move the footer by moving one group. You can ask "is the footer done?" and answer it by looking at one group.

React has the same problem and the same solution. If you put the entire page in one component, the file becomes that flat frame. **Composition** means building the page out of named components that each own one piece. You already do this visually; this unit teaches the code equivalent.

## Plain-language teaching

### What "composition" means

To **compose** is to build a larger thing by placing smaller things inside it. A page is composed of a header, a body, and a footer. Each of those is composed of smaller pieces. Composition is that nesting, all the way down.

In React, composing means one component's returned markup **contains other components as tags**. That is the only new mechanical idea in this unit.

### One file per component (the convention)

A **convention** is an agreed way of doing something that everyone follows so code is predictable. This course uses **one component per file**, with the file named after the component:

```text
src/
  App.jsx        -> the page; composes the others
  Header.jsx     -> one component
  Card.jsx       -> one component
  Footer.jsx     -> one component
```

Why one per file, and not one giant file with everything?

- You can find a component by its filename, the same way a named group is easy to find.
- A file that describes one thing is short enough to understand at a glance.
- Two people can edit different components without fighting over the same file.

This is not a hard law of React. It is a team habit that keeps large projects sane. We adopt it now.

### Importing and exporting (the reminder from U07)

For one file to use a component from another, two things must happen.

**Export** means "make this thing available to other files." You do it at the bottom of the component's file:

```jsx
export default Header;
```

`export default` means "when another file imports from me without naming a specific export, give them this one thing." One default export per file.

**Import** means "pull that thing in." You do it at the top of the file that needs it:

```jsx
import Header from "./Header.jsx";
```

Read it as: "import the default thing from `./Header.jsx`, and call it `Header` here." The `./` means "in the same folder as this file." The `.jsx` is the file extension. Vite (U09) handles the details of turning that into a working page; you just write the path.

### Nesting components

A component's returned markup can contain other components, exactly like HTML tags can contain nested tags (U02, U03):

```jsx
function App() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}
```

`<Header />` is not an HTML tag. React sees a capitalized tag, looks for a component named `Header` in the file, and renders whatever that component returns. Capitalization matters: a lowercase tag like `<header>` means the HTML element; `<Header>` means your component. That single capital letter is how React tells the two apart.

### Composition vs one giant file

Here is the same page two ways. First, everything in one component (fine for a toy, painful at scale):

```jsx
function App() {
  return (
    <div>
      <header>My Shop</header>
      <main>
        <article>Item one</article>
        <article>Item two</article>
      </main>
      <footer>© 2026</footer>
    </div>
  );
}
```

Second, composed:

```jsx
function App() {
  return (
    <div>
      <Header />
      <Card title="Item one" body="...description..." />
      <Card title="Item two" body="...description..." />
      <Footer />
    </div>
  );
}
```

The second version *reads like a wireframe*. You can see the page's structure at a glance, and each named piece can be edited on its own. That readability is the real payoff — same as why you name your layers.

### When is a component too big?

A useful smell test: **if you cannot describe what a component does in a short phrase, it is doing too much.** "Header," "Card," "Footer," "PriceBadge" are clear. "HomePageButAlsoTheNavAndTheFooterInline" is a sign to split.

Split when a piece:

- has a clear name and boundary,
- is reused, or likely to be,
- changes for its own reasons (the footer changes independently of the cards).

Do not split so finely that every two lines is its own component; that creates a maze. Aim for named, meaningful pieces — the same judgment you use when grouping layers.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Composition | Building a bigger component by nesting smaller ones inside it | Not a special React command; it is just nesting |
| Child component | A component rendered inside another component's markup | Not a different type of component; "child" describes its position |
| Parent component | A component whose markup contains other components | Same idea as parent/child layers |
| Import | Pulling a component in from another file | Needs the correct relative path (`./Header.jsx`) |
| Export default | Making one thing available to importers | One default export per file |
| Relative path | A file location starting from the current file (`./`, `../`) | Not an internet address; `./` is "same folder" |
| File-per-component | Convention: one component per file, named after it | Not a React requirement, a team habit |
| Capitalization | `<Header>` is a component; `<header>` is HTML | Forgetting the capital is a common silent bug |
| Wireframe | A rough structure drawing | The composed `App` should read like one |

## Worked example

We will build a tiny page with a Header, two Cards, and a Footer, each in its own file. Use the project from U09–U13.

**`src/Header.jsx`:**

```jsx
// src/Header.jsx
function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
```

- Declares `Header`, taking a `title` prop (U13).
- Returns a `<header>` element containing an `<h1>` with the title.
- `export default` so other files can import it.

**`src/Card.jsx`:**

```jsx
// src/Card.jsx
function Card({ title, body }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{body}</p>
    </article>
  );
}

export default Card;
```

- Takes two props, `title` and `body`.
- Returns an `<article>` with a heading and a paragraph.

**`src/Footer.jsx`:**

```jsx
// src/Footer.jsx
function Footer() {
  return <footer>© 2026 My Shop</footer>;
}

export default Footer;
```

- Takes no props. Returns a `<footer>`.

**`src/App.jsx` — the composition:**

```jsx
// src/App.jsx
import Header from "./Header.jsx";
import Card from "./Card.jsx";
import Footer from "./Footer.jsx";

function App() {
  return (
    <div>
      <Header title="My Shop" />
      <Card title="Mug" body="A sturdy ceramic mug." />
      <Card title="Notebook" body="120 ruled pages." />
      <Footer />
    </div>
  );
}

export default App;
```

- The three `import` lines pull in the components.
- `App` nests them: one `Header`, two `Card`s (each configured with props), one `Footer`.
- Read top to bottom, it is a wireframe of the page.

**Run it** (U09):

```text
npm run dev
```

Same command on Windows, macOS, and Linux; only your terminal app differs.

**What success looks like:** The browser shows a heading "My Shop," two articles with their own headings and paragraphs, and a footer reading `© 2026 My Shop`. If it looks unstyled, that is correct — CSS is Phase 4.

**A design-tool parallel:** you made a frame (`App`) containing four named instances/groups (`Header`, `Card`, `Card`, `Footer`), and the two cards are instances of one `Card` component with different text properties.

## Common errors

### Error 1 — Lowercase custom component tag

```jsx
<header title="My Shop" />
```

**What happens:** React sees lowercase `header` and renders the plain HTML `<header>` element. Your custom `Header` component is never used, so the `title` prop does nothing and you see no heading.

**Reading it:** No red error. The page is just missing the expected content. Silent bugs like this are why capitalization is worth checking first.

**Fix:** Capitalize the tag: `<Header title="My Shop" />`.

### Error 2 — Forgot to export or import

**What happens:** If a component file lacks `export default`, the import finds nothing and you get a build error in the terminal, something like:

```text
The requested module './Header.jsx' does not provide an export named 'default'
```

Or, if you forgot the import, you may see:

```text
'Header' is not defined
```

**Decode it:** "does not provide an export named 'default'" means "I opened that file and there was nothing marked for export." "is not defined" means "I looked for a name and found nothing."

**Fix:** Add `export default Header;` to the component file, and make sure the consuming file has the matching `import Header from "./Header.jsx";`.

### Error 3 — Wrong relative path

```jsx
import Header from "./components/Header.jsx";
```

when the file is actually sitting right next to `App.jsx`.

**What happens:** The terminal says it cannot resolve the import, something like `Failed to resolve import "./components/Header.jsx"`.

**Decode it:** "Failed to resolve" means "I followed that path and there was no file there." Check where the file really lives. `./` means "same folder as me"; `../` means "one folder up."

### Error 4 — Circular imports

If `App.jsx` imports `Header.jsx`, and `Header.jsx` imports `App.jsx`, React may render one of them as blank or throw a confusing error. Nested components should import *their* children, never their parents. Keep the tree flowing one direction — like layers, parents contain children, not the other way around.

## Checkpoints

1. In one sentence, what does "composition" mean in React?
2. Why do we put one component per file?
3. What is the difference between `<header>` and `<Header>`?
4. How do you make a component available to another file, and how do you use it there?

## Practice exercises

### P1 — Read and predict

Given `Header` from the worked example, what does each line render? Predict before running.

```jsx
<Header title="Inbox" />
<Header />
<header title="Inbox" />
```

### P2 — Change one value, observe

Add a third `<Card title="Pen" body="A smooth gel pen." />` to `App`. Save and watch the page. Then remove one `Card`. Observe both.

### P3 — Fill in the blank

Make `Hero.jsx` and import it. Fill the blanks:

```jsx
// src/Hero.jsx
function Hero({ ____ }) {
  return <section>{tagline}</section>;
}

____ ____ Hero;
```

```jsx
// src/App.jsx
import ____ from "./Hero.jsx";
// ...
<Hero tagline="Design that ships" />
```

### P4 — Write from a specification

Create a `Nav` component in its own file. It takes no props. It returns a `<nav>` containing two links written as plain HTML anchors: one to `#home` reading "Home," one to `#about` reading "About." Import and place it at the top of `App`, above the `Header`.

### P5 — Fix the broken example

This page renders but the heading is missing. Find and fix the bug, and explain it in one sentence.

```jsx
// App.jsx
import header from "./Header.jsx";

function App() {
  return (
    <div>
      <header title="My Shop" />
    </div>
  );
}

export default App;
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No events or clicks — U17.
- No state, no `useState` — U17.
- No list rendering with `map` — U15 (we write the two Cards by hand here on purpose).
- No conditional rendering — U16.
- No styling, layout, or CSS — Phase 4.
- No folder nesting beyond one `src` folder; deeper structure arrives later.

## Next unit

**U15 — Rendering lists with map** (turning an array of data into many components automatically, instead of hand-writing each one).
