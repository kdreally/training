# U11 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Correct plain-sentence definition of a component | 3 | Yes | `answers.md` Q1 |
| Explains PascalCase rule (component vs HTML tag) | 3 | Yes | `answers.md` Q2, Q8 |
| Correct import line and meaning of default export | 3 | Yes | `answers.md` Q3 |
| Working `App.jsx` with component, single root, default export | 4 | Yes | `App.jsx`, screenshot |
| Describes the render chain and why `main.jsx` is untouched | 2 | Yes | `answers.md` Q5 |
| Design bridge is specific and genuinely reused | 2 | No | `answers.md` Q6 |
| Error-reading practice decoded (export mismatch) | 2 | No | `answers.md` Q7 |
| Lowercase-name experiment understood | 1 | No | `answers.md` Q8 |

The `App.jsx` file and screenshot are the **evidence** for the working-component criterion; without a running screenshot, cap that criterion at half.

### Partial credit notes (assessors)

- Q1: full for "a function that returns interface/markup/UI." "A part of a website" earns 2/3. "A file" earns 1/3.
- Q2: full requires the capital = your component vs lowercase = HTML element distinction. "It is just a convention" caps at 1/3.
- Q3: require the exact line `import App from './App.jsx'` (path may vary) and "default = the one main thing." Missing "default" meaning caps at 2/3.
- `App.jsx`: full needs all three (function named `App`, one wrapping element, `export default App`). Missing the export caps at 2/4 — it is the unit's core skill.
- Q7: any genuine export/import mismatch error correctly decoded earns full. Do not require the exact wording.
- Q8: full for "lowercase makes React think it is an HTML tag, which does not exist." Partial for "it just does not work."
- Do not penalize small cosmetic differences in markup or wording.

### Common weak submissions

- `App.jsx` still contains the untouched Vite starter content.
- Two sibling root elements with no wrapper (also a U12 error — note it, award partial here).
- Screenshot does not match the submitted `App.jsx`.
- Q3 copies a named-import pattern (`import { App }`) with no brace discussion.
- No error text provided for Q7/Q8.
