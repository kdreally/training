# U24 — Accessibility

**Phase 4 — Styling and design**

## Where you are

You can build components, style them, tokenise their values, and make them adapt to screen size. All of that assumes someone can *use* the result. Accessibility is the practice of making sure they can — including people using keyboards, screen readers, screen magnification, or lower-contrast settings.

For a designer, this is not extra credit. It is part of the brief, and the good news is that it is largely a set of decisions you already make (hierarchy, contrast, labels, states) expressed in code.

## What you will be able to do

- Explain why accessibility matters to real users and to your work.
- Choose semantic HTML elements before reaching for generic containers.
- Associate a label with an input correctly.
- Write useful `alt` text, and know when it should be empty.
- Use a `<button>` for actions instead of a clickable `<div>`.
- Recognize and preserve visible keyboard focus.
- Check basic color contrast and state why it matters.
- Use `aria-label` only when no visible text is available, and say what ARIA is *not* for.
- Run a quick accessibility inspection in the browser.

## What you need already

- **U02 — What a web page is made of**: the DOM is the tree the browser builds from your markup.
- **U03 — HTML as structure**: elements carry meaning (heading, paragraph, list).
- **U18 — Forms and controlled inputs**: inputs and their values.
- **U21 — Component-scoped CSS**: styling components, and the class naming habit.
- **U22 — Design tokens as props** (helpful): tokens make contrast easier to manage globally.

## Time and energy

About **90–120 minutes**. Much of it is checking your existing work against a short list. Accessibility can feel overwhelming because it is broad; we deliberately keep this unit to a handful of high-impact basics.

## Why this exists

A surprising amount of the web is unusable to people with disabilities — not because building it well is hard, but because it is easy to build a visually correct thing that only works with a mouse and only makes sense if you can see it.

Concretely:

- A screen-reader user navigates by **semantics** (is this a button? a heading? a labelled field?). A `<div>` that *looks* like a button is announced as nothing.
- A keyboard-only user (many people, not only disabled users) needs to reach every control with the Tab key and see where focus is.
- Low-vision users need enough contrast; and about 1 in 12 men has some color-vision deficiency, so color alone must not carry meaning.

Beyond ethics, there is a legal dimension: many organisations are required to meet accessibility standards. And the same decisions (clear labels, real buttons, visible focus) make an interface easier for *everyone*, including people on phones in bright sunlight.

Accessibility is a design craft, not a compliance chore. The rest of this unit gives you the small set of moves that carry most of the weight.

## Plain-language teaching

### Principle 1: semantic HTML first

The browser gives every HTML element a **role** — a meaning it reports to assistive technology. `<button>` announces "button." `<h1>` announces "heading level 1." `<nav>` announces "navigation."

When you use a generic `<div>` or `<span>` for everything, you strip those roles away. Screen readers stop being able to help.

Our rule: **reach for the meaningful element before the generic one.**

| Design intent | Use this | Not this |
|---------------|----------|----------|
| A clickable action | `<button>` | `<div onClick>` |
| A link to another page | `<a href="...">` | `<span onClick>` |
| A field with a label | `<label>` + `<input>` | bare `<input>` |
| A heading | `<h1>`…`<h6>` | styled `<div>` |
| A list of things | `<ul>` / `<ol>` + `<li>` | stacked `<div>`s |
| A grouping of navigation | `<nav>` | `<div class="nav">` |

- **What it does:** gives each part a meaning that assistive tech can announce.
- **Success looks like:** in the browser's accessibility inspector, a button reads as a button.
- **One decoded failure:** a `<div onClick>` is not focusable by keyboard and announces nothing. Keyboard users cannot reach it, and screen-reader users do not know it is interactive. Swapping it for `<button>` fixes both at once.

### Principle 2: every input needs a label

A **label** is the text that tells a user what a field is for. It must be *programmatically associated* with the input, not merely sitting nearby visually.

The reliable way: give the input an `id`, and point the `<label>` at it with `htmlFor` (React's spelling of HTML's `for`).

```jsx
<label htmlFor="email">Email address</label>
<input id="email" type="email" name="email" />
```

- **What it does:** connects the label to the field so screen readers announce "Email address, edit text" when focus lands.
- **Success looks like:** clicking the label text focuses the input, and the accessibility inspector shows the label name.
- **One decoded failure:** if `htmlFor` and `id` do not match, the label is decoration. The screen reader announces an unlabelled edit field and the user has to guess. React also warns in the console: *"A form field element should have an `id` or `name` attribute"* when it cannot associate reliably. The fix is to make the two strings identical.

Do not use placeholder text as a label. **Placeholder** text disappears once the user types, and it often fails contrast. It is a hint, not a label.

### Principle 3: `alt` text on images

An `<img>` needs an `alt` attribute. It serves two jobs: a description for screen readers, and a fallback if the image fails to load.

```jsx
<img src="/team-lead.jpg" alt="Amara Osei smiling in front of a whiteboard" />
```

Rules of thumb:

- If the image carries information, describe it plainly and briefly.
- If the image is purely decorative (`alt=""`, empty), screen readers skip it. The empty string is deliberate, not laziness.
- Do not start with "Image of…"; the screen reader already announces that it is an image.
- Do not cram a keyword list; write what a sighted colleague would say.

### Principle 4: use `<button>` for actions

This is the most common single accessibility bug on the web. A clickable `<div>` can be styled to look perfect and still be invisible to the keyboard.

```jsx
{/* Works for mouse users only */}
<div className="btn" onClick={handleSave}>Save</div>

{/* Works for everyone */}
<button className="btn" onClick={handleSave}>Save</button>
```

A real `<button>` is focusable with Tab, activates with Enter and Space, and is announced as a button — for free. That is why our button styling in Phase 4 targets `.btn` regardless of the element: put the styles on a real `<button>`.

### Principle 5: never remove focus, make it clearer

When you Tab through a page, the browser draws a **focus indicator** (often a thin outline) around the focused element. It is common for designers to write `outline: none` because they dislike it. That removes the only cue a keyboard user has about where they are.

Instead, style it deliberately:

```css
.btn:focus-visible {
  outline: 3px solid var(--color-brand);
  outline-offset: 2px;
}
```

- `:focus-visible` matches keyboard focus specifically, so mouse clicks do not always show the ring.
- `outline-offset` keeps the ring from touching the element's edge.

This is a design decision: pick a focus style that fits your brand and is clearly visible. Make it part of your system, not an accident.

### Principle 6: color contrast basics

Text must stand out from its background. The widely used **WCAG** guidelines (Web Content Accessibility Guidelines) set minimum contrast **ratios**:

| Text type | Minimum ratio |
|-----------|---------------|
| Normal body text | 4.5 : 1 |
| Large text (roughly 18pt / 24px, or 14pt+bold) | 3 : 1 |
| UI components and focus rings | 3 : 1 |

You do not need to compute ratios by hand. Free tools do it: browser Developer Tools can show a contrast ratio next to a color, and online contrast checkers are free too.

- **What it does:** ensures text remains readable for low-vision users.
- **Success looks like:** a color picker in DevTools shows a passing ratio (a green check or "AA" label).
- **One decoded failure:** light gray placeholder text on white frequently fails — often around 2:1. It looks "subtle" in a mockup and is unreadable in practice. Darken it or treat it as non-essential.

Also: do not rely on color **alone** to convey meaning. An error state shown only as red text is invisible to some color-blind users. Add an icon or words ("Error: …").

### Principle 7: `aria-label` — when and when not

**ARIA** (Accessible Rich Internet Applications) is a set of attributes that can add roles and names to markup. The single most important rule is: **ARIA is a last resort, not a first choice.**

Most of the time, a native element solves the problem. Only when an element has no visible text but still needs a name should you add `aria-label`. Classic example: an icon-only close button.

```jsx
<button aria-label="Close dialog">
  <CloseIcon />
</button>
```

- **What it does:** gives the button an accessible name even though it shows only an icon.
- **Success looks like:** the accessibility inspector reports the button's name as "Close dialog."
- **One decoded failure:** adding `aria-label` to a `<div>` does not make it a button or focusable. ARIA changes what is *announced*, not what *works*. A `<div aria-label="Close">` is still not a button. And visible text plus `aria-label` can conflict confusingly. Prefer real elements; add ARIA only to fill a genuine gap.

### Design bridge: accessibility annotations

In Figma, many teams now use accessibility annotations — labels like "button," "heading level 2," "alt: product photo," "focus order 1-2-3," "contrast AA." These annotations are exactly what the code needs to be accessible.

When you annotate a design, you are writing the requirements for the HTML. Your annotations map directly:

| Annotation | Code |
|------------|------|
| "Button: Save" | `<button>Save</button>` |
| "Heading 2: Pricing" | `<h2>Pricing</h2>` |
| "Input: Email, required" | `<label htmlFor>` + `<input required>` |
| "Alt: bar chart showing Q3 growth" | `alt="bar chart showing Q3 growth"` |
| "Focus order: logo → nav → search" | sensible DOM order (top to bottom) |
| "Contrast: text 4.5:1" | token values chosen to pass |

If you annotate these as you design, the developer (or future you) does not have to guess. That is accessibility done at the source, where you have the most leverage.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Accessibility (a11y) | Making interfaces usable by people with disabilities | Not just "screen readers"; also keyboard, low vision, motor |
| Semantics | The meaning an element carries (button, heading) | Style is separate; a "button" look is not a button role |
| Assistive technology | Software like a screen reader that helps a user navigate | The DOM's roles and labels is what it relies on |
| Role | What an element is announced as | Generic `div`/`span` have no useful role |
| Label | Text associated with an input | Visual proximity is not enough; must be programmatically linked |
| `htmlFor` / `id` | React's label attribute and the input's matching identifier | They must be the *same* string |
| Placeholder | Hint text inside an input | Disappears on typing; never a substitute for a label |
| `alt` text | Description for an image | Empty `alt=""` is correct for decorative images |
| Focus | The element the keyboard currently targets | Do not remove the indicator; make it clearer |
| `aria-label` | An accessible name for an element with no visible text | Does not add behavior; not a fix for a non-button element |
| ARIA | Attributes that add roles/names to markup | "First rule of ARIA: don't use ARIA" when HTML suffices |
| WCAG | Web Content Accessibility Guidelines | Guidelines, not a tool; ratios are the practical part |
| Contrast ratio | Measure of text-vs-background difference | 4.5:1 body, 3:1 large text/UI |

## Worked example

A small sign-up form, built accessibly, contrasted with the common broken version.

### The broken version (study the failures)

```jsx
export default function SignupBroken() {
  return (
    <div className="panel">
      <div className="heading">Sign up</div>
      <input className="field" placeholder="Email" />
      <div className="btn" onClick={() => alert("Sent")}>
        Send
      </div>
    </div>
  );
}
```

Failures, decoded:

1. `.heading` is a `<div>`; screen readers do not announce it as a heading. Screen-reader users cannot jump to it.
2. The `<input>` has no label; placeholder text vanishes on typing and may fail contrast. The field is effectively unlabelled.
3. The "button" is a `<div>`. It is not focusable by keyboard, does not activate on Enter or Space, and is announced as plain text.
4. No focus styles exist anywhere, so even if something were focusable, the user could not see where they are.

### The accessible version

```jsx
export default function Signup() {
  function handleSubmit(event) {
    event.preventDefault();
    alert("Sent");
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2 className="panel__title">Sign up</h2>

      <label className="field">
        <span className="field__label">Email address</span>
        <input className="field__input" type="email" name="email" required />
      </label>

      <button className="btn" type="submit">
        Send
      </button>
    </form>
  );
}
```

Line-by-line, and *why*:

- `<form ... onSubmit={handleSubmit}>` — a form element, and the submit handler. Submitting a form also works when the user presses Enter in a field.
- `event.preventDefault();` — stops the browser's default page reload. A recurring pattern with forms (U18).
- `<h2>` — a real heading, announced and navigable.
- `<label className="field">` wrapping the input: this **implicitly associates** the label text with the input inside it, so the label is announced. An explicit `<label htmlFor="email">` with a matching `id` is equally valid; both are fine. Wrapping avoids having to keep two strings in sync.
- `<input type="email" name="email" required />` — `type` gives the right mobile keyboard and validation; `required` marks it mandatory; `name` identifies it on submit.
- `<button className="btn" type="submit">` — a real button, focusable and keyboard-operable. `type="submit"` submits the form.
- The visible text "Send" is the button's accessible name, so no `aria-label` is needed.

Add the focus style in `Signup.css`:

```css
.btn:focus-visible {
  outline: 3px solid var(--color-brand);
  outline-offset: 2px;
}

.field__label {
  display: block;
  margin-bottom: var(--space-xs);
  color: var(--color-text);
}

.field__input {
  width: 100%;
  padding: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.field__input:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 1px;
}
```

### Quick inspection: how to check any page

1. **Keyboard only:** press Tab repeatedly. Can you reach every control? Is it always obvious where focus is? Does Enter/Space activate buttons?
2. **Zoom:** set the browser zoom to 200% (Ctrl/Cmd and `+`). Does content stay usable and unclipped?
3. **Contrast:** in Developer Tools, inspect text and read the contrast ratio shown beside its color.
4. **Accessibility tree:** in Chrome/Edge DevTools, the **Accessibility** panel or the **Elements → Accessibility** pane shows an element's role and name. Select your button; it should say "button" with the right name.
5. **Lighthouse (free, built into Chrome/Edge DevTools):** run the **Accessibility** audit for a checklist of issues. Treat it as a prompt, not a verdict — a passing score still needs your judgment.

## Common errors

### Error 1: A clickable `<div>` instead of a `<button>`

**What you see:** everything works with a mouse. But pressing Tab skips the control, and a screen reader calls it "text."

**What it means:** `<div>` has no button role and no keyboard behavior. Only a real `<button>` (or equivalent) provides them.

**Fix:** change the element to `<button>` and keep the same classes and `onClick`.

### Error 2: Label and input not actually associated

**What you see:** the form looks labelled, but the screen reader announces "edit text" with no name; clicking the label does not focus the field.

**What it means:** `htmlFor` and `id` do not match, or there is no label at all.

**Fix:** either wrap the `<input>` in the `<label>` (implicit) or set `<label htmlFor="email">` with `<input id="email">` (explicit). Make the strings identical.

### Error 3: `outline: none` removes focus

**What you see:** keyboard users cannot tell which element is focused.

**What it means:** the focus indicator was removed for appearance.

**Fix:** remove the `outline: none`; instead define a visible `:focus-visible` style with sufficient contrast.

### Error 4: Decorative image with a keyword-stuffed `alt`

**What you see (screen reader):** every decorative flourish is read aloud, making content exhausting to navigate.

**What it means:** images that add nothing meaningful were given non-empty `alt` text.

**Fix:** use `alt=""` for decorative images so they are skipped; reserve descriptive `alt` for images that carry information.

### Error 5: Using `aria-label` to "fix" a bad element

**What you see:** adding `aria-label` to a `<div>` did not make it focusable or activate on Enter.

**What it means:** ARIA changes what is announced, not how an element behaves. It is not a behavioral patch.

**Fix:** use the correct native element first. Add ARIA only when a native element cannot express the need (for example, an icon-only button).

### Error 6: Meaning conveyed only by color

**What you see:** a required field is marked only by a red border; a color-blind user cannot tell which fields are required.

**What it means:** color alone is not a sufficient signal.

**Fix:** add text or an icon ("Required") alongside the color.

## Checkpoints

1. Why is `<button>` better than a clickable `<div>`, and what three things does it give you for free?
2. How do you associate a label with an input, and why is placeholder text not enough?
3. When should `alt` be empty?
4. Why is `outline: none` dangerous?
5. Name the minimum contrast ratio for body text and for large text.
6. When is `aria-label` appropriate, and when is it the wrong tool?

## Practice exercises

### P1 — Read and predict

Look at the broken `SignupBroken` example. Before reading the accessible version, list every accessibility problem you can find. Then compare.

### P2 — Change one element

Change `<h2 className="panel__title">` to a `<div className="panel__title">` and inspect the accessibility tree. Describe how the reported role changes.

### P3 — Fill in the blank

Complete this labelled field using the wrapping approach:

```jsx
<label className="field">
  <span className="field____">Postal code</span>
  <input className="field__input" type="text" name="postal" />
</label>
```

### P4 — Debug this broken snippet

```jsx
<div className="btn" onClick={save} aria-label="Save">
  <img src="/icons/save.svg" />
</div>
```

Name at least three problems and write the corrected version.

### P5 — Inspection practice

Open any real website, press **F12**, and inspect a search field. Use the Accessibility pane to find its **role** and **name**. Write one sentence: did the label come from a `<label>`, an `aria-label`, or something else? If it has none, note that too.

### P6 — Contrast check

In Developer Tools, inspect some body text on a site you like. Find the contrast ratio shown next to its color. State whether it passes 4.5:1. If it does not, suggest a darker or lighter value that would.

### P7 — Design bridge

Take a screen from one of your design files. Add accessibility annotations: for each interactive element, note the role, the accessible name, and the intended focus order. You will submit this in the assignment.

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md).

## What is *not* in this unit

- No exhaustive WCAG conformance (we cover the high-impact basics).
- No advanced ARIA patterns (menus, tabs, comboboxes) — those come with practice and, often, a component library.
- No automated testing setup or audit tooling beyond the free built-in DevTools.
- No screen-reader software installation required; the accessibility tree inspection is a fair proxy.

## Next unit

**U25 — Assets: images, icons, fonts**: we bring real images, icons, and typefaces into the components, without hurting performance.
