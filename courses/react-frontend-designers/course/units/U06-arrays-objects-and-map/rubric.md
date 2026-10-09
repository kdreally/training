# U06 Rubric

Visible to learners. Total **26 points**.

| Criterion | Points | Must-have? | Evidence |
|-----------|--------|------------|----------|
| `gallery.html` runs and prints to the console | 4 | Yes | Open the file; console shows output |
| Array contains 3+ objects, each with a text and a number property | 4 | Yes | `gallery.html` script |
| Logs `.length` with a readable label | 2 | Yes | `gallery.html` script |
| `.map` uses `function (item) { ... }`, returns a value, and works | 5 | Yes | `gallery.html` script; output array is populated, not `undefined` |
| Direct indexed read (e.g. `items[0].key`) is correct and logged | 2 | Yes | `gallery.html` script |
| `console-output.txt` matches a real run | 3 | Yes | Compare to a fresh run |
| Q1 (array vs object) explained with a design example each | 2 | No | `answers.md` Q1 |
| Q2 (indexes) explains 0-based counting and that `array[length]` is out of range | 2 | No | `answers.md` Q2 |
| Q3 (dot vs bracket) gives a real reason (dynamic or unusual key) | 1 | No | `answers.md` Q3 |
| Q4 (read the code) prints `Lisbon` and explains the chain | 1 | No | `answers.md` Q4 |
| Q5 (predict then run) prediction recorded; both arrays and length correct or explained | 2 | No | `answers.md` Q5 |
| Q6 (debug) fixes missing comma, missing `return`, and missing brace/paren; output `["A4","A3"]` | 2 | No | `answers.md` Q6 |
| Q7 (error decode) explains `papers` is not an array and names what to check | 1 | No | `answers.md` Q7 |
| Files named correctly; checklist present and honest | 2 | Yes | folder structure |

## What counts as "correct" for the tricky bits

- **`.map` must return.** A callback that only prints gives `[undefined, ...]`. That fails the 5-point criterion down to partial (2).
- **`array[array.length]` is out of range.** The correct observation is that it is always one past the end, so it is `undefined`. `array[array.length - 1]` is the last item.
- **Q5 expected output:**
  ```
  [10, 20, 30]
  [15, 25, 35]
  3
  ```
  The original `scores` is unchanged; `higher` is new.
- **Q6 faults:** (1) missing comma after the first object; (2) missing `return` in the callback; (3) the array is closed with `)` instead of `]` / braces are mismatched as written. Accept any fix producing `["A4", "A3"]`.

## Partial credit notes (assessors)

- Array is present but all items are plain strings (`["A", "B", "C"]`) instead of objects: award 1/4. This misses the "objects with named properties" outcome, which U13/U15 depend on.
- `.map` works but uses an arrow function (from outside this unit): do not penalise correctness. Note that U07 is where arrows are taught; full marks still apply if it returns a value, but gently mention the intended syntax.
- Logs `items[0]` (the whole object) instead of `items[0].key`: award 1/2 on the indexed-read criterion; ask them to go one step further into a property.
- `console-output.txt` shows `[Object object]`-style or retyped content: award 0–1/3 and ask them to copy the real console output.
- Do not penalise imperfect English. Do penalise copy-pasted lesson prose on Q1–Q4.

## Common weak submissions

- `projects.title` (no index) yielding `undefined`, with the learner concluding the array is broken.
- `.map` callback named `function` with no `return`, producing an array of `undefined`.
- Using `.length()` (with parentheses), which throws, instead of `.length`.
- Confusing `.map` (returns a new array) with a loop that prints.

## If the cohort struggles here

The usual cliff in U06 is the chain `array[i].key` and the idea that a callback must return. If many submissions show `[undefined, undefined, undefined]`, pause before U07 and re-run a two-line side-by-side: a callback that returns versus one that logs. Do not proceed to U07 until `.map` with `return` is solid, because U07 rewrites exactly this callback into arrow syntax and U15 renders it.
