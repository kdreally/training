# U30 — Building a small page, end to end

**Phase 5 — Interaction and polish**

## Where you are

This is the last unit of Phase 5, and it is an **integration** unit: almost no new syntax, and a lot of putting pieces together. You have learned components, props, state, lists, conditions, forms, styling, tokens, responsive layout, accessibility, assets, and motion. Now you build one small finished page that uses them together in the right order.

If Phase 5 felt like a set of separate tools, this unit makes them a kit. The skill here is **build order** — knowing what to make first and why.

## What you will be able to do

- Plan a small page as a list of components and a data flow, before writing code.
- Build a page in stages, with a working result at every stage.
- Combine props, state, lists, and conditional rendering in one page.
- Apply design tokens, a responsive grid, accessible markup, and a small transition.
- Read and fix errors that only appear when parts are combined.
- Explain your build order to another person.

## What you need already

All of these, because this unit combines them:

- **U13** — props. **U14** — composing components. **U15** — lists with `map`. **U16** — conditional rendering.
- **U17** — `useState`. **U18** — controlled inputs.
- **U21** — component-scoped CSS. **U22** — design tokens. **U23** — responsive layouts. **U24** — accessibility. **U25** — assets (optional reference).
- **U26** — lifting state. **U29** — simple transitions.

You do **not** need U27 (context) or U28 (custom hooks) for this page. They are available if you want them, but the page is deliberately small enough that lifting state (U26) is sufficient.

## Time and energy

About **2–3 hours**, and it can be split across sessions. There are seven stages, each ending with a checkpoint. Do one or two stages per sitting. If you try to do it all at once and get lost, that is not a failing on your part — it is a sign you skipped a checkpoint. Back up one stage.

## Why this exists

Tutorials teach tools in isolation: here is a button, here is a list, here is a color. Real work is the opposite — you start with a small goal and choose tools as needed. Integration is its own skill, and it is the one most beginners underestimate.

The human problem: **knowing the parts is not the same as building the thing.** This unit is the bridge between "I understand the concepts" and "I can make a page."

## Plain-language teaching

### The page we are building

A **product card grid with a filter**:

- A header with a title.
- A search box that filters products by name.
- A **grid** of product cards. Each card shows an image, a name, a price, and a category tag.
- A friendly message when no products match.
- Cards that lift slightly on hover (motion from U29).
- A layout that reflows from several columns to one on narrow screens.
- Markup that a screen reader can follow.

### The two ideas for this unit

1. **Page plan.** Before coding, write down the components and where the data lives. This is the code version of a wireframe plus a data map.
2. **Build order.** Make the smallest thing that renders, then add one layer at a time, checking after each. Never write all the files and then run. This is how you avoid the dreaded "nothing works and I do not know which part broke."

### The components and the data flow (the plan)

```
App                 (owns the search text — single source of truth, U26)
├── Header          (static title; receives no state)
├── FilterBar       (receives value + onValueChange — a controlled input, U18)
└── ProductGrid     (receives the already-filtered products array, U15)
    └── ProductCard (receives one product)
```

Data flows **down** as props; the search change flows **up** through a callback. This is exactly U26, applied to a page.

### Why build in this order

Each stage adds one layer and gives you something you can see:

1. **Static structure** — the page with hard-coded data. No state. If this works, your components and CSS hooks are correct.
2. **Real data list** — render the products with `map`. Now the grid reflects data.
3. **Extract a card component** — give each product its own component. Reuse is real.
4. **Add the filter state** — lift state to `App`, add the input. Now the page responds.
5. **Styling and tokens** — make it match a design system.
6. **Responsive grid** — make it work narrow and wide.
7. **Accessibility and motion** — labels, semantics, focus, and a small hover transition.

At every stage the page renders. That is the point.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Integration | Combining separate skills into one working thing | Not a new syntax; it is assembly |
| Page plan | A written list of components and where data lives, before coding | Not a formal spec; a few lines are enough |
| Build order | The sequence you add layers, smallest working thing first | Not "write everything, then run" |
| Static data | Hard-coded values used as a stand-in | Not user data; it is scaffolding to be replaced |
| Derived list | A filtered/sorted list computed from state each render | Not stored in its own `useState` (see U26) |
| Grid | A CSS layout that places cards in columns that wrap | Not the same as the CSS `grid` keyword specifically |
| Checkpoint | A deliberate pause to verify one stage before adding the next | Not a formality; skipping it is how builds get lost |

## Worked example — the guided build

Follow the stages in order. After each stage, start or refresh the dev server with `npm run dev` (same command on Windows, macOS, and Linux) and complete the checkpoint before moving on.

If you do not have a project yet, U09 covers creating one with Vite and U10 tours its folders. Keep your page files inside `src/`.

### Stage 1 — Static structure

Create the data and the shell with hard-coded content. Do not add state yet.

**File:** `src/data.js`

```js
export const PRODUCTS = [
  { id: 1, name: "Desk lamp", price: 42, category: "Lighting", image: "/lamp.jpg" },
  { id: 2, name: "Desk mat", price: 18, category: "Desk", image: "/mat.jpg" },
  { id: 3, name: "Floor lamp", price: 89, category: "Lighting", image: "/floor-lamp.jpg" },
  { id: 4, name: "Task chair", price: 210, category: "Seating", image: "/chair.jpg" },
  { id: 5, name: "Notebook", price: 9, category: "Desk", image: "/notebook.jpg" },
];
```

The `image` values are paths to files in the `public` folder (U25). If you do not have images ready, use a solid-color placeholder or omit the image for now and add it later. Missing images are one of the errors covered below.

**File:** `src/App.jsx`

```jsx
import "./App.css";
import Header from "./Header";
import ProductGrid from "./ProductGrid";
import { PRODUCTS } from "./data";

export default function App() {
  return (
    <div className="page">
      <Header title="Studio Shop" />
      <ProductGrid products={PRODUCTS} />
    </div>
  );
}
```

**File:** `src/Header.jsx`

```jsx
export default function Header({ title }) {
  return (
    <header className="page__header">
      <h1>{title}</h1>
    </header>
  );
}
```

**File:** `src/ProductCard.jsx`

```jsx
export default function ProductCard({ product }) {
  return (
    <article className="card">
      <img className="card__image" src={product.image} alt={product.name} />
      <div className="card__body">
        <h2 className="card__name">{product.name}</h2>
        <p className="card__price">${product.price}</p>
        <span className="card__tag">{product.category}</span>
      </div>
    </article>
  );
}
```

**File:** `src/ProductGrid.jsx`

```jsx
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <section className="grid" aria-label="Products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
```

**File:** `src/App.css` (a first draft; you will refine it)

```css
.page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}

.page__header h1 {
  margin: 0 0 1.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.card {
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  overflow: hidden;
}

.card__image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.card__body {
  padding: 1rem;
}

.card__name {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
}

.card__price {
  margin: 0 0 0.5rem;
  color: #444;
}

.card__tag {
  font-size: 0.8rem;
  background: #f0f0f0;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}
```

**Checkpoint 1:** the page shows a title and three columns of cards with names and prices. If images are broken, see the image error below; the layout should still hold.

### Stage 2 — Real data list

You already passed `PRODUCTS` into `ProductGrid`, which maps over them. Confirm all five products appear. If you hard-coded a card in Stage 1 instead, replace it now with the `map` version.

**Why `key={product.id}`:** React uses `key` to tell list items apart between renders (U15). Using the array index as a key works for a static list but causes confusing bugs once items are filtered, because indexes shift. Prefer a stable `id`.

**Checkpoint 2:** all five products render in order, and the browser console has no `key` warning.

### Stage 3 — Extract a card component

If your card markup is inside `ProductGrid`, move it into `ProductCard` (shown above). The grid should only decide layout and looping; the card should decide what a single product looks like.

**Why this matters:** this is the design-system instinct from U00 — one card, many uses. If you later change the card, you change it in one place.

**Checkpoint 3:** `ProductGrid` contains no product-specific markup, only `map` and `ProductCard`. Ask yourself: "If the card design changed, how many files would I edit?" The answer should be one.

### Stage 4 — Add the filter state

Now the page becomes interactive. Lift the search text to `App`, add a `FilterBar`, and pass the filtered list to the grid. This is U26 with a real page around it.

**File:** `src/FilterBar.jsx`

```jsx
export default function FilterBar({ value, onValueChange }) {
  return (
    <div className="filter">
      <label className="filter__label" htmlFor="product-search">
        Filter by name
      </label>
      <input
        id="product-search"
        className="filter__input"
        type="text"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder="Try a search term"
      />
    </div>
  );
}
```

**File:** `src/App.jsx` (updated)

```jsx
import { useState } from "react";
import "./App.css";
import Header from "./Header";
import FilterBar from "./FilterBar";
import ProductGrid from "./ProductGrid";
import { PRODUCTS } from "./data";

export default function App() {
  const [query, setQuery] = useState("");

  const visibleProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page">
      <Header title="Studio Shop" />
      <FilterBar value={query} onValueChange={setQuery} />
      <ProductGrid products={visibleProducts} />
    </div>
  );
}
```

Add an empty state to `ProductGrid`:

```jsx
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return <p className="grid__empty">No products match your search.</p>;
  }

  return (
    <section className="grid" aria-label="Products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
```

**Why `visibleProducts` is not state:** it is derived from `query` and `PRODUCTS`. Storing it separately would create a second source of truth (U26). Compute it each render.

**Checkpoint 4:** typing narrows the grid in real time. Typing nonsense shows the empty message. Clearing the box restores all products. The input always shows exactly what you typed.

### Stage 5 — Styling and tokens

Now bring in a shared token file (U22) instead of scattered hex values, so the page matches a system. Create tokens and reference them.

**File:** `src/tokens.css`

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f7f7f8;
  --color-border: #e2e2e2;
  --color-text: #1a1a1a;
  --color-text-muted: #555555;
  --color-accent: #3b5bdb;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --radius-md: 12px;
  --radius-pill: 999px;
}
```

Import it once, at the top of `src/main.jsx`, before your other styles:

```jsx
import "./tokens.css";
```

Then use the tokens in `App.css`:

```css
.page {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--space-lg);
  color: var(--color-text);
  background: var(--color-bg);
  font-family: system-ui, sans-serif;
}

.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.card__price {
  margin: 0 0 var(--space-sm);
  color: var(--color-text-muted);
}

.card__tag {
  font-size: 0.8rem;
  background: var(--color-bg);
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-pill);
}
```

The hover transition is from U29. Notice `transition` is written on the base `.card`, so both the rise and the fall animate.

**Checkpoint 5:** the page uses your tokens. Change `--color-accent` in one place and watch the tags update. The hero, cards, and text all read from tokens rather than one-off values.

### Stage 6 — Responsive grid

Make the columns adapt. Replace the fixed three-column rule with `auto-fit`.

**In `App.css`**, replace the `.grid` rule:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-lg);
}
```

**Why `auto-fit` with `minmax`:** each column is at least 220px and shares the leftover space. The browser fits as many columns as will hold, and wraps the rest. No media query is required for the basic reflow. For a stricter handoff, add a media query for very narrow screens:

```css
@media (max-width: 480px) {
  .page {
    padding: var(--space-md);
  }
}
```

**Checkpoint 6:** narrow the browser window. Columns drop from three to two to one. Nothing overflows horizontally. Test by narrowing the window slowly and watching the wrap point.

### Stage 7 — Accessibility and motion preferences

Give the page honest structure and labels, then honor reduced motion.

- The `FilterBar` uses a real `<label htmlFor="product-search">` tied to the input's `id`. Clicking the label focuses the input; screen readers announce the purpose (U24).
- The grid is a `<section>` with `aria-label="Products"`, and each card is an `<article>` with an `<h2>`. This gives a screen reader a heading per product.
- The image has a meaningful `alt` equal to the product name. If an image is decorative, use `alt=""` instead.
- The empty state is a `<p>`, so it is announced when it appears.

Add reduced-motion handling to `App.css`:

```css
@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
```

**Checkpoint 7:** tab through the page. The search input receives a visible focus ring (do not remove outlines without replacing them). The screen-reader structure makes sense: one main heading, a labeled filter, then product headings. With reduced motion on, cards no longer lift.

### Final result

If all seven checkpoints passed, you have built the page. You used props, lists, conditions, state, lifting state, tokens, responsive grid, accessibility, and a transition — in one small, coherent artifact.

**What success looks like:** a titled page with a labeled search box above a responsive grid of five product cards. Typing filters the grid; a friendly message appears when nothing matches; cards lift on hover; the layout reflows to one column on a phone-width window; the whole thing is keyboard-navigable and respects reduced motion.

## Common errors

### Error: `Each child in a list should have a unique "key" prop`

**When it happens:** you mapped products without a `key`, or used a non-unique value.

**Decoded:** React cannot reliably tell list items apart between renders. This shows in the browser console when filters change.

**Fix:** give each card `key={product.id}` using a stable, unique field. Do not use `Math.random()` or the array index for a list that filters.

### Error: broken image icons, and the console shows `404` for `/lamp.jpg`

**When it happens:** the file is not in the `public` folder, or the name or case does not match.

**Decoded:** the browser asked for an image at that path and the server did not have it.

**Fix:** put images in `public/` and reference them as `"/lamp.jpg"` (with a leading slash, no `public` in the path). Match the filename exactly. On case-sensitive hosting, `Lamp.jpg` and `lamp.jpg` are different files.

### Error: `Cannot read properties of undefined (reading 'toLowerCase')`

**When it happens:** a product object is missing its `name`, or you filter before checking the array.

**Decoded:** the filter ran on a product whose `name` is `undefined`. Almost always a typo in `data.js` (an object missing a field) or a mis-typed property name.

**Fix:** compare the field names in `data.js` with the names used in `App.jsx` and `ProductCard.jsx`. They must match exactly.

### Error: the grid overflows to the right on a narrow screen

**When it happens:** a fixed column count plus `minmax` with a large minimum, or a wide image, pushes past the viewport.

**Decoded:** the content cannot shrink below its minimum content width.

**Fix:** use the `repeat(auto-fit, minmax(220px, 1fr))` grid, add `img { max-width: 100%; }`, and check for any fixed pixel widths on cards.

### Error: the page renders, but nothing reacts to typing

**When it happens:** the input is controlled (`value={query}`) but the callback is missing or misnamed, or the grid still receives `PRODUCTS` instead of `visibleProducts`.

**Decoded:** either a read-only input (no callback, U26) or a filtered list that was never passed down.

**Fix:** confirm `FilterBar` receives both `value` and `onValueChange`, and that `ProductGrid` receives `visibleProducts`, not `PRODUCTS`.

### Error: focus is invisible when tabbing

**When it happens:** a global rule removed the outline, or a custom style hid it.

**Decoded:** keyboard users cannot see where they are. This is an accessibility defect.

**Fix:** do not use `outline: none` without supplying a visible replacement. If you remove the default, add a clear `:focus-visible` style.

## Checkpoints

This unit's checkpoints are built into the stages above. If you want one consolidated self-check before the assignment, answer these:

1. In your page, which component owns the state, and why?
2. Why is the filtered list not stored in `useState`?
3. What does `auto-fit` + `minmax(220px, 1fr)` do, and why is it better than `repeat(3, 1fr)` here?
4. Name two accessibility choices in the page and what each one gives a user.
5. Where is the class that triggers the hover transition, and where is the transition declared?

## Practice exercises

These are warm-ups; the serious work is the assignment. If you completed the guided build, the assignment extends it.

### P1 — Read and predict

Before changing anything, predict what the grid shows when `query` is `"de"`, then `"DE"`, then `"  "` (two spaces). Run each and compare. (The `toLowerCase` call explains part of this; spaces will match every name because every name contains no leading/trailing-space check.)

### P2 — Change one value

Change the grid minimum from `220px` to `320px`. Run it and describe how many columns appear at a typical laptop width. Then restore it.

### P3 — Fill in the blank

```jsx
const visibleProducts = PRODUCTS.________((product) =>
  product.name.toLowerCase().includes(query.toLowerCase())
);
```

### P4 — Write from a specification

Add a **category filter**: a `<select>` with options "All", "Lighting", "Desk", and "Seating". Store the chosen category in `App` with `useState`, and filter products by both `query` and `category`. Keep the filtered list derived, not stored. This is the same lifting-state pattern with a second control.

### P5 — Fix a broken example

```jsx
export default function ProductGrid({ products }) {
  return (
    <section className="grid" aria-label="Products">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </section>
  );
}
```

The page works at first, but after you add the filter, some cards briefly show the wrong details. Explain why the index is a poor `key` here, and fix it.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). Read it before you start; it is the same checklist your trainer uses.

## What is *not* in this unit

- No new React concepts. This unit integrates what you already know.
- No routing or multiple pages. Everything is one page.
- No data fetching from a server. The product list is a local file.
- No context or custom hooks (U27, U28) are required. They are optional.
- No build or deployment. That is Phase 6, starting in U31.

## Next unit

**U31 — Production builds explained** — what `npm run build` actually produces, and why it is different from the dev server you have been using.
