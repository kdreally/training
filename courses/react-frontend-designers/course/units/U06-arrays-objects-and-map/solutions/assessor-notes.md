# U06 Assessor notes (learner-invisible)

## Model answer sketch

**Q1 (array vs object):** Array = an ordered list, items reached by position, e.g. a stack of artboards; object = one thing with named properties, reached by key, e.g. a frame with `width`, `height`, `fill`. Good answers name both the order/position distinction and the named-key distinction.

**Q2 (indexes):** Indexes start at `0`, so the first item is at position `0`. `array[array.length]` is always one past the last valid index, so it evaluates to `undefined`. The last item is `array[array.length - 1]`. Accept "out of range" or "one too far."

**Q3 (dot vs bracket):** Bracket notation is needed when the key is stored in a variable (`obj[keyName]`) or when the key has spaces/special characters (`obj["my key"]`). Dot notation is preferred when the key is a known, plain identifier.

**Q4 (read the code):** Prints `Lisbon`. Chain: `stops` is the array → `[1]` takes the second object → `.city` reads its `city` key, which is `"Lisbon"`.

**Q5 (predict then run):** Expected:
```
[10, 20, 30]
[15, 25, 35]
3
```
`scores` is unchanged because `.map` is non-destructive; `higher` is a new array; `.length` is unaffected by mapping.

**Q6 (debug):** Corrected:
```js
const papers = [
  { size: "A4" },
  { size: "A3" },
];

const sizes = papers.map(function (paper) {
  return paper.size;
});

console.log(sizes); // ["A4", "A3"]
```
Faults: (1) missing comma between the two objects; (2) missing `return` in the callback; (3) the array was closed with `)` and missing a terminator as written. Accept any equivalent fix.

**Q7 (error decode):** `papers.map is not a function` means `papers` is not an array — it is an object, a string, `undefined`, or something else. Check that the value is wrapped in square brackets and that the variable name is not shadowing/typo'd. The message names the value that lacks `.map`.

## Partial credit and common wrong-but-thoughtful answers

- **"`.map` changes the original array."** Understandable and wrong: `.map` returns a new array and leaves the source untouched. If a learner says this in Q5, award Q5 partial (1/2) but not zero — the transformation output may still be right. Correct in feedback.
- **`array[3]` for a length-3 array** yields `undefined`, which learners often call "an error." It is not an error; it is an out-of-range read. Accept the observation, but correct the vocabulary.
- **Uses `.forEach` instead of `.map`** (from prior exposure): `.forEach` returns `undefined`. If `labels` is `undefined`, award the map criterion 1/5 and explain the difference. `.forEach` is out of scope here.
- **Q6 fixes only the comma:** award 1/2. The missing `return` would still give `[undefined, undefined]`.
- **Q1 design example is a one-off element never reused:** still acceptable if the array/object distinction is right; this unit is not testing design-system thinking.

## Evidence to check quickly

1. Open `gallery.html`; confirm the console prints a labeled count, a populated mapped array, and one indexed read.
2. Confirm the mapped array has real values, not `undefined`s (grep the output or re-run).
3. Confirm the `.map` callback contains `return`.
4. Compare `console-output.txt` against a fresh run where practical.

## Note on where this goes

The callback shape here (`function (item) { return ...; }`) is intentionally the long form. In U07 it becomes `(item) => ...`, and in U15 it becomes `projects.map((project) => <ProjectCard ... />)`. If a learner leaves U06 unable to see that `.map` pairs each item with a produced result, U15 will be very hard. Flag it here.
