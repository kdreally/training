# U22 — Design tokens as props

**Phase 4 — Styling and design**

## Where you are

In U21 you styled a component with its own CSS file and kept class names from colliding. But you probably noticed a quiet problem: the same values keep repeating. `#2563eb` here, `8px` there, `12px` two files over. Copy-paste is not a design system; it is drift waiting to happen.

This unit introduces **design tokens** — named values — and the mechanism that makes them real in CSS: **CSS variables**. Then we connect them to React props so a component can choose among tokens by name.

## What you will be able to do

- Explain what a design token is and why naming a value beats repeating it.
- Create a `tokens.css` file of CSS variables and import it once.
- Use `var(--token)` inside component stylesheets.
- Pass a token name as a prop and map it to a class (or a variable).
- Map your design tool's variables (Figma variables/styles) to names in `tokens.css`.

## What you need already

- **U04 — CSS as presentation**: properties and values, and what a stylesheet does.
- **U13 — Props as design properties**: a component receives values from outside.
- **U20 — Styling options**: `className` and our plain-CSS choice.
- **U21 — Component-scoped CSS**: importing a stylesheet and the `card` / `card__element` / `card--modifier` naming habit.

## Time and energy

About **90–120 minutes**. There is one new CSS idea (variables) and one new React pattern (a prop that selects a named value). That is a manageable pair. Take a break after the vocabulary table if your head is full.

## Why this exists

You already know this problem from design. If a client says "make the brand blue a little darker," a good design file updates one variable and every screen follows. A bad file has the blue typed in forty places, and you hunt for every one.

A React app has the identical failure mode. If `#2563eb` is written in `Card.css`, `Button.css`, and `Badge.css`, a rebrand means editing all of them, and the day you miss one, the design is inconsistent in a way only a sharp eye will catch.

Tokens solve this the way variables solve it in your design tool. And there is a second benefit a designer will appreciate instantly: **naming**. `--color-brand` is a decision. `#2563eb` is a mystery. Names let a team talk about the design instead of about hex codes.

## Plain-language teaching

### What a design token is

A **design token** is a named, reusable value that represents a design decision. Examples:

| Token name | Value | Design decision it represents |
|------------|-------|-------------------------------|
| `--color-brand` | `#2563eb` | The primary brand blue |
| `--color-text` | `#1e293b` | Default text color |
| `--space-md` | `16px` | The standard medium gap |
| `--radius-md` | `12px` | Standard corner rounding |
| `--font-size-lg` | `1.125rem` | Large body/heading size |

- **What it does:** gives a value a name so the value is written once and referenced everywhere.
- **Success looks like:** changing the one value in `tokens.css` visibly updates every component that uses that token.
- **One decoded failure:** if you reference a token name that does not exist, CSS does not error. It silently uses the empty/fallback value, and the element looks unstyled or transparent. This is the single most common token bug, and we show you how to catch it below.

A token is **not** the same as a component style. `.card { padding: 20px }` is a style. `--space-lg: 24px` is a token the style can use. Components decide *where* a value goes; tokens decide *what the value is*.

### CSS variables: the mechanism

CSS has its own native way to store named values, called **custom properties** or **CSS variables**. They start with two dashes:

```css
:root {
  --color-brand: #2563eb;
}
```

- `:root` is a selector that matches the whole document. Defining tokens there makes them available everywhere.
- `--color-brand` is the name. You choose it.
- `#2563eb` is the value.

To use a variable, wrap its name in `var(...)`:

```css
.button {
  background: var(--color-brand);
}
```

- **What it does:** substitutes the stored value at that spot.
- **Success looks like:** the button is brand blue.
- **One decoded failure:** `background: color-brand;` (without `var(...)` and the double dash) is not a valid value. The browser ignores the whole declaration, and the button has no background. Misspelling the name inside `var()` fails the same silent way.

Why not use a preprocessor or a JavaScript object for tokens? Plain CSS variables need **no extra tools**, are available in every modern browser, and are inspectable in Developer Tools. That matches our U20 rule: no new dependencies when the platform already does the job.

### Passing a token name as a prop

Now the React half. Suppose a `Badge` can be one of several tones: neutral, success, warning. Each tone maps to a set of token-based colors.

We pass the tone as a **prop** — a token *name* — and turn it into a class:

```jsx
<Badge tone="success" label="Active" />
```

Inside, the component builds a class from the tone:

```jsx
const className = `badge badge--${tone}`;
```

If `tone` is `"success"`, the class becomes `badge badge--success`, and the component's stylesheet defines:

```css
.badge--success {
  background: var(--color-success-bg);
  color: var(--color-success-text);
}
```

Two things are happening, and it helps to keep them separate:

1. **Prop → class name.** The prop chooses *which* variant you get.
2. **Class → token.** The stylesheet maps that variant to named values.

This split is deliberate. The component's JavaScript stays readable, and the actual colors live in CSS where a designer can find them. A commitment for later: because the class name is built from the prop value, the prop must match a class that exists. Pass `tone="sucess"` (typo) and no `badge--sucess` class exists, so the badge falls back to base styling with no error. "Valid values" are a convention, not something React enforces.

### An alternative: passing the value directly

You will also see components that take the token name and apply it inline:

```jsx
<span style={{ background: `var(--color-${tone}-bg)` }}>
```

That works, but it spreads style logic into JSX and makes hover states impossible. We will use the **class** approach for components, and reserve inline variables for truly one-off, computed values.

### Design bridge: Figma variables to `tokens.css`

You have likely used Figma variables or published styles (color styles, text styles, effect styles). Those are tokens. The mapping is almost mechanical:

| Figma | `tokens.css` |
|-------|--------------|
| Variable `color/brand` | `--color-brand` |
| Variable `spacing/md` | `--space-md` |
| Number variable `radius/md` | `--radius-md` |
| Text style `body/large` size | `--font-size-lg` |

Notice we translate the `/` in Figma's names to `-`. Slashes are not valid inside a CSS variable name. Keep the *word order* so the mapping stays obvious to anyone looking at both files.

A practical habit: keep your token names in one place, and when Figma changes a value, change it in `tokens.css` only. If you find yourself editing a raw hex value inside `Card.css`, that hex should probably be a token.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Design token | A named reusable design value | Not the same as a component style |
| CSS variable / custom property | A native named value, written `--name` and used with `var(--name)` | Needs the double dash; `var()` is required to use it |
| `:root` | Selector for the whole document, where tokens are declared | Not a class; do not add a dot |
| `var()` | The function that substitutes a token's value | Missing it makes the value invalid and silently ignored |
| Fallback | A backup value in `var(--x, #000)` used if `--x` is missing | Without one, a missing token becomes empty, not black |
| Token name as prop | Passing e.g. `tone="success"` to choose a variant | React does not validate the value; typos fail quietly |
| Modifier class | `badge--success`, chosen by the prop | Must exist in CSS or nothing changes |
| Drift | Values diverging because they were copied, not shared | The problem tokens exist to prevent |

## Worked example

We build a `Badge` component whose tone comes from a token name, with all values in `tokens.css`.

### File 1 — `src/tokens.css`

```css
:root {
  /* Colors */
  --color-brand: #2563eb;
  --color-text: #1e293b;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;

  --color-neutral-bg: #f1f5f9;
  --color-neutral-text: #334155;

  --color-success-bg: #dcfce7;
  --color-success-text: #166534;

  --color-warning-bg: #fef3c7;
  --color-warning-text: #92400e;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-pill: 999px;

  /* Type */
  --font-size-sm: 0.8125rem;
  --font-size-md: 0.9375rem;
}
```

Notes:

- Group comments (`/* Colors */`, `/* Spacing */`) are for humans reading the file; they cost nothing.
- Token names describe **role** (`--color-success-bg`), not appearance (`--color-green-100`). Role names survive a rebrand; color names do not.
- We give spacing a small scale (`xs`, `sm`, `md`) so values stay consistent, exactly like a spacing scale in Figma.

### File 2 — `src/main.jsx` (import tokens once)

The token file must be loaded before components use it. Importing it once near the app's entry point is enough, because CSS variables declared on `:root` are global.

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tokens.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- `import "./tokens.css";` — loads every token for the whole app.
- The rest is the entry file you already met in U09/U10. Your actual `main.jsx` may look slightly different; the only change you must make is adding the tokens import.

- **Success looks like:** Developer Tools' Styles panel for `:root` or `<html>` shows your tokens.
- **One decoded failure:** if you import tokens only inside one component, other components may load before it and miss the variables. Import once at the entry point.

### File 3 — `src/components/Badge/Badge.jsx`

```jsx
import "./Badge.css";

const TONES = ["neutral", "success", "warning"];

export default function Badge({ label, tone = "neutral" }) {
  const safeTone = TONES.includes(tone) ? tone : "neutral";
  return <span className={`badge badge--${safeTone}`}>{label}</span>;
}
```

Line-by-line:

- `const TONES = [...]` — the list of valid token names this component accepts. This is a plain JavaScript array (U06).
- `tone = "neutral"` — the prop default (U13).
- `TONES.includes(tone)` — checks the prop against the list; if it is not valid, fall back to `"neutral"`. This is our defense against the silent typo failure.
- `` `badge badge--${safeTone}` `` — a JavaScript **template literal**: backticks with `${...}` inserting a value. It produces `"badge badge--success"`.
- `<span className={...}>` — note the braces, because this is an expression, not a quoted string.

**Predict-then-run:** before reading File 4, predict the class string for `<Badge tone="warning" label="Due" />`. It should be `badge badge--warning`.

### File 4 — `src/components/Badge/Badge.css`

```css
.badge {
  display: inline-block;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-sm);
  line-height: 1.4;
  white-space: nowrap;
}

.badge--neutral {
  background: var(--color-neutral-bg);
  color: var(--color-neutral-text);
}

.badge--success {
  background: var(--color-success-bg);
  color: var(--color-success-text);
}

.badge--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
}
```

- `.badge` holds the shape that every tone shares; each modifier supplies only colors.
- Every value is a `var(...)` token. Change `--radius-pill` once and every pill in the app changes.

### File 5 — `src/App.jsx`

```jsx
import Badge from "./components/Badge/Badge";

export default function App() {
  return (
    <main style={{ display: "flex", gap: "var(--space-sm)", padding: "var(--space-md)" }}>
      <Badge label="Draft" />
      <Badge label="Active" tone="success" />
      <Badge label="Due soon" tone="warning" />
    </main>
  );
}
```

- The first badge uses the default tone (`neutral`).
- Notice the inline spacing uses `var(--space-sm)` — even a one-off inline style can reference tokens, though our component styles stay in CSS.

**Success looks like:** three badges, correctly colored, and one edit to `--color-brand` (if you use it anywhere) changes every place at once.

## Common errors

### Error 1: A token name typo fails silently

**What you see:** a badge is transparent or has default black text. No error in the console.

**What it means:** `background: var(--color-succes-bg)` (note the missing `s`) references a variable that does not exist. CSS treats the unknown variable as empty, so the declaration is invalid and dropped.

**Fix:** open Developer Tools (F12), select the element, and look at the Styles panel. A `var()` that did not resolve is often shown struck through. Compare the spelling, character by character, against `tokens.css`. Use the `:root` entry in the inspector as your reference.

### Error 2: Forgetting `var()` or the double dash

**What you see:** a property is ignored.

**What it means:** `color: --color-text` and `color: color-text` are not how variables are used. The correct form is `color: var(--color-text)`.

**Fix:** use `var(--name)` exactly.

### Error 3: Importing `tokens.css` in the wrong place (or not at all)

**What you see:** components render without any token values; borders, backgrounds, and spacing disappear.

**What it means:** the token variables were never declared on `:root`, so every `var()` is empty.

**Fix:** ensure `import "./tokens.css";` appears once, early, in `main.jsx`. Check the browser's Styles panel for `:root` to confirm the tokens are loaded.

### Error 4: Passing an invalid tone and seeing no change

**What you see:** `<Badge tone="sucess">` (typo) renders a plain neutral badge. Nothing error.

**What it means:** the class `badge--sucess` does not exist. React faithfully built a class name for a class you never wrote.

**Fix:** our `TONES.includes(tone)` guard converts unknown tones to `neutral`, and the list documents the valid values. When extending a component, add the new value to the list **and** write the matching modifier class.

## Checkpoints

1. What is a design token, and how is it different from a component style?
2. Why do we declare tokens on `:root` and import the token file once?
3. Given `<Badge tone="warning" />`, what exact class string reaches the `<span>`?
4. Your badge's color is missing with no error. Where do you look and why?

## Practice exercises

### P1 — Read and predict

Predict the class strings for `<Badge label="x" />` and `<Badge label="x" tone="success" />`. Then check File 3.

### P2 — Change one value

In `tokens.css`, change `--radius-pill` from `999px` to `6px`. Predict how the badges change, then apply. Confirm every badge changed with one edit.

### P3 — Fill in the blank

Add a `--color-danger-bg` and `--color-danger-text` token pair, then add a `.badge--danger` rule and `"danger"` to the `TONES` array. Render `<Badge label="Blocked" tone="danger" />`.

### P4 — Debug this broken snippet

```css
.badge {
  background: var(--color-sucess-bg);
  color: color-success-text;
}
```

Name **two** distinct problems.

### P5 — Inspection practice

Open Developer Tools (F12), select a badge, and find the `var()` declarations in the Styles panel. Confirm you can trace each value back to a name. Write one sentence on how this mirrors reading a Figma variable's value.

### P6 — Design bridge

Take three variables from a real Figma file or style guide you use. Give each a CSS token name and a value. Note any name that had to change because `/` is not allowed in CSS.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No responsive breakpoints or media queries (U23).
- No accessibility contrast audit yet (U24) — though good tokens make contrast easier.
- No component library or Storybook.
- No build-time theme switching or runtime theme context (that is later, if at all).

## Next unit

**U23 — Responsive layouts in React**: we arrange token-spaced components so they adapt to smaller and larger screens.
