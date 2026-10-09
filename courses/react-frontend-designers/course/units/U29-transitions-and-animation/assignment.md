# U29 Assignment — Simple transitions and animation

Submit the following to your trainer in **one folder or zip** named:

`U29-YourName` (use your real name or student id as they prefer)

## What you are building

A small interface with **three pieces of motion**, all driven by CSS:

1. A **hover transition** on an interactive element (a button, card, or link) using `transform` and/or `background-color`.
2. An **open/close transition** controlled by a React boolean state (like the details panel in the lesson, or your own variation).
3. A **reduced-motion rule** that removes or shortens the motion when the user asks for less.

You may reuse an existing component from earlier units and add motion to it, or build fresh small components. Keep the motion subtle: roughly 150–300ms.

## Files to submit

### 1. Your project files

Include:

- The component file(s) that toggle a class based on state.
- The CSS file(s) containing your transitions and media query.
- Any other files you changed.

If your project has many files, include only the ones you touched and say so in `answers.md`.

### 2. `answers.md`

Answer these prompts in your own words. Do not paste lesson text back unchanged.

1. **Transition vs keyframe.** In 3–5 sentences, explain the difference to another designer, and say which one you used for your open/close effect and why.
2. **React's role.** Describe exactly what React does in your open/close animation and what CSS does. Name the line in your code where React's job ends and CSS's begins.
3. **Transform and opacity.** Explain, in your own words, why `transform` and `opacity` are preferred over `top` or `width` for smooth motion.
4. **Predict then run.** Before running, predict the difference between opening and closing your panel if the `transition` is written only on the open class. Then test it and record what actually happened.
5. **Which properties jump.** Give one property that cannot be smoothly transitioned and explain why in one or two sentences.
6. **Error reading.** Copy one real error or browser warning you saw while building this assignment (a missing stylesheet, a 404 in the Network tab, a specificity issue), or reproduce one on purpose. Decode it: what did it mean, and what was the fix?
7. **Reduced motion.** Show your `prefers-reduced-motion` block. Explain what changes for the user and confirm the interface still works without the animation.
8. **Design bridge.** In design tools there is a distinction between a "smart animate" prototype and a real interaction. In two or three sentences, connect that distinction to the difference between how motion *looks* in a prototype and how it is *built* in CSS driven by state.

### 3. `checklist.md`

Copy this checklist and mark each item `[x]` when true:

```markdown
- [ ] I have a hover transition using `transform` and/or a color.
- [ ] I have an open/close transition driven by a React boolean state.
- [ ] My `transition` is written on the base class, so closing animates too.
- [ ] I animate `transform`/`opacity` (not `top`, `left`, `width`, or `height`).
- [ ] I have a `prefers-reduced-motion: reduce` rule that removes or shortens motion.
- [ ] The interface is fully usable with motion removed.
- [ ] `answers.md` is in my own words.
- [ ] I read the U29 rubric before writing answers.md.
```

## Definition of done

- Three pieces of motion present and working: hover, open/close, reduced-motion rule.
- Motion durations are in the 150–300ms range for interface effects.
- The interface works completely when reduced motion is enabled (nothing disappears).
- `answers.md` present and in your own words.
- `checklist.md` completed honestly.
- No errors in the browser console while the page is open.

## Submission format

Put everything inside one folder named `U29-YourName`. Compress it only if your trainer asks. If your file names differ from the suggestions, list them at the top of `answers.md`.
