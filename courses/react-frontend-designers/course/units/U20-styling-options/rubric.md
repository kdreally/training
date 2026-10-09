# U20 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Names all four families correctly | 4 | Yes | `answers.md` Q1 |
| Gives at least one honest cost per family | 3 | Yes | `answers.md` Q1 |
| Explains `className` vs `class`, including the failure mode | 3 | Yes | `answers.md` Q2 |
| States this course's choice with two reasons and one obligation | 3 | Yes | `answers.md` Q4 |
| `fix-me.md` names two distinct problems and fixes them | 3 | Yes | `fix-me.md` |
| Design bridge connects a repeated design decision to a shared named value | 2 | No | `answers.md` Q5 |
| Opinion answer is reasoned (not just a preference) | 1 | No | `answers.md` Q6 |
| Files named correctly; checklist present | 1 | Yes | folder structure |

## What the assessor should look for

- **Q1:** the four families are plain CSS, CSS Modules, utility frameworks, and CSS-in-JS. Award full only if each has *both* a description and a cost. A description with no cost scores at most half for that row.
- **Q2:** full credit requires the reserved-word/JSX reason **and** the console warning ("Invalid DOM property `class` / Did you mean `className`?") or an equivalent description of "styles do not apply."
- **Q4:** two reasons drawn from the lesson (builds on U04 / inspectable / no dependency / direct token mapping) plus the obligation to be disciplined about naming.
- **fix-me.md:** the two problems are (a) `class` should be `className`, and (b) `style` must be an object with camelCase keys, not a string. Naming the same problem twice earns partial only.
- **Q5:** reward a concrete repeated decision plus a clear explanation of drift. Vague "tokens are good" without a concrete value gets partial.

## Partial credit notes (assessors)

- Q1: 2/4 if families are named but attributed to wrong strengths; 0 if fewer than three families are named.
- Q3 (`style`): award half if they know it is inline but cannot say when it is reasonable.
- Do not penalize typos or imperfect English. Do penalize copy-pasted lesson text with no personalization, especially on Q5/Q6.
- Deduct 1 point only (not more) if the folder is named incorrectly, and note it so the learner can fix submission habits.

## Common weak submissions

- Lists "React CSS" as a family that does not actually exist in the lesson.
- Claims inline `style` is the easiest way to style everything.
- Q5 describes a one-off value (a single hero height) instead of a *repeated* design decision.
- `fix-me.md` rewrites the snippet but never names the two problems.
