# U29 Assessor notes (solutions — do not link from learner README)

## Model answer sketch

**Q1 (transition vs keyframe):** A transition animates a property from its old value to its new value when it changes; you specify duration and easing, not steps. A keyframe animation describes named steps and can loop independently. Most likely the learner used a transition for open/close because it responds naturally to a class toggle and is interruptible.

**Q2 (React's role):** React holds the boolean and swaps the class string (e.g. `className={\`panel ${isOpen ? "panel--open" : ""}\`}`). CSS does all interpolation. React's job ends at the class name; CSS begins at the `transition` rule.

**Q3 (transform/opacity):** They do not affect layout, so the browser does not recalculate the position of siblings on every frame. Layout properties like `width`, `height`, `top`, and `left` force reflow and are more expensive.

**Q4 (predict/run):** With `transition` only on `.panel--open`, the element uses the transition when the class is added (opening animates) but not when it is removed (closing snaps). Predicted vs actual should match this.

**Q5 (non-animatable):** `display` is the classic (keywords cannot interpolate). `visibility` similarly. Some layout properties technically animate but cause reflow.

**Q6 (error reading):** Acceptable real issues include a 404 for the CSS import (wrong path/case), a specificity override making the open state fail, or a "no starting value" silent no-animation. Full credit for a decoded message plus fix.

**Q7 (reduced motion):** Typical block:

```css
@media (prefers-reduced-motion: reduce) {
  .panel { transition: none; }
}
```

The state change still applies; only the easing animation is removed. The interface must remain usable.

**Q8 (design bridge):** Strong answers connect a "smart animate" prototype (motion designed to *look* right in a preview) to CSS transitions driven by component state (motion *built* to respond to real user actions and to degrade gracefully).

## Common weak submissions

- `transition` placed only on the open state → one-way animation.
- Animating `height: 0`/`height: auto` and getting a jump or a broken effect.
- No reduced-motion rule at all.
- Reduced-motion rule hides content instead of just removing animation.
- Parsing/motion done in `useEffect` with `setTimeout` instead of CSS.
- Durations far too long (800ms+) for a small control.
- `transition: all` used as a shortcut, causing unintended properties (including layout) to animate.

## Common wrong-but-thoughtful answers

- "I need JavaScript to animate anything." Understandable, but React only toggles a class here; CSS does the motion. Note the timer/cleanup burden JavaScript would add.
- "`display` should animate if I add `transition: display`." Explain that keywords like `none`/`block` have no in-between values to interpolate. Suggest animating `opacity` + `transform` instead.
- "Reduced motion means I should remove the feature." No — honor the preference by removing or shortening the *animation*, never by hiding or disabling the content.
- "`transition: all` is convenient." It is, and it also silently animates expensive properties and can cause surprising effects. Prefer naming the properties.
