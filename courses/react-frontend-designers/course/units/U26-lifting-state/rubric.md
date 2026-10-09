# U26 Rubric

Visible to learners. Total **24 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Working screen where one parent `useState` drives both an input and a list | 6 | Yes | submitted project files |
| Shared value is genuinely lifted to the closest common parent (not duplicated in two children) | 4 | Yes | code + `answers.md` Q2 |
| Value travels down as a prop; a callback travels up | 4 | Yes | code + `answers.md` Q3 |
| Filtered/derived list is calculated from state, not stored as separate state | 3 | Yes | `answers.md` Q5 + code |
| Explains lifting state in own words, aimed at a fellow designer | 3 | Yes | `answers.md` Q1 |
| Predict-then-run is concrete and compares prediction to reality | 2 | No | `answers.md` Q4 |
| Debug snippet correctly diagnosed and fixed | 2 | No | `answers.md` Q6 |
| Design bridge names a real, reused element and connects it to single source of truth | 2 | No | `answers.md` Q7 |
| Files named correctly; checklist present and honest; console free of errors | 2 | Yes | folder structure + runtime |

### Partial credit notes (assessors)

- If the screen works but both children keep their own copy of the value, award the working points but 0–2 for "genuinely lifted." This is the central skill being tested.
- Q1: full credit requires the idea that siblings cannot share data directly and a parent must own it. A definition that only says "put state higher up" without the reason gets partial.
- Q3: a common wrong-but-thoughtful answer is "the child sends the new value down to the parent." Direction words are easy to flip. Award full if the *roles* are right (child requests a change; parent owns the value), even if they use "down/up" loosely.
- Q5: if they stored the filtered list in state, this is a real conceptual gap. Award 0 but note it clearly; it often still "works" but can drift out of sync.
- Q6: the bug is `onValueChange` is called without the new value (`onChange={(event) => onValueChange}` calls the function with an event or nothing rather than passing text). Accept any fix that passes `event.target.value`.
- Do not penalize imperfect English. Do penalize copied lesson text with no personalization on Q1 and Q7.

### What to look for (assessor pointer)

The single most important evidence is **where the shared `useState` lives**. If it is in the parent that renders both children, the core outcome is met.
