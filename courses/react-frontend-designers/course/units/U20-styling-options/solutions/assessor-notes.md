# U20 Assessor notes

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1 — Four families:**
1. **Plain CSS files** — ordinary `.css` targeting class names. Cost: global namespace, collisions.
2. **CSS Modules** — plain CSS auto-renamed to unique class names on import. Cost: `{styles.x}` syntax and unreadable generated names when debugging.
3. **Utility frameworks (Tailwind)** — many tiny single-purpose classes composed in markup. Cost: dense markup, extra vocabulary, design spread across strings.
4. **CSS-in-JS (styled-components/Emotion)** — CSS written inside JS, producing a component. Cost: extra dependency/runtime, not readable as a stylesheet, another syntax.

**Q2 — className:** `class` is a reserved word in JavaScript, so JSX uses `className`. Wrong spelling yields the console warning *"Invalid DOM property `class`. Did you mean `className`?"* and no styles apply.

**Q3 — Inline style:** reasonable for a single computed value (e.g. a progress width). Wrong for a library because it cannot express hover/focus, media queries, or reusable rules, and it scatters design.

**Q4 — Choice:** plain CSS one file per component plus one tokens file. Reasons: builds on U04, inspectable, no dependency, direct Figma-variable mapping. Obligation: disciplined class naming because plain CSS is global.

**Q5 — Design bridge:** any repeated decision (radius, spacing scale, brand color, button style) plus an explanation that duplicating the value by hand causes drift; a shared named value keeps them in sync.

**Q6 — Opinion:** either yes or no is acceptable if reasoned. Look for a genuine trade-off (for example, "no, because my team's markup would be too hard to review" or "yes, because our CSS review process is strong").

**fix-me.md — corrected:**

```jsx
export default function Card() {
  return (
    <div className="card" style={{ padding: "16px" }}>
      Hello
    </div>
  );
}
```

Two distinct problems: (1) `class` → `className`; (2) `style` must be a JS object with camelCase keys, not a string.

## Common weak submissions

- Names three families only, or invents a non-existent family.
- Says inline `style` is "the React way."
- Q5 gives a one-off value instead of a repeated decision.
- `fix-me.md` fixes one problem and repeats it as the second.
- Checklist copied but not marked, or marked without the other files present.

## Grading stance

This is the landscape unit; reward *judgment and honest comparison* over memorized phrasing. A learner who clearly sees the trade-offs but writes plainly should score full. A learner who recites the lesson but cannot name a cost has not met the outcome.
