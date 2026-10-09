# U05 Assessor notes (learner-invisible)

## Model answer sketch

**Q1 (explain it back):** HTML = structure/what things are; CSS = presentation/how they look; JavaScript = behaviour/memory/what happens. A good answer is short and does not use the word "tag" incorrectly or claim JS is required for layout.

**Q2 (`const` vs `let`):** `const` for values that should not be reassigned (course/sprint name, an "is active" flag); `let` for a counter that will be updated. Making everything `let` risks silent reassignment bugs and tells the reader less about intent; it is not wrong syntax, just weaker design.

**Q3 (parameter vs argument):** parameter is the name in the definition, e.g. `function progressLabel(done, total)` → `done`, `total`; argument is the value passed at the call, e.g. `progressLabel(4, 12)` → `4`, `12`. Accept correct pointing even if the wording is loose.

**Q4 (predict then run):** Expected output:
```
Poster
6
Poster x2
```
- `title` → `Poster`.
- `multiply(copies, 3)` → `2 * 3` → `6`.
- `title + " x" + copies` → `Poster x2` (note the missing space before `2`; string concatenation is literal). A learner who predicts `Poster x2` correctly is doing well; one who predicts an error learns that `+` joins strings.

**Q5 (debug):** Corrected snippet:
```js
function greeting(name) {
  return "Hello, " + name + "!";
}
console.log(greeting("Ravi"));
```
Three faults: (1) no `return`; (2) call used `Greeting` but definition is `greeting` (case-sensitive mismatch); (3) the `console.log(` call was never closed with `)`. Accept any fix that produces `Hello, Ravi!`.

**Q6 (error decode):** `ReferenceError: likeCount is not defined` means JavaScript looked for a slot with that exact name and found none. Likely causes: typo or case mismatch in the name; the variable was never declared; the declaration was in a different console session/tab and has been cleared. The message names the symbol that is missing; it is not a comment on the learner.

## Partial credit and common wrong-but-thoughtful answers

- **"const means the contents cannot change."** Partial yes: for primitives (string/number/boolean), `const` stops reassignment. For objects/arrays later, `const` still allows internal changes. In this unit, accept the simple version; flag the nuance for U06.
- **"undefined means the variable is empty."** Close enough at this stage. The precise idea is "no value has been assigned or returned." Accept.
- **Predicts `Poster x 2`** with spaces: understandable because design tools pad values; the literal `+` does not. Good teachable moment.
- **Q5 fixes only the missing `return`** but not the case mismatch: award 1/2; the remaining error would still prevent the output.
- **Function returns but the page uses `document.write`** instead of `console.log`: the function criterion can still pass; console output criterion fails. Note `document.write` is out of scope here.

## Evidence to check quickly

1. Open `progress.html`; confirm the page is not blank and the console shows 3+ lines.
2. Re-run and compare to `console-output.txt` character for character where practical.
3. Grep the script for `return` to confirm the function returns, not just logs.
4. Confirm at least one `const` and one `let`.

## If the cohort struggles here

The usual cliff in U05 is `return` versus printing. If many submissions log inside the function, spend a short recap showing side by side: a function that returns and one that logs, with the call site's output for each. Do not move to U06 (arrays) until `return` is solid, because `.map` depends on callbacks returning values.
