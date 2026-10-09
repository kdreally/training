# U14 Assignment — Compose a page from parts

Submit the following to your trainer in **one folder or zip** named:

`U14-YourName`

## Files to submit

### 1. Component files (one per component)

Create these four component files, each exporting one component via `export default`:

- `Header.jsx` — component `Header`, takes a `title` prop, returns a `<header>` containing an `<h1>` with the title.
- `Card.jsx` — component `Card`, takes `title` and `body` props, returns an `<article>` with an `<h2>` and a `<p>`.
- `Footer.jsx` — component `Footer`, takes no props, returns a `<footer>` with some footer text.
- `App.jsx` — imports the three above and composes a page containing one `Header`, **at least three** `Card`s (each with different props), and one `Footer`.

### 2. `answers.md`

Answer in your own words:

1. **Explain composition.** In 4–6 sentences, explain to a designer who has never coded what "composing a page from components" means, using a design-tool comparison.
2. **One file per component.** Give two reasons this convention makes a project easier to work with.
3. **Capitalization.** Explain the difference between `<header>` and `<Header>` and why getting it wrong is easy to miss.
4. **Boundaries.** Pick one component from your page. In 2–3 sentences, explain why it deserves to be its own component rather than being written inline inside `App`.
5. **Read the structure.** Paste your final `App.jsx` return block and, underneath it, write a one-line-per-line "wireframe" description of the page it builds.

### 3. `error-reading.md`

Paste this broken code and answer below it:

```jsx
// App.jsx
import Card from "./Card.jsx";

function App() {
  return (
    <div>
      <card title="Mug" body="A mug." />
    </div>
  );
}

export default App;
```

a. Describe what the browser actually shows.
b. Explain why, in one or two sentences.
c. Fix the code.
d. Write the general rule this teaches in one sentence.

## Definition of done

- Four component files exist with the names above.
- Each component file has `export default` and the matching `import` appears where it is used.
- The running app shows a header, three or more cards with different content, and a footer.
- `answers.md` answers all five prompts in your own words.
- `error-reading.md` includes the fix and the one-sentence rule.

## What a strong submission looks like

- The `App` reads like a wireframe: you can understand the page's structure without opening the other files.
- Cards are instances of one component with different props, not three hand-written articles.
- The "boundaries" answer (Q4) reasons about change and reuse, not just "it looked cleaner."
- The error-reading answer correctly identifies lowercase `<card>` as the cause and states the capitalization rule.
