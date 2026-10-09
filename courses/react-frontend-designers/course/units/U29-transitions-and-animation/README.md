# U29 — Simple transitions and animation

**Phase 5 — Interaction and polish**

## Where you are

You have shipped components with styling, design tokens, responsive layouts, and accessible markup. Now you add the final layer of polish that designers care about most: **motion**. Motion shows the user that something changed and where it came from. This unit teaches you where motion belongs in a React app, and how to add it without it becoming a maintenance problem.

The headline: **most motion lives in CSS, not JavaScript.** React decides *what* is on screen; CSS decides *how* it gets there.

## What you will be able to do

- Explain the difference between a **transition** and a **keyframe animation**.
- Use the `transition` property to animate a hover state and an open/closed state.
- Use `transform` and `opacity` for smooth, cheap motion.
- Explain why some CSS properties animate smoothly and others do not.
- Decide, with reasons, whether motion belongs in CSS or JavaScript.
- Respect `prefers-reduced-motion` so motion never causes discomfort.

## What you need already

- **U04** — CSS as presentation, the box model, flexbox.
- **U20** — styling options in a React app.
- **U21** — component-scoped CSS (classes on components).
- **U24** — accessibility (why respecting user preferences matters).
- **U16** — conditional rendering (show/hide by rule), which you will pair with classes here.

## Time and energy

About **60–90 minutes**. This unit is visual and satisfying. The one non-obvious idea — properties that animate versus properties that jump — deserves a slow read near the end.

## Why this exists

Without motion, an interface changes instantly and the eye can miss it. A menu that appears instantly feels like a glitch; the same menu fading in over 150 milliseconds feels intentional. Motion is not decoration. It is feedback.

The human problem: **sudden change is hard to follow, and animation done badly is either jarring or inaccessible.** Done well, it is quiet, fast, and optional for people who ask for less of it.

There is also a maintenance problem. If you drive every animation with JavaScript timers, you own every edge case — interruptions, cleanup, and performance. CSS handles those for free. So we reach for CSS first.

## Plain-language teaching

### Transition vs keyframe animation

- A **transition** animates a value **from its old value to its new value** when that value changes. You do not describe the steps; you describe how long it takes and how it eases. Think: "whenever `background` changes, take 200ms to move there."
- A **keyframe animation** describes a sequence of steps and can run on its own — once, or repeated forever. You name the steps with `@keyframes`. Think: "go from transparent, to visible, to transparent, in a loop."

For small interface polish, transitions are usually the right tool. They are shorter to write and respond naturally to user actions. We focus on transitions here and show one tiny keyframe example.

### What a transition looks like

```css
.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
```

Read the `transition` line as a list: "animate `transform` over 200ms with an `ease` curve, and animate `box-shadow` the same way." When the card is hovered, the new values apply, and instead of jumping, the browser interpolates over 200ms.

### The parts of a transition, one at a time

- **Property** — what changes (`transform`, `opacity`, `background-color`).
- **Duration** — how long, usually `150ms` to `300ms` for interface motion. Anything slower than ~400ms starts to feel sluggish.
- **Easing** — the speed curve. `ease` starts quickly and settles; `ease-in-out` is gentle at both ends; `linear` is mechanical and rarely right for UI.
- **Delay** — optional; how long to wait before starting. Omit it unless there is a reason.

Shorthand order is flexible, but the common form is `property duration easing delay`.

### Transform and why it is special

`transform` moves, rotates, or scales an element **without changing the space it occupies in the layout**. `translateY(-4px)` lifts it visually while its neighbors stay put.

Transforms are also cheap to animate: the browser can often handle them on its own, without recalculating layout on every frame. This is why designers are taught to animate `transform` and `opacity` instead of properties like `top`, `left`, `width`, or `height`.

### Which properties animate smoothly, and which jump

Not everything animates. Properties that take a continuous value — `opacity`, colors, `transform`, `filter` — interpolate smoothly. Properties that are structural or take keywords often jump:

- `display: none` → `block` cannot tween. The value is a keyword, not a number. This is why "animate a menu open" is easier if the element stays in the DOM and you animate `opacity` and `transform`, rather than switching `display`.
- `visibility` jumps between `hidden` and `visible` (though it can be delayed).

The practical rule: **animate `opacity` and `transform`; leave layout properties alone unless you have a specific reason.**

### Where motion belongs: CSS or JavaScript

Use **CSS** when:

- The motion responds to a state you already express in the DOM (hover, focus, a class toggled by React).
- You want smooth, interruptible animation with no timers to manage.
- The motion is decorative or a simple show/hide.

Use **JavaScript** when:

- The motion depends on values only JavaScript knows at runtime (a measured element size, drag position, scroll).
- You need to coordinate animation with logic — for example, waiting until an exit animation finishes before removing an element from React state.
- You are animating many elements in a coordinated sequence that CSS cannot express cleanly.

For this course, CSS covers almost everything you need. When React toggles a class, CSS does the moving.

### Pairing React state with a CSS class

React's job is small: add or remove a class based on state. CSS does the rest.

```jsx
<article className={`card ${isOpen ? "card--open" : ""}`}>…</article>
```

Then in CSS:

```css
.card {
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.card--open {
  opacity: 1;
  transform: translateY(0);
}
```

The class changes; the transition runs. No JavaScript timer is involved.

### Respecting `prefers-reduced-motion`

Some people experience motion sickness, dizziness, or distraction from animation. Browsers expose the user's operating-system preference through a media query called `prefers-reduced-motion`. When the user has asked for less motion, we honor it.

```css
@media (prefers-reduced-motion: reduce) {
  .card,
  .card--open {
    transition: none;
  }
}
```

This sets the transition duration to nothing, so state changes still happen instantly and the interface remains fully usable. Note: we remove the *animation*, not the change. Hiding content is never the goal.

A common, slightly gentler approach is to shorten rather than remove:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Either approach is acceptable in this course. Removing or shortening motion is the important part.

## Vocabulary

| Term | Plain meaning | Common confusion |
|------|---------------|------------------|
| Transition | Animates a property from its old value to its new value | Not a sequence of steps; that is a keyframe animation |
| Keyframe animation | A named sequence of steps that can loop | Not needed for simple hover/open effects |
| `transform` | Moves, rotates, or scales without affecting layout | Not a layout change; neighbors do not move |
| `translateY(-4px)` | Moves an element up by 4 pixels | Negative Y is up, because the Y axis points down |
| `opacity` | How see-through an element is, from `0` to `1` | `0` is invisible but still present in the layout |
| Easing | The speed curve of the motion | Not "how long"; that is duration |
| Duration | How long the transition takes | Keep UI motion roughly 150–300ms |
| `prefers-reduced-motion` | A user/OS setting that asks for less animation | Not a failure of the design; honor it |
| Interruptible | A new change can start before the last finishes | CSS transitions handle this; JS timers often do not |

## Worked example

A "details" panel that fades and slides open when a button is clicked. React toggles one class; CSS animates.

**File:** `src/DetailsPanel.jsx`

```jsx
import { useState } from "react";
import "./DetailsPanel.css";

export default function DetailsPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "Hide details" : "Show details"}
      </button>

      <div className={`panel ${isOpen ? "panel--open" : ""}`}>
        <p>Shipping is free on orders over $40.</p>
      </div>
    </div>
  );
}
```

**File:** `src/DetailsPanel.css`

```css
.panel {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
  overflow: hidden;
  transition: opacity 200ms ease, transform 200ms ease, max-height 200ms ease;
}

.panel--open {
  opacity: 1;
  transform: translateY(0);
  max-height: 120px;
}

@media (prefers-reduced-motion: reduce) {
  .panel {
    transition: none;
  }
}
```

**How to run it:** start the dev server with `npm run dev` in your project folder and open the printed address. The same command works on Windows, macOS, and Linux.

### Why every line is where it is

- `const [isOpen, setIsOpen] = useState(false)` — React holds only the open/closed state. It does not know about pixels or milliseconds.
- `setIsOpen((open) => !open)` — the function form flips the current value safely, as taught in U17 and U28.
- `` className={`panel ${isOpen ? "panel--open" : ""}`} `` — a template literal builds the class string. When `isOpen` is true, the class becomes `"panel panel--open"`; otherwise `"panel"`. This is the bridge between state and CSS.
- In `.panel`, `opacity: 0` and `transform: translateY(-8px)` are the **closed** look. `max-height: 0` plus `overflow: hidden` is a simple way to collapse the box. (Collapsing height is genuinely hard; `max-height` is an honest, imperfect trick. `grid-template-rows` and the newer `interpolate-size` are alternatives outside this unit's scope.)
- `transition` lists the three properties to animate with the same 200ms ease.
- In `.panel--open`, the values return to normal, so the browser animates between the closed and open sets.
- The reduced-motion block removes the transition. The panel still opens and closes; it just does so instantly.

**What success looks like:** clicking "Show details" makes the sentence fade in while sliding down the last 8 pixels, over about a fifth of a second. The button label swaps to "Hide details." With reduced motion enabled at the OS level, the text appears instantly with no slide.

## Common errors

### Error: The panel appears but does not animate, and there is no error

**When it happens:** the class is applied, but the element has no starting values to animate *from*, or the transition is on the wrong selector.

**Decoded:** a transition needs two states: the resting value and the changed value. If both states have the same value (for example, you forgot to set the closed `opacity: 0`), there is nothing to interpolate.

**Fix:** confirm the closed state has different values from the open state, and that the `transition` is written on the **base** class (`.panel`), not only on `.panel--open`. Writing `transition` on the open state makes the opening animate but the closing snap shut — a classic "one-way animation" bug.

### Error: `Failed to load resource ... DetailsPanel.css` (404)

**When it happens:** the import path in the component does not match the file's location, or the file name differs in case.

**Decoded:** the browser could not find the stylesheet, so no styles — and no animation — load.

**Fix:** check the `import "./DetailsPanel.css";` path and the filename character-for-character. On Windows and macOS, filenames may be treated case-insensitively in some tools and case-sensitively in others; match the case exactly.

### Error: The button label changes but the panel never appears

**When it happens:** `max-height` is already `0`, and the open class sets a value that is still too small, or an unrelated rule overrides it.

**Decoded:** the panel is technically open but has no room to show its content.

**Fix:** make sure `.panel--open` sets a `max-height` large enough for the content, and that no later rule sets `max-height: 0` with higher specificity.

### Error: The whole layout jumps when the panel opens

**When it happens:** you animate `height` directly, or the panel pushes sibling content around.

**Decoded:** height and other layout properties force the browser to reflow on every frame, which both costs performance and repositions neighbors.

**Fix:** for this pattern, `max-height` with `overflow: hidden` avoids content being visible outside the box; for overlays, animate `opacity` and `transform` and take the element out of the normal flow.

## Checkpoints

Answer before the assignment. Four clear answers means you are ready.

1. What is the difference between a transition and a keyframe animation?
2. Why do designers prefer to animate `transform` and `opacity` rather than `width` or `top`?
3. Name one case where a transition cannot do the job and JavaScript is the better tool.
4. What does `prefers-reduced-motion` ask for, and what should we do about it?

## Practice exercises

### P1 — Read and predict

In the worked example, predict what happens visually if you move the `transition` line from `.panel` to `.panel--open` only. Then try it and describe the difference between opening and closing.

### P2 — Change one value

Change the duration from `200ms` to `800ms`. Run it and describe how it feels. Then set it to `80ms` and compare. Write one sentence about which felt right for a small panel.

### P3 — Fill in the blank

```css
.button {
  transition: __________ 150ms ease;
}

.button:hover {
  transform: translateY(-2px);
}
```

### P4 — Write from a specification

Create a button that, on hover, smoothly changes its `background-color` from a token color to a slightly darker one over 150ms, and lifts 2px. Use one of the design tokens from U22 if you have one. Include a reduced-motion rule.

### P5 — Fix a broken example

```css
.tooltip {
  opacity: 0;
  transition: opacity 200ms ease;
}

.tooltip:hover {
  display: block;
  opacity: 1;
}
```

The tooltip never fades in. Explain why `display` is the problem, and rewrite the example so it can animate. (Hint: keep the element in the layout and use `visibility` with a transition, or animate `opacity` alone.)

## Assignment

See [assignment.md](./assignment.md).

## How you will be assessed

See [rubric.md](./rubric.md). It is visible; read it before you build.

## What is *not* in this unit

- No animation libraries (Framer Motion, GSAP, and similar). This course does not require them.
- No scroll-driven animation, parallax, or drag interactions.
- No spring physics, orchestration timelines, or exit-animation choreography beyond simple class toggling.
- No animating layout properties as a general technique. We teach the cheap, safe properties.
- No React `useEffect`-driven animation timers. If you find yourself writing `setTimeout` for motion, pause and re-read the CSS-vs-JavaScript section.

## Next unit

**U30 — Building a small page, end to end** — where every skill from U01–U29 comes together in one small, finished page.
