# U20 — Styling options in a React app

**Phase 4 — Styling and design**

## Where you are

You have spent Phase 3 learning how a component receives data through **props**, how to compose components, and how state changes a screen. Not one of those units told you how a component gets its *look*. This unit is the map of the options for doing that, before we choose one for the rest of the course.

This is a **tour** unit. You will read and compare, not build. The building starts in U21. Reading first is the point: if we showed you one way with no context, you would not know why it was chosen.

## What you will be able to do

- Name four common families of styling a React app in plain language.
- Explain at least one honest strength and one honest cost of each family.
- Say which family this course uses and why, and what that choice commits you to.
- Use `className` (React's spelling of the HTML `class` attribute) and recognize an inline `style` object when you see one.

## What you need already

- **U03 — HTML as structure**: an element has an opening tag, content, and a closing tag, and can carry attributes.
- **U04 — CSS as presentation**: an external stylesheet is a `.css` file; a **selector** picks elements; the **box model** is content, padding, border, margin; **flexbox** arranges children along an axis.
- **U11 — Your first component** and **U12 — JSX explained**: a component is a function that returns JSX, and JSX looks like HTML but is JavaScript.
- **U13 — Props as design properties**: a component can be configured from the outside, the way a layer has properties.
- **U10 — The project folder tour**: you know `src/`, `public/`, `App.jsx`, and `main.jsx`, and which files to touch.

If any term above is fuzzy, re-read its vocabulary table for five minutes before continuing. This unit builds directly on them.

## Time and energy

About **60–90 minutes**. It is mostly reading and a short written comparison. There is a small amount of code to look at but nothing to install. Take a break after the vocabulary table if you need one.

## Why this exists

In a design tool, "how do I style this" has one answer: you select the layer and change its properties in the inspector. In code there are **several** ways to attach those properties, and tutorials online mix them freely. That is disorienting, and it is not your fault.

Worse, some tutorials say "use library X, it is the modern way," then another says the opposite. If you do not know what the families *are*, every new tutorial feels like a contradiction.

This unit gives you the landscape once, calmly, so that later tutorials stop being confusing. Then it makes a clear recommendation so you can stop deliberating and start making things.

## Plain-language teaching

### The core fact: React has no styling system of its own

React builds and updates the page's structure. It does not decide what a color or a gap *is*. Styling is still done with **CSS** — the same language from U04. All four families below are really just different ways of *writing and delivering CSS* to your components.

Remember that and the landscape shrinks. You are not learning four languages. You are learning four delivery systems for one language.

### Two small React details you must know before we compare

#### Detail 1: `className` instead of `class`

In plain HTML you write an attribute called `class`:

```html
<div class="card">Hello</div>
```

In JSX, `class` is a reserved word in JavaScript, so React uses **`className`**:

```jsx
<div className="card">Hello</div>
```

- **What it does:** attaches one or more CSS class names to an element so a stylesheet can target it.
- **Success looks like:** the element picks up the styles defined for that class.
- **One decoded failure:** if you write `class="card"`, React prints a warning in the browser console: *"Invalid DOM property `class`. Did you mean `className`?"* The styles do not apply, but the page still renders. The fix is to rename the attribute to `className`.

The value uses one class name, or several separated by spaces: `className="card card--highlighted"`. It is always a **string**, never a list of variables (until a later unit).

#### Detail 2: the inline `style` prop

React also lets you pass style as a JavaScript **object** through a prop named `style`:

```jsx
<p style={{ color: "red" }}>Careful</p>
```

Notice the **double curly braces**. The outer pair means "JavaScript expression here" (from JSX, U12). The inner pair means "this is an object." The property names are camelCase (`color`, `fontSize`, `backgroundColor`) because they are JavaScript object keys, not CSS text.

- **What it does:** applies styles directly to that one element.
- **Success looks like:** the paragraph turns red without any `.css` file.
- **One decoded failure:** `style="color: red"` (a string, as in HTML) breaks. React expects an object. The browser shows a runtime error and the component may not render.

Inline `style` is useful for one-off, computed values (for example, a progress bar's width). It is **not** how we will style components in this course, because it cannot express hover states, media queries, or reusable design rules. We mention it so that you recognize it and do not build a whole app with it.

### The four families

For each family: what it is, a worked-out strength, and a worked-out cost. You are not expected to write any of these deeply yet.

#### Family 1 — Plain CSS files

You write ordinary `.css` files (the ones you already met in U04) and tell React which classes to use.

```jsx
<button className="btn btn--primary">Save</button>
```

```css
.btn {
  padding: 8px 16px;
  border-radius: 6px;
}
.btn--primary {
  background: #2563eb;
  color: white;
}
```

- **Strength:** it is exactly the CSS you already know; nothing new to learn beyond `className`; tools and tutorials for plain CSS are everywhere and free.
- **Cost:** class names are **global**. If two components both define `.btn` differently, the last one loaded wins and the other silently changes. We will manage this with naming conventions in U21.

#### Family 2 — CSS Modules

Same CSS, but the filename ends in `.module.css`. When you import it, the toolchain **renames** your classes to unique strings automatically, so `.btn` in `Button.module.css` cannot collide with `.btn` elsewhere.

```css
/* Button.module.css */
.btn { padding: 8px 16px; }
```

```jsx
import styles from "./Button.module.css";
<button className={styles.btn}>Save</button>
```

- **Strength:** collisions are removed by the tool; you can reuse natural names like `.card` and `.title`.
- **Cost:** the class name in JSX is now `{styles.btn}`, not a quoted string — a small extra bit of syntax to learn — and the generated names are unreadable in the browser's inspector, which can make debugging styles harder for a beginner.

#### Family 3 — Utility frameworks (for example, Tailwind)

Instead of naming your own classes, you assemble small single-purpose classes in the markup. Each class does one thing.

```jsx
<button className="px-4 py-2 rounded-md bg-blue-600 text-white">Save</button>
```

- **Strength:** you style by composing tokens right where you need them; spacing and color stay numerically consistent across the team.
- **Cost:** markup becomes dense and, to a designer's eye, hard to read; you must learn the framework's vocabulary (its scale names) on top of CSS; and the "design" now lives in many small strings instead of one stylesheet you can open and revise. It is a real, popular choice — it is just not the choice that fits *this* course's goal of connecting your design file to a readable stylesheet.

#### Family 4 — CSS-in-JS (for example, styled-components, Emotion)

You write CSS *inside* a JavaScript file, and it becomes a component.

```jsx
import styled from "styled-components";
const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
`;
<Button>Save</Button>
```

- **Strength:** styles are scoped to the component by construction, and you can change styles based on props naturally.
- **Cost:** it adds a dependency and a build consideration; CSS is now generated at runtime, which can affect performance; styles are no longer in a `.css` file your team's CSS-literate reviewers can read; and it is another full syntax to learn before you have solidified plain CSS. Several teams are moving *away* from it.

### Design bridge: you already compare design tools this way

You do not tell a junior designer "Figma is the only tool." You explain *when* one tool fits. This unit does the same job for styling approaches: the goal is judgment, not loyalty.

Also notice the parallel: utility classes are like applying named text/color styles repeatedly to layers; CSS-in-JS is like a component with styles baked in; plain CSS is like maintaining a tidy style sheet (or style guide page) that everything references. Same instincts, new containers.

### Our recommendation for this course, and why

We use **plain CSS files, one per component, plus one shared token file**.

- One `Card.css` sits next to `Card.jsx`.
- One `tokens.css` holds shared named values (colors, spacing, radius).
- Components use `className` to opt into their classes.

Reasons:

1. **It builds on U04.** You already understand stylesheets. We are not adding a second language on top of a skill you are still consolidating.
2. **The styling stays inspectable.** You can open one file and read the design, which matches how designers think about a style guide.
3. **No new dependency.** Nothing to install, nothing paid, nothing that will be renamed or abandoned.
4. **The design system connection is direct.** In U22 you will map your Figma variables to `tokens.css` almost line for line. CSS Modules and CSS-in-JS make that mapping more abstract, and utility frameworks hide it inside markup.

What this choice commits us to: we must be disciplined about **class naming**, because plain CSS is global. That is precisely what U21 teaches. If plain CSS's collision problem worried you, good — you understood the trade-off. We solve it deliberately, not by ignoring it.

**Why we do not teach five at once:** each family has its own mental model, syntax, and failure modes. Learning all five at once means learning none of them well, and it would triple the vocabulary in this one unit. You now know the map. If a future team uses Tailwind or CSS Modules, you will recognize it as "Family 3" or "Family 2" and can learn its specifics then.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Stylesheet | A `.css` file that describes how elements look | Not the same as a component; it only *describes* |
| Selector | The part of CSS that picks which elements to style (for example, `.card`) | Not a React concept; it is pure CSS from U04 |
| Class | A name you put on an element (`class` in HTML, `className` in JSX) so CSS can target it | In JSX it is `className`, never `class` |
| Global namespace | All class names live in one shared pool, so identical names collide | "Scoped" in plain CSS means "by our discipline," not enforced by the tool |
| CSS Modules | Plain CSS whose class names are auto-renamed to be unique | Not a separate language; it is still CSS |
| Utility framework | A set of tiny single-purpose classes composed in the markup | The design ends up spread across many class strings |
| CSS-in-JS | Writing CSS inside JavaScript, often producing a styled component | Adds a dependency; not required for React itself |
| Inline style | Styles passed as a JavaScript object via the `style` prop | Uses camelCase keys and an **object**, not a CSS string |
| Design token | A named value (color, space, radius) reused everywhere | Defined properly in U22; here it is just a preview |

## Worked example

**Purpose:** see the *same* button expressed in all four families so the comparison stops being abstract. This is for reading and predicting — copy it anywhere you like, but the graded building starts in U21.

The design intent (identical in every column): a pill-shaped button, blue background, white label, 32px tall padding, 6px corners.

**Family 1 — Plain CSS**

```jsx
/* Button.jsx */
export default function Button() {
  return <button className="btn btn--primary">Save</button>;
}
```

```css
/* Button.css */
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.btn--primary {
  background: #2563eb;
  color: #ffffff;
}
```

**Family 2 — CSS Modules**

```jsx
/* Button.jsx */
import styles from "./Button.module.css";

export default function Button() {
  return <button className={styles.btn}>Save</button>;
}
```

```css
/* Button.module.css */
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  background: #2563eb;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
```

**Family 3 — Utility classes**

```jsx
/* Button.jsx */
export default function Button() {
  return (
    <button className="px-4 py-2 rounded-md bg-blue-600 text-white border-0 cursor-pointer">
      Save
    </button>
  );
}
```

**Family 4 — CSS-in-JS**

```jsx
/* Button.jsx */
import styled from "styled-components";

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  background: #2563eb;
  color: #ffffff;
  border: none;
  cursor: pointer;
`;

export default function SaveButton() {
  return <Button>Save</Button>;
}
```

**Line-by-line notes (the parts that matter here):**

- Every family ends with a clickable button that looks the same. The **design** is identical; only the *delivery* differs.
- Family 1 attaches class strings (`className="btn btn--primary"`).
- Family 2 attaches a JavaScript expression (`{styles.btn}`) instead of a string. That is the single biggest new syntax in the family.
- Family 3 has no `.css` file visible here; the styles are the class names.
- Family 4 uses a backtick template string and exports a styled button component.
- This course uses **Family 1**, so the rest of Phase 4 looks like the first column.

**Predict before you read on:** in your design tool, which of these four would be hardest to hand to a developer who only reads CSS? Write one sentence. (There is no single right answer; the exercise is to notice you now have an opinion grounded in a trade-off.)

## Common errors

### Error 1: Writing `class` instead of `className`

**What you see:** the page looks unstyled, and the browser console (open Developer Tools with **F12** or **Ctrl+Shift+I**; on macOS **Cmd+Option+I**) prints:

```text
Warning: Invalid DOM property `class`. Did you mean `className`?
```

**What it means:** in JSX, React renamed the HTML `class` attribute to `className`. Read the console line literally: React even tells you the fix.

**Fix:** change `class="card"` to `className="card"` and save. The Vite dev server (from U09) reloads automatically.

### Error 2: Passing a string to `style` instead of an object

**What you see:** an error such as *"The `style` prop expects a mapping from style properties to values, not a string."*

**What it means:** HTML accepts `style="color:red"`. React wants an object: `style={{ color: "red" }}`.

**Fix:** use double braces and camelCase keys: `style={{ backgroundColor: "white" }}`.

### Error 3: Assuming the stylesheet is "scoped" because the file is next to the component

**What you see:** changing `Card.css` unexpectedly changes a button somewhere else. This is the plain-CSS collision from Family 1.

**What it means:** in plain CSS, *placement in a folder does not scope anything*. The rule `.title { ... }` applies to every element with `className="title"` in the whole app.

**Fix:** adopt a naming convention (U21 teaches this) so `Card.css` uses names like `.card`, `.card__title`, and never bare `.title`.

## Checkpoints

Answer in your own words before attempting the assignment:

1. Name the four families and one honest cost of each.
2. Why does React use `className` instead of `class`?
3. When would inline `style` be a reasonable choice, and why is it a poor choice for a whole component library?
4. In one sentence, why does this course choose plain CSS per component plus a tokens file?

If you can answer all four, you are ready.

## Practice exercises

### P1 — Read and predict

Re-read the worked example. Without scrolling up, write down which family uses `className="..."` with a quoted string, and which uses `className={...}` with an expression. Check yourself, then fix any wrong answer.

### P2 — Change one value

In the Family 1 example, change `border-radius: 6px` to `border-radius: 999px`. Predict what the button looks like first (pill versus slightly rounded), then apply it if you have a project open. Notice that one line changed the shape everywhere that class is used.

### P3 — Inspection practice

Open a site you like in your browser, press **F12** to open Developer Tools, and use the element picker (the arrow icon) to select a button. In the Styles panel, find whether it is styled by a class or by inline `style`. Write one sentence on how you can tell the difference.

### P4 — Debug this broken snippet

```jsx
export default function Tag() {
  return <span class="tag" style="color: blue">New</span>;
}
```

Name **two** things wrong and write the corrected line.

### P5 — Design bridge

Pick one family you personally find appealing for your own work. In 3–5 lines, describe a real situation where you would choose it and why. (This is a judgment exercise; it is not graded on which family you prefer.)

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). The rubric is visible so there are no surprises.

## What is *not* in this unit

- No building of styled components yet. That is U21 onward.
- No installing a utility framework or CSS-in-JS library.
- No deep dive on CSS Modules syntax.
- No responsive layouts (U23), accessibility rules (U24), or assets (U25).

## Next unit

**U21 — Component-scoped CSS**: we take the plain-CSS recommendation and actually attach a stylesheet to a component, with naming rules that prevent collisions.
