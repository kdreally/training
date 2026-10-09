# U21 Assessor notes

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1 — Import vs scoping:** `import "./X.css"` tells the build to include the stylesheet in the app. It does **not** scope the rules; once loaded, the class names are global. Scoping in plain CSS is a naming convention.

**Q2 — Class labels:** for a `profileChip` block, e.g. `.profileChip` (block), `.profileChip__name` (element), `.profileChip__role` (element), `.profileChip--muted` (modifier). The prefix guarantees no other component's bare `.name`/`.role` can collide.

**Q3 — Collision story:** e.g. if they had named the inner piece `.name`, and another component also has `.name` with a different size, the last stylesheet loaded would win and both would change.

**Q4 — Inspection:** the variant instance should show two classes, for example `profileChip profileChip--muted`, with a property such as `background`, `border-color`, or `opacity` coming from the modifier.

**Q5 — Design bridge:** block = the component/symbol; elements = its inner parts; modifier = a variant/property toggle. Any consistent mapping is acceptable.

**Q6 — Reflection:** any genuine friction (import path, remembering `className`, forgetting `__`) plus a resolution or an honest open question.

**Prediction:** e.g. `"profileChip"` and `"profileChip profileChip--muted"`.

## Reference component (one valid answer)

```jsx
// ProfileChip.jsx
import "./ProfileChip.css";

export default function ProfileChip({ name, role, muted = false }) {
  const className = muted ? "profileChip profileChip--muted" : "profileChip";
  return (
    <div className={className}>
      <span className="profileChip__name">{name}</span>
      <span className="profileChip__role">{role}</span>
    </div>
  );
}
```

```css
.profileChip {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
}
.profileChip__name { font-weight: 600; }
.profileChip__role { color: #64748b; font-size: 0.875rem; }
.profileChip--muted { background: #f1f5f9; border-color: #cbd5e1; }
```

This is one acceptable answer among many; do not require these exact names.

## Common weak submissions

- Bare class names (`.title`, `.box`) that defeat the unit's purpose.
- Stylesheet import missing or path incorrect, yet CSS pasted anyway.
- Variant prop accepted but not referenced in the className expression.
- Both instances rendered without the variant applied, so nothing is visibly different.
- `answers.md` describes generic CSS theory instead of their own component and inspection.

## Grading stance

The core outcome is: the learner can attach a stylesheet and prevent collisions by naming. A visually plain but correctly named and correctly imported component beats a beautiful component with global, collision-prone classes. Weight convention and wiring over polish. Praise the naming habit explicitly in feedback; it is the transferable skill.
