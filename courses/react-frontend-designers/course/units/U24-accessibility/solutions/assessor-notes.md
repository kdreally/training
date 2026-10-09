# U24 Assessor notes

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1 — Why it matters:** at least three situations, e.g. (a) a keyboard-only user navigating without a mouse; (b) a low-vision user needing contrast and zoom; (c) a screen-reader user relying on roles and labels; (d) a user with a temporary injury (broken wrist) or in bright sunlight; (e) a user with a cognitive load preference who benefits from clear labels.

**Q2 — Semantics first:** native elements carry roles and behaviors for free; ARIA only patches names/roles and never adds behavior. Example: a `<button>` is already focusable, Enter/Space-activatable, and announced as a button — no ARIA needed.

**Q3 — Label association:** either wrap the input inside a `<label>` (implicit) or use `<label htmlFor="email">` with `<input id="email">` (explicit). Placeholder text disappears on typing and is not an accessible name.

**Q4 — Buttons vs divs:** a real `<button>` is (1) focusable by Tab, (2) activated by Enter and Space, and (3) announced with a button role. A styled `<div>` provides none of these.

**Q5 — Focus:** `outline: none` removes the only visual cue of keyboard focus; replace with a visible `:focus-visible` outline of sufficient contrast.

**Q6 — Contrast:** any honestly reported ratio and judgement, e.g. "#64748b on #ffffff ≈ 4.6:1, passes 4.5:1 for body text."

**Q7 — ARIA:** e.g. "I did not add `aria-label` to the Save button because its visible text 'Save' is already its name"; or "I did not use `role='button'` on a div because I changed it to a real `<button>`."

**Q8 — Inspection:** e.g. "The email field's accessibility entry reported role 'textbox' and name 'Email address'." The specificity is the evidence.

## Reference accessible component (one valid answer)

```jsx
export default function Signup() {
  function handleSubmit(e) {
    e.preventDefault();
    alert("Sent");
  }
  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2 className="panel__title">Sign up</h2>
      <label className="field">
        <span className="field__label">Email address</span>
        <input className="field__input" type="email" name="email" required />
      </label>
      <button className="btn" type="submit">Send</button>
    </form>
  );
}
```

```css
.btn:focus-visible { outline: 3px solid #2563eb; outline-offset: 2px; }
```

## Common weak submissions

- Descriptive `alt` on every decorative image (misreading the empty-alt rule).
- `aria-label` sprinkled on well-labelled native elements.
- `role="button"` on a div that remains unfocusable and keyboard-dead.
- A label added visually but not associated (mismatched or missing `htmlFor`/`id`).
- Focus outline removed for aesthetics.
- `answers.md` Q8 that says "looked fine" instead of reporting role/name.

## Grading stance

Accessibility here is a **craft habit**, not compliance theater. Reward learners who can explain *who benefits* from each decision (the rationale is the transferable part) and who can prove a fix by inspecting the accessibility tree. A learner who fixes the high-impact items (semantics, labels, buttons, focus) and reasons about ARIA correctly has met the outcome even if their contrast numbers are approximate. Be generous on scope, strict on the must-haves.
