# U23 — Responsive layouts in React

**Phase 4 — Styling and design**

## Where you are

You can now style a single component with its own CSS (U21) and keep its values in shared tokens (U22). But components do not live alone — they sit in a page that must work on a narrow phone and a wide laptop. That is **responsive layout**.

Responsiveness is a design skill you already have. This unit simply maps it onto the code tools that implement it: flexbox, `flex-wrap`, media queries, and the mobile-first mindset.

## What you will be able to do

- Refresh flexbox: main axis, cross axis, `justify-content`, `align-items`, `gap`.
- Use `flex-wrap` so items reflow instead of shrinking to unreadable widths.
- Write a **media query** that changes layout at a breakpoint.
- Apply a **mobile-first** approach with `min-width`.
- Choose between **fluid** and **fixed** sizing, and say why.
- Explain why responsiveness lives in CSS, not in React state.

## What you need already

- **U04 — CSS as presentation**: the box model and a first look at flexbox.
- **U14 — Composing components**: how several components share a page.
- **U21 — Component-scoped CSS**: component stylesheets and naming.
- **U22 — Design tokens as props**: `tokens.css` and `var()`.

## Time and energy

About **90–120 minutes**. The good news: responsive layout is mostly CSS you have seen before, seen more precisely. If flexbox still feels slippery, this unit is where it clicks for many designers.

## Why this exists

Your responsive frames in a design tool are the *picture* of how a layout adapts. Code needs the *rules* that produce that picture. Those rules are not React-specific — they are CSS — but React gives you a clean place to apply them: the component's own stylesheet.

A frequent beginner mistake is trying to make React "detect the screen size" and render different components per breakpoint. That is usually the hard, fragile path. The easy, durable path is to render the same markup and let CSS reflow it. This unit teaches that path and explains when the exception applies.

## Plain-language teaching

### Flexbox, precisely

Flexbox lays out a container's direct children along a line. Two imaginary lines matter:

- The **main axis** is the direction items flow. Set it with `flex-direction`. The default is `row` (left to right).
- The **cross axis** is perpendicular to the main axis.

| Property | What it does | Designer translation |
|----------|--------------|----------------------|
| `display: flex` | Turns the container into a flex layout | "This frame uses auto-layout" |
| `flex-direction: row` / `column` | Sets the main axis | Auto-layout horizontal / vertical |
| `justify-content` | Distributes items along the main axis | "Space between", "center" on the primary axis |
| `align-items` | Aligns items on the cross axis | Top / center / bottom alignment |
| `gap` | Space between items | Auto-layout gap |
| `flex-wrap: wrap` | Lets items move to a new line when they do not fit | "Wrap" in auto-layout |

If the auto-layout comparison is clicking, good: you already think in main axis and cross axis, just with different names.

### The one property that unlocks responsiveness: `flex-wrap`

By default flex tries to fit everything on one line, shrinking items as needed. On a narrow screen, five cards shrink to slivers with unreadable text. Adding `flex-wrap: wrap` tells the browser: "if the next item does not fit, start a new line."

```css
.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}
```

- **What it does:** items flow onto multiple lines as space runs out.
- **Success looks like:** on a wide screen, one row; on a narrow screen, the same items stack into two or three rows.
- **One decoded failure:** if items have no sensible width, wrapping alone changes little because each item still tries to be its natural size. Pair `flex-wrap` with a width rule (see fluid sizing below).

### Media queries

A **media query** is a CSS rule that applies only when a condition about the screen is true — most often its width.

```css
@media (min-width: 640px) {
  .row {
    flex-direction: row;
  }
}
```

Read it aloud: "when the viewport is at least 640 pixels wide, apply these styles."

- `@media` starts the condition.
- `(min-width: 640px)` is the condition. **Viewport** means the visible page area (the browser window's content area), not the whole monitor.
- `640px` is a **breakpoint** — a width at which the design changes.

- **What it does:** lets a layout have one set of rules for small screens and another for larger ones.
- **Success looks like:** resizing the browser window visibly changes the layout at 640px.
- **One decoded failure:** writing `@media min-width: 640px` (missing parentheses) or `@media (min-width 640px)` (missing colon) makes the rule invalid and it is ignored silently. The exact spelling matters. If your breakpoint "does nothing," read the query character by character.

### Mobile-first and `min-width`

**Mobile-first** means you write the styles for the smallest screen first, then *add* changes for larger screens using `min-width`.

```css
/* Base: small screens. Stack vertically. */
.row { display: flex; flex-direction: column; gap: var(--space-sm); }

/* 640px and up: go horizontal. */
@media (min-width: 640px) {
  .row { flex-direction: row; gap: var(--space-md); }
}
```

Why this order? Most users are on small screens, so the default favors them; and each `min-width` block only describes the *change*, which keeps rules short. This mirrors your design workflow if you design mobile frames first.

You will also see `max-width` (styles for screens *up to* a width). It is not wrong, but mixing `min-width` and `max-width` carelessly creates gaps where neither rule applies. Pick mobile-first `min-width` and stay consistent for this course.

| Approach | Base styles apply to | Rule reads as |
|----------|----------------------|---------------|
| Mobile-first (`min-width`) | Small screens | "At 640px **and up**, do this" |
| Desktop-first (`max-width`) | Large screens | "At 640px **and below**, do this" |

### Breakpoints

A **breakpoint** is a viewport width where your layout changes. Common starting set (not laws):

| Name | Width | Typical change |
|------|-------|----------------|
| `sm` | 640px | Stack → row for simple rows |
| `md` | 768px | Two-column grids begin |
| `lg` | 1024px | Sidebar appears / wider grids |

Put these widths in your tokens file as comments (CSS variables cannot be used inside media query conditions in plain CSS), so the whole team agrees. Example:

```css
/* Breakpoints (documentation only — media queries need literal values) */
/* sm: 640px  |  md: 768px  |  lg: 1024px */
```

- **Success looks like:** every component that changes at a breakpoint uses the same three widths.
- **One decoded failure:** inventing a new breakpoint (say 713px) for one component creates a layout that changes where nothing else does, which looks broken when pages are composed. Reuse the shared set.

### Fluid vs fixed sizing

**Fixed** sizing sets an exact size: `width: 320px`. It is predictable and good for things that genuinely have a fixed size (an avatar, an icon).

**Fluid** sizing lets an element flex with available space:

```css
.card {
  flex: 1 1 260px;
  max-width: 100%;
}
```

- `flex: 1 1 260px` reads as: grow to fill space (first `1`), shrink if needed (second `1`), but aim for a **base width** of 260px before deciding to wrap.
- `max-width: 100%` prevents a card from growing wider than its container.

This pairing is the modern replacement for manually counting columns. You give a card a comfortable minimum and let the number per row fall out of the container width.

- **What it does:** cards fill the row and wrap naturally.
- **Success looks like:** three cards on a wide screen, two on a tablet, one on a phone — with no media query needed for the count.
- **One decoded failure:** a fixed `width: 400px` on a 360px phone causes horizontal scrolling. Prefer `flex-basis` plus `max-width: 100%`, and test by narrowing the window.

### Why this lives in CSS, not React

React renders structure and responds to data. The viewport width is a *rendering* detail the browser already knows. Media queries are evaluated by the browser, which is faster and works even before JavaScript runs.

You will occasionally branch in React — for example, rendering a compact menu component versus a full one. That is valid, but reach for it only when the two states are genuinely different *components*, not merely different *styles*. The default is: same JSX, CSS reflows.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Main axis | Direction flex items flow (`flex-direction`) | Swaps when direction is `column` |
| Cross axis | Perpendicular to the main axis | `justify-content` is main; `align-items` is cross |
| `flex-wrap` | Allows items to move to new lines | Does not set item width by itself |
| Media query | CSS that applies under a screen condition | Needs parentheses and a colon; wrong syntax fails silently |
| Viewport | The visible page area | Not the physical monitor |
| Breakpoint | Width where layout changes | Not a component prop; a CSS condition |
| Mobile-first | Small screen is the base; add rules upward | Uses `min-width`, not `max-width` |
| `min-width` / `max-width` | "and up" / "and below" | Mixing them creates dead zones |
| Fluid sizing | Size flexes with space (`flex`, `%`) | Not the same as no sizing |
| Fixed sizing | Exact size (`px`) | Fine for avatars/icons, risky for main layout |
| `flex-basis` | The starting size before growing/shrinking | Not the final size |

## Worked example

A responsive card row: one column on phones, two on tablets, three on laptops, driven by tokens and a single base width.

### File 1 — `src/components/CardRow/CardRow.jsx`

```jsx
import Card from "../Card/Card";
import "./CardRow.css";

export default function CardRow({ items }) {
  return (
    <section className="cardRow">
      {items.map((item) => (
        <Card key={item.id} title={item.title}>
          {item.body}
        </Card>
      ))}
    </section>
  );
}
```

Line-by-line:

- `import Card ...` — we reuse the U21 `Card` component, which already uses tokens.
- `import "./CardRow.css";` — this component's layout styles.
- `{items.map(...)}` — rendering a list from U15. Each item needs a stable `key`.
- `<Card ...>` — the card's own styles come from `Card.css`; the row only arranges them.

### File 2 — `src/components/CardRow/CardRow.css`

```css
.cardRow {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-md);
}

/* 640px and up: simple horizontal flow with wrapping */
@media (min-width: 640px) {
  .cardRow {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-md);
  }

  .cardRow > * {
    flex: 1 1 260px;
    max-width: 100%;
  }
}
```

Notes:

- Base (mobile): a single column with a small gap. Perfect for a phone.
- At 640px and up: switch to a row that wraps, with cards aiming for 260px and growing to fill.
- `.cardRow > *` applies to the direct children (the cards) without needing to edit `Card.css`. The `*` means "any element."
- Number of columns is **not** hard-coded. It falls out of the container width: 1024px ≈ three 260px cards, 640px ≈ two, 360px ≈ one.

This is a full responsive layout in about fifteen lines.

### File 3 — `index.html` (the viewport meta tag)

For media queries and mobile scaling to behave, the page needs one line in the HTML `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

- **What it does:** tells the browser to treat the page width as the device width and to start at normal zoom.
- **Success looks like:** on a phone, the page fits the screen instead of appearing zoomed out.
- **One decoded failure:** if this tag is missing, mobile browsers assume a desktop width (~980px) and zoom out, so your mobile styles may appear not to trigger. Projects created with Vite include this line already (you saw `index.html` in U10); only worry about it if your page is missing it.

### How to test it

1. Run `npm run dev` and open the local URL.
2. Press **F12** to open Developer Tools.
3. Click the device toolbar icon (or press **Ctrl+Shift+M**; on macOS **Cmd+Shift+M**).
4. Choose a phone width, then drag the handle wider. Watch the cards reflow from one column to two to three.
5. In the Styles panel, confirm your `@media (min-width: 640px)` block becomes active above 640px and inactive below.

That is the whole workflow: narrow the window, watch the layout respond, inspect which rules are active.

## Common errors

### Error 1: Media query has a syntax typo

**What you see:** the breakpoint appears to do nothing; the layout never changes.

**What it means:** `@media min-width: 640px { }` or `@media (min-width 640px) { }` is invalid, so the browser discards it without complaint.

**Fix:** use `@media (min-width: 640px) { }` — parentheses around the condition and a colon between the feature and value. In Developer Tools, check whether the query's rules are struck through or the block is greyed out.

### Error 2: Horizontal scrolling on a phone

**What you see:** the page scrolls sideways; content is cut off on the right.

**What it means:** something has a fixed width wider than the screen, for example `width: 400px` on a 360px viewport. Fixed widths do not shrink.

**Fix:** prefer `flex: 1 1 <basis>` with `max-width: 100%`, or use `max-width` instead of `width`. Test by dragging the device toolbar to a small phone width.

### Error 3: Cards shrink to unreadable slivers

**What you see:** five cards squeeze onto one line, each a few pixels wide.

**What it means:** flex defaults to keeping one line. Without `flex-wrap: wrap`, items shrink instead of wrapping.

**Fix:** add `flex-wrap: wrap` (and a sensible `flex-basis`). Now items move to the next line rather than collapsing.

### Error 4: Mixing `min-width` and `max-width` creates a dead zone

**What you see:** between, say, 700px and 800px, the layout is neither the mobile nor the desktop version.

**What it means:** a `max-width: 700px` block and a `min-width: 800px` block leave the range between them with only base styles.

**Fix:** choose one direction — mobile-first `min-width` — and use a consistent breakpoint set.

## Checkpoints

1. In a flex row, which property distributes items on the main axis, and which aligns them on the cross axis?
2. What does `flex-wrap: wrap` change about how items are placed?
3. Read `@media (min-width: 768px)` aloud, then explain why `min-width` fits a mobile-first approach.
4. Why do we render the same JSX and let CSS handle the reflow, instead of branching in React by screen size?
5. A card has `width: 400px` and causes sideways scrolling on a phone. What would you change?

## Practice exercises

### P1 — Read and predict

Given a `.cardRow` built exactly as in the worked example, predict how many cards appear per row at 360px, 700px, and 1100px. Then test with the device toolbar and check your prediction.

### P2 — Change one value

Change the base width in `flex: 1 1 260px` to `flex: 1 1 400px`. Predict how the number of cards per row changes at 1100px, then test.

### P3 — Fill in the blank

Write a media query that turns a `.gallery` into a two-column structured layout at 768px and up. (You may use `display: grid; grid-template-columns: repeat(2, 1fr);` or a flex equivalent.) Check that the base is a single column.

### P4 — Debug this broken snippet

```css
@media (max-width: 640px) and (min-width: 768px) {
  .cardRow { flex-direction: row; }
}
```

Explain why this rule can never apply.

### P5 — Inspection practice

Open Developer Tools' device toolbar. With the responsive view, slowly drag the width and watch the Styles panel. Find the moment your media query activates, and note the exact width in `answers.md` for the assignment.

### P6 — Design bridge

Take a component from a real design file with responsive frames. Write, in words, the rule for each frame: what changes, and at which breakpoint. Then translate one into a `@media` block.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No CSS Grid in depth (the worked example uses flex only).
- No container queries.
- No responsive images or `srcset` (U25 touches assets).
- No animations or transitions (U29).
- No JavaScript-based screen-size detection; that is deliberately avoided here.

## Next unit

**U24 — Accessibility**: we make the components and layouts you have built usable by everyone, including keyboard and screen-reader users.
