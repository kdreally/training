# U07 Assessor notes (learner-invisible)

## Model answer sketch

**module Q1 (read the module):** `layout.js` prints `16` then `24` (`base` is `16`; `base * ratio` is `16 * 1.5 = 24`). The braces `{ base, ratio }` mark a **named import**: you are importing the exports whose names are exactly `base` and `ratio`, and the names must match the exported names.

**module Q2 (named vs default):** `import Button from "./Button.js";`. A default import takes no braces and may be renamed. A named import uses braces (`import { Button } from "./Button.js";`) and must match the exported name.

**module Q3 (why modules):** one job per file; easier to find and change; reuse across pages; avoids a giant file. Design comparison: a component library where each component is published and imported into a screen.

**module Q4 (why it will not run):** opening via `file://` (double-click) makes the browser block cross-file module loads for security, so it throws "Failed to load module script" or a CORS error. U09's dev server serves the files over `http://localhost`, which allows module imports.

**answers Q1 (explain it back):** an arrow function stores a function in a variable using `=>`. With a single expression and no braces, the result is returned automatically (implicit return). With braces, you must write `return` yourself.

**answers Q2 (destructuring):** `const { title } = obj;` pulls out by key, so order does not matter and names must match keys. `const [first] = arr;` pulls out by position, so order matters and you choose the names.

**answers Q3 (predict then run):** Expected:
```
#111111
Zine
Zine!
4
```
- `[ink]` takes index `0` → `#111111`.
- `{ name, copies }` takes `name` and `copies`; `size` is ignored.
- `shout(name)` → `"Zine!"`.
- `total(1)`: `bumped = 1 + copies` = `1 + 3` = `4`; the function returns `4`. The exact number `4` is the key output; a learner who predicts `5` has likely missed that `copies` is `3`.
- Prediction recorded before the real run is what matters; a mismatch must be explained.

**answers Q4 (debug):** `const area = (w) => w * 4;` or `const area = (w) => { return w * 4; };`. The braces created a block body with no return, so it returned `undefined`.

**answers Q5 (error decode):** the script is a classic script, not a module, so `import` is not allowed. Fix: add `type="module"` and serve the page (U09), or run it in the React project later.

## Partial credit and common wrong-but-thoughtful answers

- **`import { Button } from "./Button.js";` for a default export.** Understandable and wrong; award 0 on Q2 and correct with the "braces = named" rule.
- **`(n) => { n * 2 }` offered as an implicit return.** Award 0 on the implicit-return criterion; this is the exact trap the unit targets. Explain the braces rule.
- **Predicts `"Zine" + "!"` literally** instead of `Zine!`: minor; accept if the idea is right, note that `+` evaluates.
- **Says imports "need Node".** Partly true in practice for bundlers, but the immediate issue here is modules/CORS in the browser. Accept with a note; do not require bundler knowledge.
- **Uses `export default` for both `spacing` and `radius`** in a read exercise: a file cannot have two default exports. Award partial and correct.

## Evidence to check quickly

1. Open `tokens.html`; confirm the console prints two destructured values and both arrow results.
2. Confirm one arrow has no braces (implicit) and the other has braces plus `return`.
3. Confirm array destructuring uses `[ ]` and object uses `{ }`.
4. Read `modules-answers.md` Q1; `16` and `24` are the key outputs.

## Arithmetic check (important)

In `answers.md` Q3 of the assignment, `total(1)` uses `copies = 3`, so it returns `4`. If the learner's prompt material anywhere suggests `5`, that is a typo; the correct value is `4`. Accept `4` as the model answer.

## If the cohort struggles here

Two cliffs. First, the braces rule for arrow functions — convert one function three ways (function, implicit arrow, block arrow) as a warm-up. Second, named vs default imports — a two-row table (braces? renameable?) resolves most confusion. Both must be solid before U11, whose starter files are built from imports, arrows, and destructuring.
