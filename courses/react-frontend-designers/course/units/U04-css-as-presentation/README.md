# U04 — CSS as presentation

**Phase 1 — Foundations**

## Where you are

U03 gave your page a **skeleton**: real HTML structure with meaningful tags. Right now it looks like every other unstyled page — black text, default font, no spacing of your choosing. This unit gives it **skin**: color, type, spacing, and layout.

You will write your first **stylesheet** and connect it to your page. Everything here maps directly to what you already do in a design tool — you just spell it in text now. By the end you will have styled your own U03 page and you will understand *why* each value is where it is.

## What you will be able to do

- Explain what CSS is and how it stays separate from HTML.
- Create `styles.css` and link it to your page with a `<link>` tag.
- Write rules using **element**, **class**, and **id** selectors.
- Use the **box model** — content, padding, border, margin — deliberately.
- Set colors and fonts, including an honest note on contrast.
- Lay elements out in a row with basic **flexbox**.
- Diagnose "my CSS did nothing" using DevTools.

## What you need already

- **U00–U03.** Specifically: U02 for the DOM and DevTools, and U03 because you will **style the page you built there**. Have that `index.html` and its folder ready.

No terminal and no installation. You will create one more text file.

## Time and energy

About **2–3 hours**, and it rewards breaks. CSS is where designers usually start to enjoy themselves — it is visual and immediate — but it is also where "why isn't this applying?" shows up often. That frustration is a normal part of learning CSS, not evidence that you are bad at it. The debugging habit in this unit is as valuable as the syntax.

## Why this exists

A page that is only structure is like a wireframe: correct but unusable as a product. Presentation is where your actual craft lives — hierarchy, rhythm, contrast, whitespace. If you only ever style through a design tool, you cannot fix a live interface, and you cannot see the rules that your design decisions become.

CSS is also the shared language between your design work and the developers who build it. When you can write even a little CSS, handoffs get dramatically better: you stop saying "make the gap bigger" and start saying "increase the section's padding to 24 pixels." Precision travels.

And in React, styling does not disappear — it is carried over. Everything you learn here is exactly what you will reuse in Phase 4.

## Plain-language teaching

### What CSS is, precisely

**CSS** stands for **Cascading Style Sheets**. You met the gist in U02: *pick a target, describe its look.* The precise version:

- A **stylesheet** is a file containing styling rules.
- A **rule** has a **selector** (the target) and one or more **declarations** (the look).
- A **declaration** is a `property: value;` pair.

```css
p {
  color: navy;
  font-size: 16px;
}
```

Read it as: "For every `<p>`, make the text `navy` and the size `16px`." Everything before the `{` is the selector; everything inside is declarations. Each declaration ends in a **semicolon**.

### Why CSS lives in its own file

You *could* write styles inside the HTML, but we will not, for two reasons:

1. **Separation.** Structure (HTML) stays about *what is there*; presentation (CSS) stays about *how it looks*. One stylesheet can restyle a whole site without touching content.
2. **Reuse.** Change one rule; update every element it matches. This is the same "master style" instinct from your design tools — and it is a first taste of the reuse idea React is built on.

### Linking a stylesheet

Create a file named `styles.css` in the **same folder** as your `index.html`. Then add this line inside the `<head>` of your HTML:

```html
<link rel="stylesheet" href="styles.css">
```

- `<link>` is a **void element** (no closing tag) that pulls in another file.
- `rel="stylesheet"` says what kind of relationship it is: this file is a stylesheet.
- `href="styles.css"` is the path to the file. Because both files are in the same folder, the path is simply the filename.

*Success looks like:* after saving both files and refreshing, your styling appears. If you change the page background to a color and refresh, the whole page changes color — that proves the link works.

*Decoded failure:* if **nothing** changes, the link is not working. The three usual causes are: the filename in `href` does not exactly match the real file (`style.css` vs `styles.css`), the file is in a different folder than `index.html`, or the file was saved as `styles.css.txt`. Check the filename first, then the location.

### Selectors: element, class, id

A selector decides *which elements* a rule applies to. Three kinds cover almost everything at this stage.

**Element selector** — matches every element of that tag:

```css
p { line-height: 1.5; }
```

Every `<p>` on the page gets this. Good for broad, site-wide defaults (base font, base color).

**Class selector** — matches elements with a matching `class` attribute. Written with a leading dot:

```css
.card { border-radius: 12px; }
```

```html
<article class="card">...</article>
```

Any number of elements can share a class. This is the workhorse. In your HTML you add `class="card"`, and in CSS you target `.card`. Think of a class as a **style tag** you can apply to as many layers as you like.

**Id selector** — matches the one element with a matching `id` attribute. Written with a leading `#`:

```css
#hero { background-color: #222; }
```

```html
<header id="hero">...</header>
```

An `id` must be **unique** — only one element on the page may use it. Ids are intended for anchoring and naming a single element, not for general styling.

**Specificity** is the tie-breaker when two rules both match an element. The rough ordering: an **id** rule beats a **class** rule, which beats an **element** rule. Because id rules are hard to override, a common recommendation is: **use classes for styling**, and reserve ids for their uniqueness role. If a style "won't change" no matter what you do, a more specific rule is probably winning — DevTools will show you exactly which (see below).

### The box model: every element is a box

This is the single most important CSS idea for a designer, and you already know it intuitively. Every element is a rectangle made of four layers, from the inside out:

```text
┌─────────────────────────────────────────┐
│                 margin                   │  space OUTSIDE the border
│  ┌───────────────────────────────────┐  │
│  │            border                  │  │  the visible edge
│  │  ┌─────────────────────────────┐  │  │
│  │  │          padding             │  │  │  space INSIDE the border
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │        content         │  │  │  │  the text or image
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

- **Content** — the text, image, or child elements.
- **Padding** — space *inside* the box, between content and border. Like the interior margin in a Figma frame.
- **Border** — a visible line around the padding.
- **Margin** — space *outside* the box, pushing other boxes away. Like the distance between frames.

**The classic mistake — margin vs padding.** If you want the space *inside* a button between its label and its edge, that is **padding**. If you want space *between* two buttons, that is **margin**. Mixing these up is the most common beginner bug, and it is a visual bug: the box grows in the wrong place.

**`box-sizing: border-box`.** By default, CSS adds padding and border *on top of* a specified width, so a `width: 100px` box with `padding: 20px` becomes 140px wide. Designers find this maddening, because in a design tool the width you type is the width you get. The fix is one rule at the top of your stylesheet:

```css
* { box-sizing: border-box; }
```

Now padding and border are counted *inside* the width, matching your design-tool intuition. Put it at the top of every stylesheet you write.

### Colors

CSS accepts colors in several common spellings:

- **Named:** `tomato`, `navy`, `gray`. Easy to read, limited palette.
- **Hex:** `#2f6b4f` — a `#` then six characters (pairs for red, green, blue). Most common from design tools.
- **RGB:** `rgb(47, 107, 79)` — the same color as decimal numbers 0–255.
- **RGBA:** `rgba(47, 107, 79, 0.5)` — RGB plus an **alpha** (0 = invisible, 1 = solid), for transparency.

**Contrast is part of the job, not decoration.** Body text should be clearly legible against its background. A widely used guideline (WCAG) is a contrast ratio of at least **4.5:1** for normal text. Dark gray on white is safe; light gray on white often is not. This matters for accessibility and for real users in sunlight or on poor screens. We are not using a paid tool; your eyes plus a free contrast checker if you want one.

### Fonts

Typography is set with a handful of properties:

```css
body {
  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
}
```

- **`font-family`** — a list of fonts, in order of preference. The browser uses the first one it has. The last item is a **generic family** (`sans-serif`, `serif`, `monospace`) as a safety net. Using **system fonts** (`system-ui`) means no downloads, no paid services, and fast loading.
- **`font-size`** — how large. `16px` is a common readable base.
- **`line-height`** — spacing between lines of text. A unitless number like `1.5` scales with the font size and is usually more pleasant than a fixed pixel value.
- **`font-weight`** — thickness: `400` normal, `700` bold.

You can also set size and weight on headings separately to build hierarchy — but remember from U03 that the *level* (`<h1>` vs `<h2>`) is chosen for meaning. CSS chooses how each level *looks*.

### Flexbox basics: laying things out in a row

HTML stacks elements vertically by default. The moment you want a row — a nav bar, a toolbar, a row of cards — you reach for **flexbox**.

You turn a container into a **flex container** with one line:

```css
.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}
```

- **`display: flex`** — the container now arranges its direct children in a row (by default).
- **Its children** automatically become **flex items**.
- **`gap: 12px`** — space between the items. This replaces the old fiddly margins between children.
- **`align-items`** — aligns items along the cross axis (here, vertical). `center` lines them up centrally.
- **`justify-content`** — distributes items along the main axis (here, horizontal). `space-between` pushes them to the ends with space in between.

That is genuinely most of what you need to start. Flexbox has more options, and we will return to it in Phase 4; for now, "`display: flex` + `gap`" will already let you build a header and a toolbar.

### How to diagnose CSS with DevTools

CSS does not throw big red errors the way some tools do; it mostly **silently ignores** what it cannot understand. That makes DevTools your best friend. Right-click an element → **Inspect** (U02), then look at the **Styles** panel:

- Your matching rules appear, top to bottom by specificity.
- A property with a **strikethrough** line is being overridden by a more specific rule.
- A crossed-out or greyed property means the browser did not understand it — often a typo or a missing semicolon.

This is your "read the error message" practice for CSS: the error is usually a rule that simply did not apply, and the Styles panel shows you why.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| CSS | The language of presentation — layout, color, type | Not structure or content |
| Stylesheet | A file of CSS rules (`styles.css`) | Not the HTML file |
| `link` tag | The `<head>` line that connects the stylesheet | Confused with an `<a>` link — different element |
| Rule | Selector + one or more declarations | Not the same as a selector |
| Selector | The part that chooses which elements to style | Not the value inside |
| Declaration | One `property: value;` pair | Missing the semicolon breaks it |
| Element selector | Targets every element of a tag, e.g. `p` | Broad — affects all of them |
| Class selector | Targets `.class` names; reusable | Not unique; that is the point |
| Id selector | Targets one unique `#id` | Should not be reused; hard to override |
| Specificity | Which rule wins when several match | Id > class > element |
| Box model | Every element's content, padding, border, margin | Margin is outside; padding is inside |
| `padding` | Space inside the border, around content | Not the space between boxes |
| `margin` | Space outside the border, pushing neighbors | Not the space inside the box |
| `border` | The visible edge line | Can be invisible if set to `none` |
| `box-sizing: border-box` | Makes padding/border count inside the width | Not on by default |
| Hex color | `#2f6b4f` style color code | Not a CSS variable or id |
| `font-family` | The list of fonts to try, in order | Not a downloadable font by itself |
| `line-height` | Vertical spacing between text lines | Unitless numbers scale best |
| Flexbox | A one-line way to lay children in a row/column | Not a grid; different tool |
| Flex container / item | The element with `display: flex` / its direct children | Items are direct children only |
| `gap` | Space between flex items | Not padding inside an item |

## Worked example

Two files, in the same folder. Type them, then open `index.html` and refresh as you experiment.

**`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Tea Card</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <nav class="toolbar">
      <a class="toolbar__link" href="#">Home</a>
      <a class="toolbar__link" href="#">Teas</a>
      <button class="toolbar__button">Add</button>
    </nav>

    <article class="card">
      <h2 class="card__title">Jasmine Green</h2>
      <p class="card__note">Brewed at 80&deg;C for two minutes.</p>
      <button class="card__button">Save</button>
    </article>
  </body>
</html>
```

**`styles.css`**

```css
* {
  box-sizing: border-box;
}

body {
  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
  background-color: #f5f3ef;
  color: #2b2b2b;
  padding: 24px;
}

.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  padding-bottom: 16px;
}

.toolbar__link {
  color: #2f6b4f;
}

.toolbar__button {
  margin-left: auto;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background-color: #2f6b4f;
  color: #ffffff;
}

.card {
  max-width: 320px;
  padding: 20px;
  border: 1px solid #d8d4cc;
  border-radius: 12px;
  background-color: #ffffff;
}

.card__title {
  margin: 0 0 8px;
  font-size: 20px;
}

.card__note {
  margin: 0 0 16px;
  line-height: 1.5;
  color: #5a5a5a;
}

.card__button {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #2f6b4f;
  color: #ffffff;
  font-size: 14px;
}
```

**Why each rule exists:**

- `* { box-sizing: border-box; }` — makes every width include its padding and border, matching design-tool intuition. The asterisk is the **universal selector**: it matches every element.
- `body { ... }` — sets page-wide defaults: a system font stack, a warm off-white background, dark text, and 24px of breathing room around everything.
- `.toolbar { display: flex; ... }` — turns the nav into a row. `gap: 12px` spaces the links and button; `align-items: center` lines them up nicely; `padding-bottom` gives the row air below it.
- `.toolbar__link` — colors the links green. (The double-underscore naming, `toolbar__link`, is a popular convention for "a link that belongs to the toolbar." It is just a class name, but it keeps your stylesheet readable.)
- `.toolbar__button { margin-left: auto; ... }` — inside a flex row, `margin-left: auto` pushes this item to the far right. The rest gives it a green fill, no border, rounded corners, and white text.
- `.card { ... }` — the card: capped at 320px wide (a reading-friendly width), inner padding, a subtle border, rounded corners, and a white surface that lifts it off the page.
- `.card__title` — removes the default heading margin above it and adds 8px below, then sets a usable size. (Browsers add default margins; `margin: 0 0 8px` means top 0, sides 0, bottom 8px.)
- `.card__note` — comfortable line spacing and a softer gray for secondary text. Note it is deliberately darker than you might first reach for, to keep contrast legible.
- `.card__button` — a larger, filled button for the card's main action.

**The box model in action:** in `.card__button`, the `padding: 8px 16px` is the space *inside* the button between its label and its edge. If you wanted space *between* the note and the button, that would be a **margin** on one of them. Getting this right is most of "why does my spacing look wrong?"

**The DOM reminder:** the CSS does not change the tree at all. It only changes how the existing elements look. Structure and presentation stay separate — exactly the separation that will make React styling saner later.

## Common errors

### Error: Nothing is styled at all.

**What happens:** You wrote CSS, refreshed, and the page is unchanged.

**Fix:** The link is almost always the culprit. Check, in order: (1) the `<link>` line is inside `<head>`; (2) `href` exactly matches the real filename and case; (3) both files are in the same folder; (4) the CSS file did not save as `.txt`. Open DevTools → **Network** or look for the stylesheet in the **Styles** panel; if it is missing there, the link is broken.

### Error: One rule works, the next one does not.

**What happens:** A missing semicolon or brace causes the browser to skip a declaration or a whole rule.

**Fix:** Every declaration ends in `;`, and every rule is wrapped in `{ }`. A missing `;` before the next property is the classic offender. In DevTools → Styles, an ignored declaration may look greyed or crossed out. That is the browser telling you where it stopped understanding.

### Error: The class rule does nothing.

**What happens:** Your HTML says `class="card__titel"` and your CSS says `.card__title` — a typo. They no longer match.

**Fix:** Class and selector names must match **exactly**, including case. Compare letter by letter in DevTools (the Elements panel shows the element's classes; the Styles panel shows which rules matched — if yours is absent, the name or the dot is wrong).

### Error: "I set the width to 100px but the box is bigger."

**What happens:** Default CSS adds padding and border to the width, so the visible box is wider than 100px.

**Fix:** Add `* { box-sizing: border-box; }` at the top of the stylesheet, as the worked example does. Now the padding and border fit inside the width.

### Error: Using margin where you meant padding (or vice versa).

**What happens:** A button's label touches its edge, and you "fix" it with margin, which moves the whole button instead.

**Fix:** Space *inside* a box (between content and edge) is **padding**. Space *outside* a box (between it and its neighbors) is **margin**. Ask: "is the empty space inside this element or between it and something else?"

### Error: A style refuses to change no matter what.

**What happens:** You keep editing `.button` but nothing happens.

**Fix:** Something more specific is winning — likely an `#id` rule or a later rule of equal specificity. Open DevTools → Styles and look for the **strikethrough**: the winning value is shown, the losing one is crossed out. Prefer classes over ids exactly to avoid this.

### Error: Text is unreadable (light gray on white).

**What happens:** Aesthetics win over legibility, and the low-contrast text fails accessibility and fails for users in bright light.

**Fix:** Darken the text or lighten the background until the contrast is clearly comfortable. Aim for at least the WCAG 4.5:1 guideline for normal text. This is design craft, not bureaucracy.

## Checkpoints

Answer in your own words. If you can, you are ready for the assignment:

1. What is the difference between a selector and a declaration?
2. Why do we keep CSS in its own file instead of inside the HTML?
3. What is the difference between `padding` and `margin`, in one sentence each?
4. What does `box-sizing: border-box` change, and why do designers prefer it?
5. When would you use a **class** selector instead of an **element** selector, and why not an **id**?
6. What does `display: flex; gap: 12px;` do to a container and its children?
7. In DevTools, what does a strikethrough on a CSS property tell you?

## Practice exercises

Ungraded. Do these on your U03 page or a scratch copy. Difficulty increases on purpose.

### P1 — Read and predict

Look at this rule and write, before applying it, exactly what you expect to change on a page that contains two paragraphs inside a section.

```css
section { padding: 16px; }
p { color: #444; }
```

Apply it and check. Did the padding create space inside the section (pushing the paragraphs inward) or outside it?

### P2 — Change one value

Take the worked example and change only `gap: 12px` to `gap: 40px`. Observe. Then change it back. One-value experiments are the safest way to learn what each property does.

### P3 — Fill in the blank

Complete this rule so all elements with `class="tag"` have rounded corners, 4px of inner padding, and a light gray background:

```css
________ {
  ________: 6px;
  ________: 4px 8px;
  ________: #eeeeee;
}
```

### P4 — Write a rule from a specification

Add a `<h1>` to the worked example and write a CSS rule that makes it 32px, bold (`font-weight`), and dark green (`#2f6b4f`). Verify in the browser.

### P5 — Fix the broken stylesheet

This stylesheet has **three** mistakes that stop styles from applying as intended. Find and fix each.

```css
.card {
  background-color: white
  padding: 20px
  border-radius: 12px;
}

.crad__title {
  font-size: 20px;
}
```

### P6 — Diagnose with DevTools

Pick any element on your styled page and inspect it. In the Styles panel, find one property that is **not** applying (greyed or struck through) and write one sentence explaining why.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). It is visible so there are no surprises.

## What is *not* in this unit

- No JavaScript, no interactivity (a `:hover` rule is CSS, not behavior).
- No CSS frameworks, preprocessors, or animation libraries.
- No grid layout, media queries, or responsive design — those come in Phase 4.
- No styling inside React and no CSS modules or CSS-in-JS yet.
- No terminal and no installation.

## Next unit

**U05 — JavaScript: values, variables, functions.** You leave the visual layer for a short, gentle introduction to the language that makes pages *change* — and eventually powers React.
