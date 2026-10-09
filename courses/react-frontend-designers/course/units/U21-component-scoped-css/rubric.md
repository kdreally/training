# U21 Rubric

Visible to learners. Total **30 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Component imports its stylesheet with a correct path | 4 | Yes | `YourComponent.jsx` |
| Component accepts a text prop and an optional variant prop | 4 | Yes | `YourComponent.jsx` |
| `App.jsx` renders default and variant instances | 3 | Yes | `App.jsx` |
| Class names follow block / `__` element / `--` modifier convention | 5 | Yes | `YourComponent.css` |
| Component and stylesheet are in the same folder | 2 | Yes | folder structure |
| Explains import vs scoping correctly | 3 | Yes | `answers.md` Q1 |
| Correctly labels each class and explains collision prevention | 3 | Yes | `answers.md` Q2–Q3 |
| Inspection answer names two applied classes and a modifier property | 2 | No | `answers.md` Q4 |
| Design bridge maps a design component to class names | 2 | No | `answers.md` Q5 |
| Prediction recorded then verified | 1 | No | `answers.md` predict section |
| Checklist present and honest | 1 | Yes | `checklist.md` |

## What the assessor should look for

- **Import (4):** the import line exists and the path resolves. A missing import means the styles cannot apply regardless of how correct the CSS is — treat as must-have failure and note it clearly.
- **Props (4):** at least one text prop and one optional prop that changes the class string. The variant must actually be used in the `className` logic, not merely accepted and ignored.
- **Convention (5):** every class begins with the component prefix. Elements use `__`, modifiers use `--`. Deduct proportional points for a few bare/generic names. A file full of bare `.title`, `.body`, `.box` names demonstrates the exact failure the unit warns about and should score low here even if it looks fine.
- **Q1 (3):** full credit requires both halves — "loads the stylesheet" **and** "does not scope by itself; naming does."
- **Q2–Q3 (3):** they must correctly identify block/element/modifier and give a plausible collision story. Accept any concrete collision.
- **Q4 (2):** accept any two classes that are genuinely applied, with a property that clearly comes from the modifier.
- **Prediction (1):** the exact strings `"prefix"` and `"prefix prefix--variant"` (names vary) written before running.

## Partial credit notes (assessors)

- If the component works visually but uses bare class names, award visual/functional rows fully and the convention row at 0–2. Do not let a pretty result hide the unit's actual learning objective.
- If the variant prop is accepted but unused, give 2/4 on the props row.
- If `App.jsx` renders only one instance, award 1/3 and note it.
- Do not penalize a component idea that differs from the lesson's Card — variety is encouraged.
- Cosmetic CSS quality is not graded here; naming, import, and prop wiring are. Judge craft in U23/U30.

## Common weak submissions

- Component in one folder, stylesheet in another or in `src/`.
- Bare generic class names with no prefix.
- `class` used instead of `className`, with the console warning ignored.
- Variant prop received but never used in the className logic.
- `answers.md` restates the lesson rather than reporting what they actually inspected.
