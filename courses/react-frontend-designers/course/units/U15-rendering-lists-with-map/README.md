# U15 — Rendering lists with map

**Phase 3 — Components and data**

## Where you are

You can compose a page from components (U14). But you hand-wrote each `Card`. If a shop has forty products, hand-writing forty cards is absurd — and if the list comes from data that changes, you cannot know how many there are in advance. In this unit you learn to take an **array** of data and render one component per item automatically, using JavaScript's `.map`.

This is the unit where your page stops being fixed and starts responding to data.

## What you will be able to do

- Explain why hand-writing repeated components does not scale.
- Use `.map` to turn an array of data into an array of components.
- Give each rendered item a `key` and explain why React needs it.
- Read and decode React's "missing key" / "unique key" warnings.

## What you need already

- **U06** — Arrays, objects, and `map` (this unit is `.map` applied inside JSX; re-read U06 if the word "array" feels shaky).
- **U07** — Arrow functions and destructuring (we use both).
- **U12** — JSX and curly braces (`{ }` means "put a value here").
- **U13** — Props.
- **U14** — Composition (you will render a `Card` component in a loop).

## Time and energy

About **75–100 minutes**. `.map` itself is from U06, so the new ideas are narrow: putting `.map` inside JSX, and the `key` rule. Take the `key` part slowly — it is the part people skip and then meet again as a confusing bug.

## Why this exists

Imagine you are designing a contacts screen. You lay out one contact card, and then duplicate it fifteen times. Now the client says, "By the way, the number of contacts changes and new ones appear at the top." Your duplicated frame cannot do that. A screen built from *data* can.

The human problem: **the amount of content is not known while you design, and it changes later.** A real interface must be built from the data, so that three items and three thousand items are the same code.

In a design tool, you handle this with **lists / repeat** features or by connecting a component to real data (CMS, variables). In React, the tool for this is `.map`. It means: "take this array, do something to each item, and give me back a new array of the results."

## Plain-language teaching

### What `.map` does (the reminder from U06)

An **array** is an ordered list of values, written with square brackets:

```jsx
["Mug", "Notebook", "Pen"]
```

`.map` runs a function on each item and returns a **new array** of whatever the function returns. It does not change the original.

```jsx
const words = ["Mug", "Notebook", "Pen"];
const loud = words.map((word) => word.toUpperCase());
// loud is now ["MUG", "NOTEBOOK", "PEN"]
```

- `(word) => ...` is an arrow function (U07).
- `.map` visits `"Mug"`, then `"Notebook"`, then `"Pen"`.
- For each, it returns the item in uppercase.
- `loud` is a new array of the three results.

The original `words` is untouched.

### From a map of strings to a map of components

Here is the leap for this unit. If the function returns JSX instead of a string, `.map` produces an array of JSX elements — and JSX is happy to render an array:

```jsx
const names = ["Ada", "Ravi", "Leila"];

function App() {
  return (
    <ul>
      {names.map((name) => (
        <li>{name}</li>
      ))}
    </ul>
  );
}
```

Line by line:

- `names.map((name) => (...))` — for each name, produce something.
- `( <li>{name}</li> )` — the something is a list item. The parentheses just group the JSX so it is easy to read; you will see this style everywhere.
- `{ ... }` around the whole `.map` — this is the U12 rule: curly braces mean "put a JavaScript value here." The `.map` produces an array of elements, and the braces drop that array into the markup.
- The result: one `<li>` per name.

**Note the reuse:** we did not write three `<li>` tags. We wrote one rule that works for three names *or* three hundred.

### Objects in the array (the common real case)

Real data is usually an array of objects (U06):

```jsx
const products = [
  { id: 1, name: "Mug", price: 12 },
  { id: 2, name: "Notebook", price: 8 },
  { id: 3, name: "Pen", price: 3 },
];
```

Each object has an `id`, a `name`, and a `price`. We can map these into `Card` components (U14), passing props (U13):

```jsx
{products.map((product) => (
  <Card key={product.id} title={product.name} body={"$" + product.price} />
))}
```

This is the pattern you will use most often from now on.

### The `key` prop — and why React needs it

You may have noticed `key={product.id}` in that snippet. **`key` is a special prop React requires when you render a list.**

Here is the plain problem it solves. React is constantly comparing the previous list of elements with the new list to decide what changed, so it only updates what needs updating (that is how it stays fast). To compare individual items reliably, React needs each item to have a **stable identity** — a value that stays with that item as the list grows, shrinks, or reorders.

`key` is that identity. It must be:

- **unique** among the siblings in that list (no two items share a key), and
- **stable** — the same item keeps the same key across renders.

A database `id` is ideal. The design-tool parallel: think of the `key` as the item's **unique layer name or ID**. If two layers had the exact same name and React-like diffing relied on names, it could not tell which layer moved where. `key` gives React a reliable handle to track each item as it is added, removed, or reordered.

`key` is not something you read inside the component; it is guidance for React itself. That is why you do not see it used in `Card`.

### What `key` is *not*

- It is **not** a copy of the content. Using the visible text as a key works only if the text is truly unique and never repeats.
- It is **not** the array index in most cases. Using the index (`key={index}`) looks tempting but breaks when items are reordered or removed, because the index of an item changes. Use a stable `id` when you have one.
- It is **not** read as a prop by your component. It is reserved by React.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Array | An ordered list of values in `[ ]` | Not an object; no named fields |
| `.map` | Turns an array into a new array by transforming each item | Does not change the original; not a loop that mutates |
| Arrow function | Compact function `(x) => ...` from U07 | The `=>` is just "goes to"; the left is input, right is output |
| JSX element | A piece of markup produced by a component | `.map` can return a whole array of these |
| `key` prop | Special, unique, stable identity for each item in a list | Not read by your component; not the visible text |
| Index | The position number of an item (0, 1, 2…) | A weak key because it changes on reorder/remove |
| Stable | Does not change for the same item across renders | `id` from data is stable; `Math.random()` is not |
| Missing key warning | React's console message when a list item has no `key` | A warning, not always a crash — but fix it anyway |

## Worked example

We will render a list of three products as `Card` components. Assume `Card.jsx` from U14.

**`src/App.jsx`:**

```jsx
// src/App.jsx
import Card from "./Card.jsx";

const products = [
  { id: "p1", name: "Mug", price: 12 },
  { id: "p2", name: "Notebook", price: 8 },
  { id: "p3", name: "Pen", price: 3 },
];

function App() {
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.name}
          body={"$" + product.price}
        />
      ))}
    </div>
  );
}

export default App;
```

Every line, justified:

- `import Card from "./Card.jsx";` — brings in the component from U14.
- `const products = [...]` — an array of objects (U06). `id` is the stable identity we will use as the key. Note `id` values are unique strings.
- `function App()` — the page component.
- `{products.map((product) => ( ... ))}` — for each product object, produce a `Card`. The braces place the resulting array into the markup.
- `key={product.id}` — the required stable identity for this list item.
- `title={product.name}` — passes the product's name as a prop (U13).
- `body={"$" + product.price}` — builds a price string with `+` (U05) and passes it as a prop. The braces are needed because it is an expression, not literal text.

**Run it** (U09):

```text
npm run dev
```

Same command on every OS; only the terminal app differs.

**What success looks like:** The page shows the heading "Products" and three cards: "Mug / $12," "Notebook / $8," "Pen / $3." Now add a fourth object to the array, save, and watch a fourth card appear — without touching any JSX.

**A design-tool parallel:** you connected one card component to a data list. Add a row of data; get another card.

## Common errors

### Error 1 — Missing key (the decoded warning)

If you write the map without `key`:

```jsx
{products.map((product) => (
  <Card title={product.name} body={"$" + product.price} />
))}
```

React's console prints something like:

```text
Warning: Each child in a list should have a unique "key" prop.
Check the render method of `App`. See https://react.dev/link/warning-keys for more information.
```

**Decode it, piece by piece:**

- **"Each child in a list should have a unique 'key' prop"** — you rendered a list (a `.map`), and at least one item is missing its `key`.
- **"Check the render method of `App`"** — React names the component where the problem is.
- The link is React's longer explanation; you do not need it to fix this.

**What it means in practice:** The page may still *look* fine, which is why people ignore it. But React cannot reliably track the items, so reordering, adding, or removing can update the wrong rows. Fix it now, while it is harmless.

**Fix:** Add `key={product.id}` to the outermost element returned by the map. The key goes on the item itself — the `Card` — not on something inside `Card`.

### Error 2 — Duplicate keys

```jsx
{products.map((product) => (
  <Card key="item" ... />
))}
```

Every item gets the key `"item"`. React warns:

```text
Warning: Encountered two children with the same key, `item`.
```

**Decode it:** "two children with the same key" means two list items claimed the same identity, so React cannot tell them apart.

**Fix:** Use a value that is different for each item. Real data usually has an `id`; use that.

### Error 3 — Using the array index as the key

```jsx
{products.map((product, index) => (
  <Card key={index} ... />
))}
```

This often *looks* fine and produces no warning, which makes it a trap. The index is the position, and positions shift when the list changes. If a user deletes the first item, every remaining item's index changes, and React can misattribute state (arriving in U17) to the wrong row.

**Fix:** Prefer a stable `id` from the data. Reach for the index only when the list is static and never reordered — and say so in a comment.

### Error 4 — Trying to render an object directly

```jsx
{products.map((product) => <li>{product}</li>)}
```

**What happens:** An error like:

```text
Objects are not valid as a React child
```

**Decode it:** React can render text, numbers, and elements, but not a whole object. You must pick fields: `{product.name}`.

**Fix:** Render specific fields of the object, as in the worked example.

## Checkpoints

1. What does `.map` return?
2. Why can JSX render the result of `.map`?
3. Why does each list item need a `key`, and what makes a good key?
4. Why is the array index usually a weak choice for a key?

## Practice exercises

### P1 — Read and predict

Predict the output of each before running:

```jsx
{["a", "b", "c"].map((letter) => <li>{letter.toUpperCase()}</li>)}
```

```jsx
{[] .map((x) => <li>{x}</li>)}
```

### P2 — Change one value, observe

In the worked example, change `body={"$" + product.price}` to `body={"Price: " + product.price}`. Save and observe. Then add a fourth product object and watch a fourth card appear.

### P3 — Fill in the blank

Fill the blanks so this renders one `<li>` per name with a good key:

```jsx
const names = ["Ada", "Ravi", "Leila"];

<ul>
  {names.____((name, index) => (
    <li ____={____}>{name}</li>
  ))}
</ul>
```

### P4 — Write from a specification

Given this data, render it as an unordered list of `<li>` elements showing `name` and `score`, each with a proper key:

```jsx
const players = [
  { id: 101, name: "Ada", score: 90 },
  { id: 102, name: "Ravi", score: 75 },
  { id: 103, name: "Leila", score: 88 },
];
```

### P5 — Fix the broken example

This list renders but React warns about keys, and one key is duplicated. Fix both problems and explain each in one sentence.

```jsx
{players.map((player) => (
  <li key="player">{player.name}</li>
))}
```

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No sorting, filtering, or searching the list — later phases.
- No events or clicks on list items — U17.
- No state; the data here is a constant. Making a list change at runtime comes with state in U17.
- No fetching data from the internet — that is deferred to U19 and beyond.
- No conditional rendering of the list (empty state, etc.) — that is U16.

## Next unit

**U16 — Conditional rendering** (showing and hiding pieces of the page by rule, including the empty-list case).
