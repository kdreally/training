# U14 Rubric

Visible to learners. Total **20 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| Four files present with correct names and one component each | 3 | Yes | submission structure |
| `Header`, `Card`, `Footer` accept/return per spec | 3 | Yes | component files |
| `App` imports and composes all three, with 3+ distinct cards | 4 | Yes | `App.jsx` + running app |
| Explains composition in own words using a design comparison | 3 | Yes | `answers.md` Q1 |
| Gives two real reasons for one-file-per-component | 2 | No | `answers.md` Q2 |
| Explains `<header>` vs `<Header>` correctly | 2 | Yes | `answers.md` Q3 |
| Justifies a component boundary with change/reuse reasoning | 2 | No | `answers.md` Q4 |
| Wireframe description matches the actual App structure | 2 | Yes | `answers.md` Q5 |
| Error-reading: correct cause + fix + general rule | 3 | Yes | `error-reading.md` |
| Files named and present correctly | 1 | Yes | submission structure |

*(Categories overlap by design; total weights to 20. If a single submission is flawless in content but misnamed, do not zero it — dock only the naming line.)*

### Partial credit notes (assessors)

- **Everything in one file:** award component points but 0–1/4 for composition. The unit is about splitting, so an unsplit page misses the point even if it renders.
- **Cards hand-written as `<article>` blocks instead of `<Card>` instances:** award 1/4 for composition; the reuse lesson from U13/U14 is the target.
- **`<Header />` used but component file forgot `export default`:** award component partial (2/3) and full error-reading if they diagnose it. This is the intended Error 2 experience.
- **Q1:** Full marks require a genuine design-tool comparison (groups, symbols, frames). A purely technical answer caps at 2/3.
- **Q3:** Must state that lowercase renders an HTML element and the custom component is skipped, silently. "It's just wrong" without the silent-render detail caps at 1/2.
- **Error-reading:** Must identify lowercase `<card>`; "it shows a plain article with weird attributes" is partially right (1–2/3). Full marks require the capitalization rule.
- Do not penalize imperfect English. Penalize copy-pasted lesson text with no personalization.
