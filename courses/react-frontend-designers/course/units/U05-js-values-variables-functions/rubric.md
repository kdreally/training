# U05 Rubric

Visible to learners. Total **24 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| `progress.html` runs and prints to the console | 4 | Yes | Open the file; console shows output |
| Uses a string, a number, and a boolean correctly (types match how they are written) | 3 | Yes | `progress.html` script |
| Uses `const` and `let` deliberately, with at least one of each | 3 | Yes | `progress.html` script |
| Writes a function that takes input and returns output with `return` | 4 | Yes | `progress.html` script |
| `console-output.txt` is real copied output that matches the file | 3 | Yes | Compare against a fresh run |
| Explain-it-back (Q1) is accurate and in plain language | 2 | No | `answers.md` Q1 |
| `const`/`let` reasoning (Q2) is concrete, not "just because" | 2 | No | `answers.md` Q2 |
| Parameter vs argument (Q3) is identified correctly in their own function | 2 | No | `answers.md` Q3 |
| Predict-then-run (Q4): prediction is written before the real output; mismatch explained if present | 2 | No | `answers.md` Q4 |
| Debug snippet (Q5): all three faults fixed (missing `return`, wrong call name, missing close paren) | 2 | No | `answers.md` Q5 |
| Error decode (Q6): explains "name does not exist" and gives plausible causes | 1 | No | `answers.md` Q6 |
| Files named correctly; checklist present and honest | 2 | Yes | folder structure |

## What counts as "correct" for the tricky bits

- **Types:** `"12"` is a string, `12` is a number, `true`/`false` are booleans. Quotes determine the type.
- **`return`:** a function that logs instead of returning, or that omits `return`, does not satisfy "returns output."
- **Q4 prediction:** it is fine to predict wrongly. What matters is that a prediction is recorded and any mismatch is explained. A perfect prediction with no reasoning shown still earns the marks; a missing prediction does not.
- **Q5 faults:** (1) missing `return`; (2) call says `Greeting` but the function is `greeting` (case mismatch); (3) `console.log(greet("Ana")` style missing `)`. In this snippet the closing of `console.log` is missing.

## Partial credit notes (assessors)

- File runs but prints nothing visible: award 2/4 for the run, and guide them to `console.log`. A blank page plus an empty console is usually a name or syntax error, not a missing script.
- Uses only `let` everywhere: award 1/3 on the `const`/`let` criterion; that is a genuine misunderstanding worth correcting, not a strong penalty.
- Function logs the correct text but never returns: award 2/4 on the function criterion. The effort is real; the concept is half-there.
- `console-output.txt` clearly retyped with names the file never prints: award 0/3 and ask them to copy the real output.
- Do not penalise imperfect English. Do penalise copy-pasted lesson prose with no personalisation on Q1–Q3.

## Common weak submissions

- A page with `<h1>` text but no `<script>`, so nothing reaches the console.
- `const` reassigned, producing `Assignment to constant variable.` and left unfixed.
- A function that uses `console.log` internally instead of `return`, so the outer `console.log` prints `undefined`.
- Q6 answers that say "the code is broken" without naming the missing name.
