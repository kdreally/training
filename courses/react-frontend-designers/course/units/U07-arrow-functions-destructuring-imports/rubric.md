# U07 Rubric

Visible to learners. Total **28 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| `tokens.html` runs and prints to the console | 4 | Yes | Open the file; console shows output |
| Array destructuring with `[ ]` used correctly | 3 | Yes | `tokens.html` script |
| Object destructuring with `{ }` used correctly | 3 | Yes | `tokens.html` script |
| Arrow with implicit return (single expression, no braces) works | 4 | Yes | `tokens.html` script |
| Arrow with block body and explicit `return` works | 4 | Yes | `tokens.html` script |
| `console-output.txt` matches a real run | 3 | Yes | Compare to a fresh run |
| Q1 (read the module) prints `16` and `24`; braces explained as named imports | 2 | No | `modules-answers.md` Q1 |
| Q2 (named vs default) correct import line and difference | 1 | No | `modules-answers.md` Q2 |
| Q3 (why modules) names separation, reuse, or clarity with a sensible comparison | 1 | No | `modules-answers.md` Q3 |
| Q4 (why it will not run) mentions `file://`/CORS and the U09 dev server | 1 | No | `modules-answers.md` Q4 |
| Q—explain-it-back covers the braces rule | 1 | No | `answers.md` Q1 |
| Q—destructuring explains name vs position | 1 | No | `answers.md` Q2 |
| Q—predict then run recorded before the real output, differences explained | 2 | No | `answers.md` Q3 |
| Q—debug snippet fixed (braces need `return`, or braces removed) | 1 | No | `answers.md` Q4 |
| Q—error decode explains "script is not a module" and gives a fix | 1 | No | `answers.md` Q5 |
| Files named correctly; checklist present and honest | 2 | Yes | folder structure |

## What counts as "correct" for the tricky bits

- **Implicit-return arrow:** the body must be a single expression with no braces, e.g. `(n) => n * 2`. `(n) => { n * 2; }` is a block body and returns `undefined`.
- **Block-body arrow:** must contain an explicit `return`. A block that only computes is the classic bug.
- **Q1 expected output:** `16` then `24` (`base` is `16`; `base * ratio` is `16 * 1.5`).
- **Debug (Q4):** either `const area = (w) => w * 4;` (no braces) or `const area = (w) => { return w * 4; };`. Both are correct; accepting only one would be unfair.
- **Q5:** the message means the script is a classic script, not a module. A valid fix is adding `type="module"` **and** serving the page, or running it after U09. Merely saying "use a server" is acceptable at this stage.

## Partial credit notes (assessors)

- Destructures correctly in `tokens.html` but never logs the values: award half on the two destructuring criteria, since the skill shows in code even if output is thin.
- Uses arrows everywhere but both are implicit, or both are block: award one of the two arrow criteria and note the missing form; both forms are outcomes of this unit.
- Q3 or Q4 answered with "it just does not work": award 0 for that prompt and correct in feedback; these are reasoning prompts.
- Imports attempted inside a double-clicked file and left broken: do not penalise. The unit explicitly says imports are read-only until U09. Reward the attempt if the syntax was right.
- Do not penalise imperfect English. Do penalise copy-pasted lesson prose on Q1–Q3 and the explain-it-back prompts.

## Common weak submissions

- Arrow functions written as `function` and labelled as arrows.
- `const { title } = project;` confused with array destructuring (`const [title] = ...`), producing `undefined`.
- Forgetting `return` in the block-body arrow and concluding arrow functions "do not work."
- Import line written with braces for a default export (`import { Button } from "./Button.js"`), a named/default mix-up.

## If the cohort struggles here

The main cliff is the braces rule. If many submissions return `undefined` from block-body arrows, re-run the side-by-side in U07 §1 and have them convert one function three ways: `function`, implicit arrow, block arrow. The secondary cliff is named vs default imports; a short table (braces or not, rename or not) clears it. Both must be solid before U11, whose starter files are full of imports.
