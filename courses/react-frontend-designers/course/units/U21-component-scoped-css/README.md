# U21 — Component-scoped CSS

**Phase 4 — Styling and design**

## Where you are

In U20 you saw the four ways a React app can deliver styles, and we chose one: **plain CSS files, one per component, plus a shared token file**. This unit does the first half of that promise — attaching a real stylesheet to a real component and keeping its styles from leaking into the rest of the app.

"Component-scoped" is the goal. By the end you will understand exactly how much of it plain CSS gives you for free (less than the name suggests) and how much comes from a naming habit you control.

## What you will be able to do

- Import a `.css` file into a component so React loads it.
- Explain what "global namespace" means for plain CSS and why a naming convention prevents collisions.
- Apply a simple, designer-friendly class naming pattern (`card`, `card__title`, `card--highlighted`).
- Keep a component's stylesheet next to its component file.
- Build a small, styled `Card` component and use it from `App.jsx`.

## What you need already

- **U04 — CSS as presentation**: selectors, the box model, and flexbox.
- **U10 — The project folder tour**: you know `src/` holds your components and `App.jsx` is what renders on screen.
- **U11 — Your first component** and **U12 — JSX explained**: a component is a function returning JSX; JSX uses `className`, not `class` (restated in U20).
- **U13 — Props as design properties**: a component can receive values from outside.
- **U20 — Styling options**: `className`, the inline `style` prop, and why plain CSS is our choice.

If you have not read U20, read it first. This unit assumes its vocabulary.

## Time and energy

About **90–120 minutes**. You will write two or three small files and look at them in the browser. This is the first styling unit with real code, so give yourself permission to go slowly and to break things on purpose.

## Why this exists

In a design tool, a card's styles belong to the card. Nothing else on the canvas can accidentally inherit them. In plain CSS, that safety is not automatic — CSS has one **global namespace**, which is a fancy way of saying every class name lives in the same shared pool. If `Card.css` defines `.title` and your header also defines `.title`, both elements get whichever `.title` rule the browser applied last, and one of them silently looks wrong.

This is the classic "why did my styles change?" moment that makes beginners think CSS is haunted. It is not haunted; it is global. This unit teaches a naming habit that makes collisions nearly impossible, so you get the designer's "styles belong to the component" feeling without giving up readable CSS.

## Plain-language teaching

### What "importing a CSS file" actually does

When you write this at the top of `Card.jsx`:

```jsx
import "./Card.css";
```

you are telling the Vite toolchain (from U09): "when this component is part of the app, also load this stylesheet." The toolchain bundles `Card.css` into the app's CSS.

- **What it does:** makes every class defined in `Card.css` available to the whole running page.
- **Success looks like:** the styles apply, and the browser's Developer Tools show `Card.css` as a source file.
- **One decoded failure:** if the path is wrong, the dev server prints something like *"Failed to resolve import `./Card.css` from `src/Card.jsx`. Does the file exist?"* The page may still render but unstyled. The message tells you the exact import and file it could not find — check the file's name and location.

An important honesty point: `import "./Card.css"` is **not** what scopes the styles. The import only *loads* them. Scoping comes from the names you choose. Even if `Card.css` sits next to `Card.jsx`, a rule named `.title` inside it is global. We fix that with naming.

### The naming convention we will use

We use a small, three-part pattern. It is a simplified cousin of a widely used convention called **BEM** (Block, Element, Modifier). You do not need the acronym; you need the habit.

| Part | Pattern | Example | Meaning |
|------|---------|---------|---------|
| Block | `.name` | `.card` | The component itself |
| Element | `.block__thing` | `.card__title` | A part inside the block |
| Modifier | `.block--variant` | `.card--highlighted` | A variation of the block |

Rules that make the habit work:

1. Every class starts with the component's name (`card`), so no two components ever share a bare name.
2. Elements use a double underscore (`card__title`) and modifiers a double dash (`card--highlighted`).
3. You never style a bare, generic name like `.title`, `.container`, or `.button` in a component file.

Do the element and modifier separators look odd at first? A little. The doubled characters exist precisely because they are rare in normal words, so `card__title` can never be confused with a single-word class called `card__title`. That is the whole trick.

### Why keep the stylesheet next to the component

```text
src/
  components/
    Card/
      Card.jsx
      Card.css
    Header/
      Header.jsx
      Header.css
```

When a designer asks "what does this card look like underneath?", the answer is one file away. This mirrors how you keep a component and its variants together in a design system page. It also makes the class prefix obvious: the file named `Card.css` using the prefix `card` is self-enforcing.

### A note on sharing styles across components

If a style is truly shared (a brand color, a page background, a spacing scale), it does not belong to any one component. It belongs in the shared token file we build in **U22**. For now, keep each component's styles local, and resist the urge to copy the same rule into many files. Copying is how drift starts.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Global namespace | One shared pool where all CSS class names live | "Scoped" in plain CSS is a naming habit, not enforced by the tool |
| Import (CSS) | A line that tells the build to include a stylesheet | Importing does not scope the CSS; it only loads it |
| Class collision | Two components define the same class name differently, so one wins | The page still renders — the bug is silent and visual |
| BEM (simplified) | A naming pattern: block, block__element, block--modifier | The doubled characters are intentional separators, not typos |
| Block | The component's root class (for example, `.card`) | Not the HTML `<div>` you happen to use |
| Element | A part inside the block (for example, `.card__title`) | Not an HTML element; it is a class name |
| Modifier | A variation of the block or element (`.card--highlighted`) | Not dynamic state; it is a fixed named variant |
| Component folder | A folder holding a component and its stylesheet | Optional but strongly recommended |
| Specificity | How CSS decides which rule wins when two target one element | A source of "why is my style ignored?" — see below |

## Worked example

We will build one small `Card` component and use it in `App.jsx`. The card has a title, some body text, and an optional highlighted variant.

### File 1 — `src/components/Card/Card.jsx`

```jsx
import "./Card.css";

export default function Card({ title, children, highlighted = false }) {
  const className = highlighted ? "card card--highlighted" : "card";

  return (
    <article className={className}>
      <h2 className="card__title">{title}</h2>
      <p className="card__body">{children}</p>
    </article>
  );
}
```

Line-by-line justification:

- `import "./Card.css";` — loads the stylesheet for this app. Required before any of its classes will work.
- `export default function Card(...)` — the component from U11. `Card` is the name other files import.
- `({ title, children, highlighted = false })` — props from U13. `title` is text; `children` is whatever you nest inside `<Card>`; `highlighted` defaults to `false`.
- `const className = ...` — builds the class string. If highlighted, it is `"card card--highlighted"` (two classes separated by a space); otherwise just `"card"`.
- `<article className={className}>` — `article` is sensible HTML for a self-contained card (U03). Note the braces: `className` is a JavaScript value, not a quoted literal.
- `<h2 className="card__title">` — a heading, styled by the element class.
- `<p className="card__body">{children}</p>` — renders whatever was nested inside.

### File 2 — `src/components/Card/Card.css`

```css
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  max-width: 320px;
  font-family: system-ui, sans-serif;
  color: #1e293b;
}

.card__title {
  margin: 0 0 8px 0;
  font-size: 1.125rem;
  line-height: 1.3;
}

.card__body {
  margin: 0;
  color: #475569;
  line-height: 1.5;
}

.card--highlighted {
  border-color: #2563eb;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
}
```

Notes:

- Every class starts with `card`, so nothing here can collide with another component.
- `.card--highlighted` only changes a couple of properties; it *adds to* `.card` rather than replacing it. That is why the JSX applies both classes together.
- Colors here are literal hex values for now. In U22 we move them into shared tokens.

### File 3 — `src/App.jsx` (using the card)

```jsx
import Card from "./components/Card/Card";

export default function App() {
  return (
    <main style={{ padding: 24, display: "flex", gap: 16 }}>
      <Card title="Draft">Still deciding on the layout.</Card>
      <Card title="Approved" highlighted>
        Ready to hand off.
      </Card>
    </main>
  );
}
```

Notes:

- `import Card from "./components/Card/Card";` — the default export's path. If you rename or move the file, you must update this path. A wrong path is the single most common beginner error (see below).
- `title="Draft"` and text between the tags become props. The text between `<Card>` and `</Card>` arrives as `children`.
- `<Card title="Approved" highlighted>` — writing the prop with no value means `highlighted={true}`. That is why the second card gets the modifier class.
- The inline `style` on `<main>` is the layout of the *page*, a one-off. It is acceptable here; the card's reusable styles live in `Card.css`.

### How to run it and what success looks like

1. Save all three files.
2. Your dev server from U09 is running (`npm run dev`). If it is not, start it in the project folder. The terminal prints a local URL such as `http://localhost:5173/`.
3. Open that URL. You should see two cards side by side: a plain one and a highlighted one with a blue border and soft blue shadow.

If you see raw, unstyled HTML with no borders or padding, the stylesheet did not load — jump to Error 1.

## Common errors

### Error 1: The import path is wrong

**What you see:** the terminal shows *"Failed to resolve import './Card.css' from 'src/components/Card/Card.jsx'"*, or the page renders with no styles.

**What it means:** the exact file the import names does not exist where the import says. Case matters: `Card.css` and `card.css` are different names on Linux and in many deployment systems, even if your Windows or macOS file system does not complain.

**Fix:** open the component folder, confirm the filename character-for-character, and correct the import. If the CSS file is one folder up, the path is `"../Card.css"`.

### Error 2: A class collision that makes no sense

**What you see:** after adding a new component, an *old* component's text suddenly changes size or color. You never touched the old file.

**What it means:** both components define the same class name. For example, `Card.css` and `Badge.css` both define `.title`, but differently. Because CSS is global, the second one to load wins for both elements.

**Fix:** rename with the component prefix (`card__title`, `badge__title`). This is exactly why our convention prefixes every class.

### Error 3: Writing `class` instead of `className`

**What you see:** the console warning *"Invalid DOM property `class`. Did you mean `className`?"* and no styles.

**What it means:** this is the JSX rule from U20; it reappears the moment you copy CSS examples from the web (which are written in plain HTML).

**Fix:** use `className`. Read the browser console (F12) when styles do not appear — the warning is usually waiting there.

### Error 4: Two rules fight, and the "wrong" one wins

**What you see:** `.card--highlighted { border-color: blue; }` seems ignored; the border stays gray.

**What it means:** **specificity** (from U04): when two rules set the same property, CSS picks based on selector specificity and order, not on which class you *meant*. If `.card` appears later or is more specific, it can win.

**Fix:** open Developer Tools (F12), select the element, and read the Styles panel. Struck-through declarations are the ones being overridden, and the panel names the winning rule. In our pattern, `.card--highlighted` comes *after* `.card` in the file, which is usually enough because they have equal specificity and later wins. When in doubt, inspect rather than guess.

## Checkpoints

Answer in your own words:

1. What does `import "./Card.css";` actually do — and what does it *not* do?
2. Why does our convention prefix every class with the component name?
3. Given the classes `card`, `card__title`, and `card--highlighted`, which is the block, which is an element, and which is a modifier?
4. Your card renders unstyled. Name the first thing you check and where you look.

If you can answer all four, you are ready for the assignment.

## Practice exercises

### P1 — Read and predict

Look at `<Card title="Approved" highlighted>`. Before running anything, write down the exact `className` string that reaches the `<article>`. Then check against the worked example.

### P2 — Change one value

In `Card.css`, change `.card`'s `border-radius` from `12px` to `999px`. Predict the shape first, then apply it. Notice that one line changed every card, which is the point of sharing a class.

### P3 — Fill in the blank

You add a "footer" area to the card. Following the convention, the class for it should be `card____`. Fill in the missing piece. Then style it with a smaller, muted font.

### P4 — Debug this broken snippet

```jsx
// Badge.jsx
export default function Badge({ label }) {
  return <span class="badge">{label}</span>;
}
```

Name the problem and write the corrected line.

### P5 — Inspection practice

Run the app, press **F12**, and use the element picker to select the highlighted card. In the Styles panel, confirm you can see `.card--highlighted` and `.card` both applied. Write one sentence about how the panel shows which properties came from which class.

### P6 — Design bridge

Open a Figma component you have made (or imagine one). Write its "parts" as if naming classes: the component, its inner pieces, and its variants. For example: `button`, `button__label`, `button--ghost`. You will reuse this mapping in U22.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No design tokens or CSS variables yet (U22).
- No responsive breakpoints or media queries (U23).
- No accessibility review (U24).
- No CSS Modules, Tailwind, or CSS-in-JS — we chose plain CSS in U20.
- No animations or transitions (U29).

## Next unit

**U22 — Design tokens as props**: we pull repeated values out of component CSS and into a shared, named token file, then let props select among them.
