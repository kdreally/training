# U22 Assessor notes

Assessor-only. Do not link from learner materials.

## Model answer sketch

**Q1 — Token vs style:** a token is a named value (`--space-md: 16px`); a style is a rule that applies properties to an element (`.badge { padding: var(--space-md) }`). Both should come from the learner's files.

**Q2 — `:root` and import:** `:root` matches the whole document, so variables are global; the file is imported once at the entry point so every component can rely on the variables existing before it renders.

**Q3 — Trace:** e.g. `<StatusPill tone="warning" />` → class `"statusPill statusPill--warning"` → `.statusPill--warning` uses `var(--color-warning-bg)` and `var(--color-warning-text)`.

**Q4 — Drift:** e.g. the pill's padding `12px` appears in three variants; copying it means a future change misses one file.

**Q5 — Invalid tone:** without a guard, the class `statusPill--oops` does not exist and the element falls back to base styling with no error; the guard (list + `includes`, or a map) substitutes a known variant.

**Q6 — Design bridge:** any three real or realistic Figma variables mapped to `--token` names, with `/` replaced by `-`.

## Reference implementation (one valid answer)

```css
/* tokens.css */
:root {
  --color-text: #1e293b;
  --color-ok-bg: #dcfce7;
  --color-ok-text: #166534;
  --color-warn-bg: #fef3c7;
  --color-warn-text: #92400e;
  --space-sm: 8px;
  --space-md: 16px;
  --radius-md: 12px;
  --font-size-sm: 0.8125rem;
}
```

```jsx
// StatusPill.jsx
import "./StatusPill.css";
const TONES = ["ok", "warn", "info"];
export default function StatusPill({ label, tone = "info" }) {
  const safe = TONES.includes(tone) ? tone : "info";
  return <span className={`statusPill statusPill--${safe}`}>{label}</span>;
}
```

```css
/* StatusPill.css */
.statusPill { padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); font-size: var(--font-size-sm); }
.statusPill--ok { background: var(--color-ok-bg); color: var(--color-ok-text); }
.statusPill--warn { background: var(--color-warn-bg); color: var(--color-warn-text); }
.statusPill--info { background: #e0e7ff; color: #3730a3; }
```

Note: this reference itself contains one raw value (`#e0e7ff`) as a demonstration that a legitimate exception should be called out in `answers.md`. Do not penalize one or two documented exceptions.

## Common weak submissions

- Token file exists but component CSS ignores it.
- Only one color token reused for unrelated meanings.
- Variant prop accepted but not used to build the class string.
- Tokens imported in a component file, leaving earlier-rendered components unresolved.
- Mapping table lists generic colors rather than actual Figma variables.

## Grading stance

The transferable skill is **single source of truth**: one name, one value, changed in one place. Reward learners who demonstrate that one edit propagates. A clean, small token set used consistently beats a large, unused token set. Weight role naming and the guard as evidence of design thinking, not just mechanics.
